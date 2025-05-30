import { toast } from "sonner";

type ToastTypes =
  | "normal"
  | "action"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "loading"
  | "default";

export default function toastify(type: ToastTypes, message: string) {
  if (type == "success") {
    toast.success(message);
    return;
  }

  if (type == "error") {
    toast.error(message);
    return;
  }

  toast.info(message);
}
