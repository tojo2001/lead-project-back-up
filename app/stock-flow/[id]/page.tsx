import Header from "@/components/stock-flow/header";
import TransferSection from "@/components/stock-flow/transfer-section";

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
    <div className="w-full min-h-screen flex flex-col justify-center items-center pt-24 space-y-4">
      <Header params={params} searchParams={searchParams} />

      {searchParams.entity_id && searchParams.campaign_setting_id && (
        <TransferSection
          dbId={params.id}
          collection={searchParams.collection}
          entity_id={searchParams.entity_id}
          campaign_setting_id={searchParams.campaign_setting_id}
        />
      )}
    </div>
  );
}
