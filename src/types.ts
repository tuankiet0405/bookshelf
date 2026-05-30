export type ShelfId = "want" | "reading" | "read" | "paused" | string;

export type Genre =
  | "Speculative Fiction"
  | "Mystery"
  | "Nonfiction"
  | "Fantasy"
  | "Literary";

export type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: Genre;
  pages: number;
  year: number;
  summary: string;
  coverImageUrl?: string;
  coverSourceUrl?: string;
  coverCredit?: string;
  coverAlt?: string;
  cover: {
    from: string;
    to: string;
    accent: string;
  };
};

export type LibraryBook = Book & {
  shelf: ShelfId;
  currentPage: number;
  rating?: number;
  notes: string;
  startedAt?: string;
  finishedAt?: string;
};

export type Shelf = {
  id: ShelfId;
  name: string;
  description: string;
};

export type ReadingGoal = {
  year: number;
  target: number;
};

export type Preferences = {
  reducedMotion: boolean;
  highContrast: boolean;
  dyslexia: boolean;
  largeText: boolean;
  spacious: boolean;
};

export type AppView = "home" | "library" | "discover" | "goals" | "review" | "settings";

export type ToastMessage = {
  id: number;
  tone: "success" | "warning" | "error";
  text: string;
};
