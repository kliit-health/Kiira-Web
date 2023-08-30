import { useQueryClient } from '@tanstack/react-query';
import propTypes from 'prop-types';
import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from 'src/middleware/storage';
import { ROUTES } from 'src/routes/Paths';
import { googleLogout } from '@react-oauth/google';
import { Mixpanel } from 'src/utils/mixpanelUtil';
import mixpanel from 'mixpanel-browser';

// create a context for the auth provider
export const AuthContext = createContext();

// create the auth provider component
export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  // state for storing the authenticated user
  const isAuthenticated = Auth?.isAuthenticated();
  const userData = Auth?.getUser();
  const [user, setUser] = useState({});

  const logout = () => {
    Mixpanel.track('Log Out - User logged out', {
      id: userData?.id,
      data: {
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        email: userData?.email
      }
    });
    Mixpanel.reset();
    Auth?.destroyToken();
    googleLogout();
    setUser({});
    queryClient.clear();
  };

  useEffect(() => {
    const getAuth = () => {
      setUser(userData);
    };

    getAuth();
  }, []);

  useEffect(() => {}, [isAuthenticated]);

  const value = {
    user,
    isAuthenticated,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: propTypes.element.isRequired
};

AuthProvider.defaultPropTypes = {};
