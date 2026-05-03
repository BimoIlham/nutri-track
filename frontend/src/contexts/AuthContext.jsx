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

  // ── Login (MOCKED FOR TESTING) ──
  const login = useCallback(async (email, password) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      if (!email || !password) {
        throw new Error('Email dan password wajib diisi');
      }

      const token = 'mock_jwt_token_123';
      const userData = {
        id: 1,
        name: email.split('@')[0],
        email: email,
      };

      localStorage.setItem('nutritrack_token', token);
      localStorage.setItem('nutritrack_user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error(error.message || 'Login gagal. Periksa email dan password.');
    }
  }, []);

  // ── Register (MOCKED FOR TESTING) ──
  const register = useCallback(async (formData) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      if (!formData.email || !formData.password || !formData.name) {
        throw new Error('Semua kolom wajib diisi');
      }

      const token = 'mock_jwt_token_123';
      const userData = {
        id: 1,
        name: formData.name,
        email: formData.email,
      };

      localStorage.setItem('nutritrack_token', token);
      localStorage.setItem('nutritrack_user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error(error.message || 'Registrasi gagal. Coba lagi.');
    }
  }, []);

  // ── Logout ──
  const logout = useCallback(() => {
    localStorage.removeItem('nutritrack_token');
    localStorage.removeItem('nutritrack_user');
    setUser(null);
  }, []);

  // ── Update Profile (MOCKED FOR TESTING) ──
  const updateProfile = useCallback(async (updatedData) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      setUser((prevUser) => {
        const newUser = { ...prevUser, ...updatedData };
        localStorage.setItem('nutritrack_user', JSON.stringify(newUser));
        return newUser;
      });
      return true;
    } catch (error) {
      throw new Error(error.message || 'Gagal memperbarui profil.');
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
