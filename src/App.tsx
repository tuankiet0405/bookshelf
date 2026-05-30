import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import {
  Books,
  ChartLineUp,
  Command,
  Compass,
  GearSix,
  House,
  ListChecks,
  MoonStars,
  PaintBrush,
  Sparkle,
  Target,
} from "@phosphor-icons/react";
import { coverArchivePicks, guestLibrary, shelves } from "./data/books";
import type { AppView, Book, LibraryBook, Preferences, ReadingGoal, ShelfId, ToastMessage } from "./types";
import { cn } from "./lib/design";
import { bookProgress, booksReadThisYear, goalPace, monthCounts, totalPagesRead } from "./lib/reading";
import { recommendBooks } from "./lib/recommendations";
import { Button } from "./components/ui/Button";
import { Surface } from "./components/ui/Surface";
import { Badge } from "./components/ui/Badge";
import { TextField } from "./components/ui/TextField";
import { ProgressRing } from "./components/ui/ProgressRing";
import { Drawer } from "./components/ui/Drawer";
import { Toasts } from "./components/ui/Toast";
import { CommandPalette } from "./components/ui/CommandPalette";
import { SkipLink } from "./components/accessibility/SkipLink";
import { BookCover3D } from "./components/books/BookCover3D";
import { BookCard } from "./components/books/BookCard";
import { CoverTile } from "./components/books/CoverTile";
import { ShelfRail3D } from "./components/books/ShelfRail3D";
import { RecommendationCard } from "./components/books/RecommendationCard";

const navItems: Array<{ id: AppView; label: string; icon: typeof House }> = [
  { id: "home", label: "Home", icon: House },
  { id: "library", label: "Library", icon: Books },
  { id: "discover", label: "Discover", icon: Compass },
  { id: "goals", label: "Goals", icon: Target },
  { id: "review", label: "Review", icon: ChartLineUp },
  { id: "settings", label: "Settings", icon: GearSix },
];

const defaultPreferences: Preferences = {
  reducedMotion: false,
  highContrast: false,
  dyslexia: false,
  largeText: false,
  spacious: false,
};

