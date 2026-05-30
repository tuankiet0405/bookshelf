import { Check, Plus } from "@phosphor-icons/react";
import type { Book, LibraryBook, ShelfId } from "../../types";
import { bookProgress } from "../../lib/reading";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Surface } from "../ui/Surface";
import { BookCover3D } from "./BookCover3D";

type BookCardProps = {
  book: Book | LibraryBook;
  owned?: boolean;
  reducedMotion?: boolean;
  onOpen?: (book: Book | LibraryBook) => void;
  onAdd?: (book: Book, shelf?: ShelfId) => void;
};

export function BookCard({ book, owned, reducedMotion, onOpen, onAdd }: BookCardProps) {
  const libraryBook = "shelf" in book ? book : undefined;
  const progress = libraryBook ? bookProgress(libraryBook) : 0;

  return (
    <Surface className="group h-full transition-transform duration-500 hover:-translate-y-1" innerClassName="grid h-full gap-4 p-4">
      <button className="grid place-items-center rounded-[1.5rem] bg-[var(--color-canvas-soft)] p-4 text-left" onClick={() => onOpen?.(book)} aria-label={`Open ${book.title}`}>
        <BookCover3D book={book} size="md" reducedMotion={reducedMotion} />
      </button>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">{book.genre}</Badge>
            {book.coverSourceUrl ? <Badge>Cover Archive</Badge> : null}
          </div>
          <button className="mt-3 block text-left" onClick={() => onOpen?.(book)}>
            <h3 className="line-clamp-2 font-display text-2xl font-black tracking-tight text-[var(--color-ink)]">{book.title}</h3>
            <p className="mt-1 text-sm font-semibold text-[var(--color-ink-muted)]">{book.author}</p>
          </button>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--color-ink-subtle)]">{book.summary}</p>
        </div>
        <div className="grid gap-3">
          {libraryBook ? (
            <>
              <div className="flex items-center justify-between text-xs text-[var(--color-ink-muted)]">
                <span>{libraryBook.currentPage}/{libraryBook.pages} pages</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--color-canvas-soft)]">
                <span className="block h-full rounded-full bg-[var(--color-forest)]" style={{ width: `${progress}%` }} />
              </div>
            </>
          ) : (
            <Button variant={owned ? "secondary" : "primary"} disabled={owned} onClick={() => onAdd?.(book as Book, "want")} className="w-full px-4 py-3 sm:w-fit">
              {owned ? <Check size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
              {owned ? "In Library" : "Add"}
            </Button>
          )}
        </div>
      </div>
    </Surface>
  );
}
