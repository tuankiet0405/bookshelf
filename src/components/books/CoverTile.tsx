import type { Book, LibraryBook } from "../../types";
import { cn } from "../../lib/design";
import { BookCover3D } from "./BookCover3D";

type CoverTileProps = {
  book: Book | LibraryBook;
  size?: "sm" | "md" | "lg";
  reducedMotion?: boolean;
  className?: string;
  onOpen?: (book: Book | LibraryBook) => void;
};

export function CoverTile({ book, size = "md", reducedMotion, className, onOpen }: CoverTileProps) {
  const content = (
    <div className={cn("group relative grid place-items-center rounded-[1.65rem] bg-white/62 p-3 shadow-[var(--shadow-soft)] transition-transform duration-500 hover:-translate-y-1", className)}>
      <BookCover3D book={book} size={size} reducedMotion={reducedMotion} />
      {book.coverSourceUrl ? (
        <span className="pointer-events-none absolute inset-x-4 bottom-4 rounded-full border border-[var(--color-line)] bg-white/82 px-3 py-1 text-center font-mono-ui text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-subtle)] opacity-0 shadow-[var(--shadow-soft)] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          BCA source
        </span>
      ) : null}
    </div>
  );

  if (!onOpen) return content;

  return (
    <button className="block text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-forest)]" onClick={() => onOpen(book)} aria-label={`Open ${book.title}`}>
      {content}
    </button>
  );
}
