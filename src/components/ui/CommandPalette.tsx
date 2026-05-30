import { useEffect, useMemo, useRef, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import type { AppView, Book } from "../../types";
import { TextField } from "./TextField";
import { Badge } from "./Badge";

type CommandPaletteProps = {
  open: boolean;
  books: Book[];
  onClose: () => void;
  onNavigate: (view: AppView) => void;
  onBook: (book: Book) => void;
  onTogglePreference: (key: "reducedMotion" | "dyslexia" | "highContrast") => void;
};

const actions: Array<{ label: string; view?: AppView; pref?: "reducedMotion" | "dyslexia" | "highContrast" }> = [
  { label: "Open Library", view: "library" },
  { label: "Discover books", view: "discover" },
  { label: "View annual goal", view: "goals" },
  { label: "Open Year Review", view: "review" },
  { label: "Toggle reduced motion", pref: "reducedMotion" },
  { label: "Toggle dyslexia mode", pref: "dyslexia" },
  { label: "Toggle high contrast", pref: "highContrast" },
];

export function CommandPalette({ open, books, onClose, onNavigate, onBook, onTogglePreference }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const actionResults = actions.filter((action) => action.label.toLowerCase().includes(q));
    const bookResults = books
      .filter((book) => `${book.title} ${book.author} ${book.isbn}`.toLowerCase().includes(q))
      .slice(0, 6);
    return { actions: actionResults, books: bookResults };
  }, [books, query]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(id);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-start bg-[rgba(24,32,24,0.28)] p-4 pt-24 md:place-items-center md:pt-4" role="dialog" aria-modal="true" aria-label="Command palette" onKeyDown={(event) => event.key === "Escape" && onClose()}>
      <button className="absolute inset-0" aria-label="Close command palette" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-surface-raised)] p-3 shadow-[var(--shadow-float)]">
        <div className="rounded-[calc(2rem-0.5rem)] bg-[var(--color-surface)] p-4 shadow-[var(--inset-highlight)]">
          <div className="flex items-end gap-3">
            <MagnifyingGlass className="mb-4 text-[var(--color-ink-muted)]" size={24} />
            <TextField ref={inputRef} label="Command or book search" value={query} onChange={(event) => setQuery(event.target.value)} helper="Search books, jump screens, or toggle reading preferences." />
          </div>
          <div className="mt-5 grid gap-5">
            <section>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-bold">Actions</h3>
                <Badge tone="shortcut">Esc to close</Badge>
              </div>
              <div className="grid gap-2">
                {results.actions.map((action) => (
                  <button
                    key={action.label}
                    className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/70 px-4 py-3 text-left text-sm hover:bg-[var(--color-surface-glow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-forest)]"
                    onClick={() => {
                      if (action.view) onNavigate(action.view);
                      if (action.pref) onTogglePreference(action.pref);
                      onClose();
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </section>
            <section>
              <h3 className="mb-2 text-sm font-bold">Books</h3>
              <div className="grid gap-2">
                {results.books.map((book) => (
                  <button
                    key={book.id}
                    className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/70 px-4 py-3 text-left hover:bg-[var(--color-surface-glow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-forest)]"
                    onClick={() => {
                      onBook(book);
                      onClose();
                    }}
                  >
                    <span className="block font-semibold">{book.title}</span>
                    <span className="text-sm text-[var(--color-ink-muted)]">{book.author} · {book.isbn}</span>
                  </button>
                ))}
                {!results.books.length ? <p className="text-sm text-[var(--color-ink-muted)]">No book matches yet.</p> : null}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
