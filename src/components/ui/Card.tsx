import { cn } from "@/lib/cn";

type CardProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Card({
  title,
  description,
  children,
  className,
}: CardProps) {
  return (
    <div className={cn("card card-md", className)}>
      {title && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold">{title}</h3>
          {description && (
            <p className="text-xs text-muted">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
