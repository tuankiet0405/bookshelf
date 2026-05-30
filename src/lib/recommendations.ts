import type { Book, LibraryBook } from "../types";

export function recommendBooks(allBooks: Book[], library: LibraryBook[]) {
  const owned = new Set(library.map((book) => book.id));
  const favoriteGenres = library
    .filter((book) => (book.rating ?? 0) >= 4)
    .reduce<Record<string, number>>((acc, book) => {
      acc[book.genre] = (acc[book.genre] ?? 0) + 1;
      return acc;
    }, {});

  const topGenre = Object.entries(favoriteGenres).sort((a, b) => b[1] - a[1])[0]?.[0];

  return allBooks
    .filter((book) => !owned.has(book.id))
    .map((book) => ({
      book,
      reason:
        book.genre === topGenre
          ? `Because you rated ${book.genre.toLowerCase()} highly.`
          : book.pages < 260
            ? "Because your shelf could use a fast, satisfying finish."
            : `Because your archive has room for more ${book.genre.toLowerCase()}.`,
      score: (book.genre === topGenre ? 3 : 1) + (book.pages < 320 ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}
