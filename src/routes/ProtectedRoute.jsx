import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from './Paths';
import { useEffect } from 'react';
import Auth from 'src/middleware/storage';
import { Toast } from 'src/utils';

export const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = Auth.isAuthenticated();
  const isNoSubscription = Auth.isNoSubscription();
  const isExpired = Auth.isExpiredSubscription();

  useEffect(() => {
    if (!isAuthenticated) {
      Toast.fire({
        icon: 'info',
        html: `<ContentContainer className="text-kiiraBg2 text-xs">Unauthorised<br/>Kindly login to continue...</ContentContainer>`
      });
      return;
    }
  }, [isAuthenticated, isNoSubscription, isExpired]);

  return isAuthenticated &&
    isNoSubscription &&
    location.pathname !== ROUTES.SIGINUP_SUBSCRIPTION ? (
    <Navigate to={ROUTES.SIGINUP_SUBSCRIPTION} state={{ from: location }} />
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  );
};

ProtectedRoute.propTypes = {};
