import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="rounded-full border border-solid border-transparent bg-foreground text-background px-4 py-2 font-medium hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
