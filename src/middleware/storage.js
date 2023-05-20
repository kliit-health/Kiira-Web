import Axios from 'axios';

const Auth = {
  setToken: (token, refreshToken) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  getToken: () => {
    let token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      return token;
    }
  },
  fetchUser: async (token) => {
    try {
      // const res = await Api2.user.userDetails(token);
      // localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem('user', JSON.stringify(token));
      return;
    } catch (error) {
      console.error('🚀 ~ file: storage.js:24 ~ fetchUser: ~ error:', error);
    }
  },
  getRefreshToken: () => {
    const token = localStorage.getItem('refresh_token');
    if (token) {
      return token;
    }
    return false;
  },
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    console.log('🚀 ~ file: storage.js:36 ~ token:', token);
    if (token === 'tokenAvailable') return true;
    return false;
  },
  destroyToken: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    delete Axios.defaults.headers.common['Authorization'];
    return true;
  },
  getUser: () => {
    const user = localStorage.getItem('user');
    return user !== null ? JSON.parse(user) : null;
  }
};

export default Auth;
