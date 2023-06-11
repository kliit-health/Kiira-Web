import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from './Paths';
import useAuth from 'src/hooks/useAuth';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {}, [isAuthenticated]);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  );
};

ProtectedRoute.propTypes = {};
