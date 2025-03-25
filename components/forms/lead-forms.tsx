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

export default function LeadForm() {
  const { authToken } = useAuthStore();
  const { setClient } = useClientStore();
  const [section, setSection] = useState<TSection | null>(null);
  const [clientkey, setClientkey] = useState<TClients | null>(null);
  const [leads, setLeads] = useState("");
  const [dataContact, setDataContact] = useState<IDataContact[] | null>(null);
  const [pending, setPending] = useState({
    formatting: false,
    processing: false,
  });
  const { toast } = useToast();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const onPreview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

      setDataContact(leadsArray);
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
    setDataContact(null);
    setClient(null);
  };

  const onPush = async () => {
    if (!dataContact || !authToken) return;

    setPending((state) => ({
      ...state,
      processing: true,
    }));

    try {
      const response = await pushContactAction({
        authToken,
        dataContacts: dataContact,
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
    <form className="space-y-2 w-[22rem]" onSubmit={onPreview}>
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
        <Preview
          hasResult={!!dataContact?.length}
          nombreOfLeads={dataContact?.length ?? 0}
          asSCVText={dataToCSVFormat(dataContact)}
          pending={pending}
          onPush={onPush}
          closeBtnRef={closeBtnRef}
        >
          <Button type="submit" disabled={!section || !clientkey || !leads}>
            Preview
          </Button>
        </Preview>

        {!!section && !!clientkey && !!leads && (
          <Button type="button" size="icon" variant="outline" onClick={onReset}>
            <RotateCw />
          </Button>
        )}
      </div>
    </form>
  );
}
