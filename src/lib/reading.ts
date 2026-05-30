import type { LibraryBook, ReadingGoal } from "../types";

export function bookProgress(book: LibraryBook) {
  return Math.min(100, Math.round((book.currentPage / book.pages) * 100));
}

export function booksReadThisYear(library: LibraryBook[], year: number) {
  return library.filter((book) => book.shelf === "read" && book.finishedAt?.startsWith(String(year)));
}

export function totalPagesRead(library: LibraryBook[]) {
  return library.reduce((total, book) => total + Math.min(book.currentPage, book.pages), 0);
}

export function goalPace(goal: ReadingGoal, readCount: number) {
  const now = new Date();
  const start = new Date(goal.year, 0, 1).getTime();
  const end = new Date(goal.year, 11, 31).getTime();
  const elapsed = Math.min(1, Math.max(0, (now.getTime() - start) / (end - start)));
  const expected = goal.target * elapsed;
  const delta = readCount - expected;
  if (readCount >= goal.target) return { label: "complete", delta, expected };
  if (delta >= 1) return { label: "ahead", delta, expected };
  if (delta >= -1) return { label: "on track", delta, expected };
  return { label: "behind", delta, expected };
}

export function monthCounts(library: LibraryBook[], year: number) {
  const counts = Array.from({ length: 12 }, () => 0);
  library.forEach((book) => {
    if (!book.finishedAt?.startsWith(String(year))) return;
    counts[new Date(book.finishedAt).getMonth()] += 1;
  });
  return counts;
}
