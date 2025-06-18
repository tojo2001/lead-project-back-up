"use server";

import { LEAD_SEPARATOR, LEAD_DEVIDER } from "@/constant/constant";
import { mapColumnFn } from "@/utils/file-processing";

export async function formatAction(
  section: TSection,
  key: TClients,
  leads: string
) {
  const leadsArray = leads
    .replaceAll(",", ".") // Replace all commas with periods
    .split(LEAD_DEVIDER) // Split leads by the lead separator
    .filter((lead) => lead !== "") // Filter out empty leads
    .map((str) => str.replace(/\n/g, "")); // Remove all line breaks

  // "BYTEL"
  if (section === "BYTEL") {
    switch (key) {
      case "MASTER BYTEL":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnMASTER_BYTEL(
            lead.split(LEAD_SEPARATOR)
          )
        );

      case "ADM DAKAR":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnADM_DAKAR(lead.split(LEAD_SEPARATOR))
        );

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

      case "EUROCRM MADA":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnEUROCRM_MADA(
            lead.split(LEAD_SEPARATOR)
          )
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

      case "WEBHELP":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnWEBHELP(lead.split(LEAD_SEPARATOR))
        );

      case "ALGER":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnALGER(lead.split(LEAD_SEPARATOR))
        );

      case "QUALITY CENTER":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnQUALITY_CENTER(
            lead.split(LEAD_SEPARATOR)
          )
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

      case "CASABLANCA":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnCASABLANCA(lead.split(LEAD_SEPARATOR))
        );

      default:
        return null;
    }
  }

  // "SFR"
  else if (section === "SFR") {
    switch (key) {
      case "MASTER SFR":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnMASTER_SFR(lead.split(LEAD_SEPARATOR))
        );

      case "AFFINICIA":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnAFFINICIA(lead.split(LEAD_SEPARATOR))
        );

      case "K SFR":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnK_SFR(lead.split(LEAD_SEPARATOR))
        );

      case "RIGHTPLACE":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnRIGHTPLACE(lead.split(LEAD_SEPARATOR))
        );

      case "W AGADIR":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnW_AGADIR(lead.split(LEAD_SEPARATOR))
        );

      case "W DAKAR":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnW_DAKAR(lead.split(LEAD_SEPARATOR))
        );

      case "W FES":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnW_FES(lead.split(LEAD_SEPARATOR))
        );

      case "W MARRAKECH":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnW_MARRAKECH(
            lead.split(LEAD_SEPARATOR)
          )
        );

      default:
        return null;
    }
  }

  // FREE
  else if (section === "FREE") {
    switch (key) {
      case "PUREPREMIUM":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnPURPREMIUM(lead.split(LEAD_SEPARATOR))
        );

      case "VIPP FREE":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnVIPPFREE(lead.split(LEAD_SEPARATOR))
        );

      default:
        return null;
    }
  }

  // "ENERGIE"
  else if (section === "ENERGIE") {
    switch (key) {
      case "ADM TOTAL":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnADMTOTAL(lead.split(LEAD_SEPARATOR))
        );

      case "ADM VATTENFALL":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnADMVATTENFALL(
            lead.split(LEAD_SEPARATOR)
          )
        );

      case "AFFINICIA TOTAL":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnAFFINICIATOTAL(
            lead.split(LEAD_SEPARATOR)
          )
        );

      case "ENGIE":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnENGIE(lead.split(LEAD_SEPARATOR))
        );

      case "WEKIWI":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnWEKIWI(lead.split(LEAD_SEPARATOR))
        );

      case "ENI":
        return leadsArray.map((lead) =>
          mapColumnFn?.[section].mapColumnENI(lead.split(LEAD_SEPARATOR))
        );

      default:
        return null;
    }
  }

  return null;
}
