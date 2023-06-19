import Api from 'src/middleware/api';

export const fetchKiiraProducts = async () => {
  const res = await Api.bookings.getProducts();
  return res;
};

export const fetchDoctorsCalendars = async () => {
  const res = await Api.bookings.getCalendars();
  return res;
};
