import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent } from "react";

type TProps = {
  placeholder: string;
  onBlurFn: () => void;
  value: string;
  onChangeFn: (e: ChangeEvent<HTMLInputElement>) => void;
  onEditFn: (e: FormEvent<HTMLFormElement>) => void;
};

export default function EditForm({
  placeholder,
  onBlurFn,
  value,
  onChangeFn,
  onEditFn,
}: TProps) {
  return (
    <form onSubmit={onEditFn}>
      <Input
        type="text"
        placeholder={placeholder}
        autoFocus
        className="h-8 w-40 rounded-sm"
        onBlur={onBlurFn}
        value={value}
        onChange={onChangeFn}
      />
      <button type="submit" hidden />
    </form>
  );
}
