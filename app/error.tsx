"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen items-center justify-center px-5 py-24">
      <div className="max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Something went wrong
        </p>
        <h1 className="mt-4 font-playfair text-4xl font-bold text-text">
          We hit an issue while loading this page.
        </h1>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
