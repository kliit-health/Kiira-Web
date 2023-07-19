import Api from 'src/middleware/api';

export const fetchKiiraProducts = async () => {
  const res = await Api.bookings.getProducts();
  return res;
};

export const fetchDoctorsCalendars = async () => {
  const res = await Api.bookings.getCalendars();
  return res;
};

export const fetchAppointmentTypes = async () => {
  const res = await Api.bookings.getAppointmentTypes();
  return res;
};

export const fetchAppointmentHistory = async () => {
  const res = await Api.bookings.getAppointmentsHistory();
  return res;
};

export const fetchAppointmentByID = async (id) => {
  const res = await Api.bookings.getAppointmentById(id);
  return res;
};

export const fetchAvailableDates = async (data) => {
  const res = await Api.bookings.getAvailableDates(data);
  return res;
};

export const fetchAvailableTimes = async (data) => {
  const res = await Api.bookings.getAvailableTimes(data);
  return res;
};

export const validateAvailableTimes = async (data) => {
  const res = await Api.bookings.validateAvailableTimes(data);
  return res;
};

export const initialiseBookingPayment = async (data) => {
  const res = await Api.payment.initialisePayment(data);
  return res;
};

export const confirmPayment = async (id) => {
  const res = await Api.payment.confirmPayment(id);
  return res;
};

export const fetchBlogCollections = async () => {
  const res = await Api.bookings.getBlogCollections();
  return res;
};

export const fetchBookingForms = async () => {
  const res = await Api.bookings.getBookingForms();
  return res;
};

export const rescheduleBookedAppointment = async (data) => {
  // const { appointment_id, ...rest } = data;
  const res = await Api.bookings.rescheduleAppointment(data?.booking_id, data);
  return res;
};

export const cancelBookingAppointment = async (id) => {
  const res = await Api.bookings.cancelAppointment(id);
  return res;
};
export const fetchAppointmentHistoryByID = async (id) => {
  const res = await Api.bookings.appointmentHistoryById(id);
  return res;
};
