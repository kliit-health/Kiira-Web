import propTypes from 'prop-types';
import { useState, createContext, useEffect } from 'react';
import Auth from 'src/middleware/storage';

// create a context for the auth provider
export const AuthContext = createContext();

// create the auth provider component
export const AuthProvider = ({ children }) => {
  // state for storing the authenticated user
  const isAuthenticated = Auth?.isAuthenticated();
  const userData = Auth?.getUser();
  const [user, setUser] = useState({});  

  const logout = () => {
    Auth?.destroyToken();
    setUser({});
  };

  useEffect(() => {
    const getAuth = () => {
      setUser(userData);
    };

    getAuth();
  }, []);

  useEffect(() => {
    console.log('isAuth', isAuthenticated);
  }, [isAuthenticated]);

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
