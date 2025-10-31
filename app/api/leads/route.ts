import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { TDateRange } from "@/store/use-lead-query.store";
import { safeParse } from "@/utils/get-safe-object";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dbId = searchParams.get("dbId");
  const collection = searchParams.get("collection") || "Contacts";
  const entity_id = searchParams.get("entity_id");
  const campaign_setting_id = searchParams.get("campaign_setting_id");
  const date_range = searchParams.get("date_range");
  const aggregation = searchParams.get("aggregation");

  if (!dbId || !entity_id || !campaign_setting_id) {
    return NextResponse.json(
      { error: "Missing required query params" },
      { status: 400 }
    );
  }

  const requestURI = req.url;

  const dateRangeFormated: TDateRange = date_range
    ? safeParse(date_range)
    : null;

  const aggregationFormated: TAggregation = aggregation
    ? safeParse(aggregation)
    : {};

  // console.log(dateRangeFormated);
  // console.log(aggregationFormated);

  // get date range filter
  function getDateRange() {
    if (dateRangeFormated) {
      return dateRangeFormated;
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

  const pipeline = [
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
        ID: "$_id",
        LEADS: "$ContactIntegration.MetasString",
        platform: "$ContactIntegration.MetadataIntegration.platform",
      },
    },
    {
      $match: aggregationFormated.$match ?? {},
    },
    { $project: { _id: 0, ID: "$ID", LEADS: "$LEADS" } },
    { $limit: 1000 },
  ];

  const results = await db.collection(collection).aggregate(pipeline).toArray();

  return NextResponse.json({ requestURI, results });
}
