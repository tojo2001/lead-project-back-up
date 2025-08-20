import { Filter, FilterX, Search, X } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, useEffect, useState } from "react";
import { useLeadStore } from "@/store/use-lead.store";
import { Button } from "../ui/button";
import { dataToCSVFormat } from "@/utils/data-to-csv-format";

type TProps = {
  onRemove: (id: string | string[]) => Promise<void>;
};

const searchFilterMetaData = [
  {
    key: "id",
    value: "ID",
  },
  {
    key: "platform",
    value: "Platform",
  },
  {
    key: "Fournisseur_actuel",
    value: "Fournisseur",
  },
  {
    key: "form_name",
    value: "Source",
  },
  {
    key: "Preference",
    value: "Preference",
  },
  {
    key: "Prix",
    value: "Prix",
  },
  {
    key: "operateur_mobile",
    value: "Operateur",
  },
  {
    key: "TEL2",
    value: "Phone",
  },
];

export default function FilterSearch({ onRemove }: TProps) {
  const {
    leadData,
    filteredLeadData,
    setFilterLead,
    resetFilterLead,
    selectedLead,
    onSelectLead,
  } = useLeadStore();
  const [searchKey, setSearchKey] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchKeyChange = (value: string) => {
    setSearchKey(value);
  };

  const onSearchtermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value.trim()) {
      resetFilterLead();
    }
  };

  const onResset = () => {
    setSearchTerm("");
    setSearchKey("");
    resetFilterLead();
  };

  const onClear = () => {
    if (!searchTerm) return;
    setSearchTerm("");
    resetFilterLead();
  };

  // Debounce filtering logic
  useEffect(() => {
    if (!searchTerm || !leadData.asArray?.length) return;

    const delayDebounce = setTimeout(() => {
      const filteredData = leadData.asArray!.filter((data) => {
        if (!searchKey) {
          return data.Fournisseur_actuel.toLocaleLowerCase().includes(
            searchTerm.toLocaleLowerCase()
          );
        }

        return data[searchKey as keyof IDataContact]
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
      });

      // get phone number
      const phoneNumbers = filteredData.map((leads) => leads.TEL2);

      // get leads as csv text
      const leadAsCSVText = dataToCSVFormat(filteredData) ?? "";

      setFilterLead(filteredData, leadAsCSVText, phoneNumbers);
      return filteredData;
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounce); // Cleanup
  }, [leadData.asArray, filteredLeadData?.asArray, searchKey, searchTerm]);

  return (
    <div>
      <div className="flex items-center js space-x-4">
        <form>
          <div className="flex items-center justify-center space-x-2">
            <div className="relative w-80">
              <Input
                placeholder={
                  !!searchKey
                    ? `Search by ${
                        searchFilterMetaData.find((m) => m.key == searchKey)!
                          .value
                      }`
                    : "Search filter"
                }
                value={searchTerm}
                onChange={onSearchtermChange}
              />
              <span
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={onClear}
              >
                {searchTerm ? (
                  <X size={18} className="cursor-pointer" />
                ) : (
                  <Search size={18} />
                )}
              </span>
            </div>

            {!searchKey ? (
              <Select onValueChange={onSearchKeyChange}>
                <SelectTrigger className="w-36">
                  <Filter size="16" />
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  {searchFilterMetaData.map((metadata) => (
                    <SelectItem key={metadata.key} value={metadata.key}>
                      {metadata.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Button
                type="button"
                className="space-x-2"
                variant="destructive"
                onClick={onResset}
              >
                <span>Clear filter</span>
                <FilterX size="16" />
              </Button>
            )}
          </div>
        </form>

        {!!selectedLead.length && (
          <div>
            <Button onClick={() => onRemove(selectedLead)}>
              Clear Selected Lead{selectedLead.length > 1 && "s"} (
              {selectedLead.length})
            </Button>
            <Button
              variant="link"
              onClick={() => onSelectLead(false, "", true)}
            >
              Unselect All
            </Button>
          </div>
        )}
      </div>

      {!!filteredLeadData && filteredLeadData.asArray?.length == 0 && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-8 border border-dashed border-neutral-200 rounded-3xl bg-white text-center shadow-xl transition-all animate-fade-in">
          <div className="text-6xl mb-5 text-blue-500">📭</div>
          <h1 className="text-2xl font-bold text-neutral-800">
            No Results Found
          </h1>
          <p className="text-neutral-600 mt-2 max-w-xs">
            We couldn&rsquo;t find anything that matches your current filters.
            Try adjusting them or reset everything to start fresh.
          </p>
          <Button
            onClick={onResset}
            variant="secondary"
            className="mt-6 px-6 py-2 text-sm font-medium rounded-full transition-colors"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
