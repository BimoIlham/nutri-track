import { useCallback, useState } from 'react';
import api from '../services/api';
import { AuthContext } from './auth-context';

function getSavedUser() {
  const token = localStorage.getItem('nutritrack_token');
  const savedUser = localStorage.getItem('nutritrack_user');

  if (!token || !savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem('nutritrack_user');
    return null;
  }
}

/**
 * AuthProvider wraps the app to provide authentication state and actions.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);

  const isAuthenticated = !!user;
  const loading = false;

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/profile');
      const userData = data.user || data;
      setUser(userData);
      localStorage.setItem('nutritrack_user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      throw error;
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('nutritrack_token', data.token);
      localStorage.setItem('nutritrack_user', JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (error) {
      const code = error.response?.data?.message;
      let msg;
      if (code === 'EMAIL_NOT_FOUND') msg = 'Email Anda tidak terdaftar.';
      else if (code === 'INVALID_PASSWORD') msg = 'Password Anda salah.';
      else msg = code || 'Login gagal. Periksa email dan password.';
      throw new Error(msg, { cause: error });
    }
  }, []);

  const register = useCallback(async (formData) => {
    try {
      await api.post('/auth/register', formData);
    } catch (error) {
      const msg = error.response?.data?.message || 'Registrasi gagal. Coba lagi.';
      throw new Error(msg, { cause: error });
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('nutritrack_token');
    localStorage.removeItem('nutritrack_user');
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (updatedData) => {
    try {
      const { data } = await api.patch('/profile', updatedData);
      setUser(data.user);
      localStorage.setItem('nutritrack_user', JSON.stringify(data.user));
      return data.user;
    } catch (error) {
      const msg = error.response?.data?.message || 'Gagal memperbarui profil.';
      throw new Error(msg, { cause: error });
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
