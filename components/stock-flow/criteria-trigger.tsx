import {
  criteriaColumns,
  useLeadQueryStore,
} from "@/store/use-lead-query.store";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

export default function CriteriaTrigger() {
  const { isCodeMode, setIsCodeMode, selectedColumns, setSelectedColumns } =
    useLeadQueryStore();

  const onCheckedChange = (checked: CheckedState, columnKey: string) => {
    setSelectedColumns(columnKey, checked as boolean);
  };

  return (
    <div className="flex ictems-center justify-between">
      <div className="flex items-center space-x-2">
        <Switch id="code-mode" onCheckedChange={setIsCodeMode} />
        <Label
          htmlFor="code-mode"
          className={cn(
            isCodeMode ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Code mode
        </Label>
      </div>

      {!isCodeMode && (
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              <p>Add Criteria</p>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="leading-none font-medium">Filter Criteria</h4>
                <p className="text-muted-foreground text-sm">
                  Select filtering options based on your requirements.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                  {criteriaColumns.map((criteria) => (
                    <Label
                      key={criteria.key}
                      className="hover:bg-accent/50 flex items-center justify-between gap-3 rounded-lg px-3 py-2 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                    >
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          {criteria.name}
                        </p>
                      </div>
                      <Checkbox
                        id="toggle-2"
                        checked={
                          selectedColumns &&
                          !!selectedColumns.find((v) => criteria.key == v)
                        }
                        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        onCheckedChange={(checked) =>
                          onCheckedChange(checked, criteria.key)
                        }
                      />
                    </Label>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
