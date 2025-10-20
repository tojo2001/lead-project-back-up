"use client";

import { useEffect, useState } from "react";
import { DateRange } from "./date-range";
import FilterParameter from "./filter-parameter";

interface Props {
  dbId: string;
  collection?: string;
  entity_id: string;
  campaign_setting_id: string;
}

export default function LeadSettingsSection({
  dbId,
  collection,
  entity_id,
  campaign_setting_id,
}: Props) {
  const [leadsData, setLeadsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<IDateRange | null>(null);

  async function fetchLeads() {
    try {
      setLoading(true);
      setError(null);

      const params = {
        dbId,
        collection,
        entity_id,
        campaign_setting_id,
        date_range: dateRange ? JSON.stringify(dateRange) : "",
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

      const data = await res.json();
      setLeadsData(data.leads || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch leads");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // ? Fetch on first load
  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center">
      <FilterParameter setDateRange={setDateRange} />

      <button
        onClick={fetchLeads}
        disabled={loading}
        className="px-4 py-2 mb-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Refreshing..." : "Refresh"}
      </button>

      {loading && !leadsData.length && (
        <p className="mt-4 text-blue-500 animate-pulse">Loading leads...</p>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <h2 className="mt-4 font-medium">Total Leads: {leadsData.length}</h2>
          <div className="w-1/2 h-96 overflow-y-auto border border-slate-400 mt-2 rounded">
            {leadsData.map((leadData, index) => (
              <div
                key={index}
                className="p-2 border-b border-slate-200 flex justify-between items-center"
              >
                <p>{leadData.LEADS}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
