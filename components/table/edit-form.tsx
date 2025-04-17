import { ChangeEvent, FormEvent, MutableRefObject } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TProps = {
  formtype: "select" | "input";
  formData: {
    select?: {
      placeholder: string;
      onBlurFn: () => void;
      value: string;
      changeSelectHandler: (selectedValue: string) => void;
      options: string[];
      onEditFn: (e: FormEvent<HTMLFormElement>) => void;
      selectSubmitBtnFormRef: MutableRefObject<HTMLButtonElement | null>;
    };
    input?: {
      placeholder: string;
      onBlurFn: () => void;
      value: string;
      onChangeFn: (e: ChangeEvent<HTMLInputElement>) => void;
      onEditFn: (e: FormEvent<HTMLFormElement>) => void;
    };
  };
};

export default function EditForm({ formtype, formData }: TProps) {
  return (
    <>
      {formtype == "input" && (
        <form onSubmit={formData[formtype]?.onEditFn}>
          <Input
            type="text"
            placeholder={formData[formtype]?.placeholder}
            autoFocus
            className="h-8 w-40 rounded-sm"
            onBlur={formData[formtype]?.onBlurFn}
            value={formData[formtype]?.value}
            onChange={formData[formtype]?.onChangeFn}
          />
          <button type="submit" hidden />
        </form>
      )}

      {formtype == "select" && (
        <form onSubmit={formData[formtype]?.onEditFn}>
          <Select onValueChange={formData[formtype]?.changeSelectHandler}>
            <SelectTrigger
              className="w-[180px]"
              onBlur={formData[formtype]?.onBlurFn}
            >
              <SelectValue placeholder={formData[formtype]?.placeholder} />
            </SelectTrigger>
            <SelectContent className="max-h-44 h-full overflow-y-auto">
              <SelectGroup>
                {formData[formtype]?.options.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <button
            type="submit"
            ref={formData[formtype]?.selectSubmitBtnFormRef}
            hidden
          />
        </form>
      )}
    </>
  );
}
