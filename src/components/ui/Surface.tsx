import type { HTMLAttributes, ReactNode } from "react";
import { cn, surfaceVariants } from "../../lib/design";

type SurfaceProps = HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof surfaceVariants;
  innerClassName?: string;
  children: ReactNode;
};

export function Surface({ variant = "bezel", className, innerClassName, children, ...props }: SurfaceProps) {
  if (variant !== "bezel") {
    return (
      <div className={cn(surfaceVariants[variant], className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn(surfaceVariants.bezel, className)} {...props}>
      <div className={cn("h-full rounded-[calc(var(--radius-xl)-0.375rem)] bg-[var(--color-surface)] p-5 shadow-[var(--inset-highlight)]", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
