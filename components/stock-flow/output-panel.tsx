import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLeadQueryStore } from "@/store/use-lead-query.store";
import { useLeadOutputPanelStore } from "@/store/use-lead-output-panel.store";
import { aggregationBuilder } from "@/utils/aggregation-builder";
import { safeStringify } from "@/utils/get-safe-object";
import { RefreshCw } from "lucide-react";

type TProps = {
  dbId: string;
  collection?: string;
  entity_id: string;
  campaign_setting_id: string;
};

export default function OutputPanel({
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
  } = useLeadQueryStore();
  const { outputResult, setOutputResult } = useLeadOutputPanelStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get data
  async function fetchLeads() {
    try {
      setLoading(true);
      setError(null);

      const config = {
        selectedColumns,
        criteriaParameters,
        codeResult,
      };

      const aggregationResult = aggregationBuilder(isCodeMode, config);

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
      setError(err.message || "Failed to fetch leads");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Fetch on first load
  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-6xl space-y-4 !mb-8">
      {loading && !outputResult.results.length && (
        <p className="mt-4 text-blue-500 animate-pulse">Loading leads...</p>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="w-full flex items-center justify-end">
        <Button onClick={fetchLeads} disabled={loading} className="space-x-2">
          {loading ? (
            <>
              <RefreshCw size={14} className="animate-spin" />
              <span>Refreshing...</span>{" "}
            </>
          ) : (
            <>
              <RefreshCw size={14} />
              <span>Refresh</span>
            </>
          )}
        </Button>
      </div>

      {!loading && !error && (
        <div className="w-full border rounded-lg p-4 bg-card shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b text-sm font-medium text-muted-foreground">
            <p>ID</p>
            <p>Leads</p>
          </div>

          {/* Scrollable content */}
          <div className="divide-y max-h-52 overflow-auto custom-scrollbar">
            {outputResult.results.map((r) => (
              <div
                key={r.ID}
                className="flex items-center justify-between py-2 text-sm"
              >
                <p className="font-mono text-muted-foreground">{r.ID}</p>
                <p className="text-right truncate max-w-[70%] text-foreground">
                  {r.LEADS}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 mt-2 border-t text-sm font-medium">
            <p>Total</p>
            <p className="text-right">{outputResult.results.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
