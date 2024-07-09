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

export async function pushContactAction({
  authToken,
  campaignSettingId,
  dataContacts,
}: TParams) {
  const URL = process.env.API_URL!;

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
