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
      <Button disabled={isPushing} onClick={onPush}>
        {isPushing ? "Deploying Update..." : "Deploy New Update"}
      </Button>
    </div>
  );
}
