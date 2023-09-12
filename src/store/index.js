import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      email: '',
      setStoredEmail: (email) => set(() => ({ email: email })),
      bookingData: {},
      getStoredBookingCheckout: () => set((state) => state.bookingData),
      setStoredBookingCheckout: (data) => set(() => ({ bookingData: data })),
      storedData: {},
      setStoredData: (data) => set(() => ({ storedData: data })),
      googleAuthScriptLoaded: false,
      setGoogleAuthScriptLoaded: (data) => set(() => ({ googleAuthScriptLoaded: data })),
      coupon: '',
      setCoupon: (data) => set(() => ({ coupon: data })),
      selectedPaymentMethod: {},
      setSelectedPaymentMethod: (data) => set(() => ({ selectedPaymentMethod: data })),
      isLoading: false,
      setIsLoading: (data) => set(() => ({ isLoading: data }))
    }),
    {
      name: 'local-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export const useLocalStore = useStore;
