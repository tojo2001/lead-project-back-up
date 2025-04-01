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
import { useAuthStore } from "@/store/use-auth.store";
import { useClientStore } from "@/store/use-client.store";
import { TableSection } from "../table/section-table";
import { useLeadStore } from "@/store/use-lead.store";

export default function LeadForm() {
  const { setLead, resetLead, leadData } = useLeadStore();
  const { authToken } = useAuthStore();
  const { setClient } = useClientStore();

  const [section, setSection] = useState<TSection | null>(null);
  const [clientkey, setClientkey] = useState<TClients | null>(null);
  const [leads, setLeads] = useState("");
  const [isOnPreview, setIsOnPreview] = useState(false);

  const [pending, setPending] = useState({
    formatting: false,
    processing: false,
  });
  const { toast } = useToast();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const onProcess = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isOnPreview) return;

    setPending((state) => ({
      ...state,
      formatting: true,
    }));

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
      setPending((state) => ({
        ...state,
        formatting: false,
      }));
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

  const onPush = async () => {
    if (!leadData.asArray || !authToken) return;

    setPending((state) => ({
      ...state,
      processing: true,
    }));

    try {
      const response = await pushContactAction({
        authToken,
        dataContacts: leadData.asArray,
        campaignSettingId: "test",
      });

      toast({
        title: "Pushed to MERE",
      });

      console.log(response);

      closeBtnRef.current?.click();
    } catch (error: any) {
      toast({
        title: error.message ?? "Something went wrong try again",
      });
    } finally {
      setPending((state) => ({
        ...state,
        processing: false,
      }));
    }
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

        <Textarea
          placeholder="The lead(s) pasted here will be transformed to type MERE."
          className="resize-none w-full"
          value={leads}
          disabled={!clientkey}
          onChange={(e) => setLeads(e.target.value)}
        />

        <div className="flex items-center space-x-2">
          <Preview pending={pending} onPush={onPush} closeBtnRef={closeBtnRef}>
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
