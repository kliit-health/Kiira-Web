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

export const cancelUserSubscription = async (id) => {
  const res = await Api.payment.cancelSubscription(id);
  return res;
};

export const viewSavedCards = async () => {
  const res = await Api.payment.viewSavedCards();
  return res;
};
export const deleteSavedCards = async () => {
  const res = await Api.payment.deleteSavedCards();
  return res;
};
