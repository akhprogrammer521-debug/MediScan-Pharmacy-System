import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "success" | "warning" | "danger";

type BadgeProps = {
  variant?: BadgeVariant;
  children: React.ReactNode;
};

export function Badge({ variant = "default", children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        variant === "default" && "bg-subtle text-text",
        variant === "success" && "bg-success/10 text-success",
        variant === "warning" && "bg-warning/10 text-warning",
        variant === "danger" && "bg-danger/10 text-danger"
      )}
    >
      {children}
    </span>
  );
}
