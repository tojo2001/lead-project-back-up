"use server";

import { LEAD_SEPARATOR, LEAD_DEVIDER } from "@/constant/constant";
import { mapColumnFn } from "@/utils/file-processing";

export async function formatAction(
  section: TSection,
  key: TClients,
  leads: string
) {
  const leadsArray = leads
    .replaceAll(",", ".")
    .split(LEAD_DEVIDER)
    .filter((i) => i != "")
    .map((str) => str.replace(/\n/g, ""));

  // "BYTEL"
  if (section === "BYTEL") {
    switch (key) {
      case "ADM":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnADM(lead.split(LEAD_SEPARATOR))
        );

      case "VIPP":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnVIPP(lead.split(LEAD_SEPARATOR))
        );

      case "EUROCRM":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnEUROCRM(lead.split(LEAD_SEPARATOR))
        );

      case "AFFINICIA":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnAFFINICIA(lead.split(LEAD_SEPARATOR))
        );

      case "ATLAS":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnATLAS(lead.split(LEAD_SEPARATOR))
        );

      case "FEDALA":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnFEDALA(lead.split(LEAD_SEPARATOR))
        );

      case "MARINA":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnMARINA(lead.split(LEAD_SEPARATOR))
        );

      case "RIGHTPLACE":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnRIGHTPLACE(lead.split(LEAD_SEPARATOR))
        );

      case "WEBHELP":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnWEBHELP(lead.split(LEAD_SEPARATOR))
        );

      case "ALGER":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnALGER(lead.split(LEAD_SEPARATOR))
        );

      default:
        return null;
    }
  }

  // "ORANGE"
  else if (section === "ORANGE") {
    switch (key) {
      case "ARMATIS":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnARMATIS(lead.split(LEAD_SEPARATOR))
        );

      case "TUNIS":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnTUNIS(lead.split(LEAD_SEPARATOR))
        );

      case "DPI":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnDPI(lead.split(LEAD_SEPARATOR))
        );

      case "KONECTA":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnKONECTA(lead.split(LEAD_SEPARATOR))
        );

      case "SATEL":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnSATEL(lead.split(LEAD_SEPARATOR))
        );

      case "TERSEA":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnTERSEA(lead.split(LEAD_SEPARATOR))
        );

      default:
        return null;
    }
  }

  // "ENERGIE"
  else {
    switch (key) {
      case "ADM":
        return null;

      case "VIPP":
        return null;

      case "EUROCRM":
        return null;

      case "AFFINICIA":
        return null;

      default:
        return null;
    }
  }
}
