"use client"; // Important if you use this inside a Next.js component

import { db } from "@/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export function Count() {
  const [totalCounOfUse, setTotalCounOfUse] = useState<number>(0);

  useEffect(() => {
    const campagnesRef = collection(db, "campagnes");

    const unsubscribe = onSnapshot(campagnesRef, (snapshot) => {
      let total = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        total += data.counOfUse || 0;
      });

      setTotalCounOfUse(total);
    });

    // Always clean up the listener
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex items-start flex-col fixed top-2 left-2 text-muted-foreground">
      <p>{totalCounOfUse} in use</p>
      <span className="text-[8px] text-muted-foreground">Since 28/04/2025</span>
    </div>
  );
}
