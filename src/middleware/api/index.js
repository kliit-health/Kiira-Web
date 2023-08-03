import isEmpty from 'src/utils/isEmpty';
import ApiHandler from './ApiHandler';
import { data } from 'autoprefixer';

const Api = {
  auth: {
    signIn: (data) => ApiHandler.post(`/users/sign-in`, data),
    signUp: (data) => ApiHandler.post(`/users/sign-up`, data),
    resendVerification: (data) => ApiHandler.post(`/users/resend-verification/email`, data),
    verifyEmail: (data) => ApiHandler.post(`/users/verify/email`, data),
    forgotPassword: (data) => ApiHandler.patch(`/users/forgot-password`, data),
    resetPassword: (data) => ApiHandler.patch(`/users/reset-password`, data),
    changePassword: (data) => ApiHandler.patch(`/users/change-password`, data),
    signinWithGoogle: (data) => ApiHandler.post(`/users/sign-in/google`, data),
    signupWithGoogle: (data) => ApiHandler.post(`/users/sign-up/google`, data)
    // refreshToken: (data) => ApiHandler.post(`/auth/refresh-token`, data),
    // signInSocial: (token) =>
    //   ApiHandler.get(`/auth/socials/redirect?idToken=${token}`),
    // logout: (data) => ApiHandler.post(`/auth/logout`, data),
  },
  user: {
    getProfile: () => ApiHandler.get(`/users/profile`),
    contactDoctor: (data) => ApiHandler.post(`/calendars/contact`, data)
  },
  bookings: {
    getProducts: () => ApiHandler.get(`/products`),
    getCalendars: () => ApiHandler.get(`/calendars`),
    getAppointmentTypes: () => ApiHandler.get(`/appointment-types`),
    getAppointmentsHistory: () => ApiHandler.get(`/appointments/book/history`),
    getAppointmentById: (id) => ApiHandler.get(`/appointments/${id}`),
    createAppointment: (data) => ApiHandler.post(`/appointments`, data),
    updateAppointment: (id, data) => ApiHandler.put(`/appointments/${id}`, data),
    cancelAppointment: (id) => ApiHandler.put(`/appointments/${id}/cancel`),
    appointmentHistoryById: (id) => ApiHandler.get(`/appointments/book/review/${id}`),
    rescheduleAppointment: (id, data) => ApiHandler.put(`/appointments/${id}/reschedule`, data),
    validateAvailableTimes: (data) => ApiHandler.post(`/availability/check-times`, data),
    getBlogCollections: () => ApiHandler.get(`/collections?limit=10`),
    getBookingForms: () => ApiHandler.get(`/forms`),
    getAvailableDates: (data) => {
      let queryString;

      queryString = Object.keys(data)
        .map((key) => !isEmpty(data[key]) && `${key}=${data[key]}`)
        .join('&');

      return ApiHandler.get(`/availability/dates?${queryString}`);
    },
    getAvailableTimes: (data) => {
      let queryString;

      queryString = Object.keys(data)
        .map((key) => !isEmpty(data[key]) && `${key}=${data[key]}`)
        .join('&');
      return ApiHandler.get(`/availability/times?${queryString}`);
    }
  },
  payment: {
    initialisePayment: (data) => ApiHandler.post(`/appointments/book/initialize`, data),
    viewPayments: (id) => ApiHandler.get(`/appointments/${id}/payments`),
    subscribe: (data) => ApiHandler.post(`/subscriptions`, data),
    cancelSubscription: () => ApiHandler.delete(`/subscriptions`),
    subscriptionHistory: () => ApiHandler.get(`/subscriptions/history`),
    confirmPayment: (id) => ApiHandler.get(`/appointments/book/confirmation/${id}`),
    viewSavedCards: () => ApiHandler.get(`/users/saved-card`),
    deleteSavedCards: () => ApiHandler.delete(`/users/saved-card`),
    addSubscriptionCard: (data) => ApiHandler.put(`/users/saved-card`, data)
  }
};

export default Api;
