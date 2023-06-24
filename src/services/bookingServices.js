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

export const fetchAllAppointment = async (id) => {
  const res = await Api.bookings.getAllAppointments(id);
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
