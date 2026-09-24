import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen items-center justify-center px-5 py-24">
      <div className="max-w-lg text-center">
        <p className="text-5xl font-semibold uppercase tracking-[0.2em] text-primary sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-playfair text-4xl font-bold text-text">
          This page could not be found.
        </h1>
        <p className="mt-4 text-text-muted">
          The page you were looking for may have moved or no longer exists.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
