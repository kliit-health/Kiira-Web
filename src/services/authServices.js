import Api from 'src/middleware/api';

export const login = async (data) => {
  const res = await Api.auth.signIn(data);
  return res;
};

export const signup = async (data) => {
  const res = await Api.auth.signUp(data);
  return res;
};

export const forgotPassword = async (data) => {
  const res = await Api.auth.forgotPassword(data);
  return res;
};

export const resetPassword = async (data) => {
  const res = await Api.auth.resetPassword(data);
  return res;
};

export const verifyEmail = async (data) => {
  const res = await Api.auth.verifyEmail(data);
  return res;
};
