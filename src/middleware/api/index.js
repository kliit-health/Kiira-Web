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
    getCalendars: () => ApiHandler.get(`/calendars`),
    getAppointmentTypes: () => ApiHandler.get(`/appointment-types`),
    getAllAppointments: () => ApiHandler.get(`/appointments`),
    getAppointmentById: (id) => ApiHandler.get(`/appointments/${id}`),
    createAppointment: (data) => ApiHandler.post(`/appointments`, data),
    updateAppointment: (id, data) => ApiHandler.put(`/appointments/${id}`, data),
    cancelAppointment: (id) => ApiHandler.put(`/appointments/${id}/cancel`),
    rescheduleAppointment: (id, data) => ApiHandler.put(`/appointments/${id}/reschedule`, data),
    getAvailableDates: (month, appointmentTypeID) =>
      ApiHandler.get(`/availability/dates?month=${month}&appointmentTypeID=${appointmentTypeID}`),
    getAvailableTimes: (date, appointmentTypeID) =>
      ApiHandler.get(`/availability/dates?date=${date}&appointmentTypeID=${appointmentTypeID}`),
    validateAvailableTimes: (data) => ApiHandler.post(`/availability/check-times`, data)
  },
  payment: {
    viewPayments: (id) => ApiHandler.get(`/appointments/${id}/payments`),
    subscribe: (data) => ApiHandler.post(`/subscriptions`, data)
  }
};
export default Api;
