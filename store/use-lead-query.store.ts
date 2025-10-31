import { create } from "zustand";

export type TDateParts = {
  $dateFromParts: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    timezone: string;
  };
};

export type TDateRange = {
  startDate: TDateParts;
  endDate: TDateParts;
};

export type TCondition = "EQUAL" | "NOT_EQUAL";

export type TCriteriaParameters = Record<
  string,
  {
    condition: TCondition;
    options: TOptions[];
  }
>;

export type TOptions = {
  name: string;
  key: string;
};

export type TColumn = {
  name: string;
  key: string;
  options?: TOptions[];
};

export const criteriaColumns: TColumn[] = [
  {
    name: "Fournisseur",
    key: "fournisseur",
    options: [
      { name: "Bouygues Télécom", key: "bouygues" },
      { name: "Orange / Sosh", key: "orange|sosh" },
      { name: "FREE", key: "free" },
      { name: "SFR / RED", key: "sfr|red" },
      { name: "Autre", key: "autre" },
      { name: "Aucun", key: "aucun" },
    ],
  },
  {
    name: "Preference",
    key: "preference",
    options: [
      { name: "Bouygues Télécom", key: "bouygues" },
      { name: "Orange / Sosh", key: "orange|sosh" },
      { name: "FREE", key: "free" },
      { name: "SFR / RED", key: "sfr|red" },
      { name: "La moins chère", key: "moins" },
      { name: "Le meilleur débit", key: "débit" },
      { name: "La plus fiable", key: "fiable" },
      { name: "La plus rapide", key: "rapide" },
      { name: "Sans Engagement", key: "sans" },
      { name: "Autre", key: "autre" },
      { name: "Aucun", key: "aucun" },
    ],
  },
  {
    name: "Operateur Mobile",
    key: "operator_mobile",
    options: [
      { name: "Bouygues Télécom", key: "bouygues" },
      { name: "Free Mobile", key: "free" },
      { name: "Orange", key: "orangeh" },
      { name: "SFR", key: "sfr" },
    ],
  },
  {
    name: "Form name",
    key: "form_name",
  },
  {
    name: "Platform",
    key: "platform",
    options: [
      { name: "Google", key: "lb" },
      { name: "Facebook", key: "fb" },
      { name: "Instagram", key: "ig" },
      { name: "TikTok", key: "tk" },
      { name: "SMS", key: "sms" },
    ],
  },
  {
    name: "Recherche",
    key: "utm_term",
  },
  {
    name: "Prix",
    key: "price",
    options: [
      { name: "De 25 € 45€", key: "25" },
      { name: "Moins de 25€", key: "moins" },
      { name: "none", key: "none" },
      { name: "Plus de 45€", key: "45" },
      { name: "Plus de 60€", key: "60" },
    ],
  },
  {
    name: "Nom",
    key: "nom",
    options: [
      { name: "empty", key: "" },
      { name: "inconnu", key: "inconnu" },
    ],
  },
  {
    name: "Prenom",
    key: "prenom",
    options: [
      { name: "empty", key: "" },
      { name: "inconnu", key: "inconnu" },
    ],
  },
];

type Store = {
  // request URI
  isRequestURIMode: boolean;
  requestURI: string;
  setisRequestURIMode: (value: boolean) => void;
  setRequestURI: (URI: string) => void;
  resetrequestURI: () => void;

  // code mode
  isCodeMode: boolean;
  codeResult: any;
  setIsCodeMode: (value: boolean) => void;
  setCodeResult: (code: any) => void;
  resetCodeMode: () => void;

  // date range
  dateRange: TDateRange | null;
  setDateRange: (startDate: TDateParts, endDate: TDateParts) => void;
  resetDateRange: () => void;

  // column
  selectedColumns: string[];
  setSelectedColumns: (columnKey: string, onAdd: boolean) => void;
  setColumnCondition: (columnKey: string, condition: TCondition) => void;
  resetSelectedColumns: () => void;

  // criteria parameters
  criteriaParameters: TCriteriaParameters;
  setCriteriaParameters: (
    criteriaKey: string,
    optionValue: { name: string; key: string },
    onAdd: boolean
  ) => void;
  resetCriteriaParameters: () => void;
};

