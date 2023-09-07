import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import KEYS from './queryKeys';
import {
  changePassword,
  forgotPassword,
  login,
  migrateAcuityUser,
  requestAcuityMigration,
  resetPassword,
  signinWithGoogle,
  signup,
  signupWithGoogle,
  verifyEmail
} from 'src/services/authServices';
import {
  addSubscriptionCard,
  cancelUserSubscription,
  contactDoctor,
  deleteSavedCards,
  fetchSubscriptionHistory,
  fetchUserProfile,
  getPaymentMethods,
  planSubscription,
  uploadMediaFile,
  viewSavedCards
} from 'src/services/userServices';
import {
  cancelBookingAppointment,
  confirmPayment,
  fetchAppointmentByID,
  fetchAppointmentHistory,
  fetchAppointmentHistoryByID,
  fetchAppointmentTypes,
  fetchAvailableDates,
  fetchAvailableTimes,
  fetchBlogCollections,
  fetchBookingForms,
  fetchDoctorsCalendars,
  fetchKiiraProducts,
  initialiseBookingPayment,
  rescheduleBookedAppointment,
  validateCouponCode
} from 'src/services/bookingServices';
import { Mixpanel } from 'src/utils/mixpanelUtil';
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
      queryClient.invalidateQueries({ queryKey: [KEYS.PROFILE, KEYS.HISTORY] });
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

export const useChangePassword = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return changePassword(data);
    }
  });
  return data;
};

export const useProfile = () => {
  const data = useQuery({
    queryKey: [KEYS.PROFILE],
    queryFn: fetchUserProfile,
    onError: (error) => {
      Mixpanel.track('Error: Fetch users profile: ->', {
        data: {
          message: !isEmpty(error?.response?.data?.message)
            ? error?.response?.data?.message
            : error?.message,
          email: data?.email,
          url: error?.response?.config?.url
        }
      });
    }
  });
  return data;
};

export const useProducts = () => {
  const data = useQuery({
    queryKey: [KEYS.PRODUCTS],
    queryFn: fetchKiiraProducts,
    onError: (error) => {
      Mixpanel.track('Error: Fetch products / subscription: ->', {
        data: {
          message: !isEmpty(error?.response?.data?.message)
            ? error?.response?.data?.message
            : error?.message,
          email: data?.email,
          url: error?.response?.config?.url
        }
      });
    }
  });
  return data;
};

export const useDoctorsCalendars = () => {
  const data = useQuery({
    queryKey: [KEYS.DOCTORS],
    queryFn: fetchDoctorsCalendars,
    onError: (error) => {
      Mixpanel.track('Error: Fetch Doctors: ->', {
        data: {
          message: !isEmpty(error?.response?.data?.message)
            ? error?.response?.data?.message
            : error?.message,
          email: data?.email,
          url: error?.response?.config?.url
        }
      });
    }
  });
  return data;
};

export const useAppointmentTypes = (docAppointment) => {
  const enabledQuery = isEmpty(docAppointment);
  const data = useQuery({
    queryKey: [KEYS.APPOINTMENT_TYPES],
    queryFn: fetchAppointmentTypes,
    enabled: enabledQuery,
    onError: (error) => {
      Mixpanel.track('Error: Fetch appointment types: ->', {
        data: {
          message: !isEmpty(error?.response?.data?.message)
            ? error?.response?.data?.message
            : error?.message,
          email: data?.email,
          url: error?.response?.config?.url
        }
      });
    }
  });
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
    onError: (error) => {
      Mixpanel.track('Error: Fetch available date: ->', {
        data: {
          message: !isEmpty(error?.response?.data?.message)
            ? error?.response?.data?.message
            : error?.message,
          email: data?.email,
          url: error?.response?.config?.url
        }
      });
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
    enabled: enabledQuery,
    onError: (error) => {
      Mixpanel.track('Error: Fetch available time: ->', {
        data: {
          message: !isEmpty(error?.response?.data?.message)
            ? error?.response?.data?.message
            : error?.message,
          email: data?.email,
          url: error?.response?.config?.url
        }
      });
    }
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
    enabled: enabledQuery,
    onError: (error) => {
      Mixpanel.track('Error: Confirm Booking Payment: ->', {
        data: {
          message: !isEmpty(error?.response?.data?.message)
            ? error?.response?.data?.message
            : error?.message,
          email: data?.email,
          url: error?.response?.config?.url
        }
      });
    }
  });
  return data;
};

export const useAppointmentsHistory = () => {
  const data = useQuery({
    queryKey: [KEYS.HISTORY],
    queryFn: () => fetchAppointmentHistory(),
    onError: (error) => {
      Mixpanel.track('Error: Fetch appointment history: ->', {
        data: {
          message: !isEmpty(error?.response?.data?.message)
            ? error?.response?.data?.message
            : error?.message,
          email: data?.email,
          url: error?.response?.config?.url
        }
      });
    }
  });
  return data;
};

