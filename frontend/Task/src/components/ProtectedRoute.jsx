import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import ROUTES from '../lib/routes';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} state={{ from: location }} replace />;
  }

  return children;
};