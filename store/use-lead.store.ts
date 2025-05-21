import { create } from "zustand";

type Store = {
  leadData: {
    asArray: IDataContact[] | null;
    asCSVText: string | null;
    phoneNumber: string[];
  };
  filteredLeadData: {
    asArray: IDataContact[] | null;
    asCSVText: string | null;
    phoneNumber: string[];
  } | null;
  setLead: (
    leadArray: IDataContact[],
    leadText: string,
    phoneNumber: string[]
  ) => void;
  setFilterLead: (
    leadArray: IDataContact[],
    leadText: string,
    phoneNumber: string[]
  ) => void;
  resetLead: () => void;
  resetFilterLead: () => void;
};

export const useLeadStore = create<Store>()((set) => ({
  leadData: {
    asArray: [],
    asCSVText: "",
    phoneNumber: [],
  },

  filteredLeadData: null,

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

  setFilterLead: (leadArray, leadText, phoneNumber) => {
    set((state) => ({
      ...state,
      filteredLeadData: {
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
      filteredLeadData: null,
    }));
  },

  resetFilterLead: () => {
    set((state) => ({
      ...state,
      filteredLeadData: null,
    }));
  },
}));
