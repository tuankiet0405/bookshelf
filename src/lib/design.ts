export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const buttonBase =
  "group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold leading-none transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]";

export const buttonVariants = {
  primary:
    "bg-[var(--color-forest-dark)] text-white shadow-[0_18px_45px_rgba(25,69,45,0.20)] hover:bg-[var(--color-forest)]",
  secondary:
    "border border-[var(--color-line)] bg-white/80 text-[var(--color-ink)] shadow-[var(--shadow-soft)] hover:bg-[var(--color-surface-glow)]",
  ghost: "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-glow)] hover:text-[var(--color-ink)]",
  danger:
    "border border-[rgba(214,106,87,0.35)] bg-[rgba(214,106,87,0.14)] text-[var(--color-redwood)] hover:bg-[rgba(214,106,87,0.22)]",
};

export const surfaceVariants = {
  flat: "rounded-[var(--radius-lg)] bg-[var(--color-surface)]",
  bezel:
    "rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[rgba(255,255,255,0.72)] p-1.5 shadow-[var(--shadow-panel)]",
  floating:
    "rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-float)]",
  inset:
    "rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[rgba(0,0,0,0.22)] shadow-[inset_0_1px_24px_rgba(0,0,0,0.2)]",
};
