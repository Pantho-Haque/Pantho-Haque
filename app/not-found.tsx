import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-(--bg) px-6 text-center font-(--font-mono) text-(--green)">
      <div className="font-(--font-crt) text-[96px] leading-none text-(--red) [text-shadow:0_0_24px_rgba(255,51,51,0.5)]">404</div>
      <div className="text-[14px] tracking-[0.25em] text-(--amber)">● SIGNAL LOST // SECTOR NOT FOUND</div>
      <p className="max-w-sm text-[14px] leading-relaxed text-(--muted)">The requested feed does not exist or has been moved out of surveillance range.</p>
      <Link href="/" className="mt-2 border border-(--border) px-3 py-1.5 text-[13px] tracking-[0.15em] transition-colors hover:border-(--green) hover:bg-(--green-muted)">
        [ RETURN TO NODE-01 ]
      </Link>
    </main>
  );
}
