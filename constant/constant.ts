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

export const CAMPAGNES_LIST: {
  category: string;
  campagnes: {
    id: number;
    db_id: string;
    entity_id: string;
    campaign_setting_id: string;
    campagne_name: string;
  }[];
}[] = [
  {
    category: "BYTEL",
    campagnes: [
      {
        id: 1,
        entity_id: "65e594d13f2664d023ff32d0",
        campaign_setting_id: "65e59a8a3f2664d0230cf914",
        db_id: "65e594d13f2664d023ff32d0",
        campagne_name: "A - Master : Bytel",
      },
      {
        id: 2,
        entity_id: "641d73a5496a85ded6474ea4",
        campaign_setting_id: "641d79867d1e8c8452bf3a56",
        db_id: "641d73269a0c8a5ace3d1648",
        campagne_name: "ADM Value : Oujda",
      },
      {
        id: 3,
        entity_id: "61950213283620ab3c64c8ea",
        campaign_setting_id: "61a4d9c30351147869c0ab58",
        db_id: "615f063a834b1b33699128f2",
        campagne_name: "EURO CRM : FIBRE",
      },
      {
        id: 4,
        entity_id: "616d32b53b081da38cb53fd8",
        campaign_setting_id: "66447186a635a6acff0f3986",
        db_id: "616d32b53b081da38cb53fd8",
        campagne_name: "Konecta : ATLAS Bytel",
      },
      {
        id: 5,
        entity_id: "616d32b53b081da38cb53fd8",
        campaign_setting_id: "66471132c24e5493dcbd6bb1",
        db_id: "616d32b53b081da38cb53fd8",
        campagne_name: "Konecta : FEDALA Bytel",
      },
      {
        id: 6,
        entity_id: "616d32b53b081da38cb53fd8",
        campaign_setting_id: "66470f29e941911c2bf62582",
        db_id: "616d32b53b081da38cb53fd8",
        campagne_name: "Konecta : MARINA Bytel",
      },
      {
        id: 7,
        entity_id: "65a031b06032552f6a7560c3",
        campaign_setting_id: "65a035e1f0380f774b9e68e1",
        db_id: "65a02f696d71a5f04e060b24",
        campagne_name: "QualityCenter : Fibre",
      },
      {
        id: 8,
        entity_id: "625ff137c6582382e90dfa76",
        campaign_setting_id: "627539009c753d8ff13869af",
        db_id: "62013fbcaa59c573dfb99678",
        campagne_name: "VIPP : BytelFibre",
      },
      {
        id: 9,
        entity_id: "638f3eea0b6ec17f3477de46",
        campaign_setting_id: "638f46a1ba625e6dd3acdbc2",
        db_id: "638f3d590b6ec17f3477bd68",
        campagne_name: "Webhelp : Fibre",
      },
      {
        id: 10,
        entity_id: "638f3eea0b6ec17f3477de46",
        campaign_setting_id: "65143f30d660b24ac2af8fca",
        db_id: "638f3d590b6ec17f3477bd68",
        campagne_name: "Webhelp : Fibre Alger",
      },
    ],
  },
  {
    category: "ORANGE",
    campagnes: [
      {
        id: 11,
        entity_id: "646b47bbde26dc92b32689da",
        campaign_setting_id: "659c26baf0380f774b60cd66",
        db_id: "646b4741de6aceee42f9cb44",
        campagne_name: "Armatis : Fibre",
      },
      {
        id: 12,
        entity_id: "646b47bbde26dc92b32689da",
        campaign_setting_id: "663778cef742f2ed82860a0f",
        db_id: "646b4741de6aceee42f9cb44",
        campagne_name: "Armatis : Tunis",
      },
      {
        id: 13,
        entity_id: "65e87b3dd500b9de64ff2796",
        campaign_setting_id: "65e8822380628423e94cc2a2",
        db_id: "65e87b3dd500b9de64ff2796",
        campagne_name: "DPI : ORANGE",
      },
      {
        id: 14,
        entity_id: "616d32b53b081da38cb53fd8",
        campaign_setting_id: "63284398ac435c148fcee92a",
        db_id: "616d32b53b081da38cb53fd8",
        campagne_name: "Konecta : Fibre Orange",
      },
      {
        id: 15,
        entity_id: "63453a102a4d0592b628d7d5",
        campaign_setting_id: "63453b7eb16c6620b034b589",
        db_id: "63453a102a4d0592b628d7d5",
        campagne_name: "Satel : Orange",
      },
      {
        id: 16,
        entity_id: "6630b220d203cb96a1dde30a",
        campaign_setting_id: "6630b79a4e41633b3b7991c9",
        db_id: "6630b220d203cb96a1dde30a",
        campagne_name: "TERSEA : ORANGE",
      },
      {
        id: 17,
        entity_id: "6630b220d203cb96a1dde30a",
        campaign_setting_id: "68371133d5260a9151aa584d",
        db_id: "6630b220d203cb96a1dde30a",
        campagne_name: "TERSEA : ORANGE CASABLANCA",
      },
    ],
  },
  {
    category: "SFR",
    campagnes: [
      {
        id: 18,
        entity_id: "65e594d13f2664d023ff32d0",
        campaign_setting_id: "676d5e856d4695bbffe33492",
        db_id: "65e594d13f2664d023ff32d0",
        campagne_name: "A - Master : SFR",
      },
      {
        id: 19,
        entity_id: "64b6bbe86d26b8055c8fea8b",
        campaign_setting_id: "64b6bda276455355ea5a9052",
        db_id: "64b6bbe86d26b8055c8fea8b",
        campagne_name: "Affinicia : Fibre",
      },
      {
        id: 20,
        entity_id: "616d32b53b081da38cb53fd8",
        campaign_setting_id: "6695f03c1f7dcd544b248925",
        db_id: "616d32b53b081da38cb53fd8",
        campagne_name: "Konecta : SFR",
      },
      {
        id: 21,
        entity_id: "65a031b06032552f6a7560c3",
        campaign_setting_id: "68627e72450002511059f62a",
        db_id: "65a02f696d71a5f04e060b24",
        campagne_name: "QualityCenter : SFR",
      },
      {
        id: 22,
        entity_id: "638f3eea0b6ec17f3477de46",
        campaign_setting_id: "67075f9b6009e982d14fe496",
        db_id: "638f3d590b6ec17f3477bd68",
        campagne_name: "Webhelp : SFR AGADIR",
      },
      {
        id: 23,
        entity_id: "638f3eea0b6ec17f3477de46",
        campaign_setting_id: "67093f8e19625386fe40b9ed",
        db_id: "638f3d590b6ec17f3477bd68",
        campagne_name: "Webhelp : SFR DAKAR",
      },
      {
        id: 24,
        entity_id: "638f3eea0b6ec17f3477de46",
        campaign_setting_id: "67093ca5ae6fc9e93a953da2",
        db_id: "638f3d590b6ec17f3477bd68",
        campagne_name: "Webhelp : SFR FES",
      },
      {
        id: 25,
        entity_id: "638f3eea0b6ec17f3477de46",
        campaign_setting_id: "67094269ae6fc9e93a9ece97",
        db_id: "638f3d590b6ec17f3477bd68",
        campagne_name: "Webhelp : SFR MARRAKECH",
      },
    ],
  },
  {
    category: "FREE",
    campagnes: [
      {
        id: 26,
        entity_id: "67bd8b454008764f330270c6",
        campaign_setting_id: "67bd8e1b4008764f3318daaf",
        db_id: "67bd8b454008764f330270c6",
        campagne_name: "Puremium : Fibre Free",
      },
      {
        id: 27,
        entity_id: "67bd8b454008764f330270c6",
        campaign_setting_id: "68d24e5b8960d28d809cd5f6",
        db_id: "67bd8b454008764f330270c6",
        campagne_name: "Puremium : Pratips Fibre Free",
      },
      {
        id: 28,
        entity_id: "64f1a1291577d2bf0508952c",
        campaign_setting_id: "64f1a1c872005d4c7999c957",
        db_id: "62013fbcaa59c573dfb99678",
        campagne_name: "VIPP : FREE",
      },
    ],
  },
  {
    category: "ENERGIE",
    campagnes: [
      {
        id: 29,
        entity_id: "661e9b1b2905730c24d1dfe2",
        campaign_setting_id: "666c3398f2379bca2bb10837",
        db_id: "641d73269a0c8a5ace3d1648",
        campagne_name: "ADM Value : TOTAL",
      },
      {
        id: 30,
        entity_id: "661e9b1b2905730c24d1dfe2",
        campaign_setting_id: "661e9d279f40aa0990a67fbc",
        db_id: "641d73269a0c8a5ace3d1648",
        campagne_name: "ADM Value : VattenFall",
      },
      {
        id: 31,
        entity_id: "67d0020ee36c266ade953a9b",
        campaign_setting_id: "67d0043bf054a7f57cd3ac22",
        db_id: "67d0020ee36c266ade953a9b",
        campagne_name: "ALPIQ : Energie",
      },
      {
        id: 32,
        entity_id: "64b6bbe86d26b8055c8fea8b",
        campaign_setting_id: "66ace428167a19f93acb7931",
        db_id: "64b6bbe86d26b8055c8fea8b",
        campagne_name: "Affinicia : Total Tunis",
      },
      {
        id: 33,
        entity_id: "65b005792d2cd821ed8df90e",
        campaign_setting_id: "68502a91a85fe0dbb814f34d",
        db_id: "615f063a834b1b33699128f2",
        campagne_name: "EURO CRM : ENGIE PURE",
      },
      {
        id: 34,
        entity_id: "65b005792d2cd821ed8df90e",
        campaign_setting_id: "684fe5bf4d51d6d725559353",
        db_id: "615f063a834b1b33699128f2",
        campagne_name: "EURO CRM : ENGIE TUNIS",
      },
      {
        id: 35,
        entity_id: "67e11feb9d588d11337adbf0",
        campaign_setting_id: "67e137a48909afa89783eab0",
        db_id: "615f063a834b1b33699128f2",
        campagne_name: "EURO CRM : Engie Lisieux",
      },
      {
        id: 36,
        entity_id: "65b005792d2cd821ed8df90e",
        campaign_setting_id: "65b008100d07be55a63a66af",
        db_id: "615f063a834b1b33699128f2",
        campagne_name: "EURO CRM : Engie Maurice",
      },
      {
        id: 37,
        entity_id: "67e11feb9d588d11337adbf0",
        campaign_setting_id: "67e121b82863c11bda204b07",
        db_id: "615f063a834b1b33699128f2",
        campagne_name: "EURO CRM : Total",
      },
      {
        id: 38,
        entity_id: "67c072867168ed9fdf2a27de",
        campaign_setting_id: "67c07702cf46a1308a52baf2",
        db_id: "67c072867168ed9fdf2a27de",
        campagne_name: "Optiwin : Energie",
      },
      {
        id: 39,
        entity_id: "67bd8b454008764f330270c6",
        campaign_setting_id: "68dcdb0f9b3029b3c2189e54",
        db_id: "67bd8b454008764f330270c6",
        campagne_name: "Puremium : Pratips Energie",
      },
      {
        id: 40,
        entity_id: "64eedf893f169c751c726c52",
        campaign_setting_id: "64eee0643f169c751c7281bd",
        db_id: "62013fbcaa59c573dfb99678",
        campagne_name: "VIPP : ENI",
      },
    ],
  },
  {
    category: "MUTUELLE",
    campagnes: [
      {
        id: 41,
        entity_id: "63a1d39c2a3244f429838db9",
        campaign_setting_id: "63a1d4072a3244f429845a8e",
        db_id: "63a1b9f3875dcc2e535ea7d4",
        campagne_name: "Filiassur : Santé",
      },
      {
        id: 42,
        entity_id: "67e101689d588d1133c7e19f",
        campaign_setting_id: "67e103089d588d1133cf8d0b",
        db_id: "67e101689d588d1133c7e19f",
        campagne_name: "Finaxy : Animal",
      },
      {
        id: 43,
        entity_id: "63e0fb3ffc1dd4868d071194",
        campaign_setting_id: "63e10e7ffc1dd4868d3f305b",
        db_id: "63e0fb3ffc1dd4868d071194",
        campagne_name: "HD LEADS : AssurOPoil",
      },
      {
        id: 44,
        entity_id: "63e0fb3ffc1dd4868d071194",
        campaign_setting_id: "6604444b3c275ff7c5a791a0",
        db_id: "63e0fb3ffc1dd4868d071194",
        campagne_name: "HD LEADS : Assuropoil Belgique",
      },
      {
        id: 45,
        entity_id: "63e0fb3ffc1dd4868d071194",
        campaign_setting_id: "67ac6a129a0fe0bad492e00c",
        db_id: "63e0fb3ffc1dd4868d071194",
        campagne_name: "HD LEADS : MER / AGENT IA",
      },
      {
        id: 46,
        entity_id: "660bc372fe4a1980abf5462e",
        campaign_setting_id: "660bc4cc0217b57d8e42f9c4",
        db_id: "660bc372fe4a1980abf5462e",
        campagne_name: "Malakoff : Humanis",
      },
    ],
  },
  {
    category: "ESPAGNE",
    campagnes: [
      {
        id: 47,
        entity_id: "64b6bbe86d26b8055c8fea8b",
        campaign_setting_id: "66bb0d52da7e45110bc9c42c",
        db_id: "64b6bbe86d26b8055c8fea8b",
        campagne_name: "Affinicia : Espagne",
      },
    ],
  },
  {
    category: "DIVERS",
    campagnes: [
      {
        id: 48,
        entity_id: "66cc6d402246c3cb2c0570f6",
        campaign_setting_id: "66cd84d26753d1bdb1691328",
        db_id: "66cc6d402246c3cb2c0570f6",
        campagne_name: "Ensio : Panneaux Solaires",
      },
      {
        id: 49,
        entity_id: "6481d1c07806861af3123f4d",
        campaign_setting_id: "6481df257806861af31eab33",
        db_id: "6481c8787806861af30b5173",
        campagne_name: "Proformation : Leads",
      },
      {
        id: 50,
        entity_id: "67c8615b300c06426c314ab4",
        campaign_setting_id: "67c86685791a425c6925601f",
        db_id: "67c8615b300c06426c314ab4",
        campagne_name: "Renovation - énergétique",
      },
    ],
  },
];
