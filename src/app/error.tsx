'use client';

import { useEffect } from 'react';

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
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-bold text-neutral-900">Something went wrong</h1>
      <p className="mt-4 text-neutral-600">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-8">
        <button onClick={() => reset()} className="btn-primary">
          Try again
        </button>
      </div>
    </div>
  );
}
