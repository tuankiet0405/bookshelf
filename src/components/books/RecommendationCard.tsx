import type { Book } from "../../types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Surface } from "../ui/Surface";
import { BookCover3D } from "./BookCover3D";

export function RecommendationCard({ book, reason, onAdd }: { book: Book; reason: string; onAdd: (book: Book) => void }) {
  return (
    <Surface innerClassName="grid gap-4 p-4">
      <div className="flex gap-4">
        <BookCover3D book={book} size="sm" />
        <div className="min-w-0">
          <Badge tone="accent">Recommended</Badge>
          <h3 className="mt-3 line-clamp-2 font-display text-xl font-bold tracking-tight">{book.title}</h3>
          <p className="text-sm text-[var(--color-ink-muted)]">{book.author}</p>
        </div>
      </div>
      <p className="text-sm text-[var(--color-ink-muted)]">{reason}</p>
      <Button className="w-fit px-4 py-2" onClick={() => onAdd(book)}>Add to shelf</Button>
    </Surface>
  );
}
