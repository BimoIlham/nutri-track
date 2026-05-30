import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';

/**
 * Custom hook for consuming AuthContext.
 * Throws if used outside of AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
