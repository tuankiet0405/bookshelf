import type { ReactNode } from "react";
import { X } from "@phosphor-icons/react";

type DrawerProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function Drawer({ open, title, onClose, children }: DrawerProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <button className="absolute inset-0 bg-[rgba(24,32,24,0.34)]" aria-label="Close drawer" onClick={onClose} />
      <aside className="absolute bottom-0 right-0 max-h-[92dvh] w-full overflow-auto rounded-t-[2rem] border border-[var(--color-line)] bg-[var(--color-surface-raised)] p-5 shadow-[var(--shadow-float)] md:bottom-auto md:top-4 md:mr-4 md:h-[calc(100dvh-2rem)] md:max-h-none md:w-[480px] md:rounded-[2rem]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 id="drawer-title" className="font-display text-2xl font-bold tracking-tight">{title}</h2>
          <button className="grid size-10 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]" onClick={onClose} aria-label="Close drawer">
            <X size={18} weight="bold" />
          </button>
        </div>
        {children}
      </aside>
    </div>
  );
}
