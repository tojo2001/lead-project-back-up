import { dataToCSVFormat } from "@/utils/data-to-csv-format";
import { CheckedState } from "@radix-ui/react-checkbox";
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
  selectedLead: string[];
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
  removeLead: (leadID: string | string[]) => void;
  onSelectLead: (
    CheckedState: CheckedState,
    id: string,
    isAll?: boolean
  ) => void;
};

export const useLeadStore = create<Store>()((set, get) => ({
  leadData: {
    asArray: [],
    asCSVText: "",
    phoneNumber: [],
  },

  filteredLeadData: null,

  selectedLead: [],

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

  removeLead: (leadId: string | string[]) => {
    const newFilteredLeadData =
      (typeof leadId == "string"
        ? get().leadData.asArray?.filter((lead) => lead.id != leadId)
        : get().leadData.asArray?.filter(
            (lead) => !leadId.includes(lead.id)
          )) ?? null;

    // get phone number
    const phoneNumbers = (newFilteredLeadData ?? []).map((leads) => leads.TEL2);

    // get leads as csv text
    const leadAsCSVText = dataToCSVFormat(newFilteredLeadData) ?? "";

    get().setLead(newFilteredLeadData ?? [], leadAsCSVText, phoneNumbers);

    if (!!get().filteredLeadData) {
      get().setFilterLead(
        newFilteredLeadData ?? [],
        leadAsCSVText,
        phoneNumbers
      );
    }

    set((state) => ({
      ...state,
      selectedLead: [],
    }));
  },

  onSelectLead: (
    CheckedState: CheckedState,
    id: string,
    isAll: boolean = false
  ) => {
    if (isAll) {
      const idLeads =
        (!!get().filteredLeadData
          ? get().filteredLeadData!.asArray?.map((lead) => lead.id)
          : get().leadData.asArray?.map((lead) => lead.id)) || [];

      set((state) => ({
        ...state,
        selectedLead: CheckedState == true ? idLeads : [],
      }));
      return;
    }

    set((state) => ({
      ...state,
      selectedLead:
        CheckedState == true
          ? [...state.selectedLead, id]
          : state.selectedLead.filter((p) => p != id),
    }));
  },
}));
