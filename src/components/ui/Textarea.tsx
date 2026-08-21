import { cn } from "@/lib/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm",
        "placeholder:text-muted",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        "resize-y min-h-[96px]",
        className
      )}
    />
  );
}
