"use client";

import { UPDATE_KEY } from "@/constant/constant";
import { useUpdateChecker } from "@/hooks/use-update-checker";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function UpdateIndicatorBanner() {
  const { isUpdated, newVersionKey } = useUpdateChecker();

  const onReload = () => {
    localStorage.setItem(UPDATE_KEY, newVersionKey!);
    location.reload();
  };

  return !isUpdated ? (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-xl p-4 shadow-md w-full max-w-xl mx-auto mt-4">
      <div className="flex items-center space-x-3">
        <AlertCircle className="w-6 h-6 text-yellow-600" />
        <span className="text-sm font-medium">
          New update available. Please reload!
        </span>
      </div>
      <button
        onClick={onReload}
        className="flex items-center gap-2 bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-yellow-700 transition"
      >
        <RefreshCcw className="w-4 h-4" />
        Reload
      </button>
    </div>
  ) : null;
}
