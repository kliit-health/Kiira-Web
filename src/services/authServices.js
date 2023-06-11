import Api from 'src/middleware/api';

export const fetchUserProfile = async () => {
  const res = await Api.user.getProfile();
  return res;
};

export const login = async (data) => {
    const res = await Api.auth.signIn(data);
    return res;
  };
