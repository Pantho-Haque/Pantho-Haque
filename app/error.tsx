"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="lost">
      <span className="label">Feed interrupted</span>
      <h1>Error</h1>
      <p>Something broke while loading this page.{error.digest && <> Trace: {error.digest}</>}</p>
      <div className="cta">
        <button className="btn primary" type="button" onClick={reset}>Try again</button>
        <Link className="btn" href="/">Back to the briefing</Link>
      </div>
    </main>
  );
}
