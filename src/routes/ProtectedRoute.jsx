import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from './Paths';
import useAuth from 'src/hooks/useAuth';
import { useEffect } from 'react';
import Auth from 'src/middleware/storage';

export const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = Auth.isAuthenticated();

  useEffect(() => {
    console.log(
      ' \n 🚀 ~ file: ProtectedRoute.jsx:9 ~ ProtectedRoute ~ isAuthenticated:',
      isAuthenticated
    );
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  );
};

ProtectedRoute.propTypes = {};
