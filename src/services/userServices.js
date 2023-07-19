import Api from 'src/middleware/api';

export const fetchUserProfile = async () => {
  const res = await Api.user.getProfile();
  return res;
};

export const planSubscription = async (data) => {
  const res = await Api.payment.subscribe(data);
  return res;
};

export const fetchSubscriptionHistory = async () => {
  const res = await Api.payment.subscriptionHistory();
  return res;
};
