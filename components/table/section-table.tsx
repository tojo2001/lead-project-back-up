"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { LeadTable } from "./lead-table";
import ActionBtnSection from "../action-btn-section";

export function TableSection() {
  return (
    <Drawer>
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
