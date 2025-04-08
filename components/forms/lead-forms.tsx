"use client";

import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatAction } from "@/actions/format.action";
import Preview from "../preview/preview";
import { dataToCSVFormat } from "@/utils/data-to-csv-format";
import ClientDropdownMenu from "./client-dropdown-menu";
import { RotateCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { pushContactAction } from "@/actions/push-contact.action";
import { useClientStore } from "@/store/use-client.store";
import { TableSection } from "../table/section-table";
import { useLeadStore } from "@/store/use-lead.store";

export default function LeadForm() {
  const { setLead, resetLead, leadData } = useLeadStore();
  const { setClient } = useClientStore();

  const [section, setSection] = useState<TSection | null>(null);
  const [clientkey, setClientkey] = useState<TClients | null>(null);
  const [leads, setLeads] = useState("");
  const [isOnPreview, setIsOnPreview] = useState(false);

  const { toast } = useToast();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const onProcess = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isOnPreview) return;

    try {
      const leadsArray = (await formatAction(
        section!,
        clientkey!,
        leads
      )) as IDataContact[];

      // get phone number
      const phoneNumbers = leadsArray.map((leads) => leads.TEL2);

      // get leads as csv text
      const leadAsCSVText = dataToCSVFormat(leadsArray) ?? "";

      setLead(leadsArray, leadAsCSVText, phoneNumbers);

      setIsOnPreview(true);
    } catch (error) {
      toast({
        title: "Something went wrong try again",
      });
    } finally {
    }
  };

  const onReset = () => {
    setSection(null);
    setClientkey(null);
    setLeads("");
    setClient(null);
    setIsOnPreview(false);

    resetLead();
  };

  return (
    <div>
      <form className="space-y-2 w-[22rem]" onSubmit={onProcess}>
        <ClientDropdownMenu
          clientkey={clientkey}
          setClientkey={setClientkey}
          section={section}
          setSection={setSection}
        />

        <div className="relative">
          <Textarea
            placeholder="The lead(s) pasted here will be transformed to type MERE."
            className="resize-none w-full"
            value={leads}
            disabled={!clientkey}
            onChange={(e) => !isOnPreview && setLeads(e.target.value)}
          />
          {isOnPreview && (
            <span className="absolute -bottom-6 right-0 text-xs text-muted-foreground italic">
              (Preview mode)
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Preview closeBtnRef={closeBtnRef}>
            <Button type="submit" disabled={!section || !clientkey || !leads}>
              {isOnPreview ? "Preview" : "Processe"}
            </Button>
          </Preview>

          {!!section && !!clientkey && !!leads && (
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={onReset}
            >
              <RotateCw />
            </Button>
          )}
        </div>
      </form>

      {leadData.asArray?.length! > 0 && (
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2">
          <TableSection />
        </div>
      )}
    </div>
  );
}
