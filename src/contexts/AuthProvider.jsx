import propTypes from 'prop-types';
import { useState, createContext, useEffect } from 'react';
import { userData } from 'src/data';
import Auth from 'src/middleware/storage';

// create a context for the auth provider
export const AuthContext = createContext();

// create the auth provider component
export const AuthProvider = ({ children }) => {
  // state for storing the authenticated user
  const [user, setUser] = useState(userData);
  const [isAuthenticated, setIsAuthenticated] = useState(userData);

  const login = () => {
    Auth?.setToken('tokenAvailable');
    Auth?.fetchUser(userData);
    setUser(userData);
  };

  const logout = () => {
    Auth?.destroyToken();
    setUser(null);
  };

  useEffect(() => {
    const getAuth = async () => {
      const isAuthenticated = Auth?.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
    };

    getAuth();
  }, []);
  console.log('🚀 ~ file: AuthProvider.jsx:26 ~ AuthProvider ~ isAuthenticated:', isAuthenticated);

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: propTypes.element.isRequired,
  navigate: propTypes.func
};

AuthProvider.defaultPropTypes = {};
