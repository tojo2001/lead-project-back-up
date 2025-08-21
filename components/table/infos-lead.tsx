import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLeadStore } from "@/store/use-lead.store";

type TProps = {
  children: React.ReactNode;
};

const leadKeys = {
  FormName: "form_name",
  Platform: "platform",
  FournisseurActuel: "Fournisseur_actuel",
  Preference: "Preference",
  Recherche: "Recherche",
  Prix: "Prix",
  OperateurMobile: "operateur_mobile",
  Phone: "TEL2",
  CodePostal: "CP",
  Options: "Options",
  Nom: "nom",
  Prenom: "prenom",
  IsInternal: "is_internal",
};

export default function InfosLead({ children }: TProps) {
  const { leadData, filteredLeadData } = useLeadStore();
  const [groupKey, setGroupKey] = useState<keyof IDataContact>("platform");
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [groupResults, setGroupResults] = useState<Record<
    string,
    number
  > | null>(null);

  const leads =
    (!!filteredLeadData ? filteredLeadData.asArray : leadData.asArray) || [];

  const groupByField = <T extends keyof IDataContact>(
    data: IDataContact[],
    field: T
  ): Record<string, number> =>
    data.reduce<Record<string, number>>((acc, item) => {
      const key = item[field] || "(empty)";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

  const onKeyChange = (value: keyof IDataContact) => {
    setGroupKey(value);
  };

  const onCopy = () => {
    if (!groupResults) return;
    setIsCopy(true);
    const entries = Object.entries(groupResults);

    const text =
      entries.map(([key, value]) => `${key}: ${value}`).join(",\n") +
      `\nTotal: ${leads.length}`;

    window.navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    const timiID = setTimeout(() => setIsCopy(false), 3000);
    return () => clearTimeout(timiID);
  }, [isCopy]);

  useEffect(() => {
    const groupedByPlatform = groupByField(leads, groupKey);
    setGroupResults(groupedByPlatform);
  }, [leads, groupKey]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Infos Leads</DialogTitle>
          <DialogDescription>
            Analyze and filter leads by key attributes
          </DialogDescription>
        </DialogHeader>

        <div className="w-full space-y-4">
          <Select onValueChange={onKeyChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent className="max-h-[17rem] h-full left-[11rem] -top-12">
              <SelectGroup>
                {Object.entries(leadKeys).map(([label, value]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {!!groupResults && (
            <div className="overflow-hidden rounded-md">
              <div className="w-full h-60 overflow-y-auto max-w-lg mx-auto bg-white shadow p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {Object.entries(groupResults).map(([key, count]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center border-b last:border-none py-2"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {key}
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                      {count}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center border-b last:border-none py-2">
                  <span className="text-sm font-bold text-gray-700">Total</span>
                  <span className="px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-full">
                    {leads.length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
          <Button onClick={onCopy}>{isCopy ? "Copied" : "Copy"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
