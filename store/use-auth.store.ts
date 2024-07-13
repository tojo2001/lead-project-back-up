import { create } from "zustand";

type Store = {
  authToken: string | null;
  setAuthToken: (value: string) => void;
};

export const useAuthStore = create<Store>()((set) => ({
  authToken: null,
  setAuthToken: (value) => {
    set((state) => ({
      ...state,
      authToken: value,
    }));
  },
}));
