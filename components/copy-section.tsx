import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useLeadStore } from "@/store/use-lead.store";
import { Phone, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

type TPros = {
  className?: string;
};

export default function CopySection({ className }: TPros) {
  const [isCopy, setIsCopy] = useState<"PHONE" | "LEADS" | false>(false);
  const { leadData } = useLeadStore();

  const nombreOfLeads = leadData.asArray?.length ?? 0;

  const onCopy = (key: "PHONE" | "LEADS") => {
    setIsCopy(key);
    key === "LEADS"
      ? window.navigator.clipboard.writeText(leadData.asCSVText!)
      : window.navigator.clipboard.writeText(
          JSON.stringify(leadData.phoneNumber, null, 4)
        );
  };

  useEffect(() => {
    const timiID = setTimeout(() => setIsCopy(false), 3000);
    return () => clearTimeout(timiID);
  }, [isCopy]);

  return (
    <div
      className={cn(
        "absolute flex items-center justify-start top-2 right-2 z-10 gap-2",
        className
      )}
    >
      <Button
        onClick={() => onCopy("PHONE")}
        className="flex items-center justify-center group"
      >
        <Phone size={20} className="block group-hover:hidden" />
        <span className="hidden group-hover:block">
          {isCopy == "PHONE" ? "Copied" : "Copy phone number"}
        </span>
      </Button>

      <Button
        onClick={() => onCopy("LEADS")}
        className="flex items-center justify-center group"
      >
        <ScrollText size={20} className="block group-hover:hidden" />
        <span className="hidden group-hover:block">
          {isCopy == "LEADS"
            ? "Copied"
            : `Copy ${nombreOfLeads > 1 ? "Leads" : "Lead"}`}
        </span>
      </Button>
    </div>
  );
}
