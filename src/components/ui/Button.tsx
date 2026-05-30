import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { buttonBase, buttonVariants, cn } from "../../lib/design";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
  trailingIcon?: boolean;
  children: ReactNode;
};

export function Button({ variant = "primary", trailingIcon, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonBase, buttonVariants[variant], className)} {...props}>
      <span className="inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
      {trailingIcon ? (
        <span className="grid size-7 place-items-center rounded-full bg-white/18 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowRight size={16} weight="bold" />
        </span>
      ) : null}
    </button>
  );
}
