import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border bg-surface px-3 py-2 text-sm",
        "placeholder:text-muted",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        className
      )}
    />
  );
}
