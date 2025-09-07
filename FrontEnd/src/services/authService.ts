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
    const originalRequest = error.config;
    
    // Si l'erreur est 401 et qu'on n'a pas déjà tenté de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Sert à marquer qu’on a déjà essayé de refresh le token pour cette requête.
      
      try {
        // Tenter de refresh le token
        await store.dispatch(refreshToken());
        
        // Récupérer le nouveau token
        const state = store.getState();
        const newToken = state.auth.token;
        
        if (newToken) {
          // Retry la requête originale avec le nouveau token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Si le refresh échoue, déconnecter l'utilisateur
        store.dispatch(clearAuth());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
