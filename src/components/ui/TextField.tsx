import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/design";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helper?: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField({ label, helper, error, className, id, ...props }, ref) {
  const fieldId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");
  const descriptionId = `${fieldId}-description`;
  return (
    <label className="grid gap-2 text-sm text-[var(--color-ink)]" htmlFor={fieldId}>
      <span className="font-semibold">{label}</span>
      <input
        id={fieldId}
        ref={ref}
        aria-describedby={helper || error ? descriptionId : undefined}
        className={cn(
          "min-h-12 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/75 px-4 text-[var(--color-ink)] outline-none transition focus:border-[var(--color-forest)] focus:ring-2 focus:ring-[rgba(47,111,72,0.22)]",
          error && "border-[var(--color-redwood)]",
          className,
        )}
        {...props}
      />
      {helper || error ? (
        <span id={descriptionId} className={cn("text-xs text-[var(--color-ink-muted)]", error && "text-[var(--color-redwood)]")}>
          {error ?? helper}
        </span>
      ) : null}
    </label>
  );
});
