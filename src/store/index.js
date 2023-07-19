import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      email: '',
      getStoredEmail: () => set((state) => state.email),
      setStoredEmail: (email) => set(() => ({ email: email })),
      bookingData: {},
      getStoredBookingCheckout: () => set((state) => state.bookingData),
      setStoredBookingCheckout: (data) => set(() => ({ bookingData: data })),
      storedData: {},
      getStoredData: () => set((state) => state.storedData),
      setStoredData: (data) => set(() => ({ storedData: data }))
    }),
    {
      name: 'local-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export const useLocalStore = useStore;
