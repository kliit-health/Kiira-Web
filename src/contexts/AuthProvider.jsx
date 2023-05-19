import propTypes from "prop-types";
import { useState, createContext } from "react";
import { userData } from "src/data";
import Auth from "src/middleware/storage";

// create a context for the auth provider
export const AuthContext = createContext();

// create the auth provider component
export const AuthProvider = ({ children }) => {
  // state for storing the authenticated user
  const [user, setUser] = useState(userData);

  const login = () => {
    Auth?.setToken('tokenAvailable')
    Auth?.fetchUser( userData)
    setUser(userData)
  };

  const logout = () => {
    Auth?.destroyToken()
    setUser(null)
  };

  const isAuthenticated = Auth?.isAuthenticated()
  console.log("🚀 ~ file: AuthProvider.jsx:26 ~ AuthProvider ~ isAuthenticated:", isAuthenticated)
  

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: propTypes.element.isRequired
}
