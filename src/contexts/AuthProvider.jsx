import { useQueryClient } from '@tanstack/react-query';
import propTypes from 'prop-types';
import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from 'src/middleware/storage';
import { ROUTES } from 'src/routes/Paths';

// create a context for the auth provider
export const AuthContext = createContext();

// create the auth provider component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // state for storing the authenticated user
  const isAuthenticated = Auth?.isAuthenticated();
  const userData = Auth?.getUser();
  const [user, setUser] = useState({});

  const logout = () => {
    Auth?.destroyToken();
    setUser({});
    queryClient.clear();
    navigate(ROUTES.LOGIN);
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
