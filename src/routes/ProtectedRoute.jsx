import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from './Paths';
import { useEffect } from 'react';
import Auth from 'src/middleware/storage';
import { useProfile } from 'src/queries/queryHooks';
import moment from 'moment-timezone';
import isEmpty from 'src/utils/isEmpty';
import { Toast } from 'src/utils';
import { ContentContainer } from 'src/components/shared/styledComponents';

export const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = Auth.isAuthenticated();
  const isSubscribed = Auth.isSubscribed();

  useEffect(() => {
    if (!isAuthenticated) {
      Toast.fire({
        icon: 'info',
        html: `<ContentContainer className="text-kiiraBg2 text-xs">Unauthorised<br/>Kindly login to continue...</ContentContainer>`
      });
    }
  }, [isAuthenticated, isSubscribed]);

  return isAuthenticated && !isSubscribed ? (
    <Navigate to={ROUTES.SIGINUP_SUBSCRIPTION} state={{ from: location }} />
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  );
};

ProtectedRoute.propTypes = {};
