"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { LeadTable } from "./lead-table";
import ActionBtnSection from "../action-btn-section";
import { useLeadStore } from "@/store/use-lead.store";
import { toast } from "../ui/use-toast";

export function TableSection() {
  const { filteredLeadData, resetFilterLead } = useLeadStore();

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
        <Button variant="outline">Veiw as Table</Button>
      </DrawerTrigger>
      <DrawerContent>
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
