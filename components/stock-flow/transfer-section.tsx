"use client";

import QueryPanel from "./query-panel";
import OutputPanel from "./output-panel";
import RequestUriInput from "./request-uri-input";
import { useEffect } from "react";
import { useLeadOutputPanelStore } from "@/store/use-lead-output-panel.store";
import { useLeadQueryStore } from "@/store/use-lead-query.store";

interface Props {
  dbId: string;
  collection?: string;
  entity_id: string;
  campaign_setting_id: string;
}

export default function TransferSection({
  dbId,
  collection,
  entity_id,
  campaign_setting_id,
}: Props) {
  const {
    isRequestURIMode,
    resetrequestURI,
    resetCodeMode,
    resetCriteriaParameters,
    resetDateRange,
    resetSelectedColumns,
  } = useLeadQueryStore();
  const { resetOutputResult } = useLeadOutputPanelStore();

  // ✅ Cleanup function — resets all stores when the component unmounts
  useEffect(() => {
    return () => {
      resetrequestURI();
      resetCodeMode();
      resetCriteriaParameters();
      resetDateRange();
      resetSelectedColumns();
      resetOutputResult();
      console.log("🔄 TransferSection state cleared on unmount");
    };
  }, [
    resetrequestURI,
    resetCodeMode,
    resetCriteriaParameters,
    resetDateRange,
    resetSelectedColumns,
    resetOutputResult,
  ]);

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen flex flex-col justify-start items-center space-y-4">
      <RequestUriInput />
      {!isRequestURIMode && (
        <QueryPanel
          dbId={dbId}
          collection={collection}
          entity_id={entity_id}
          campaign_setting_id={campaign_setting_id}
        />
      )}
      <OutputPanel
        dbId={dbId}
        collection={collection}
        entity_id={entity_id}
        campaign_setting_id={campaign_setting_id}
      />
    </div>
  );
}
