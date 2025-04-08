"use server";

import { LEAD_DEVIDER } from "@/constant/constant";

type TParams = {
  mereType: TMere;
  dataContacts: string;
};

type TResponse = {
  utcStart: string;
  utcEnd: string;
  fileName: string | null;
  integrationId: string;
  push: boolean;
  ok: number;
  eligible: number;
  duplicate: number;
  blacklisted: number;
  invalid: number;
  deny: number;
  total: number;
};

type TResult = {
  success: boolean;
  message: string;
  dataResponse: TResponse | null;
};

const infoPush = {
  mere1: {
    endpontURL:
      "https://api.omni.oppy.ai/api/64a3d9b4417922ca3f1aabea/push/contact",
    campaignSettingId: "6682ba43f94762970417f305",
  },
  mere2: {
    endpontURL:
      "https://api.omni.oppy.ai/api/64a3d9b4417922ca3f1aabea/push/contact",
    campaignSettingId: "677e97fd76085e2c918fa376",
  },
  mere3: {
    endpontURL:
      "https://api.omni.oppy.ai/api/64a3d9b4417922ca3f1aabea/push/contact",
    campaignSettingId: "67a5ce7b6a0b7086eb7c27fd",
  },
};

const AUTHIRIZATION_TOKEN = process.env.AUTHIRIZATION_TOKEN!;

export async function pushContactAction({
  mereType,
  dataContacts,
}: TParams): Promise<TResult> {
  try {
    const { endpontURL, campaignSettingId } = infoPush[mereType];
    const URL = endpontURL;

    const data = {
      campaignSettingId,
      dataContacts: dataContacts.split(LEAD_DEVIDER),
    };

    const config: RequestInit = {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${AUTHIRIZATION_TOKEN}`,
        Authorization: `Bearer TOKEN`,
      },
    };

    const fecther = await fetch(URL, config);

    if (fecther.status == 401) {
      throw new Error("Authentication error: Token is no longer valid.");
    }

    if (!fecther.ok) {
      const errorText = await fecther.text();
      throw new Error(
        `Fetch failed with status ${fecther.status} | ${errorText}`
      );
    }

    const result: TResponse = await fecther.json();

    return {
      success: true,
      message: `${
        data.dataContacts.length
      } Lead(s) has pushed to ${mereType.toLocaleUpperCase()}`,
      dataResponse: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      dataResponse: null,
    };
  }
}
