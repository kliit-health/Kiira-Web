import { elementType } from "prop-types";
import { Route } from "react-router";
import { Navigate } from "react-router-dom";
// import { isMobile } from "react-device-detect";
import Auth from "src/middleware/storage";
import { ROUTES } from "./Paths";

export const PublicRoute = ({ component: Component, ...rest }) => {
  // if (isMobile) {
  //   return <Redirect to={paths.MOBILE_SCREEN} />;
  // }

  // if (isAuthorized && !scoutAccess) {
  //     return <Redirect to={paths.SIGN_UP_PAYMENTS} />;
  // }

  return (
    <Route
      render={(props) =>
        !Auth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          
          <Navigate to={ROUTES.TIMELINE} />
        )
        // <Component {...props} />
      }
      {...rest}
    />
  );
};

PublicRoute.propTypes = {
  component: elementType.isRequired,
};
