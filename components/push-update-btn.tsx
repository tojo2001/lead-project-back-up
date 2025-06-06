"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { pushNewUpdate } from "@/actions/push-new-update.action";
import toastify from "@/utils/toastify";
import { generateNumericId } from "@/utils/id-generator";

export default function PushUpdateBtn() {
  const [isPushing, setIsPushing] = useState(false);

  const onPush = async () => {
    setIsPushing(true);

    try {
      const { success, message } = await pushNewUpdate(generateNumericId());
      if (!success) throw new Error(message);

      toastify("success", message);
    } catch (error: any) {
      console.log(error.message);
      toastify("error", error.message);
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div>
      <Button
        disabled={isPushing}
        onClick={onPush}
        className="relative px-6 py-3 text-foreground bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-[0_0_20px_4px_rgba(236,72,153,0.6)] transition-all duration-300 hover:shadow-[0_0_30px_6px_rgba(236,72,153,0.8)] hover:scale-105"
      >
        {isPushing ? "Deploying Update..." : "Deploy New Update"}
      </Button>
    </div>
  );
}
