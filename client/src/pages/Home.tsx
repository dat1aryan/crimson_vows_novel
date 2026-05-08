import { useEffect, useState } from "react";
import { chapters } from "@/lib/novelData";
import {
  BookOpenText,
  ChevronLeft,
  ChevronRight,
  Menu,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentChapter = chapters[currentChapterIndex];
  const chapterProgress = Math.round(
    ((currentChapterIndex + 1) / chapters.length) * 100
  );

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      window.scrollTo(0, 0);
      setScrollProgress(0);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      window.scrollTo(0, 0);
      setScrollProgress(0);
    }
  };

  const handleChapterSelect = (index: number) => {
    setCurrentChapterIndex(index);
    window.scrollTo(0, 0);
    setScrollProgress(0);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalScroll = documentHeight - windowHeight;
      const progress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-[32rem] -translate-x-1/2 rounded-full bg-[#8b1538]/10 blur-3xl" />
      </div>

      <div
        className="fixed left-0 top-0 z-50 h-1 rounded-r-full bg-gradient-to-r from-transparent via-[#d4af37] to-[#8b1538] shadow-[0_0_20px_rgba(212,175,55,0.7)] transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_28px_rgba(139,21,56,0.35)]">
              <BookOpenText className="h-5 w-5" />
            </div>
            <div>
              <p className="ui-text text-[0.62rem] uppercase tracking-[0.45em] text-muted-foreground">
                Dark Romance Novel
              </p>
              <h1 className="mt-1 text-lg font-semibold tracking-wide md:text-2xl">
                Crimson Vows <span className="text-muted-foreground">and Obsidian Lies</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground/80 sm:flex">
              <Sparkles className="h-4 w-4 text-[#d4af37]" />
              <span>
                {currentChapterIndex + 1} / {chapters.length}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ui-text gap-2 rounded-full border-white/10 bg-white/5 px-4 text-foreground shadow-[0_0_24px_rgba(139,21,56,0.12)] transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
            >
              <Menu className="h-4 w-4" />
              Chapters
            </Button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <aside
        className={`fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-[19rem] overflow-y-auto border-r border-white/10 bg-card/95 backdrop-blur-xl transition-transform duration-300 md:sticky md:top-24 md:z-10 md:h-[calc(100vh-7rem)] md:translate-x-0 md:rounded-[2rem] md:border md:shadow-[0_0_40px_rgba(139,21,56,0.16)] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-5 md:p-6">
          <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 shadow-inner shadow-black/20">
            <p className="ui-text text-[0.62rem] uppercase tracking-[0.45em] text-muted-foreground">
              Reading Flow
            </p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold leading-none text-foreground">
                  {currentChapter.id}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Chapter progress and navigation
                </p>
              </div>
              <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary shadow-[0_0_16px_rgba(139,21,56,0.2)]">
                {chapterProgress}%
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-[#c21f55] to-[#d4af37] shadow-[0_0_18px_rgba(139,21,56,0.55)] transition-all duration-300"
                style={{ width: `${chapterProgress}%` }}
              />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => handleChapterSelect(index)}
                className={`group w-full rounded-[1.1rem] border px-4 py-3 text-left transition-all duration-300 ${
                  index === currentChapterIndex
                    ? "border-primary/40 bg-primary/12 shadow-[0_0_24px_rgba(139,21,56,0.22)]"
                    : "border-white/5 bg-white/[0.03] hover:border-primary/20 hover:bg-white/[0.06]"
                }`}
              >
                <span className="ui-text text-[0.62rem] uppercase tracking-[0.35em] text-muted-foreground">
                  Chapter {chapter.id}
                </span>
                <p className="mt-1 truncate text-sm font-semibold leading-5 text-foreground transition-colors group-hover:text-[#f5f1e8]">
                  {chapter.title}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-black/20 p-4 text-sm text-muted-foreground">
            <p className="ui-text text-[0.62rem] uppercase tracking-[0.35em] text-[#d4af37]">
              Atmosphere
            </p>
            <p className="mt-2 leading-6">
              Slow tension, velvet shadows, and glowing crimson highlights.
            </p>
          </div>
        </div>
      </aside>

      <main className="relative z-10">
        <div className="container grid gap-8 py-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-10 lg:py-10">
          <aside className="hidden lg:block" />

          <div className="min-w-0 space-y-8">
            <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#1b1018]/95 via-card/80 to-[#0f1419]/95 p-8 shadow-[0_0_80px_rgba(139,21,56,0.16)] md:p-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-10 top-6 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[#d4af37]/10 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-32 w-[24rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
              </div>

              <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_18rem] lg:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary shadow-[0_0_18px_rgba(139,21,56,0.18)]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Chapter {currentChapter.id}
                  </div>
                  <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                    {currentChapter.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                    A dark, immersive reading flow designed to pull the eye forward.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="ui-text text-[0.62rem] uppercase tracking-[0.4em] text-muted-foreground">
                        Now Reading
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-foreground">
                        {currentChapterIndex + 1}
                        <span className="text-muted-foreground"> / {chapters.length}</span>
                      </p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#d4af37] shadow-[0_0_24px_rgba(212,175,55,0.18)]">
                      <BookOpenText className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-5 space-y-2">
                    <div className="h-1.5 rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary via-[#c21f55] to-[#d4af37]"
                        style={{ width: `${chapterProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{chapterProgress}% through the novel</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-card/70 p-6 shadow-[0_0_60px_rgba(0,0,0,0.25)] md:p-10">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="ui-text text-[0.62rem] uppercase tracking-[0.45em] text-muted-foreground">
                    Chapter Text
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
                    Slow burn, sharp edges, and deliberate tension.
                  </h3>
                </div>
                <div className="flex gap-2">
                  <span className="h-2.5 w-12 rounded-full bg-primary shadow-[0_0_14px_rgba(139,21,56,0.45)]" />
                  <span className="h-2.5 w-7 rounded-full bg-[#c21f55] shadow-[0_0_14px_rgba(194,31,85,0.35)]" />
                  <span className="h-2.5 w-4 rounded-full bg-[#d4af37] shadow-[0_0_14px_rgba(212,175,55,0.35)]" />
                </div>
              </div>

              <article className="space-y-6 text-base leading-8 text-foreground/92 md:text-lg md:leading-9">
              {currentChapter.content.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className={`max-w-3xl ${index === 0 ? "first-letter:text-5xl first-letter:font-semibold first-letter:text-primary first-letter:mr-2 first-letter:float-left first-letter:leading-none" : ""}`}
                >
                  {paragraph}
                </p>
              ))}
              </article>

              <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-[auto_1fr_auto] md:items-center">
                <Button
                  onClick={handlePrevChapter}
                  disabled={currentChapterIndex === 0}
                  variant="outline"
                  className="ui-text gap-2 rounded-full border-white/10 bg-white/5 px-5 py-6 text-foreground shadow-[0_0_18px_rgba(139,21,56,0.12)] transition-all hover:border-primary/40 hover:bg-primary/10 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p className="ui-text text-[0.62rem] uppercase tracking-[0.45em]">
                    Chapter Navigation
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    {currentChapterIndex + 1} / {chapters.length}
                  </p>
                </div>

                <Button
                  onClick={handleNextChapter}
                  disabled={currentChapterIndex === chapters.length - 1}
                  variant="outline"
                  className="ui-text gap-2 rounded-full border-white/10 bg-white/5 px-5 py-6 text-foreground shadow-[0_0_18px_rgba(212,175,55,0.12)] transition-all hover:border-[#d4af37]/40 hover:bg-[#d4af37]/10 disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {currentChapterIndex === chapters.length - 1 && (
                <div className="mt-10 rounded-[1.5rem] border border-[#d4af37]/20 bg-gradient-to-r from-primary/15 via-card/80 to-[#d4af37]/10 p-6 text-center shadow-[0_0_30px_rgba(212,175,55,0.12)]">
                  <p className="text-lg font-semibold text-foreground">The End</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Thank you for reading Crimson Vows and Obsidian Lies.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t border-white/10 bg-black/20 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 Crimson Vows and Obsidian Lies. A dark romance novel.</p>
          <p className="mt-2 text-[#d4af37]">Crafted with darkness and desire.</p>
        </div>
      </footer>
    </div>
  );
}
