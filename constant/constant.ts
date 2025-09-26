export const LEAD_SEPARATOR = ";";
export const LEAD_DEVIDER = "\n";
export const UPDATE_KEY = "LEAD-PROJECT:UPDATE_KEY";

export const CLIENTS: {
  section: string;
  campagne: {
    name: string;
    key: TClients;
  }[];
}[] = [
  {
    section: "BYTEL",
    campagne: [
      {
        name: "MASTER BYTEL",
        key: "MASTER BYTEL",
      },
      {
        name: "ADM DAKAR",
        key: "ADM DAKAR",
      },
      {
        name: "ADM OUDJA",
        key: "ADM",
      },
      {
        name: "EUROCRM FIBRE",
        key: "EUROCRM",
      },
      {
        name: "EUROCRM MADA",
        key: "EUROCRM MADA",
      },
      {
        name: "ATLAS",
        key: "ATLAS",
      },
      {
        name: "FEDALA",
        key: "FEDALA",
      },
      {
        name: "MARINA",
        key: "MARINA",
      },
      {
        name: "VIPP",
        key: "VIPP",
      },
      {
        name: "WEBHELP",
        key: "WEBHELP",
      },
      {
        name: "ALGER",
        key: "ALGER",
      },
      {
        name: "QUALITY CENTER",
        key: "QUALITY CENTER",
      },
    ],
  },

  {
    section: "ORANGE",
    campagne: [
      {
        name: "ARMATIS",
        key: "ARMATIS",
      },
      {
        name: "DPI",
        key: "DPI",
      },
      {
        name: "KONECTA",
        key: "KONECTA",
      },
      {
        name: "SATEL",
        key: "SATEL",
      },
      {
        name: "TERSEA",
        key: "TERSEA",
      },
      {
        name: "CASABLANCA",
        key: "CASABLANCA",
      },
    ],
  },

  {
    section: "SFR",
    campagne: [
      {
        name: "MASTER SFR",
        key: "MASTER SFR",
      },
      {
        name: "AFFINICIA",
        key: "AFFINICIA",
      },
      {
        name: "K-SFR",
        key: "K SFR",
      },
      {
        name: "RIGHTPLACE",
        key: "RIGHTPLACE",
      },
      {
        name: "QUALITY CENTER SFR",
        key: "QC SFR",
      },
      {
        name: "AGADIR",
        key: "W AGADIR",
      },
      {
        name: "DAKAR",
        key: "W DAKAR",
      },
      {
        name: "FES",
        key: "W FES",
      },
      {
        name: "MARRAKECH",
        key: "W MARRAKECH",
      },
    ],
  },

  {
    section: "FREE",
    campagne: [
      {
        name: "PUREPREMIUM",
        key: "PUREPREMIUM",
      },
      {
        name: "PRATIPS",
        key: "PRATIPS",
      },
      {
        name: "VIPP FREE",
        key: "VIPP FREE",
      },
    ],
  },

  // No type MERE
  {
    section: "ENERGIE",
    campagne: [
      {
        key: "ADM TOTAL",
        name: "ADM TOTAL",
      },
      {
        key: "ADM VATTENFALL",
        name: "ADM VATTENFALL",
      },
      {
        key: "AFFINICIA TOTAL",
        name: "AFFINICIA TOTAL",
      },
      {
        key: "ENGIE",
        name: "ENGIE",
      },
      {
        key: "WEKIWI",
        name: "WEKIWI",
      },
      {
        key: "ENI",
        name: "ENI",
      },
    ],
  },
];
