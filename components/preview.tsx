import { ClipboardCheck, ClipboardCopy } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TProps = {
  children: React.ReactNode;
  hasResult: boolean;
  asSCVText: string | null;
};

export default function Preview({ children, hasResult, asSCVText }: TProps) {
  const [isCopy, setIsCopy] = useState(false);

  const onCopy = () => {
    setIsCopy(true);
    window.navigator.clipboard.writeText(asSCVText!);
  };

  useEffect(() => {
    const timiID = setTimeout(() => setIsCopy(false), 3000);
    return () => clearTimeout(timiID);
  }, [isCopy]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>CSV Preview</DialogTitle>
        </DialogHeader>
        <div>
          {hasResult ? (
            <div className="relative">
              <Textarea
                value={asSCVText ?? ""}
                className="h-56 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                autoFocus={false}
                onChange={() => null}
              />

              <Button
                size="icon"
                className="absolute bottom-2 right-2 z-10"
                onClick={onCopy}
              >
                {!isCopy ? <ClipboardCopy /> : <ClipboardCheck />}
              </Button>
            </div>
          ) : (
            <p>No content</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
