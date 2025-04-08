type TSection = "BYTEL" | "ORANGE" | "SFR" | "FREE" | "ENERGIE";

type TClients =
  // BYTEL
  | "MASTER BYTEL"
  | "ADM DAKAR"
  | "ADM"
  | "EUROCRM"
  | "EUROCRM MADA"
  | "ATLAS"
  | "FEDALA"
  | "MARINA"
  | "VIPP"
  | "WEBHELP"
  | "ALGER"

  // ORANGE
  | "ARMATIS" /* DISCONTINUED */
  | "TUNIS" /* DISCONTINUED */
  | "DPI"
  | "KONECTA"
  | "SATEL"
  | "TERSEA"

  // SFR
  | "MASTER SFR"
  | "AFFINICIA" /* DISCONTINUED */
  | "K SFR"
  | "RIGHTPLACE"
  | "W AGADIR"
  | "W DAKAR"
  | "W FES"
  | "W MARRAKECH"

  // FREE
  | "PUREPREMIUM"

  // ENERGIE: No type MERE
  | "ADM TOTAL"
  | "ADM VATTENFALL"
  | "AFFINICIA TOTAL"
  | "ENGIE"
  | "WEKIWI"
  | "ENI";

interface IDataContact {
  id: string;
  created_time: string;
  ad_id: string;
  ad_name: string;
  adset_id: string;
  adset_name: string;
  campaign_id: string;
  campaign_name: string;
  form_id: string;
  form_name: string;
  is_organic: string;
  platform: string;
  email: string;
  "e-mail": string;
  TEL2: string;
  Fournisseur_actuel: string;
  CP: string;
  Depuis: string;
  Options: string;
  Preference: string;
  time2call: string;
  Prix: string;
  Recherche: string;
  nom: string;
  prenom: string;
  Ville: string;
  utm_device: string;
  lead_device: string;
  operateur_mobile: string;
  is_internal: string;
}

type TMere = "mere1" | "mere2" | "mere3";
