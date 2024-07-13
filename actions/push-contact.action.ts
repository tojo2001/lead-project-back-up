"use server";

type TParams = {
  authToken: string;
  campaignSettingId: string;
  dataContacts: IDataContact[];
};

type TPushResult = {
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

const ENDPOINT =
  "https://api.omni.oppy.ai/api/6579b3f51331484de9ee7b23/push/contact?Type=JSON";

export async function pushContactAction({
  authToken,
  campaignSettingId,
  dataContacts,
}: TParams) {
  const URL = ENDPOINT;

  const data = {
    campaignSettingId,
    dataContacts,
  };

  const config: RequestInit = {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  const fecther = await fetch(URL, config);

  const result: TPushResult = await fecther.json();

  return result;
}
