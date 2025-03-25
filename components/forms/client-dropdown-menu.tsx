"use client";

type TProps = {
  clientkey: TClients | null;
  section: TSection | null;
  setClientkey: Dispatch<SetStateAction<TClients | null>>;
  setSection: Dispatch<SetStateAction<TSection | null>>;
};

import { SatelliteDish, Antenna, Zap, Rss, RadioTower } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CLIENTS } from "@/constant/constant";
import { Dispatch, SetStateAction } from "react";
import { findDropdownTiggerName } from "@/utils/find-dropdown-trigger-name";
import { cn } from "@/lib/utils";
import { useClientStore } from "@/store/use-client.store";

export default function ClientDropdownMenu({
  clientkey,
  section,
  setClientkey,
  setSection,
}: TProps) {
  const { setClient } = useClientStore();

  const onSelect = (value: TClients, section: TSection) => {
    setClientkey(value);
    setSection(section);
    setClient(value);
  };

  const triggerBtnText = findDropdownTiggerName(CLIENTS, clientkey!);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            triggerBtnText == "Choose client" ? "animate-pulse" : ""
          )}
        >
          {triggerBtnText.includes("BYTEL") && (
            <SatelliteDish className="mr-2 h-4 w-4" />
          )}
          {triggerBtnText.includes("ORANGE") && (
            <Antenna className="mr-2 h-4 w-4" />
          )}
          {triggerBtnText.includes("SFR") && <Rss className="mr-2 h-4 w-4" />}
          {triggerBtnText.includes("FREE") && (
            <RadioTower className="mr-2 h-4 w-4" />
          )}
          {/* {triggerBtnText.includes("ENERGIE") && (
            <Zap className="mr-2 h-4 w-4" />
          )} */}
          {triggerBtnText}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mt-[6.5rem]" side="right">
        <DropdownMenuLabel>OMNI Clients</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {CLIENTS.map((client) => (
            <DropdownMenuSub key={client.section}>
              {client.section != "ENERGIE" && (
                <DropdownMenuSubTrigger>
                  {client.section == "BYTEL" && (
                    <SatelliteDish className="mr-2 h-4 w-4" />
                  )}
                  {client.section == "ORANGE" && (
                    <Antenna className="mr-2 h-4 w-4" />
                  )}
                  {client.section == "SFR" && <Rss className="mr-2 h-4 w-4" />}
                  {client.section == "FREE" && (
                    <RadioTower className="mr-2 h-4 w-4" />
                  )}
                  {client.section == "ENERGIE" && (
                    <Zap className="mr-2 h-4 w-4" />
                  )}
                  <span>{client.section}</span>
                </DropdownMenuSubTrigger>
              )}

              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={clientkey as TClients}
                    onValueChange={(value) =>
                      onSelect(value as TClients, client.section as TSection)
                    }
                  >
                    {client.campagne.map((item) => (
                      <DropdownMenuRadioItem key={item.key} value={item.key}>
                        <span>{item.name}</span>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
