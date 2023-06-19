import ApiHandler from './ApiHandler';

const Api = {
  auth: {
    signIn: (data) => ApiHandler.post(`/users/sign-in`, data),
    signUp: (data) => ApiHandler.post(`/users/sign-up`, data),
    resendVerification: (data) => ApiHandler.post(`/users/resend-verification/email`, data),
    verifyEmail: (data) => ApiHandler.post(`/users/verify/email`, data),
    forgotPassword: (data) => ApiHandler.patch(`/users/forgot-password`, data),
    resetPassword: (data) => ApiHandler.patch(`/users/reset-password`, data),
    changePassword: (data) => ApiHandler.patch(`/users/change-password`, data)
    // refreshToken: (data) => ApiHandler.post(`/auth/refresh-token`, data),
    // signInSocial: (token) =>
    //   ApiHandler.get(`/auth/socials/redirect?idToken=${token}`),
    // logout: (data) => ApiHandler.post(`/auth/logout`, data),
  },
  user: {
    getProfile: () => ApiHandler.get(`/users/profile`)
  },
  bookings: {
    getProducts: () => ApiHandler.get(`/products`),
    getCalendars: () => ApiHandler.get(`/calendars`)
  }
};
export default Api;
