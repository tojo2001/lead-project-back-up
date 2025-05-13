"use client";

import { UPDATE_KEY, UPDATE_REFRESH, UPDATE_VALUE } from "@/constant/constant";
import { useEffect, useState } from "react";

export function useUpdateChecker() {
  const [isUpdated, setIsUpdated] = useState(true);

  useEffect(() => {
    const checkUpdate = () => {
      const updateData = localStorage.getItem(UPDATE_KEY);
      if (updateData === UPDATE_VALUE) {
        setIsUpdated(true);
      } else {
        setIsUpdated(false);
      }
    };

    checkUpdate();

    const interval = setInterval(checkUpdate, UPDATE_REFRESH);

    return () => clearInterval(interval);
  }, []);

  return { isUpdated };
}
