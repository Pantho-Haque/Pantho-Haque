import Link from "next/link";

export default function NotFound() {
  return (
    <main className="lost">
      <span className="label">Signal lost</span>
      <h1>404</h1>
      <p>No case file at this address.</p>
      <div className="cta"><Link className="btn primary" href="/">Back to the briefing</Link></div>
    </main>
  );
}
