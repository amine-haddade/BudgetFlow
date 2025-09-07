import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/authService';
import type { AuthState } from '../../types/Auth/AuthState';
import type { LoginCredentials } from '../../types/Auth/LoginCredentials';
import type { RegisterCredentials } from '../../types/Auth/RegisterCredentials';



interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

// Fonction pour charger l'état depuis localStorage
const loadAuthFromStorage = (): Partial<AuthState> => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données d\'authentification:', error);
  }
  
  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  ...loadAuthFromStorage(),
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
      
      // Stocker dans localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
      }));
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Erreur lors de la connexion'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/register', credentials);
      
      // Stocker dans localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
      }));
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Erreur lors de l\'enregistrement'
      );
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<AuthResponse>('/api/auth/refresh-token');
      
      // Mettre à jour le token dans localStorage
      localStorage.setItem('token', response.data.token);
      
      return response.data.token;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Erreur lors du refresh du token'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.delete('/api/auth/logout');
      
      // Nettoyer localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error: any) {
      // Même en cas d'erreur, on nettoie le localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return rejectWithValue(
        error.response?.data?.message || 'Erreur lors de la déconnexion'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      
      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
