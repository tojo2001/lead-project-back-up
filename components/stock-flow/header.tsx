"use client";

import { Copy, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import toastify from "@/utils/toastify";

type TProps = {
  params: {
    id: string;
  };
  searchParams: {
    collection?: string | undefined;
    campagne_name?: string | undefined;
    entity_id?: string | undefined;
    campaign_setting_id?: string | undefined;
  };
};

export default function Header({ params, searchParams }: TProps) {
  const paramsData = [
    {
      name: "CAMPAGNE ID",
      value: params.id,
    },
    {
      name: "ENTITY ID",
      value: searchParams.entity_id,
    },
    {
      name: "SETTING ID",
      value: searchParams.campaign_setting_id,
    },
  ];

  const copyHandler = (value: string) => {
    if (!value) return;

    // Copy to clipboard
    navigator.clipboard
      .writeText(value)
      .then(() => {
        console.log(`Copied: ${value}`);
        // Optional: show a toast notification
        toastify("success", "Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        toastify("error", "Failed to copy");
      });
  };

  return (
    <div className="flex items-center justify-between w-full max-w-6xl mx-auto rounded-md border py-2 px-4 border-gray-800 bg-slate-900 shadow-lg text-foreground">
      <div>
        <h1 className="font-semibold text-foreground">
          {searchParams.campagne_name}
        </h1>
        <p className="text-sm text-muted-foreground">
          Campaign overview details
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-300">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="!bg-accent text-foreground hover:!bg-accent/90"
            >
              <Settings2 />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-4 mr-[7rem]">
            <div className="space-y-4">
              {/* Header */}
              <div className="space-y-1">
                <h4 className="text-sm font-semibold leading-none">
                  Dimensions
                </h4>
                <p className="text-xs text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>

              {/* Parameters */}
              <div className="grid gap-2">
                {paramsData.map((param) => (
                  <div
                    key={param.name}
                    className="grid grid-cols-2 gap-4 items-center"
                  >
                    <p className="text-sm text-gray-400">{param.name}</p>
                    <p className="flex items-center space-x-1 text-sm font-medium text-foreground text-right">
                      <span>{param.value}</span>
                      <Copy
                        size={13}
                        className="cursor-pointer text-gray-400 hover:text-gray-200"
                        onClick={() => copyHandler(param.value!)}
                      />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
