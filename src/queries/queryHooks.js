import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import KEYS from './queryKeys';
import {
  changePassword,
  forgotPassword,
  login,
  resetPassword,
  signup,
  verifyEmail
} from 'src/services/authServices';
import { fetchUserProfile } from 'src/services/userServices';
import {
  confirmPayment,
  fetchAllAppointment,
  fetchAppointmentByID,
  fetchAppointmentTypes,
  fetchAvailableDates,
  fetchAvailableTimes,
  fetchBlogCollections,
  fetchDoctorsCalendars,
  fetchKiiraProducts,
  initialiseBookingPayment
} from 'src/services/bookingServices';
import isEmpty from 'src/utils/isEmpty';

export const useLogin = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return login(data);
    }
  });
  return data;
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: (data) => {
      return signup(data);
    },
    onSuccess: (data) => {
      // ✅ refetch profile data on login success
      queryClient.invalidateQueries({ queryKey: [KEYS.PROFILE] });
    }
  });
  return data;
};

export const useVerifyEmail = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return verifyEmail(data);
    }
  });
  return data;
};

export const useForgotPassword = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return forgotPassword(data);
    }
  });
  return data;
};

export const useResetPassword = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return resetPassword(data);
    }
  });
  return data;
};
changePassword;

export const useChangePassword = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return changePassword(data);
    }
  });
  return data;
};
changePassword;

export const useProfile = () => {
  const data = useQuery({ queryKey: [KEYS.PROFILE], queryFn: fetchUserProfile });
  return data;
};

export const useProducts = () => {
  const data = useQuery({ queryKey: [KEYS.PRODUCTS], queryFn: fetchKiiraProducts });
  return data;
};

export const useDoctorsCalendars = () => {
  const data = useQuery({ queryKey: [KEYS.DOCTORS], queryFn: fetchDoctorsCalendars });
  return data;
};

export const useAppointmentTypes = () => {
  const data = useQuery({ queryKey: [KEYS.APPOINTMENT_TYPES], queryFn: fetchAppointmentTypes });
  return data;
};

export const useAvailableDates = (payload) => {
  const queryClient = useQueryClient();
  const enabledQuery =
    !isEmpty(payload?.month) &&
    payload?.month !== 'Invalid date' &&
    !isEmpty(payload?.appointmentTypeID);

  const data = useQuery({
    queryKey: [KEYS.AVAILABLE_DATES],
    queryFn: () => fetchAvailableDates(payload),
    enabled: enabledQuery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.AVAILABLE_TIMES] });
    },
    onError: (err) => {
      console.log(' \n 🚀 ~ file: queryHooks.js:124 ~ useAvailableDates ~ err:', err);
    }
  });
  return data;
};

export const useAvailableTimes = (payload) => {
  const enabledQuery =
    !isEmpty(payload?.date) &&
    payload?.date !== 'Invalid date' &&
    !isEmpty(payload?.appointmentTypeID);

  const data = useQuery({
    queryKey: [KEYS.AVAILABLE_TIMES],
    queryFn: () => fetchAvailableTimes(payload),
    enabled: enabledQuery
  });
  return data;
};

export const useInitialisePayment = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: (data) => {
      return initialiseBookingPayment(data);
    },
    onSuccess: () => {
      // ✅ refetch booking history data on payment success
      queryClient.invalidateQueries({ queryKey: [KEYS.HISTORY] });
    }
  });
  return data;
};

export const useConfirmPayment = (id) => {
  const enabledQuery = !isEmpty(id);

  const data = useQuery({
    queryKey: [KEYS.CONFIRM_BOOKING],
    queryFn: () => confirmPayment(id),
    enabled: enabledQuery
  });
  return data;
};

export const useAppointments = () => {
  const data = useQuery({
    queryKey: [KEYS.APPOINTMENTS],
    queryFn: () => fetchAllAppointment()
  });
  return data;
};

export const useAppointmentById = (id) => {
  const enabledQuery = !isEmpty(id);
  const data = useQuery({
    queryKey: [KEYS.APPOINTMENTS_BY_ID, id],
    queryFn: () => fetchAppointmentByID(id),
    enabled: enabledQuery
  });
  return data;
};
export const useBlogCollections = () => {
  const data = useQuery({
    queryKey: [KEYS.BLOG_COLLECTIONS],
    queryFn: () => fetchBlogCollections()
  });
  return data;
};
