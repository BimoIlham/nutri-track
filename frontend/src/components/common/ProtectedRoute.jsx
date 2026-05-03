import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiLoader } from 'react-icons/fi';

/**
 * Route guard — redirects to /login if user is not authenticated.
 * Shows a loading spinner while auth state is initializing.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
