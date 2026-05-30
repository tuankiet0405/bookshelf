import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/design";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "accent" | "warning" | "danger" | "shortcut";
  children: ReactNode;
};

const tones = {
  default: "border-[var(--color-line)] bg-white/70 text-[var(--color-ink-muted)]",
  accent: "border-[rgba(47,111,72,0.22)] bg-[var(--color-moss)] text-[var(--color-forest-dark)]",
  warning: "border-[rgba(215,166,66,0.42)] bg-[rgba(215,166,66,0.14)] text-[var(--color-amber)]",
  danger: "border-[rgba(214,106,87,0.42)] bg-[rgba(214,106,87,0.14)] text-[var(--color-redwood)]",
  shortcut: "border-[var(--color-line)] bg-[var(--color-canvas-soft)] font-mono text-[var(--color-ink)]",
};

export function Badge({ tone = "default", className, children, ...props }: BadgeProps) {
  return (
    <span className={cn("inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold", tones[tone], className)} {...props}>
      {children}
    </span>
  );
}
