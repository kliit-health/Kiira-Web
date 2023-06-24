import { create } from 'zustand';

const useStore = create((set) => ({
  email: '',
  bookingData: {},
  getStoredEmail: () => set((state) => state.email),
  getStoredBookingCheckout: () => set((state) => state.bookingData),
  setStoredEmail: (email) => set(() => ({ email: email })),
  setStoredBookingCheckout: (data) => set(() => ({ bookingData: data }))
}));

export const useLocalStore = useStore;
