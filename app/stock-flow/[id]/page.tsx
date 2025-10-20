import LeadSettingsSection from "@/components/stock-flow/lead-settings-section";

interface TProps {
  params: {
    id: string;
  };
  searchParams: {
    collection?: string;
    campagne_name?: string;
    entity_id?: string;
    campaign_setting_id?: string;
  };
}

export default function campagne({ params, searchParams }: TProps) {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center pt-24">
      <div className="space-y-4 rounded-2xl border border-gray-800 bg-slate-900 p-6 shadow-lg text-foreground mb-28">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            {searchParams.campagne_name}
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Campaign overview details
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-300">
          <div>
            <span className="text-gray-400">CAMPAGNE ID:</span>{" "}
            <span className="font-semibold text-foreground">{params.id}</span>
          </div>
          <div>
            <span className="text-gray-400">ENTITY ID:</span>{" "}
            <span className="font-semibold text-foreground">
              {searchParams.entity_id}
            </span>
          </div>
          <div>
            <span className="text-gray-400">SETTING ID:</span>{" "}
            <span className="font-semibold text-foreground">
              {searchParams.campaign_setting_id}
            </span>
          </div>
        </div>
      </div>

      {searchParams.entity_id && searchParams.campaign_setting_id && (
        <LeadSettingsSection
          dbId={params.id}
          collection={searchParams.collection}
          entity_id={searchParams.entity_id}
          campaign_setting_id={searchParams.campaign_setting_id}
        />
      )}
    </div>
  );
}
