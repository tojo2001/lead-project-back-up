import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MutableRefObject, useState } from "react";
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
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "../ui/textarea";
import { useClientStore } from "@/store/use-client.store";
import { useLeadStore } from "@/store/use-lead.store";
import CopySection from "../copy-section";
import { TriangleAlert } from "lucide-react";
import { pushContactAction } from "@/actions/push-contact.action";

type TProps = {
  children: React.ReactNode;
  closeBtnRef: MutableRefObject<HTMLButtonElement | null>;
};

export default function Preview({ children, closeBtnRef }: TProps) {
  const { client } = useClientStore();
  const { leadData } = useLeadStore();
  const [mereType, setMereType] = useState<TMere | null>(null);
  const [pending, setPending] = useState({
    formatting: false,
    processing: false,
  });

  const [step, setStep] = useState<1 | 2 | 0>(1);

  const nombreOfLeads = leadData.asArray?.length ?? 0;

  const onStepChange = () => {
    setStep((state) => (state === 1 ? 2 : 1));
    setMereType(null);
  };

  const onMereChange = (value: string) => {
    setMereType(value as TMere);
  };

  const onPush = async () => {
    if (!leadData.asArray || !leadData.asCSVText) return;

    const isConfirmed = confirm(
      `Are you absolutely sure to push ${leadData.asArray.length} leads(s) to ${mereType} ?`
    );

    if (!isConfirmed) {
      setStep(1);
      return;
    }

    setPending((state) => ({
      ...state,
      processing: true,
    }));

    try {
      const { success, message, dataResponse } = await pushContactAction({
        mereType: "mere2",
        dataContacts: leadData.asCSVText,
      });

      if (!success) throw new Error(message);

      toast({
        title: message,
      });

      console.log(dataResponse);

      closeBtnRef.current?.click();
    } catch (error: any) {
      toast({
        title: error.message,
      });
    } finally {
      setPending((state) => ({
        ...state,
        processing: false,
      }));
    }
  };

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
            {!!leadData.asArray ? (
              <>
                {step === 1 ? (
                  <div className="relative">
                    <Textarea
                      value={leadData.asCSVText ?? ""}
                      className="h-56 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      autoFocus={false}
                      onChange={() => null}
                    />

                    <CopySection />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Select onValueChange={onMereChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mere1">Push to MERE 1</SelectItem>
                        <SelectItem value="mere2">Push to MERE 2</SelectItem>
                        <SelectItem value="mere3">Push to MERE 3</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Warning text */}
                    {!!mereType && (
                      <div>
                        <p className="flex items-center justify-start gap-1">
                          <TriangleAlert
                            size={14}
                            className="text-orange-400"
                          />{" "}
                          <span className="text-sm text-orange-400 underline">
                            Warning :
                          </span>
                        </p>
                        <p className="flex items-center justify-start gap-2 text-sm pl-1">
                          <span className="h-[4.5rem] w-[0.35rem] bg-orange-400" />
                          <span>
                            Please double-check that the ratio at which the
                            leads will be sent has been properly modified.{" "}
                            <br />
                            <i>
                              (Veuillez vérifier que le ratio d'envoi des leads
                              a été correctement modifié.)
                            </i>
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
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

          <Button onClick={onStepChange}>
            {step === 1 ? "Continue to Push" : "Return to Preview"}
          </Button>

          {step === 2 && (
            <Button
              type="submit"
              variant="destructive"
              className="self-end space-x-1"
              disabled={!mereType || pending.processing}
              onClick={onPush}
            >
              {pending.processing && (
                <LoaderCircle size="16" className="animate-spin" />
              )}
              {pending.processing ? <p>Processing...</p> : <p>Push</p>}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
