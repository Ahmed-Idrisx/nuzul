"use client";

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(_error);

  return (
    <html lang="en">
      <body className="h-screen bg-cream-bg text-text antialiased">
        <main className="flex h-screen items-center justify-center px-5 py-24">
          <div className="max-w-lg text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Application error
            </p>
            <h1 className="mt-4 font-playfair text-4xl font-bold text-text">
              Something went wrong.
            </h1>
            <p className="mt-4 text-text-muted">
              The app needs to refresh to continue.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
