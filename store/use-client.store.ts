import { create } from "zustand";

type Store = {
  client: string | null;
  setClient: (value: string | null) => void;
};

export const useClientStore = create<Store>()((set) => ({
  client: null,
  setClient: (value) => {
    set((state) => ({
      ...state,
      client: value,
    }));
  },
}));
