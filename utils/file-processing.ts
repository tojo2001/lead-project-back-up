import { getPreference } from "./get-preference";
import { generateNumericId } from "./id-generator";

export const mapColumnFn = {
  BYTEL: {
    mapColumnMASTER_BYTEL: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[33],
        is_internal: "true",
      };
    },

    mapColumnADM_DAKAR: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[28],
        is_internal: "true",
      };
    },

    mapColumnADM: (item: string[]) => {
      const Fournisseur_actuel = item?.[25];
      const Preference = item?.[17];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[19],
        "e-mail": item?.[20],
        TEL2: item?.[13],
        Fournisseur_actuel,
        CP: item?.[26],
        Depuis: item?.[14],
        Options: item?.[16],
        Preference: formatedPreference,
        time2call: "",
        Prix: item?.[37],
        Recherche: item?.[41],
        nom: item?.[39],
        prenom: item?.[40],
        Ville: "",
        utm_device: item?.[42],
        lead_device: item?.[43],
        operateur_mobile: item?.[38],
        is_internal: "true",
      };
    },

    mapColumnEUROCRM: (item: string[]) => {
      const Fournisseur_actuel = item?.[12];
      const Preference = item?.[36];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[20],
        "e-mail": item?.[30],
        TEL2: item?.[19],
        Fournisseur_actuel,
        CP: item?.[34],
        Depuis: item?.[27],
        Options: item?.[33],
        Preference: formatedPreference,
        time2call: "",
        Prix: item?.[43],
        Recherche: item?.[44],
        nom: "",
        prenom: "",
        Ville: "",
        utm_device: item?.[45],
        lead_device: "",
        operateur_mobile: item?.[53],
        is_internal: "true",
      };
    },

    mapColumnATLAS: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[28],
        is_internal: "true",
      };
    },

    mapColumnFEDALA: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[28],
        is_internal: "true",
      };
    },

    mapColumnMARINA: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[28],
        is_internal: "true",
      };
    },

    mapColumnVIPP: (item: string[]) => {
      const Fournisseur_actuel = item?.[13];
      const Preference = item?.[41];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[16],
        "e-mail": item?.[32],
        TEL2: item?.[17],
        Fournisseur_actuel,
        CP: item?.[18],
        Depuis: item?.[38],
        Options: item?.[39],
        Preference: formatedPreference,
        time2call: "",
        Prix: item?.[47],
        Recherche: "",
        nom: item?.[55],
        prenom: item?.[56],
        Ville: "",
        utm_device: item?.[52],
        lead_device: "",
        operateur_mobile: item?.[51],
        is_internal: "true",
      };
    },

    mapColumnWEBHELP: (item: string[]) => {
      const Fournisseur_actuel = item?.[17];
      const Preference = item?.[28];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[21],
        "e-mail": item?.[23],
        TEL2: item?.[20],
        Fournisseur_actuel: item?.[17],
        CP: item?.[26],
        Depuis: item?.[18],
        Options: item?.[25],
        Preference: formatedPreference,
        time2call: "",
        Prix: item?.[34],
        Recherche: item?.[43],
        nom: item?.[41],
        prenom: item?.[42],
        Ville: "",
        utm_device: item?.[43],
        lead_device: "",
        operateur_mobile: item?.[37],
        is_internal: "true",
      };
    },

    mapColumnALGER: (item: string[]) => {
      const Fournisseur_actuel = item?.[12];
      const Preference = item?.[20];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[14],
        "e-mail": item?.[15],
        TEL2: item?.[13],
        Fournisseur_actuel,
        CP: item?.[18],
        Depuis: item?.[16],
        Options: item?.[19],
        Preference: formatedPreference,
        time2call: "",
        Prix: item?.[28],
        Recherche: item?.[31],
        nom: item?.[32],
        prenom: item?.[33],
        Ville: "",
        utm_device: item?.[35],
        lead_device: item?.[34],
        operateur_mobile: item?.[29],
        is_internal: "true",
      };
    },
  },

  ORANGE: {
    /* DISCONTINUED */
    mapColumnARMATIS: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[22];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: "",
        Prix: item?.[25],
        Recherche: "",
        nom: "",
        prenom: "",
        Ville: "",
        utm_device: "",
        lead_device: "",
        operateur_mobile: "",
        is_internal: "true",
      };
    },
    /* DISCONTINUED */

    /* DISCONTINUED */
    mapColumnTUNIS: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: "",
        Prix: item?.[21],
        Recherche: "",
        nom: "",
        prenom: "",
        Ville: "",
        utm_device: "",
        lead_device: "",
        operateur_mobile: "",
        is_internal: "true",
      };
    },
    /* DISCONTINUED */

    mapColumnDPI: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[28],
        is_internal: "true",
      };
    },

    mapColumnKONECTA: (item: string[]) => {
      const Fournisseur_actuel = item?.[13];
      const Preference = item?.[44];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[22],
        "e-mail": item?.[23],
        TEL2: item?.[24],
        Fournisseur_actuel,
        CP: item?.[20],
        Depuis: item?.[16],
        Options: item?.[39],
        Preference: formatedPreference,
        time2call: "",
        Prix: item?.[46],
        Recherche: item?.[58],
        nom: item?.[59],
        prenom: item?.[60],
        Ville: "",
        utm_device: item?.[62],
        lead_device: "",
        operateur_mobile: item?.[53],
        is_internal: "true",
      };
    },

    mapColumnSATEL: (item: string[]) => {
      const Fournisseur_actuel = item?.[12];
      const Preference = item?.[22];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[15],
        "e-mail": item?.[15],
        TEL2: item?.[16],
        Fournisseur_actuel,
        CP: item?.[34],
        Depuis: item?.[27],
        Options: item?.[20],
        Preference: formatedPreference,
        time2call: "",
        Prix: item?.[33],
        Recherche: item?.[31],
        nom: item?.[25],
        prenom: item?.[26],
        Ville: "",
        utm_device: item?.[29],
        lead_device: "",
        operateur_mobile: item?.[39],
        is_internal: "true",
      };
    },

    mapColumnTERSEA: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[37],
        is_internal: "true",
      };
    },
  },

  SFR: {
    mapColumnMASTER_SFR: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[28],
        is_internal: "true",
      };
    },

    /* DISCONTINUED */
    mapColumnAFFINICIA: (item: string[]) => {
      const Fournisseur_actuel = item?.[20];
      const Preference = item?.[21];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[14],
        "e-mail": item?.[15],
        TEL2: item?.[12],
        Fournisseur_actuel,
        CP: item?.[13],
        Depuis: item?.[23],
        Options: item?.[22],
        Preference: formatedPreference,
        time2call: "",
        Prix: item?.[32],
        Recherche: item?.[35],
        nom: item?.[36],
        prenom: item?.[37],
        Ville: "",
        utm_device: item?.[39],
        lead_device: "",
        operateur_mobile: item?.[34],
        is_internal: "true",
      };
    },
    /* DISCONTINUED */

    /* DISCONTINUED */
    mapColumnK_SFR: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[28],
        is_internal: "true",
      };
    },
    /* DISCONTINUED */

    mapColumnRIGHTPLACE: (item: string[]) => {
      const Fournisseur_actuel = item?.[12];
      const Preference = item?.[22];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[17],
        "e-mail": item?.[18],
        TEL2: item?.[16],
        Fournisseur_actuel,
        CP: item?.[15],
        Depuis: item?.[13],
        Options: item?.[14],
        Preference: formatedPreference,
        time2call: "",
        Prix: item?.[29],
        Recherche: item?.[32],
        nom: item?.[33],
        prenom: item?.[34],
        Ville: "",
        utm_device: item?.[36],
        lead_device: item?.[35],
        operateur_mobile: item?.[31],
        is_internal: "true",
      };
    },

    mapColumnW_AGADIR: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[28],
        is_internal: "true",
      };
    },

    /* NOT OPERATIONEL YET */
    mapColumnW_DAKAR: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[28],
        is_internal: "true",
      };
    },
    /* NOT OPERATIONEL YET */

    mapColumnW_FES: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[28],
        is_internal: "true",
      };
    },

    mapColumnW_MARRAKECH: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[28],
        is_internal: "true",
      };
    },
  },

  FREE: {
    mapColumnPURPREMIUM: (item: string[]) => {
      const Fournisseur_actuel = item?.[15];
      const Preference = item?.[19];
      const formatedPreference = getPreference(Fournisseur_actuel, Preference);
      const ID = generateNumericId();

      return {
        id: ID,

        created_time: item?.[1],
        ad_id: ID,
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        email: item?.[12],
        "e-mail": item?.[13],
        TEL2: item?.[14],
        Fournisseur_actuel,
        CP: item?.[16],
        Depuis: item?.[17],
        Options: item?.[18],
        Preference: formatedPreference,
        time2call: item?.[20],
        Prix: item?.[21],
        Recherche: item?.[22],
        nom: item?.[23],
        prenom: item?.[24],
        Ville: item?.[25],
        utm_device: item?.[26],
        lead_device: item?.[27],
        operateur_mobile: item?.[28],
        is_internal: "true",
      };
    },
  },

  ENERGIE: {
    mapColumnADMTOTAL: (item: string[]) => {
      return {
        id: generateNumericId(),

        created_time: item?.[1],
        ad_id: item?.[2],
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        Offre: item?.[12],
        Chauffage: item?.[13],
        Fournisseur: item?.[14],
        montant: item?.[15],
        CP: item?.[16],
        Nom: item?.[17],
        Prenom: item?.[18],
        TEL2: item?.[19],
        Email: item?.[20],
        Ville: item?.[21],
        Adresse: item?.[22],
        street_address: item?.[23],
        city: item?.[24],
        Projet: item?.[25],
        Preference: item?.[26],
        is_internal: "true",
      };
    },

    mapColumnADMVATTENFALL: (item: string[]) => {
      return {
        id: generateNumericId(),

        created_time: item?.[1],
        ad_id: item?.[2],
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        Offre: item?.[12],
        Chauffage: item?.[13],
        Fournisseur: item?.[14],
        montant: item?.[15],
        CP: item?.[16],
        Nom: item?.[17],
        Prenom: item?.[18],
        TEL2: item?.[19],
        Email: item?.[20],
        Ville: item?.[21],
        Adresse: item?.[22],
        street_address: item?.[23],
        city: item?.[24],
        Projet: item?.[25],
        Preference: item?.[36],
        is_internal: "true",
      };
    },

    mapColumnAFFINICIATOTAL: (item: string[]) => {
      return {
        id: generateNumericId(),

        created_time: item?.[1],
        ad_id: item?.[2],
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        Offre: item?.[12],
        Chauffage: item?.[13],
        Fournisseur: item?.[14],
        montant: item?.[15],
        CP: item?.[16],
        Nom: item?.[17],
        Prenom: item?.[18],
        TEL2: item?.[19],
        Email: item?.[20],
        Ville: item?.[21],
        Adresse: item?.[22],
        street_address: item?.[23],
        city: item?.[24],
        Projet: item?.[33],
        Preference: item?.[38],
        is_internal: "true",
      };
    },

    mapColumnENGIE: (item: string[]) => {
      return {
        id: generateNumericId(),

        created_time: item?.[1],
        ad_id: item?.[2],
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        Offre: item?.[12],
        Chauffage: item?.[13],
        Fournisseur: item?.[14],
        montant: item?.[15],
        CP: item?.[16],
        Nom: item?.[17],
        Prenom: item?.[18],
        TEL2: item?.[19],
        Email: item?.[20],
        Ville: item?.[21],
        Adresse: item?.[22],
        street_address: item?.[23],
        city: item?.[24],
        Projet: item?.[32],
        Preference: item?.[36],
        is_internal: "true",
      };
    },

    mapColumnWEKIWI: (item: string[]) => {
      return {
        id: generateNumericId(),

        created_time: item?.[1],
        ad_id: item?.[2],
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        Offre: item?.[12],
        Chauffage: item?.[13],
        Fournisseur: item?.[14],
        montant: item?.[15],
        CP: item?.[16],
        Nom: item?.[17],
        Prenom: item?.[18],
        TEL2: item?.[19],
        Email: item?.[20],
        Ville: item?.[21],
        Adresse: item?.[22],
        street_address: item?.[23],
        city: item?.[24],
        Projet: item?.[25],
        Preference: item?.[36],
        is_internal: "true",
      };
    },

    mapColumnENI: (item: string[]) => {
      return {
        id: generateNumericId(),

        created_time: item?.[1],
        ad_id: item?.[2],
        ad_name: item?.[3],
        adset_id: item?.[4],
        adset_name: item?.[5],
        campaign_id: item?.[6],
        campaign_name: item?.[7],
        form_id: item?.[8],
        form_name: item?.[9],
        is_organic: item?.[10],
        platform: item?.[11],

        Offre: item?.[12],
        Chauffage: item?.[13],
        Fournisseur: item?.[14],
        montant: item?.[15],
        CP: item?.[16],
        Nom: item?.[17],
        Prenom: item?.[18],
        TEL2: item?.[19],
        Email: item?.[20],
        Ville: item?.[21],
        Adresse: item?.[22],
        street_address: item?.[23],
        city: item?.[24],
        Projet: item?.[33],
        Preference: item?.[34],
        is_internal: "true",
      };
    },
  },
};