export default function App() {
  const [view, setView] = useState<AppView>("home");
  const [library, setLibrary] = useState<LibraryBook[]>(guestLibrary);
  const [selectedBook, setSelectedBook] = useState<Book | LibraryBook | null>(null);
  const [search, setSearch] = useState("");
  const [goal, setGoal] = useState<ReadingGoal>({ year: 2026, target: 32 });
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  const reducedMotion = preferences.reducedMotion;
  const readThisYear = booksReadThisYear(library, goal.year);
  const pace = goalPace(goal, readThisYear.length);
  const catalog = useMemo(() => coverArchivePicks.filter((book) => book.coverImageUrl), []);
  const recs = useMemo(() => recommendBooks(catalog, library), [catalog, library]);
  const ownedIds = useMemo(() => new Set(library.map((book) => book.id)), [library]);
  const currentReads = library.filter((book) => book.shelf === "reading");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setSelectedBook(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!heroRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-reveal]", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
      });
      gsap.from("[data-shelf-book]", {
        opacity: 0,
        y: 40,
        z: -80,
        rotateY: -18,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.15,
      });
    }, heroRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  function pushToast(text: string, tone: ToastMessage["tone"] = "success") {
    const id = Date.now();
    setToasts((messages) => [...messages, { id, text, tone }]);
    window.setTimeout(() => setToasts((messages) => messages.filter((message) => message.id !== id)), 2600);
  }

  function addBook(book: Book, shelf: ShelfId = "want") {
    if (ownedIds.has(book.id)) {
      pushToast("Already in your library", "warning");
      return;
    }
    setLibrary((items) => [
      ...items,
      {
        ...book,
        shelf,
        currentPage: 0,
        notes: "",
        startedAt: shelf === "reading" ? new Date().toISOString().slice(0, 10) : undefined,
      },
    ]);
    pushToast(`Added ${book.title}`);
  }

  function updateBook(id: string, patch: Partial<LibraryBook>) {
    setLibrary((items) => items.map((book) => (book.id === id ? { ...book, ...patch } : book)));
  }

  function openBook(book: Book | LibraryBook) {
    const owned = library.find((item) => item.id === book.id);
    setSelectedBook(owned ?? book);
  }

  const query = search.trim().toLowerCase();
  const searchResults = query
    ? catalog.filter((book) => `${book.title} ${book.author} ${book.isbn}`.toLowerCase().includes(query))
    : [];

  return (
    <div
      className={cn(
        "app-root",
        reducedMotion && "reduced-motion",
        preferences.highContrast && "high-contrast",
        preferences.dyslexia && "dyslexia-mode",
        preferences.largeText && "large-text",
        preferences.spacious && "spacious-mode",
      )}
    >
      <SkipLink />
      <FloatingNav view={view} setView={setView} onPalette={() => setPaletteOpen(true)} />
      <main id="main-content" className="mx-auto min-h-dvh w-full max-w-[1440px] px-4 pb-28 pt-24 md:px-7 md:pb-10">
        {view === "home" ? (
          <Landing heroRef={heroRef} setView={setView} currentReads={currentReads} coverPicks={catalog} reducedMotion={reducedMotion} />
        ) : (
          <AppShell view={view} setView={setView}>
            {view === "library" && <Library library={library} reducedMotion={reducedMotion} onOpen={openBook} />}
            {view === "discover" && (
              <Discover search={search} setSearch={setSearch} results={searchResults} ownedIds={ownedIds} onOpen={openBook} onAdd={addBook} recommendations={recs} coverPicks={coverArchivePicks} />
            )}
            {view === "goals" && <Goals library={library} goal={goal} setGoal={setGoal} readThisYear={readThisYear} pace={pace} />}
            {view === "review" && <Review library={library} goal={goal} readThisYear={readThisYear} reducedMotion={reducedMotion} />}
            {view === "settings" && <Settings preferences={preferences} setPreferences={setPreferences} />}
          </AppShell>
        )}
      </main>
      <BookDetailDrawer
        book={selectedBook}
        libraryBook={selectedBook ? library.find((book) => book.id === selectedBook.id) : undefined}
        onClose={() => setSelectedBook(null)}
        onAdd={addBook}
        onUpdate={updateBook}
        reducedMotion={reducedMotion}
      />
      <CommandPalette
        open={paletteOpen}
        books={catalog}
        onClose={() => setPaletteOpen(false)}
        onNavigate={setView}
        onBook={openBook}
        onTogglePreference={(key) => setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))}
      />
      <Toasts messages={toasts} />
    </div>
  );
}

function FloatingNav({ view, setView, onPalette }: { view: AppView; setView: (view: AppView) => void; onPalette: () => void }) {
  return (
    <header className="fixed inset-x-0 top-4 z-20 px-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border border-[var(--color-line)] bg-[rgba(255,255,255,0.82)] p-2 shadow-[var(--shadow-panel)] backdrop-blur-xl">
        <button className="flex items-center gap-2 rounded-full px-3 py-2 text-left" onClick={() => setView("home")}>
          <span className="grid size-9 place-items-center rounded-full bg-[var(--color-forest-dark)] text-white"><MoonStars size={18} weight="fill" /></span>
          <span className="hidden font-display font-black tracking-tight sm:block">Bookshelf</span>
        </button>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button key={item.id} className={cn("rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-glow)] hover:text-[var(--color-ink)]", view === item.id && "bg-[var(--color-moss)] text-[var(--color-forest-dark)]")} onClick={() => setView(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/70 px-3 py-2 text-sm text-[var(--color-ink-muted)]" onClick={onPalette}>
          <Command size={18} />
          <span className="hidden sm:inline">Command</span>
          <Badge tone="shortcut">⌘K</Badge>
        </button>
      </nav>
    </header>
  );
}

function MobileNav({ view, setView }: { view: AppView; setView: (view: AppView) => void }) {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-6 gap-1 rounded-full border border-[var(--color-line)] bg-[rgba(255,255,255,0.9)] p-2 shadow-[var(--shadow-float)] backdrop-blur-xl md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button key={item.id} className={cn("grid place-items-center rounded-full py-2 text-[var(--color-ink-muted)]", view === item.id && "bg-[var(--color-forest-dark)] text-white")} onClick={() => setView(item.id)} aria-label={item.label}>
            <Icon size={20} weight={view === item.id ? "fill" : "regular"} />
          </button>
        );
      })}
    </nav>
  );
}

