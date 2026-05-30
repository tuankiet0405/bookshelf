import { useRef } from "react";
import type { PointerEvent } from "react";
import gsap from "gsap";
import type { Book, LibraryBook } from "../../types";
import { cn } from "../../lib/design";
import { bookProgress } from "../../lib/reading";

type BookCover3DProps = {
  book: Book | LibraryBook;
  size?: "xs" | "sm" | "md" | "lg";
  interactive?: boolean;
  reducedMotion?: boolean;
  className?: string;
};

const sizes = {
  xs: "h-28 w-[4.6rem]",
  sm: "h-36 w-24",
  md: "h-48 w-32",
  lg: "h-64 w-44",
};

export function BookCover3D({ book, size = "md", interactive = true, reducedMotion, className }: BookCover3DProps) {
  const coverRef = useRef<HTMLDivElement>(null);
  const progress = "currentPage" in book ? bookProgress(book) : 0;

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (!interactive || reducedMotion || !coverRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(coverRef.current, {
      rotateY: x * 9,
      rotateX: y * -6,
      z: 18,
      scale: 1.025,
      duration: 0.35,
      ease: "power3.out",
    });
  }

  function reset() {
    if (!interactive || !coverRef.current) return;
    gsap.to(coverRef.current, {
      rotateY: 0,
      rotateX: 0,
      z: 0,
      scale: 1,
      duration: reducedMotion ? 0.01 : 0.5,
      ease: "expo.out",
    });
  }

  return (
    <div className={cn("perspective-stage inline-block", className)} onPointerMove={tilt} onPointerLeave={reset} onBlur={reset}>
      <div
        ref={coverRef}
        className={cn("book-cover relative overflow-hidden rounded-[14px] border border-[rgba(24,32,24,0.12)] bg-white p-4 outline-none", sizes[size])}
        style={{ background: `linear-gradient(145deg, ${book.cover.from}, ${book.cover.to})` }}
        tabIndex={interactive ? 0 : -1}
        onFocus={() => {
          if (!interactive || reducedMotion || !coverRef.current) return;
          gsap.to(coverRef.current, { y: -5, scale: 1.025, duration: 0.28, ease: "power3.out" });
        }}
      >
        {book.coverImageUrl ? (
          <img
            src={book.coverImageUrl}
            alt={book.coverAlt ?? `Cover of ${book.title}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-x-4 top-4 h-px bg-white/30" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-white/65">{book.genre}</p>
                <h3 className="mt-3 line-clamp-4 font-display text-lg font-black leading-tight tracking-tight text-white">{book.title}</h3>
              </div>
              <div>
                <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/18" aria-hidden="true">
                  <span className="block h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: book.cover.accent }} />
                </div>
                <p className="text-xs font-semibold text-white/76">{book.author}</p>
              </div>
            </div>
            <div className="absolute -right-8 bottom-8 h-28 w-28 rounded-full opacity-30 blur-2xl" style={{ backgroundColor: book.cover.accent }} />
          </>
        )}
        {book.coverImageUrl && progress > 0 ? (
          <div className="absolute inset-x-3 bottom-3 z-10 h-1.5 overflow-hidden rounded-full bg-white/55" aria-hidden="true">
            <span className="block h-full rounded-full bg-[var(--color-forest)]" style={{ width: `${progress}%` }} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
