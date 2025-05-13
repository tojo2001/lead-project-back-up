"use client";

import { useEffect, useState } from "react";

const NEXT_PUBLIC_UPDATE_KEY = process.env.NEXT_PUBLIC_UPDATE_KEY!;
const NEXT_PUBLIC_UPDATE_VALUE = process.env.NEXT_PUBLIC_UPDATE_VALUE!;

export function useUpdateChecker() {
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const checkUpdate = () => {
      const updateData = localStorage.getItem(NEXT_PUBLIC_UPDATE_KEY);
      if (updateData === NEXT_PUBLIC_UPDATE_VALUE) {
        setIsUpdated(true);
      } else {
        setIsUpdated(false);
      }
    };

    checkUpdate();

    const interval = setInterval(checkUpdate, 30000);

    return () => clearInterval(interval);
  }, []);

  return { isUpdated };
}
