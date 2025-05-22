"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { LeadTable } from "./lead-table";
import ActionBtnSection from "../action-btn-section";
import { useLeadStore } from "@/store/use-lead.store";
import { toast } from "../ui/use-toast";
import { X } from "lucide-react";
import { useRef } from "react";

export function TableSection() {
  const { filteredLeadData, resetFilterLead } = useLeadStore();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const onClose = () => {
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
        <Button variant="outline" ref={btnRef}>
          Veiw as Table
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Button
          size="icon"
          className="absolute -top-28 left-1/2 -translate-x-1/2 rounded-full"
          onClick={() => btnRef.current?.click()}
        >
          <X size={18} />
        </Button>
        <div className="mx-auto w-full max-w-[calc(100%-2rem)]">
          <LeadTable />
        </div>
        <ActionBtnSection
          hasthirdAction={true}
          className="flex-col items-end top-auto bottom-6"
        />
      </DrawerContent>
    </Drawer>
  );
}
