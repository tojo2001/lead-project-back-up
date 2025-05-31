"use client";

import { UPDATE_KEY } from "@/constant/constant";
import { db } from "@/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useUpdateChecker() {
  const [isUpdated, setIsUpdated] = useState(false);
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

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  console.log(updateInfo);

  useEffect(() => {
    const checkUpdate = () => {
      const updateData = localStorage.getItem(UPDATE_KEY);
      if (updateData === updateInfo?.versionKey) {
        setIsUpdated(true);
      } else {
        setIsUpdated(false);
      }
    };

    checkUpdate();

    return () => checkUpdate();
  }, [updateInfo]);

  return { isUpdated, newVersionKey: updateInfo?.versionKey };
}
