import Axios from 'axios';
import Api from './api';
import { useLocalStore } from 'src/store';
import isEmpty from 'src/utils/isEmpty';

const Auth = {
  setToken: (token, refreshToken) => {
    localStorage.setItem('token', token);
    // localStorage.setItem('refresh_token', refreshToken);
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  getToken: () => {
    let token = localStorage.getItem('token');
    if (!token) {
      delete Axios.defaults.headers.common['Authorization'];
      return null;
    } else {
      return token;
    }
  },
  getUser: () => {
    const user = localStorage.getItem('user');
    return user !== null ? JSON.parse(user) : null;
  },
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  fetchUser: async () => {
    try {
      const res = await Api.user.getProfile();
      localStorage.setItem('user', JSON.stringify(res.data?.user));
      return;
    } catch (error) {
      console.error('🚀 ~ file: storage.js:24 ~ fetchUser: ~ error:', error);
    }
  },
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (token) return true;
    return false;
  },
  destroyToken: () => {
    useLocalStore.persist.clearStorage();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // localStorage.removeItem('refresh_token');
    delete Axios.defaults.headers.common['Authorization'];
    return true;
  },
  isSubscribed: () => {
    const userl = localStorage.getItem('user');
    const user = JSON.parse(userl);
    
    if (
      !isEmpty(user?.subscription_expiry_date) &&
      !isEmpty(user?.subscription_id) &&
      !isEmpty(user?.stripe_customer_id)
    )
      return true;
    return false;
  }

  // getRefreshToken: () => {
  //   const token = localStorage.getItem('refresh_token');
  //   if (token) {
  //     return token;
  //   }
  //   return false;
  // },
};

export default Auth;
