import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from './Paths';
import { useEffect } from 'react';
import Auth from 'src/middleware/storage';
import { useProfile } from 'src/queries/queryHooks';
import moment from 'moment-timezone';
import isEmpty from 'src/utils/isEmpty';

export const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = Auth.isAuthenticated();
  const isSubscribed = Auth.isSubscribed();

  useEffect(() => {}, [isAuthenticated, isSubscribed]);

  return isAuthenticated && !isSubscribed ? (
    <Navigate to={ROUTES.SIGINUP_SUBSCRIPTION} state={{ from: location }} />
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  );
};

ProtectedRoute.propTypes = {};
