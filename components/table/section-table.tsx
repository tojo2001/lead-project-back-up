"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LeadTable } from "./lead-table";
import CopySection from "../copy-section";

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
        <CopySection className="flex-col items-end top-auto bottom-6" />
      </DrawerContent>
    </Drawer>
  );
}
