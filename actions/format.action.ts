"use server";

import { LEAD_SEPARATOR, LEAD_DEVIDER } from "@/constant/constant";
import {
  mapColumnADM,
  mapColumnVIPP,
  mapColumnEUROCRM,
  mapColumnAFFINICIA,
} from "@/utils/traitement-fichier";

export async function formatAction(key: TClients, leads: string) {
  const leadsArray = leads
    .replaceAll(",", ".")
    .split(LEAD_DEVIDER)
    .filter((i) => i != "")
    .map((str) => str.replace(/\n/g, ""));

  switch (key) {
    case "ADM":
      return leadsArray.map((lead) => mapColumnADM(lead.split(LEAD_SEPARATOR)));

    case "VIPP":
      return leadsArray.map((lead) =>
        mapColumnVIPP(lead.split(LEAD_SEPARATOR))
      );

    case "EUROCRM":
      return leadsArray.map((lead) =>
        mapColumnEUROCRM(lead.split(LEAD_SEPARATOR))
      );

    case "AFFINICIA":
      return leadsArray.map((lead) =>
        mapColumnAFFINICIA(lead.split(LEAD_SEPARATOR))
      );

    default:
      return null;
  }
}