export const useAppointmentById = (id) => {
  const enabledQuery = !isEmpty(id) && id !== 'undefined';

  const data = useQuery({
    queryKey: [KEYS.APPOINTMENTS_BY_ID, id],
    queryFn: () => fetchAppointmentByID(id),
    enabled: enabledQuery,
    onError: (error) => {
      Mixpanel.track('Error: Fetch appointment by ID: ->', {
        data: {
          message: !isEmpty(error?.response?.data?.message)
            ? error?.response?.data?.message
            : error?.message,
          email: data?.email,
          url: error?.response?.config?.url
        }
      });
    }
  });
  return data;
};
export const useAppointmentHistoryByID = (id) => {
  const enabledQuery = !isEmpty(id) && id !== 'undefined';

  const data = useQuery({
    queryKey: [KEYS.APPOINTMENTS_HISTORY_BY_ID, id],
    queryFn: () => fetchAppointmentHistoryByID(id),
    enabled: enabledQuery,
    onError: (error) => {
      Mixpanel.track('Error: Fetch appointment history by ID: ->', {
        data: {
          message: !isEmpty(error?.response?.data?.message)
            ? error?.response?.data?.message
            : error?.message,
          email: data?.email,
          url: error?.response?.config?.url
        }
      });
    }
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

export const useBookingForms = () => {
  const data = useQuery({
    queryKey: [KEYS.BOOKING_FORMS],
    queryFn: () => fetchBookingForms(),
    onError: (error) => {
      Mixpanel.track('Error: Fetch appointment type booking forms: ->', {
        data: {
          message: !isEmpty(error?.response?.data?.message)
            ? error?.response?.data?.message
            : error?.message,
          email: data?.email,
          url: error?.response?.config?.url
        }
      });
    }
  });
  return data;
};

export const useRescheduleAppointment = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return rescheduleBookedAppointment(data);
    }
  });
  return data;
};

export const useCancelAppointment = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return cancelBookingAppointment(data);
    }
  });
  return data;
};

export const usePlanSubscription = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: (data) => {
      return planSubscription(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.SUBSCRIPTION_HISTORY] });
    },
    onError: (error) => {
      Mixpanel.track('Failed - Subscription activation error', {
        data: {
          message: !isEmpty(error.response?.data?.message)
            ? error.response?.data?.message
            : error?.message,
          url: error?.response?.config?.url
        }
      });
    }
  });
  return data;
};

export const useAddSubscriptionCard = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: (data) => {
      return addSubscriptionCard(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.SAVED_CARDS] });
    }
  });
  return data;
};

export const useSubscriptionHistory = () => {
  const data = useQuery({
    queryKey: [KEYS.SUBSCRIPTION_HISTORY],
    queryFn: () => fetchSubscriptionHistory()
  });
  return data;
};

export const useCancelSubscription = () => {
  const data = useMutation({
    mutationFn: () => {
      return cancelUserSubscription();
    }
  });
  return data;
};

export const useViewSavedCards = () => {
  const data = useQuery({
    queryKey: [KEYS.SAVED_CARDS],
    queryFn: () => viewSavedCards(),
    onError: (error) => {
      Mixpanel.track('Error: Get Saved Cards: ->', {
        data: {
          message: !isEmpty(error?.response?.data?.message)
            ? error?.response?.data?.message
            : error?.message,
          url: error?.response?.config?.url
        }
      });
    }
  });
  return data;
};

export const useDeleteUserCard = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return deleteSavedCards(data);
    }
  });
  return data;
};

export const useContactDoctor = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return contactDoctor(data);
    }
  });
  return data;
};
export const useSigninWithGoogle = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return signinWithGoogle(data);
    }
  });
  return data;
};

export const useSignupWithGoogle = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return signupWithGoogle(data);
    }
  });
  return data;
};

export const useRequesAcuityMigration = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return requestAcuityMigration(data);
    }
  });
  return data;
};

export const useMigrateAcuityUser = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return migrateAcuityUser(data);
    }
  });
  return data;
};

export const useValidateCoupon = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return validateCouponCode(data);
    }
  });
  return data;
};

export const usePaymentMethods = () => {
  const data = useQuery({
    queryKey: [KEYS.PAYMENT_METHODS],
    queryFn: () => getPaymentMethods(),
    onError: (error) => {
      Mixpanel.track('Error: Fetch payment methods failed: ->', {
        data: {
          message: !isEmpty(error?.response?.data?.message)
            ? error?.response?.data?.message
            : error?.message,
          url: error?.response?.config?.url
        }
      });
    }
  });
  return data;
};

export const useUploadMediaFile = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return uploadMediaFile(data);
    }
  });
  return data;
};
