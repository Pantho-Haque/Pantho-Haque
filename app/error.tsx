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
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {error.message || 'An unexpected error has occurred.'}
        </p>
        <div className="text-sm text-gray-500 mb-6">
          {error.digest && <p>Error ID: {error.digest}</p>}
        </div>
        <button
          className="rounded-full border border-solid border-transparent bg-foreground text-background px-4 py-2 font-medium hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
