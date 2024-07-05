import { ClipboardCheck, ClipboardCopy } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
          {hasResult ? (
            <DialogContent className="w-full">
              <div className="relative border rounded-md overflow-auto p-2 w-full h-60">
                {asSCVText}
                <Button
                  size="icon"
                  className="absolute top-2 right-2 z-10"
                  onClick={onCopy}
                >
                  {!isCopy ? <ClipboardCopy /> : <ClipboardCheck />}
                </Button>
              </div>
            </DialogContent>
          ) : (
            <DialogContent>No content</DialogContent>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
