import ApiHandler from "./ApiHandler";

const Api = {
  auth: {
    signInEmail: (data) => ApiHandler.post(`/auth/login`, data),
    signUpEmail: (data) => ApiHandler.post(`/users`, data),
    refreshToken: (data) => ApiHandler.post(`/auth/refresh-token`, data),
    signInSocial: (token) =>
      ApiHandler.get(`/auth/socials/redirect?idToken=${token}`),
    logout: (data) => ApiHandler.post(`/auth/logout`, data),
  },
  user: {
    userDetails: () => ApiHandler.get(`/auth/user`),
  },
};
export default Api;
