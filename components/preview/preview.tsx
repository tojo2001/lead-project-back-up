import {
  ClipboardCheck,
  ClipboardCopy,
  LoaderCircle,
  Phone,
  ScrollText,
} from "lucide-react";
import { Button } from "../ui/button";
import { MutableRefObject, useEffect, useState } from "react";
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
import { Textarea } from "../ui/textarea";
import { useAuthStore } from "@/store/use-auth.store";
import { useClientStore } from "@/store/use-client.store";

type TProps = {
  children: React.ReactNode;
  hasResult: boolean;
  nombreOfLeads: number;
  asSCVText: string | null;
  phoneNumber: string[];
  pending: {
    formatting: boolean;
    processing: boolean;
  };
  onPush: () => Promise<void>;
  closeBtnRef: MutableRefObject<HTMLButtonElement | null>;
};

export default function Preview({
  children,
  hasResult,
  nombreOfLeads,
  phoneNumber,
  asSCVText,
  pending,
  onPush,
  closeBtnRef,
}: TProps) {
  const { authToken, setAuthToken } = useAuthStore();
  const { client } = useClientStore();
  const [isCopy, setIsCopy] = useState<"PHONE" | "LEADS" | false>(false);
  const [step, setStep] = useState<1 | 2 | 0>(1);

  const onCopy = (key: "PHONE" | "LEADS") => {
    setIsCopy(key);
    key === "LEADS"
      ? window.navigator.clipboard.writeText(asSCVText!)
      : window.navigator.clipboard.writeText(
          JSON.stringify(phoneNumber, null, 4)
        );
  };

  const onStepChange = () => {
    setStep((state) => (state === 1 ? 2 : 1));
  };

  useEffect(() => {
    const timiID = setTimeout(() => setIsCopy(false), 3000);
    return () => clearTimeout(timiID);
  }, [isCopy]);

  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => setStep(1)}>
        {children}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{nombreOfLeads} Lead(s) in total</DialogTitle>
          <DialogDescription>
            A total of <span className="font-bold">{nombreOfLeads}</span> lead
            {nombreOfLeads > 1 ? "s" : ""} have been transferred from the{" "}
            <span className="font-bold underline">{client}</span> type to the
            MERE type.
          </DialogDescription>
        </DialogHeader>
        {pending.formatting ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <div>
            {hasResult ? (
              <>
                {step === 1 ? (
                  <div className="relative">
                    <Textarea
                      value={asSCVText ?? ""}
                      className="h-56 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      autoFocus={false}
                      onChange={() => null}
                    />

                    <div className="absolute flex items-center justify-start top-2 right-2 z-10 gap-2">
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
                        <ScrollText
                          size={20}
                          className="block group-hover:hidden"
                        />
                        <span className="hidden group-hover:block">
                          {isCopy == "LEADS"
                            ? "Copied"
                            : `Copy ${nombreOfLeads > 1 ? "Leads" : "Lead"}`}
                        </span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Textarea
                    placeholder="Auth token"
                    value={authToken ?? ""}
                    onChange={(e) => setAuthToken(e.target.value)}
                  />
                )}
              </>
            ) : (
              <p>No content</p>
            )}
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" ref={closeBtnRef}>
              Close
            </Button>
          </DialogClose>

          <Button disabled variant="destructive">
            Proceed to Push
          </Button>
          {/* <Button onClick={onStepChange}>{step === 1 ? "Next" : "Prev"}</Button> */}

          {/* {step === 2 && (
            <Button
              type="submit"
              variant="destructive"
              className="self-end space-x-1"
              disabled={!authToken?.trim() || pending.processing}
              onClick={onPush}
            >
              {pending.processing && (
                <LoaderCircle size="16" className="animate-spin" />
              )}
              {pending.processing ? (
                <p>Processing...</p>
              ) : (
                <p>Proceed to Push</p>
              )}
            </Button>
          )} */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
