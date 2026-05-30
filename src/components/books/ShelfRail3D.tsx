import type { LibraryBook } from "../../types";
import { Surface } from "../ui/Surface";
import { Badge } from "../ui/Badge";
import { BookCover3D } from "./BookCover3D";
import { CoverTile } from "./CoverTile";

type ShelfRail3DProps = {
  title: string;
  description: string;
  books: LibraryBook[];
  reducedMotion?: boolean;
  onOpen: (book: LibraryBook) => void;
};

export function ShelfRail3D({ title, description, books, reducedMotion, onOpen }: ShelfRail3DProps) {
  return (
    <Surface innerClassName="p-5">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{description}</p>
        </div>
        <Badge>{books.length} books</Badge>
      </div>
      <div className="perspective-stage relative hidden min-h-56 overflow-x-auto overflow-y-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-canvas-soft)] p-5 md:block">
        <div className="shelf-plane absolute bottom-4 left-8 right-8 h-20 rounded-full blur-[0.2px]" />
        {books.length ? (
          <div className="relative z-10 flex min-w-max items-end gap-4 pb-8">
            {books.map((book, index) => (
              <button
                key={book.id}
                className="origin-bottom transition-transform duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-forest)]"
                style={{ transform: reducedMotion ? undefined : `translateZ(${index * 4}px) rotate(${(index % 3) - 1.2}deg)` }}
                onClick={() => onOpen(book)}
              >
                <BookCover3D book={book} size="md" reducedMotion={reducedMotion} />
              </button>
            ))}
          </div>
        ) : (
          <div className="relative z-10 grid min-h-40 place-items-center text-center text-[var(--color-ink-muted)]">
            <p>This shelf is empty. Add a book from Discover to start shaping it.</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-canvas-soft)] p-4 md:hidden">
        {books.length ? (
          books.map((book) => <CoverTile key={book.id} book={book} size="sm" reducedMotion={reducedMotion} onOpen={() => onOpen(book)} />)
        ) : (
          <div className="col-span-2 grid min-h-40 place-items-center text-center text-[var(--color-ink-muted)]">
            <p>This shelf is empty. Add a book from Discover to start shaping it.</p>
          </div>
        )}
      </div>
    </Surface>
  );
}
