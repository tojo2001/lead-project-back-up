import DateRange from "./date-range";
import Criteria from "./criteria";
import CriteriaTrigger from "./criteria-trigger";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import Summary from "./summary";
import AggregationEditor from "./aggregation-editor";
import { useLeadQueryStore } from "@/store/use-lead-query.store";
import { aggregationBuilder } from "@/utils/aggregation-builder";
import { safeStringify } from "@/utils/get-safe-object";
import { useLeadOutputPanelStore } from "@/store/use-lead-output-panel.store";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type TCriteriaParameters = Record<
  string,
  {
    condition: string;
    options: string[];
  }
>;

type TProps = {
  dbId: string;
  collection?: string;
  entity_id: string;
  campaign_setting_id: string;
};

export default function QueryPanel({
  dbId,
  collection,
  entity_id,
  campaign_setting_id,
}: TProps) {
  const {
    isCodeMode,
    dateRange,
    selectedColumns,
    criteriaParameters,
    codeResult,
    resetDateRange,
    resetCriteriaParameters,
    resetSelectedColumns,
    resetCodeMode,
  } = useLeadQueryStore();

  const { setOutputResult } = useLeadOutputPanelStore();
  const [isApplying, setIsApplying] = useState(false);

  const dateRangeResetBtnRef = useRef<HTMLButtonElement>(null);

  const cannotApply = isCodeMode
    ? codeResult == "" // no code written
    : selectedColumns.length === 0 || // no columns selected
      Object.values(criteriaParameters).some(
        (param) => !param.options || param.options.length === 0 // one of them has empty options
      );

  // Reset date range and selected columns
  const onResetAll = () => {
    if (!confirm("Are you sure you want to reset all filters?")) return;

    resetDateRange();
    resetCriteriaParameters();
    resetSelectedColumns();
    resetCodeMode();

    dateRangeResetBtnRef.current?.click();
  };

  // apply filters
  const onApply = async () => {
    cannotApply && alert("Please fill in all required fields before applying.");

    setIsApplying(true);

    const config = {
      selectedColumns,
      criteriaParameters,
      codeResult,
    };

    const aggregationResult = aggregationBuilder(isCodeMode, config);

    try {
      const params = {
        dbId,
        collection,
        entity_id,
        campaign_setting_id,
        date_range: dateRange ? safeStringify(dateRange) : "",
        aggregation: aggregationResult ? safeStringify(aggregationResult) : "",
      };

      // Filter out undefined values so TS is happy
      const searchParams = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null) acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      );

      const url = new URL("/api/leads", window.location.origin);
      url.search = searchParams.toString();

      const res = await fetch(url, { cache: "no-store" });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data: TOutPutResult = await res.json();

      setOutputResult(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="w-full max-w-6xl border rounded-md p-6">
      <div className="relative flex items-start">
        <div className="relative flex flex-col w-[30%] space-y-4 pr-4">
          <DateRange dateRangeResetBtnRef={dateRangeResetBtnRef} />
          {(dateRange || !cannotApply) && <Summary />}

          {(dateRange || !cannotApply) && (
            <div className="!mt-12 space-y-2">
              <p className="text-sm text-muted-foreground">
                Before applying the filters, please review your criteria
                carefully.
              </p>
              <div className="space-x-2">
                <Button variant="outline" className="px-6" onClick={onResetAll}>
                  Reset All
                </Button>
                <Button
                  variant="default"
                  className={cn("px-6", isApplying && "space-x-2")}
                  onClick={onApply}
                  disabled={cannotApply || isApplying}
                >
                  {isApplying ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    "Apply Filters"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="w-[1px] h-[-webkit-fill-available] left-[30%] bg-accent" />

        <div className="flex-1 w-full pl-4 space-y-4">
          <CriteriaTrigger />
          {isCodeMode ? <AggregationEditor /> : <Criteria />}
        </div>
      </div>
    </div>
  );
}
