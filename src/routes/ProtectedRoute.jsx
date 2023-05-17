import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "./Paths";
import useAuth from "src/hooks/useAuth";

export const ProtectedRoute = () => {
  const location = useLocation()
  const {isAuthenticated} = useAuth()

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN}  state={{from: location}} replace/>;
};

ProtectedRoute.propTypes = {};
