import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "soft" | "danger" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition",
        "active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",

        /* Variants */
        variant === "primary" &&
          "bg-primary text-primaryFg hover:opacity-90",
        variant === "soft" &&
          "bg-subtle text-text hover:bg-border",
        variant === "danger" &&
          "bg-danger text-white hover:opacity-90",
        variant === "outline" &&
          "border border-border bg-transparent hover:bg-subtle",

        /* Sizes */
        size === "sm" && "h-8 px-3 text-xs",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-12 px-6 text-base",

        className
      )}
      {...props}
    />
  );
}
