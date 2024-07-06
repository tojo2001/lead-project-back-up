import { ClipboardCheck, ClipboardCopy, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";

type TProps = {
  children: React.ReactNode;
  hasResult: boolean;
  asSCVText: string | null;
  pending: boolean;
};

export default function Preview({
  children,
  hasResult,
  asSCVText,
  pending,
}: TProps) {
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
        {pending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
}
