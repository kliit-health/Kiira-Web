import { create } from 'zustand';

const useStore = create((set) => ({
  email: '',
  getStoredEmail: () => set((state) => state.email),
  setStoredEmail: (email) => set(() => ({ email: email }))
}));

export const useLocalStore = useStore;
