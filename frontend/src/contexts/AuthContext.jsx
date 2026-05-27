import { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

/**
 * AuthProvider — wraps the app to provide authentication state & actions.
 *
 * Exposes:
 *   user, isAuthenticated, loading,
 *   login(), register(), logout(), fetchProfile()
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // ── Bootstrap: restore session from localStorage on mount ──
  useEffect(() => {
    const token = localStorage.getItem('nutritrack_token');
    const savedUser = localStorage.getItem('nutritrack_user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('nutritrack_user');
      }
    }
    setLoading(false);
  }, []);

  // ── Fetch fresh profile from backend ──
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

  // ── Login ──
  const login = useCallback(async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('nutritrack_token', data.token);
      localStorage.setItem('nutritrack_user', JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (error) {
      const msg = error.response?.data?.message || 'Login gagal. Periksa email dan password.';
      throw new Error(msg);
    }
  }, []);

  // ── Register ──
  const register = useCallback(async (formData) => {
    try {
      const { data } = await api.post('/auth/register', formData);
      localStorage.setItem('nutritrack_token', data.token);
      localStorage.setItem('nutritrack_user', JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (error) {
      const msg = error.response?.data?.message || 'Registrasi gagal. Coba lagi.';
      throw new Error(msg);
    }
  }, []);

  // ── Logout ──
  const logout = useCallback(() => {
    localStorage.removeItem('nutritrack_token');
    localStorage.removeItem('nutritrack_user');
    setUser(null);
  }, []);

  // ── Update Profile ──
  const updateProfile = useCallback(async (updatedData) => {
    try {
      const { data } = await api.patch('/profile', updatedData);
      setUser(data.user);
      localStorage.setItem('nutritrack_user', JSON.stringify(data.user));
      return data.user;
    } catch (error) {
      const msg = error.response?.data?.message || 'Gagal memperbarui profil.';
      throw new Error(msg);
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
