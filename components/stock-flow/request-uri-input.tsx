import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLeadOutputPanelStore } from "@/store/use-lead-output-panel.store";
import { CheckCheck, Copy, Loader2, X } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { useLeadQueryStore } from "@/store/use-lead-query.store";
import toastify from "@/utils/toastify";

export default function RequestUriInput() {
  const { isRequestURIMode, setisRequestURIMode } = useLeadQueryStore();
  const { outputResult, setOutputResult } = useLeadOutputPanelStore();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [URIValue, setURIValue] = useState("");
  const [isValidURI, setIsValidURI] = useState(false);

  const onCheckedChange = (checked: boolean) => {
    setisRequestURIMode(checked);

    if (!checked) {
      setURIValue("");
      setIsValidURI(false);
    }
  };

  const handleCopy = async () => {
    if (!outputResult.requestURI) return;
    await navigator.clipboard.writeText(outputResult.requestURI);
    toastify("success", "Copied");
  };

  const onChangeURI = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    try {
      // ✅ Check if it's a valid URL
      new URL(value);
      setURIValue(value);
      setIsValidURI(true);
    } catch {
      // 🚫 Invalid URL — just ignore or handle gracefully
      setIsValidURI(false);
      return;
    }
  };

  const onRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidURI || isSubmiting) return;

    setIsSubmiting(true);

    try {
      // ✅ Check if it's a valid URL
      new URL(URIValue);

      console.log(URIValue);

      const res = await fetch(URIValue, { cache: "no-store" });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data: TOutPutResult = await res.json();

      setOutputResult(data);
    } catch {
      // 🚫 Invalid URL — just ignore or handle gracefully
      console.warn("Invalid URL:", URIValue);
      return;
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center space-x-2">
        <Switch id="URI" onCheckedChange={onCheckedChange} />
        <Label
          htmlFor="URI"
          className={cn(
            isRequestURIMode ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Request by URI
        </Label>
      </div>
      <form className="relative" onSubmit={onRequest}>
        <Input
          type="url"
          placeholder="Request URI"
          readOnly={!isRequestURIMode}
          className="pr-12"
          disabled={isSubmiting}
          value={!isRequestURIMode ? outputResult.requestURI! : URIValue}
          onChange={onChangeURI}
        />
        {isRequestURIMode ? (
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            title="Submit"
          >
            {isSubmiting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {isValidURI ? (
                  <CheckCheck className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-destructive" />
                )}
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={handleCopy}
            className="absolute right-1 top-1/2 -translate-y-1/2"
            title="Copy URI"
          >
            <Copy className="h-4 w-4" />
          </Button>
        )}
      </form>
    </div>
  );
}
