import { useState, useEffect } from "react";
import { chapters } from "@/lib/novelData";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentChapter = chapters[currentChapterIndex];

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-accent z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-accent" />
            <div>
              <h1 className="text-2xl font-bold font-display">Crimson Vows</h1>
              <p className="text-sm text-muted-foreground">and Obsidian Lies</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ui-text"
          >
            Chapters
          </Button>
        </div>
      </header>

      {/* Chapter Menu Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsMenuOpen(false)} />
      )}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 bg-card border-r border-border overflow-y-auto transition-transform duration-300 z-30 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:relative md:top-0 md:h-auto md:w-64 md:border-r`}
      >
        <div className="p-6">
          <h2 className="text-lg font-bold font-display mb-4 text-accent">Chapters</h2>
          <div className="space-y-2">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => handleChapterSelect(index)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm ${
                  index === currentChapterIndex
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                <span className="text-xs text-muted-foreground">Chapter {chapter.id}</span>
                <p className="font-medium truncate">{chapter.title}</p>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-12 max-w-2xl">
          {/* Chapter Header */}
          <div className="mb-12 text-center border-b border-border pb-8">
            <div className="inline-block px-4 py-2 bg-secondary rounded-full mb-4">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                Chapter {currentChapter.id}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-foreground">
              {currentChapter.title}
            </h1>
            <div className="flex justify-center gap-2">
              <div className="w-12 h-1 bg-accent rounded-full" />
              <div className="w-8 h-1 bg-accent/50 rounded-full" />
              <div className="w-4 h-1 bg-accent/30 rounded-full" />
            </div>
          </div>

          {/* Chapter Content */}
          <article className="prose prose-invert max-w-none mb-16">
            <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
              {currentChapter.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="indent-8 first:indent-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4 pt-8 border-t border-border">
            <Button
              onClick={handlePrevChapter}
              disabled={currentChapterIndex === 0}
              variant="outline"
              className="ui-text gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p className="font-semibold">
                {currentChapterIndex + 1} / {chapters.length}
              </p>
            </div>

            <Button
              onClick={handleNextChapter}
              disabled={currentChapterIndex === chapters.length - 1}
              variant="outline"
              className="ui-text gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* End of Novel Message */}
          {currentChapterIndex === chapters.length - 1 && (
            <div className="mt-12 p-8 bg-secondary rounded-lg border border-accent/30 text-center">
              <p className="text-lg font-semibold text-foreground mb-2">
                The End
              </p>
              <p className="text-muted-foreground">
                Thank you for reading "Crimson Vows and Obsidian Lies." A tale of darkness, desire, and devotion.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 Crimson Vows and Obsidian Lies. A Dark Romance Novel.</p>
          <p className="mt-2">Crafted with darkness and desire.</p>
        </div>
      </footer>
    </div>
  );
}
