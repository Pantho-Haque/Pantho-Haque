"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-(--bg) px-6 text-center font-(--font-mono) text-(--green)">
      <div className="font-(--font-crt) text-[64px] leading-none text-(--red) [text-shadow:0_0_24px_rgba(255,51,51,0.5)]">SYSTEM FAULT</div>
      <div className="text-[14px] tracking-[0.25em] text-(--amber)">● FEED INTERRUPTED</div>
      <p className="max-w-sm text-[14px] leading-relaxed text-(--muted)">{error.message || "An unexpected error has occurred."}</p>
      {error.digest && <p className="text-[12px] tracking-[0.15em] text-(--muted)">TRACE: {error.digest}</p>}
      <button onClick={reset} className="mt-2 cursor-crosshair border border-(--border) px-3 py-1.5 text-[13px] tracking-[0.15em] transition-colors hover:border-(--green) hover:bg-(--green-muted)">
        [ RE-ESTABLISH CONNECTION ]
      </button>
    </main>
  );
}
