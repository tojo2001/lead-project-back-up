"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatAction } from "@/actions/format.action";
import Preview from "../preview";
import { dataToCSVFormat } from "@/utils/data-to-csv-format";
import ClientDropdownMenu from "./client-dropdown-menu";
import { RotateCw } from "lucide-react";

export default function LeadForm() {
  const [section, setSection] = useState<TSection | null>(null);
  const [clientkey, setClientkey] = useState<TClients | null>(null);
  const [leads, setLeads] = useState("");
  const [result, setResult] = useState<Record<string, string>[] | null>(null);

  const onPriview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const leadsArray = await formatAction(section!, clientkey!, leads);

    setResult(leadsArray);
  };

  const onReset = () => {
    setSection(null);
    setClientkey(null);
    setLeads("");
    setResult(null);
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
