import axios,  {   type AxiosResponse,  type InternalAxiosRequestConfig } from 'axios';
import { store } from '../Redux/Store';
import { refreshToken, clearAuth } from '../Redux/slices/authSlice';

// Configuration de base d'axios
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important pour les cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Single-flight control to avoid multiple refresh calls
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

// Interceptor pour ajouter le token à chaque requête
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor pour gérer les réponses et le refresh token
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as any;

    const status = error.response?.status;
    const url: string = originalRequest?.url || '';
    const isAuthEndpoint = ['/api/auth/login', '/api/auth/register', '/api/auth/refresh-token', '/api/auth/logout']
      .some((path) => url.includes(path));

    // Ne jamais tenter de refresh pour les endpoints d'auth eux-mêmes
    if (isAuthEndpoint) {
      return Promise.reject(error);
    }

    // Si l'erreur est 401 et qu'on n'a pas déjà tenté de refresh
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marque la tentative de refresh pour cette requête

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          // Lance un seul refresh pour toutes les requêtes concurrentes
          refreshPromise = store
            .dispatch<any>(refreshToken())
            .then(() => {
              // ok
            })
            .catch((refreshError: any) => {
              // Si le refresh échoue, on nettoie et redirige
              store.dispatch(clearAuth());
              window.location.href = '/login';
              throw refreshError;
            })
            .finally(() => {
              isRefreshing = false;
              refreshPromise = null;
            });
        }

        // Attendre le refresh en cours si déjà lancé
        if (refreshPromise) {
          await refreshPromise;
        }

        // Récupérer le nouveau token et rejouer la requête
        const state = store.getState();
        const newToken = state.auth.token;
        if (newToken) {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
