"use server";

import { db } from "@/firebase.config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function pushNewUpdate(versionKey: string) {
  try {
    const docRef = doc(db, "update_infos", "update");

    const updateValue = {
      versionKey,
      updatedAt: serverTimestamp(),
    };

    await setDoc(docRef, updateValue);

    return {
      success: true,
      message: "Update successfully recorded in the system.",
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
