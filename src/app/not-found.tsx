import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center">
          <Link href="/" className="text-lg sm:text-xl font-black tracking-tight">
            Agent<span className="gradient-text">Outreach</span>
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-8xl sm:text-9xl font-black tracking-tighter gradient-text mb-4">
            404
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Page not found
          </p>
          <p className="text-muted text-sm sm:text-base mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
          >
            &larr; Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
