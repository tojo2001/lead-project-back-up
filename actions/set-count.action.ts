"use server";

import { db } from "@/firebase.config";
import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

const isProd = process.env.NODE_ENV === "production";

async function seedCampagnes() {
  const campagnes = [
    "MASTER BYTEL",
    "ADM DAKAR",
    "ADM",
    "EUROCRM",
    "EUROCRM MADA",
    "ATLAS",
    "FEDALA",
    "MARINA",
    "VIPP",
    "WEBHELP",
    "ALGER",
    "ARMATIS",
    "TUNIS",
    "DPI",
    "KONECTA",
    "SATEL",
    "TERSEA",
    "MASTER SFR",
    "AFFINICIA",
    "K SFR",
    "RIGHTPLACE",
    "W AGADIR",
    "W DAKAR",
    "W FES",
    "W MARRAKECH",
    "PUREPREMIUM",
    "ADM TOTAL",
    "ADM VATTENFALL",
    "AFFINICIA TOTAL",
    "ENGIE",
    "WEKIWI",
    "ENI",
  ];

  const campagneCollection = collection(db, "campagnes"); // ? Pass db here

  const batch = writeBatch(db); // ? Use writeBatch

  campagnes.forEach((campagne) => {
    const docRef = doc(campagneCollection); // ? Create a new document ref (random ID)
    batch.set(docRef, {
      campagne,
      counOfUse: 0,
    });
  });

  await batch.commit();
  console.log("Campagnes seeded successfully.");
}

export async function setCount(campagneName: TClients) {
  if (!isProd) return;

  try {
    const campagnesRef = collection(db, "campagnes");

    const q = query(campagnesRef, where("campagne", "==", campagneName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(`No campagne found with name: ${campagneName}`);
      return;
    }

    // Assume only one match (if multiple matches, you can handle differently)
    const campagneDoc = querySnapshot.docs[0].ref;

    await updateDoc(campagneDoc, {
      counOfUse: increment(1),
    });

    console.log(`Incremented counOfUse for campagne: ${campagneName}`);
  } catch (error: any) {
    console.log(error.message);
  }
}
