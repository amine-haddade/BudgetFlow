import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {  type  RootState, type  AppDispatch } from '../Redux/Store';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  clearError,
} from "../Redux/slices/authSlice";
import type { LoginCredentials } from '../types/Auth/LoginCredentials';
import type { RegisterCredentials } from '../types/Auth/RegisterCredentials';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const result = await dispatch(loginUser(credentials));
      if (loginUser.fulfilled.match(result)) {
        navigate('/');
        return { success: true };
      } else {
        return { success: false, error: result.payload as string };
      }
    } catch (error) {
      return { success: false, error: 'Erreur inattendue lors de la connexion' };
    }
  }, [dispatch, navigate]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      const result = await dispatch(registerUser(credentials));
      if (registerUser.fulfilled.match(result)) {
        navigate('/');
        return { success: true };
      } else {
        return { success: false, error: result.payload as string };
      }
    } catch (error) {
      return { success: false, error: 'Erreur inattendue lors de l\'enregistrement' };
    }
  }, [dispatch, navigate]);

  const logout = useCallback(async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Forcer la déconnexion même en cas d'erreur
      navigate('/login');
    }
  }, [dispatch, navigate]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    clearAuthError,
  };
};
