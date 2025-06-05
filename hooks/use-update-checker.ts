"use client";

import { UPDATE_KEY } from "@/constant/constant";
import { db } from "@/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useUpdateChecker() {
  const [isUpdated, setIsUpdated] = useState<boolean | null>(null);
  const [updateInfo, setUpdateInfo] = useState<null | {
    versionKey: string;
    updatedAt: any;
  }>(null);

  useEffect(() => {
    const docRef = doc(db, "update_infos", "update");

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setUpdateInfo(docSnap.data() as any);
      } else {
        setUpdateInfo(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!updateInfo) return; // avoid early false check

    const updateData = localStorage.getItem(UPDATE_KEY);
    setIsUpdated(updateData === updateInfo.versionKey);
  }, [updateInfo]);

  return { isUpdated, newVersionKey: updateInfo?.versionKey };
}
