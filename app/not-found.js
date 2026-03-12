import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-8xl font-extrabold tracking-tight md:text-9xl">
        4<span className="gradient-text">0</span>4
      </h1>
      <p className="mt-4 text-base text-white/40">Nie znaleziono strony</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/[0.08] hover:text-white"
      >
        Wróć na stronę główną
      </Link>
    </main>
  );
}