function Landing({ heroRef, setView, currentReads, coverPicks, reducedMotion }: { heroRef: React.RefObject<HTMLDivElement | null>; setView: (view: AppView) => void; currentReads: LibraryBook[]; coverPicks: Book[]; reducedMotion: boolean }) {
  const heroBooks = coverPicks.slice(0, 5);
  const flow = [
    ["01", "Find", "Search a real cover-led catalog by title, author, or archive ID."],
    ["02", "Shelve", "Move books into Want, Reading, Read, or Paused without losing context."],
    ["03", "Reflect", "Turn progress, notes, and goals into a calm year-in-review."],
  ];
  return (
    <div ref={heroRef} className="grid gap-16 md:gap-20">
      <section className="grid items-center gap-8 pt-2 md:min-h-[calc(100dvh-6rem)] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-10">
          <Badge tone="accent" data-hero-reveal>Soft spatial reading tracker</Badge>
          <h1 data-hero-reveal className="mt-6 max-w-3xl font-display text-5xl font-black leading-[0.98] tracking-[-0.06em] text-[var(--color-ink)] md:text-6xl xl:text-7xl">
            A calmer way to keep your reading life.
          </h1>
          <p data-hero-reveal className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-ink-muted)] md:max-w-lg">
            Track books, goals, notes, and yearly highlights in one soft spatial library.
          </p>
          <div data-hero-reveal className="mt-8 flex flex-wrap gap-3">
            <Button trailingIcon onClick={() => setView("library")}>Try guest</Button>
            <Button variant="secondary" onClick={() => setView("discover")}>Browse covers</Button>
          </div>
          <div data-hero-reveal className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {[
              [String(coverPicks.length), "cover picks"],
              [String(currentReads.length), "active reads"],
              ["⌘K", "quick actions"],
            ].map(([value, label]) => (
              <div key={label} className="border-t border-[var(--color-line)] pt-3">
                <strong className="block font-display text-3xl tracking-tight">{value}</strong>
                <span className="text-xs font-semibold text-[var(--color-ink-muted)]">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="perspective-stage relative min-h-[390px] overflow-visible rounded-[2.5rem] border border-[var(--color-line)] bg-[linear-gradient(135deg,#fff,#eef4ea)] p-5 shadow-[var(--shadow-panel)] md:min-h-[470px] md:p-8">
          <div className="absolute left-5 top-5 z-20 max-w-52 rounded-2xl border border-[var(--color-line)] bg-white/82 p-4 shadow-[var(--shadow-soft)] md:left-8 md:top-8">
            <p className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink-subtle)]">Quiet Cover Room</p>
            <p className="mt-2 text-sm text-[var(--color-ink-muted)]">Rare books room meets modern museum catalog.</p>
          </div>
          <div className="relative z-10 ml-auto grid min-h-[350px] max-w-[650px] grid-cols-5 items-end gap-2 pb-16 pt-24 md:min-h-[430px] md:gap-4 md:pb-20">
            {heroBooks.map((book, index) => (
              <div key={book.id} data-shelf-book className="origin-bottom justify-self-center" style={{ transform: reducedMotion ? undefined : `translateY(${[28, 8, 0, 18, 38][index] ?? 0}px) rotate(${[-4, -2, 1, 3, -1][index] ?? 0}deg)` }}>
                <BookCover3D book={book} size={index === 2 ? "lg" : index % 2 ? "md" : "sm"} reducedMotion={reducedMotion} />
              </div>
            ))}
          </div>
          <div className="shelf-plane absolute bottom-14 left-6 right-6 h-24 rounded-full md:left-10 md:right-10" />
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-2 rounded-[1.5rem] border border-[var(--color-line)] bg-white/76 p-3 backdrop-blur-sm md:p-4">
            <span className="text-sm font-semibold text-[var(--color-ink-muted)]">Real covers from Book Cover Archive</span>
            <span className="font-mono-ui text-xs text-[var(--color-ink-subtle)]">source credited in every drawer</span>
          </div>
        </div>
      </section>
      <section className="grid gap-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-4xl font-black tracking-tight">A cover-led way to find your next read.</h2>
            <p className="mt-3 max-w-2xl text-[var(--color-ink-muted)]">Browse a visual shelf, save what catches your eye, and keep every source credited.</p>
          </div>
          <Button variant="ghost" className="hidden md:inline-flex" onClick={() => setView("discover")}>View archive picks</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {coverPicks.slice(7, 19).map((book, index) => (
            <CoverTile key={book.id} book={book} size="sm" reducedMotion={reducedMotion} className={cn(index % 5 === 0 && "md:translate-y-8")} />
          ))}
        </div>
      </section>
      <section className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <Surface innerClassName="p-7 md:p-10">
          <h2 className="font-display text-4xl font-black tracking-tight">Three small rituals, one quiet system.</h2>
          <p className="mt-4 text-[var(--color-ink-muted)]">No spreadsheet feeling. Just finding, shelving, and reflecting with enough structure to stay consistent.</p>
        </Surface>
        <div className="grid gap-4 md:grid-cols-3">
          {flow.map(([step, title, text]) => (
            <Surface key={step} innerClassName="p-6">
              <span className="font-mono-ui text-xs font-bold text-[var(--color-forest)]">{step}</span>
              <h3 className="mt-5 font-display text-2xl font-black tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">{text}</p>
            </Surface>
          ))}
        </div>
      </section>
      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Surface innerClassName="grid gap-5 p-7 md:p-10">
          <div className="flex items-center gap-3 text-sm font-semibold text-[var(--color-ink-muted)]"><ListChecks className="text-[var(--color-forest)]" size={20} />Current reads stay visible</div>
          <div className="grid gap-4 md:grid-cols-2">
            {currentReads.slice(0, 2).map((book) => (
              <div key={book.id} className="flex gap-4 rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-surface-glow)] p-4">
                <BookCover3D book={book} size="sm" reducedMotion={reducedMotion} />
                <div>
                  <h3 className="font-display text-xl font-black tracking-tight">{book.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{book.currentPage}/{book.pages} pages</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                    <span className="block h-full rounded-full bg-[var(--color-forest)]" style={{ width: `${bookProgress(book)}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Surface>
        <Surface innerClassName="p-7 md:p-10">
          <h2 className="font-display text-4xl font-black tracking-tight">A year review that feels personal.</h2>
          <p className="mt-4 text-[var(--color-ink-muted)]">Books read, pages finished, top genres, and favorite notes become a shareable reading card.</p>
          <Button className="mt-8" variant="secondary" onClick={() => setView("review")}>Preview review</Button>
        </Surface>
      </section>
    </div>
  );
}

function AppShell({ view, setView, children }: { view: AppView; setView: (view: AppView) => void; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="min-w-0">{children}</div>
      <MobileNav view={view} setView={setView} />
    </div>
  );
}

function Library({ library, reducedMotion, onOpen }: { library: LibraryBook[]; reducedMotion: boolean; onOpen: (book: LibraryBook) => void }) {
  return (
    <div className="grid gap-6">
      <PageHeader icon={<Books size={24} />} title="Your Library" subtitle="Organize books into spatial shelves and update progress without leaving the archive." />
      {shelves.map((shelf) => (
        <ShelfRail3D key={shelf.id} title={shelf.name} description={shelf.description} books={library.filter((book) => book.shelf === shelf.id)} reducedMotion={reducedMotion} onOpen={onOpen} />
      ))}
    </div>
  );
}

function Discover({ search, setSearch, results, ownedIds, onOpen, onAdd, recommendations, coverPicks }: { search: string; setSearch: (value: string) => void; results: Book[]; ownedIds: Set<string>; onOpen: (book: Book) => void; onAdd: (book: Book) => void; recommendations: ReturnType<typeof recommendBooks>; coverPicks: Book[] }) {
  return (
    <div className="grid gap-6">
      <PageHeader icon={<Compass size={24} />} title="Discover" subtitle="Search by title, author, or ISBN, then add the next great read to a shelf." />
      <Surface innerClassName="p-5">
        <TextField label="Search books" value={search} onChange={(event) => setSearch(event.target.value)} helper="Local data now, API-ready later. Try ISBN, Le Guin, mystery, or habits." />
      </Surface>
      {search ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.length ? results.map((book) => <BookCard key={book.id} book={book} owned={ownedIds.has(book.id)} onOpen={onOpen} onAdd={onAdd} />) : <EmptyState title="No matches" text="Try another title, author, ISBN, or genre." />}
        </section>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recommendations.map(({ book, reason }) => <RecommendationCard key={book.id} book={book} reason={reason} onAdd={onAdd} />)}
          </section>
          <section className="grid gap-4">
            <div>
              <h2 className="font-display text-3xl font-black tracking-tight">Cover Archive Picks</h2>
              <p className="mt-2 max-w-2xl text-[var(--color-ink-muted)]">A design-led shelf using public cover images from Book Cover Archive, with source links in each detail drawer.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {coverPicks.map((book) => <BookCard key={book.id} book={book} owned={ownedIds.has(book.id)} onOpen={onOpen} onAdd={onAdd} />)}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function Goals({ library, goal, setGoal, readThisYear, pace }: { library: LibraryBook[]; goal: ReadingGoal; setGoal: (goal: ReadingGoal) => void; readThisYear: LibraryBook[]; pace: ReturnType<typeof goalPace> }) {
  const progress = Math.min(100, Math.round((readThisYear.length / goal.target) * 100));
  const months = monthCounts(library, goal.year);
  return (
    <div className="grid gap-6">
      <PageHeader icon={<Target size={24} />} title="Annual Goal" subtitle="Track your pace, adjust the target, and see how the year is shaping up." />
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Surface innerClassName="grid place-items-center gap-5 p-8 text-center">
          <ProgressRing value={progress} label="goal" tone={pace.label === "behind" ? "warning" : "accent"} size={170} />
          <div>
            <h2 className="font-display text-4xl font-black tracking-tight">{readThisYear.length}/{goal.target} books</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">You are {pace.label}. Expected pace is {pace.expected.toFixed(1)} books.</p>
          </div>
          <label className="grid w-full max-w-sm gap-2 text-sm font-semibold">
            Annual target
            <input className="accent-[var(--color-forest)]" type="range" min="1" max="80" value={goal.target} onChange={(event) => setGoal({ ...goal, target: Number(event.target.value) })} />
          </label>
        </Surface>
        <Surface innerClassName="p-6">
          <h2 className="font-display text-2xl font-bold tracking-tight">Monthly reading rhythm</h2>
          <div className="mt-6 flex h-72 items-end gap-2" role="img" aria-label="Monthly books read bar chart">
            {months.map((count, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-[var(--color-forest)] shadow-[0_16px_28px_rgba(25,69,45,0.12)]" style={{ height: `${Math.max(8, count * 42)}px` }} title={`${count} books`} />
                <span className="font-mono-ui text-[10px] text-[var(--color-ink-subtle)]">{index + 1}</span>
              </div>
            ))}
          </div>
        </Surface>
      </div>
    </div>
  );
}

function Review({ library, goal, readThisYear, reducedMotion }: { library: LibraryBook[]; goal: ReadingGoal; readThisYear: LibraryBook[]; reducedMotion: boolean }) {
  const pages = totalPagesRead(readThisYear);
  const topGenre = Object.entries(readThisYear.reduce<Record<string, number>>((acc, book) => ({ ...acc, [book.genre]: (acc[book.genre] ?? 0) + 1 }), {})).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "No genre yet";
  const longest = [...readThisYear].sort((a, b) => b.pages - a.pages)[0];
  const favorite = [...readThisYear].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))[0];
  return (
    <div className="grid gap-6">
      <PageHeader icon={<Sparkle size={24} />} title={`${goal.year} Review`} subtitle="A wrapped-style reflection of the books, pages, genres, and notes that shaped the year." />
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <Surface innerClassName="p-8 md:p-10">
          <Badge tone="accent">Reading wrapped</Badge>
          <h2 className="mt-6 font-display text-6xl font-black tracking-[-0.07em] md:text-8xl">{readThisYear.length}</h2>
          <p className="mt-2 text-xl text-[var(--color-ink-muted)]">books finished, {pages.toLocaleString()} pages read.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Stat label="Top genre" value={topGenre} />
            <Stat label="Longest" value={longest?.title ?? "None yet"} />
            <Stat label="Favorite" value={favorite?.title ?? "None yet"} />
          </div>
        </Surface>
        <Surface className="perspective-stage" innerClassName="p-5">
          <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-[linear-gradient(145deg,#ffffff,#dce8d2)] p-6 shadow-[var(--shadow-book)]" style={{ transform: reducedMotion ? undefined : "rotateY(-4deg) rotateX(3deg)" }}>
            <p className="font-mono-ui text-xs uppercase tracking-[0.24em] text-[var(--color-forest)]">Shareable card</p>
            <h3 className="mt-8 font-display text-4xl font-black tracking-tight">My {goal.year} Reading Year</h3>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Stat label="Books" value={String(readThisYear.length)} />
              <Stat label="Pages" value={pages.toLocaleString()} />
              <Stat label="Genre" value={topGenre} />
              <Stat label="Pace" value={`${Math.round((readThisYear.length / goal.target) * 100)}%`} />
            </div>
          </div>
        </Surface>
      </div>
    </div>
  );
}

function Settings({ preferences, setPreferences }: { preferences: Preferences; setPreferences: React.Dispatch<React.SetStateAction<Preferences>> }) {
  const groups: Array<{
    title: string;
    description: string;
    items: Array<[keyof Preferences, string, string, string?]>;
  }> = [
    {
      title: "Reading comfort",
      description: "Make long sessions feel easier on your eyes.",
      items: [
        ["largeText", "Make text larger", "Increases book details, notes, and control labels.", "Recommended for long sessions"],
        ["spacious", "Add more breathing room", "Gives shelves and cards a little more room to scan."],
        ["dyslexia", "Use easier reading font", "Switches to a more legible font stack with wider rhythm."],
      ],
    },
    {
      title: "Visual comfort",
      description: "Reduce strain or movement when the interface feels too active.",
      items: [
        ["highContrast", "Increase contrast", "Strengthens text, borders, and focus states."],
        ["reducedMotion", "Reduce animations", "Keeps the 3D shelf calm and removes decorative movement.", "Good for motion sensitivity"],
      ],
    },
  ];

  function updatePreference(key: keyof Preferences) {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="grid gap-6">
      <PageHeader icon={<GearSix size={24} />} title="Reading Comfort" subtitle="Choose how calm, spacious, and readable Bookshelf should feel." />
      <Surface innerClassName="grid gap-6 p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
        <div>
          <Badge tone="accent"><span className="flex items-center gap-2"><PaintBrush size={18} /> New here?</span></Badge>
          <h2 className="mt-5 font-display text-3xl font-black tracking-tight">Start with comfortable defaults.</h2>
          <p className="mt-3 text-[var(--color-ink-muted)]">This preset makes the app easier to read without removing the soft cover gallery personality.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => setPreferences((prev) => ({ ...prev, largeText: true, spacious: true, dyslexia: false, highContrast: false, reducedMotion: false }))}
            >
              Use comfort preset
            </Button>
            <Button variant="secondary" onClick={() => setPreferences({ ...defaultPreferences })}>Reset</Button>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-surface-glow)] p-5">
          <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-[var(--color-ink-subtle)]">Preview</p>
          <h3 className="mt-4 font-display text-2xl font-black tracking-tight">The next chapter should feel easy to return to.</h3>
          <p className="mt-3 text-[var(--color-ink-muted)]">Settings apply instantly, so you can tune the interface while reading your notes or browsing shelves.</p>
        </div>
      </Surface>
      {groups.map((group) => (
        <Surface key={group.title} innerClassName="p-3 md:p-4">
          <div className="border-b border-[var(--color-line)] p-4">
            <h2 className="font-display text-2xl font-black tracking-tight">{group.title}</h2>
            <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{group.description}</p>
          </div>
          <div className="divide-y divide-[var(--color-line)]">
            {group.items.map(([key, title, text, hint]) => (
              <label key={key} className="flex cursor-pointer items-center justify-between gap-4 p-4 transition hover:bg-[var(--color-surface-glow)]">
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <strong className="block">{title}</strong>
                    {hint ? <Badge tone="default">{hint}</Badge> : null}
                  </span>
                  <span className="mt-1 block text-sm text-[var(--color-ink-muted)]">{text}</span>
                  <span className="mt-2 block text-xs font-semibold text-[var(--color-forest-dark)]">Currently {preferences[key] ? "on" : "off"}</span>
                </span>
                <input className="size-5 shrink-0 accent-[var(--color-forest)]" type="checkbox" checked={preferences[key]} onChange={() => updatePreference(key)} />
              </label>
            ))}
          </div>
        </Surface>
      ))}
      <Surface innerClassName="p-6">
        <h2 className="font-display text-2xl font-black tracking-tight">Power shortcut</h2>
        <p className="mt-2 text-[var(--color-ink-muted)]">Press <span className="font-mono-ui rounded-full border border-[var(--color-line)] bg-[var(--color-canvas-soft)] px-2 py-1 text-xs">Ctrl/⌘ K</span> to search books, jump to pages, or toggle comfort settings without leaving the keyboard.</p>
      </Surface>
    </div>
  );
}

function BookDetailDrawer({ book, libraryBook, onClose, onAdd, onUpdate, reducedMotion }: { book: Book | LibraryBook | null; libraryBook?: LibraryBook; onClose: () => void; onAdd: (book: Book, shelf?: ShelfId) => void; onUpdate: (id: string, patch: Partial<LibraryBook>) => void; reducedMotion: boolean }) {
  if (!book) return null;
  const active = libraryBook;
  const progress = active ? bookProgress(active) : 0;
  return (
    <Drawer open={Boolean(book)} title={book.title} onClose={onClose}>
      <div className="grid gap-6">
        <div className="grid place-items-center"><BookCover3D book={active ?? book} size="lg" reducedMotion={reducedMotion} /></div>
        <div>
          <Badge tone="accent">{book.genre}</Badge>
          <p className="mt-3 text-[var(--color-ink-muted)]">{book.summary}</p>
          <p className="mt-3 font-mono-ui text-xs text-[var(--color-ink-subtle)]">ISBN {book.isbn} · {book.pages} pages</p>
          {book.coverSourceUrl ? (
            <a className="mt-3 inline-flex text-sm font-semibold text-[var(--color-forest-dark)] underline decoration-[var(--color-line)] underline-offset-4" href={book.coverSourceUrl} target="_blank" rel="noreferrer">
              {book.coverCredit ?? "Cover source: Book Cover Archive"}
            </a>
          ) : null}
        </div>
        {active ? (
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-semibold">Shelf
              <select className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/80 px-4 py-3" value={active.shelf} onChange={(event) => onUpdate(active.id, { shelf: event.target.value })}>
                {shelves.map((shelf) => <option key={shelf.id} value={shelf.id}>{shelf.name}</option>)}
              </select>
            </label>
            <div className="grid gap-2">
              <div className="flex items-center justify-between text-sm"><strong>Progress</strong><span>{active.currentPage}/{active.pages} pages · {progress}%</span></div>
              <input className="accent-[var(--color-forest)]" type="range" min="0" max={active.pages} value={active.currentPage} onChange={(event) => onUpdate(active.id, { currentPage: Number(event.target.value), shelf: Number(event.target.value) >= active.pages ? "read" : active.shelf, finishedAt: Number(event.target.value) >= active.pages ? new Date().toISOString().slice(0, 10) : active.finishedAt })} />
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" className="px-3 py-2" onClick={() => onUpdate(active.id, { currentPage: Math.min(active.pages, active.currentPage + 10), shelf: "reading" })}>+10</Button>
                <Button variant="secondary" className="px-3 py-2" onClick={() => onUpdate(active.id, { currentPage: Math.round(active.pages * 0.5), shelf: "reading" })}>50%</Button>
                <Button className="px-3 py-2" onClick={() => onUpdate(active.id, { currentPage: active.pages, shelf: "read", finishedAt: new Date().toISOString().slice(0, 10) })}>Finished</Button>
              </div>
            </div>
            <label className="grid gap-2 text-sm font-semibold">Rating
              <input className="accent-[var(--color-forest)]" type="range" min="0" max="5" value={active.rating ?? 0} onChange={(event) => onUpdate(active.id, { rating: Number(event.target.value) || undefined })} />
              <span className="text-[var(--color-ink-muted)]">{active.rating ? `${active.rating}/5` : "Not rated"}</span>
            </label>
            <label className="grid gap-2 text-sm font-semibold">Personal notes
              <textarea className="min-h-32 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/80 p-4 text-[var(--color-ink)] outline-none focus:border-[var(--color-forest)]" value={active.notes} onChange={(event) => onUpdate(active.id, { notes: event.target.value })} />
            </label>
          </div>
        ) : (
          <Button onClick={() => onAdd(book, "want")}>Add to Want to Read</Button>
        )}
      </div>
    </Drawer>
  );
}

function PageHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-[2rem] border border-[var(--color-line)] bg-white/70 p-5 shadow-[var(--shadow-soft)] md:flex-row md:items-end md:justify-between md:p-7">
      <div>
        <Badge tone="accent"><span className="flex items-center gap-2">{icon} Bookshelf OS</span></Badge>
        <h1 className="mt-4 font-display text-4xl font-black tracking-[-0.04em] md:text-5xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-[var(--color-ink-muted)]">{subtitle}</p>
      </div>
    </div>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return <Surface innerClassName="grid min-h-56 place-items-center p-8 text-center"><div><h3 className="font-display text-2xl font-bold">{title}</h3><p className="mt-2 text-[var(--color-ink-muted)]">{text}</p></div></Surface>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white/55 p-4">
      <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-subtle)]">{label}</p>
      <strong className="mt-2 block line-clamp-2 text-lg text-[var(--color-ink)]">{value}</strong>
    </div>
  );
}
