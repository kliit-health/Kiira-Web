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
import { fetchKiiraProducts } from 'src/services/bookingServices';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: (data) => {
      return login(data);
    },
    onSuccess: (data) => {
      // ✅ update profile data on login success
      queryClient.setQueryData([[KEYS.PROFILE]], data?.data?.user);

      // ✅ refetch profile data on login success
      // queryClient.invalidateQueries({ queryKey: [KEYS.PROFILE] });
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
};changePassword

export const useChangePassword = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return changePassword(data);
    }
  });
  return data;
};changePassword

export const useProfile = () => {
  const data = useQuery({ queryKey: [KEYS.PROFILE], queryFn: fetchUserProfile });
  return data;
};

export const useProducts = () => {
  const data = useQuery({ queryKey: [KEYS.PRODUCTS], queryFn: fetchKiiraProducts });
  return data;
};
