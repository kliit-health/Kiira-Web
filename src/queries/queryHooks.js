import { useMutation, useQuery } from '@tanstack/react-query';
import KEYS from './queryKeys';
import { fetchUserProfile, login } from 'src/services/authServices';

export const useProfile = () => {
  const data = useQuery({ queryKey: [KEYS.PROFILE], queryFn: fetchUserProfile });

  return data;
};

export const useLogin = () => {
  const data = useMutation({
    mutationFn: (data) => {
      return login(data);
    }
  });
  return data;
};
