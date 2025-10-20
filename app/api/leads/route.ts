import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dbId = searchParams.get("dbId");
  const collection = searchParams.get("collection") || "Contacts";
  const entity_id = searchParams.get("entity_id");
  const campaign_setting_id = searchParams.get("campaign_setting_id");
  const date_range = searchParams.get("date_range");

  if (!dbId || !entity_id || !campaign_setting_id) {
    return NextResponse.json(
      { error: "Missing required query params" },
      { status: 400 }
    );
  }

  const dateRangeFormated: IDateRange = date_range
    ? JSON.parse(date_range)
    : null;

  // get date range filter
  function getDateRange() {
    if (dateRangeFormated) {
      return {
        startDate: {
          $dateFromParts: { ...dateRangeFormated.startDate },
        },
        endDate: {
          $dateFromParts: { ...dateRangeFormated.endDate },
        },
      };
    }

    return {
      startDate: {
        $dateFromParts: {
          year: { $year: "$$NOW" },
          month: { $month: "$$NOW" },
          day: { $subtract: [{ $dayOfMonth: "$$NOW" }, 7] },
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        },
      },
      endDate: "$$NOW",
    };
  }

  const client = await clientPromise;
  const db = client.db(dbId);

  const leads = await db
    .collection(collection)
    .aggregate([
      {
        $match: {
          EntityId: new ObjectId(entity_id),
          CampaignSettingId: new ObjectId(campaign_setting_id),
        },
      },
      {
        $addFields: getDateRange(),
      },
      {
        $unwind: {
          path: "$ContactBroadcasts",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: { "ContactBroadcasts.BroadcastType": { $in: ["LEADSSTOCK"] } },
      },
      {
        $unwind: {
          path: "$ContactBroadcasts.BroadcastResults",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "ContactBroadcasts.BroadcastResults.BroadcastResultStatus": {
            $nin: ["LEADS_CANCELLED"],
          },
        },
      },
      {
        $match: {
          $and: [
            {
              $expr: {
                $gte: ["$ContactIntegration.EventDateTime", "$startDate"],
              },
            },
            {
              $expr: {
                $lte: ["$ContactIntegration.EventDateTime", "$endDate"],
              },
            },
            { "ContactBroadcasts.PlatformBroadcastingDateTime": { $eq: null } },
          ],
        },
      },
      {
        $addFields: {
          INTEGRATION_ID: "$_id",
          LEADS: "$ContactIntegration.MetasString",
        },
      },
      { $project: { _id: 0, LEADS: 1, INTEGRATION_ID: 1 } },
      { $limit: 1000 },
    ])
    .toArray();

  return NextResponse.json({ leads });
}
