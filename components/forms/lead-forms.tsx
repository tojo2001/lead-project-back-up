"use client";

import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatAction } from "@/actions/format.action";
import Preview from "../preview";
import { dataToCSVFormat } from "@/utils/data-to-csv-format";
import ClientDropdownMenu from "./client-dropdown-menu";
import { RotateCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { pushContactAction } from "@/actions/push-contact.action";

export default function LeadForm() {
  const [section, setSection] = useState<TSection | null>(null);
  const [clientkey, setClientkey] = useState<TClients | null>(null);
  const [leads, setLeads] = useState("");
  const [result, setResult] = useState<IDataContact[] | null>(null);
  const [pending, setPending] = useState(false);
  const { toast } = useToast();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const onPriview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);

    try {
      const leadsArray = (await formatAction(
        section!,
        clientkey!,
        leads
      )) as IDataContact[];

      setResult(leadsArray);
    } catch (error) {
      toast({
        title: "Something went wrong try again",
      });
    } finally {
      setPending(false);
    }
  };

  const onReset = () => {
    setSection(null);
    setClientkey(null);
    setLeads("");
    setResult(null);
  };

  const onPush = async () => {
    const authToken = prompt("Authorization token");

    if (!result || !authToken) return;

    try {
      const response = await pushContactAction({
        authToken,
        dataContacts: result,
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
    }
  };

  return (
    <form className="space-y-2 w-[22rem]" onSubmit={onPriview}>
      <ClientDropdownMenu
        clientkey={clientkey}
        setClientkey={setClientkey}
        section={section}
        setSection={setSection}
      />

      <Textarea
        placeholder="leads"
        className="resize-none w-full"
        value={leads}
        disabled={!clientkey}
        onChange={(e) => setLeads(e.target.value)}
      />

      <div className="flex items-center space-x-2">
        <Preview
          hasResult={!!result?.length}
          asSCVText={dataToCSVFormat(result)}
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
