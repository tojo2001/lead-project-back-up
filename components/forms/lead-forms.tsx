"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatAction } from "@/actions/format.action";
import Preview from "../preview";
import { dataToCSVFormat } from "@/utils/data-to-csv-format";

const clients: {
  name: string;
  key: TClients;
}[] = [
  {
    name: "ADM",
    key: "ADM",
  },
  {
    name: "VIPP",
    key: "VIPP",
  },
  {
    name: "EUROCRM",
    key: "EUROCRM",
  },
  {
    name: "AFFINICIA",
    key: "AFFINICIA",
  },
  {
    name: "ATLAS",
    key: "ATLAS",
  },
  {
    name: "FEDALA",
    key: "FEDALA",
  },
  {
    name: "MARINA",
    key: "MARINA",
  },
  {
    name: "RIGHTPLACE",
    key: "RIGHTPLACE",
  },
  {
    name: "WEBHELP",
    key: "WEBHELP",
  },
  {
    name: "ALGER",
    key: "ALGER",
  },
];

export default function LeadForm() {
  const [clientkey, setClientkey] = useState<TClients | null>(null);
  const [leads, setLeads] = useState("");
  const [result, setResult] = useState<Record<string, string>[] | null>(null);

  const onSelect = (value: TClients) => {
    setClientkey(value);
  };

  const onPriview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const leadsArray = await formatAction(clientkey!, leads);

    setResult(leadsArray);
  };

  return (
    <form className="space-y-2 w-[22rem]" onSubmit={onPriview}>
      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choose client" />
        </SelectTrigger>
        <SelectContent>
          {clients.map((client) => (
            <SelectItem
              key={client.key}
              value={client.key}
              disabled={
                client.key != "ADM" &&
                client.key != "VIPP" &&
                client.key != "EUROCRM" &&
                client.key != "AFFINICIA"
              }
            >
              {client.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        placeholder="leads"
        className="resize-none w-full"
        value={leads}
        disabled={!clientkey}
        onChange={(e) => setLeads(e.target.value)}
      />

      <Preview hasResult={!!result?.length} asSCVText={dataToCSVFormat(result)}>
        <Button type="submit">Preview</Button>
      </Preview>
    </form>
  );
}
