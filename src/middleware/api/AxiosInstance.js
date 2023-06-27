import axios from 'axios';
import { BASE_URL } from 'src/utils/constants';
import Auth from '../storage';
import { ROUTES } from 'src/routes/Paths';

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = await Auth.getToken();
    config.headers = {
      Accept: 'application/json'
    };
    config.headers.authorization = `Bearer ${token}`;
    config.timeout = 120000;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const url = error.config.url !== `${BASE_URL}/users/sign-in`;
    // const refreshurl = error.config.url === `${BASE_URL}/auth/refresh-token`;

    // if (error?.response?.status === 401 && refreshurl) {
    if (error?.response?.status === 401) {
      Auth?.destroyToken();
      redirect(ROUTES.LOGIN);
      return;
    }

    //refresh token
    // if (error?.response?.status === 401 && !originalRequest._retry && url) {
    //   originalRequest._retry = true;
    //   const token = await Auth.getToken();
    //   const refreshToken = await Auth.getRefreshToken();

    //   const credentials = {
    //     access_token: token,
    //     refresh_token: refreshToken,
    //   };

    //   if (isEmpty(credentials.access_token)) return;
    //   const response = await Api.auth.refreshToken(credentials);
    //   const { access_token, refresh_token } = response.data.data;
    //   await Auth.setToken(access_token, refresh_token);
    //   axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    //   return axiosApiInstance(originalRequest);
    // }
    return Promise.reject(error);
  }
);

// axios.interceptors.request.use(
//     config => {
//       const { origin } = new URL(config.url);
//       const allowedOrigins = [apiUrl];
//       const token = localStorage.getItem('token');
//       if (allowedOrigins.includes(origin)) {
//         config.headers.authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );

export default axiosApiInstance;
