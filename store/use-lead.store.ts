import { create } from "zustand";

type Store = {
  leadData: {
    asArray: IDataContact[] | null;
    asCSVText: string | null;
    phoneNumber: string[];
  };
  setLead: (
    leadArray: IDataContact[],
    leadText: string,
    phoneNumber: string[]
  ) => void;
  resetLead: () => void;
};

export const useLeadStore = create<Store>()((set) => ({
  leadData: {
    asArray: [],
    asCSVText: "",
    phoneNumber: [],
  },

  setLead: (leadArray, leadText, phoneNumber) => {
    set((state) => ({
      ...state,
      leadData: {
        ...state.leadData,
        asArray: leadArray,
        asCSVText: leadText,
        phoneNumber: phoneNumber,
      },
    }));
  },

  resetLead: () => {
    set((state) => ({
      ...state,
      leadData: {
        asArray: [],
        asCSVText: "",
        phoneNumber: [],
      },
    }));
  },
}));
