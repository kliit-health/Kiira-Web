import Api from 'src/middleware/api';

export const fetchUserProfile = async () => {
  const res = await Api.user.getProfile();
  return res;
};
