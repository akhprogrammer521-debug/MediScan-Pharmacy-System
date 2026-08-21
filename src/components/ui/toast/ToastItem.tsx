import { cn } from "@/lib/cn";
import type { Toast } from "./ToastProvider";

export function ToastItem({ toast }: { toast: Toast }) {
  return (
    <div
      className={cn(
        "min-w-[260px] rounded-xl border p-3 text-sm shadow-card animate-slide-in",
        "bg-surface",

        toast.type === "success" && "border-success text-success",
        toast.type === "error" && "border-danger text-danger",
        toast.type === "warning" && "border-warning text-warning",
        toast.type === "info" && "border-border text-text"
      )}
    >
      {toast.message}
    </div>
  );
}