export const useLeadQueryStore = create<Store>()((set, get) => ({
  //request URI
  isRequestURIMode: false,
  requestURI: "",
  setisRequestURIMode: (value) => {
    set({
      isRequestURIMode: value,
    });
  },
  setRequestURI: (URI) => {
    set({
      requestURI: URI,
    });
  },
  resetrequestURI: () => {
    set({
      isRequestURIMode: false,
      requestURI: "",
    });
  },

  // code mode
  isCodeMode: false,
  codeResult: "",

  setIsCodeMode: (value) => {
    set({
      isCodeMode: value,
    });

    if (value) {
      get().resetCriteriaParameters();
      get().resetSelectedColumns();
    } else {
      get().setCodeResult("");
    }
  },

  setCodeResult: (code) => {
    set({
      codeResult: code,
    });
  },

  resetCodeMode: () => {
    set({
      isCodeMode: false,
      codeResult: "",
    });
  },

  // date range
  dateRange: null,

  setDateRange: (startDate, endDate) => {
    set({
      dateRange: {
        ...get().dateRange,
        startDate,
        endDate,
      },
    });
  },

  resetDateRange: () => {
    set({
      dateRange: null,
    });
  },

  // column
  selectedColumns: [],

  setSelectedColumns: (columnKey, onAdd) => {
    set({
      selectedColumns: onAdd
        ? [...get().selectedColumns, columnKey]
        : get().selectedColumns.filter((v) => v !== columnKey),
      criteriaParameters: onAdd
        ? {
            ...get().criteriaParameters,
            [columnKey]: {
              condition: "EQUAL",
              options: [],
            },
          }
        : Object.fromEntries(
            Object.entries(get().criteriaParameters).filter(
              ([key]) => key !== columnKey
            )
          ),
    });
  },

  setColumnCondition: (columnKey, condition) => {
    set({
      criteriaParameters: {
        ...get().criteriaParameters,
        [columnKey]: {
          ...get().criteriaParameters[columnKey],
          condition,
        },
      },
    });
  },

  resetSelectedColumns: () => {
    set({
      selectedColumns: [],
    });
  },

  // criteria parameters
  criteriaParameters: {},

  setCriteriaParameters: (criteriaKey, optionValue, onAdd) => {
    // handle null safely
    const safeCriteriaParameters = get().criteriaParameters ?? {};

    if (onAdd) {
      const existing = safeCriteriaParameters[criteriaKey] ?? {
        condition: "EQUAL",
        options: [],
      };

      const alreadyExists = existing.options.some(
        (item) => item.key === optionValue.key
      );

      set({
        criteriaParameters: {
          ...get().criteriaParameters,
          [criteriaKey]: {
            ...existing,
            options:
              criteriaKey === "nom" || criteriaKey === "prenom"
                ? [optionValue]
                : alreadyExists
                ? existing.options.filter((v) => v !== optionValue)
                : [...existing.options, optionValue],
            condition:
              get().criteriaParameters[criteriaKey].condition || "EQUAL",
          },
        },
      });
    } else {
      const existing = safeCriteriaParameters[criteriaKey];
      if (!existing) return { ...get().criteriaParameters };

      set({
        criteriaParameters: {
          ...safeCriteriaParameters,
          [criteriaKey]: {
            ...safeCriteriaParameters[criteriaKey],
            options: safeCriteriaParameters[criteriaKey].options.filter(
              (opt) => opt.key !== optionValue.key
            ),
          },
        },
      });
    }
  },

  resetCriteriaParameters: () => {
    set({
      criteriaParameters: {},
    });
  },
}));
