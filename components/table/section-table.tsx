"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { LeadTable } from "./lead-table";
import ActionBtnSection from "../action-btn-section";
import { useLeadStore } from "@/store/use-lead.store";
import { toast } from "../ui/use-toast";
import { Loader2, X } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";

type TProps = {
  isOnPreview: boolean;
  isProcessing: boolean;
  disabled: boolean;
};

export function TableSection({ isOnPreview, isProcessing, disabled }: TProps) {
  const { filteredLeadData, resetFilterLead } = useLeadStore();
  const [isTableExtratContentShown, setIsTableExtratContentShown] =
    useState(true);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const onClose = () => {
    setIsTableExtratContentShown(false);
    if (!filteredLeadData) return;
    resetFilterLead();

    setTimeout(
      () =>
        toast({
          title: "Filters Reset",
        }),
      500
    );
  };

  return (
    <Drawer onClose={onClose}>
      <DrawerTrigger asChild>
        <Button
          type={isOnPreview ? "button" : "submit"}
          ref={btnRef}
          disabled={disabled}
          onClick={() => setIsTableExtratContentShown(true)}
        >
          {isOnPreview ? "Preview" : "Processe"}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        {isTableExtratContentShown && (
          <Button
            type="button"
            size="icon"
            className="absolute -top-28 left-1/2 -translate-x-1/2 rounded-full"
            onClick={() => btnRef.current?.click()}
          >
            <X size={18} />
          </Button>
        )}
        {isProcessing && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center space-x-1">
            <Loader2 size={15} className="animate-spin" />
            <span className="text-sm">Processing...</span>
          </div>
        )}
        <div className="mx-auto w-full max-w-[calc(100%-2rem)]">
          <LeadTable isTableExtratContentShown={isTableExtratContentShown} />
        </div>
        {!isProcessing && (
          <ActionBtnSection
            hasthirdAction={true}
            className="flex-col items-end top-auto bottom-6"
          />
        )}
      </DrawerContent>
    </Drawer>
  );
}
