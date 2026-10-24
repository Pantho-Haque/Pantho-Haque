"use client";
// Small interactive islands. Everything else on the site is server-rendered HTML.
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { init } from "@pantho075/trackima";
import { ACHIEVEMENTS, award, markOpened, type AchievementKey } from "@/lib/achievements";
import type { GalleryImg } from "@/types/content";

const pad = (n: number) => String(n).padStart(2, "0");

/** Camera on-screen clock. Renders on the client only, so the static page never shows a stale time. */
export function Clock({ part }: { part: "time" | "date" }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return null;
  return part === "time"
    ? <>{pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}</>
    : <>{now.getFullYear()}-{pad(now.getMonth() + 1)}-{pad(now.getDate())}</>;
}

export function CopyButton({ text, label, className = "btn" }: { text: string; label: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={className}
      data-trackima-event="copy_email"
      onClick={() =>
        navigator.clipboard?.writeText(text).then(
          () => { setDone(true); setTimeout(() => setDone(false), 2000); },
          () => { location.href = `mailto:${text}`; },
        )
      }
    >
      <span aria-live="polite">{done ? "Copied" : label}</span>
    </button>
  );
}

export function RailNav({ railId }: { railId: string }) {
  const go = (dir: number) => {
    const rail = document.getElementById(railId);
    if (!rail) return;
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: smooth ? "smooth" : "auto" });
  };
  return (
    <div className="cta">
      <button className="ghost" type="button" onClick={() => go(-1)} aria-label="Previous case files">←</button>
      <button className="ghost" type="button" onClick={() => go(1)} aria-label="Next case files">→</button>
    </div>
  );
}

type Use = { name: string; slug?: string };
export function Loadout({ groups }: { groups: { name: string; items: { name: string; uses: Use[] }[] }[] }) {
  const [sel, setSel] = useState<{ name: string; uses: Use[] } | null>(null);
  return (
    <div className="loadout rv">
      <div className="slots">
        {groups.map((g) => (
          <div className="grp" key={g.name}>
            <h3>{g.name}</h3>
            <div className="row">
              {g.items.map((it) => (
                <button
                  key={it.name}
                  type="button"
                  className="slot"
                  aria-pressed={sel?.name === it.name}
                  onClick={() => { setSel(it); award("loadout"); }}
                >
                  {it.name}
                  <small>{it.uses.length ? `${it.uses.length} use${it.uses.length > 1 ? "s" : ""}` : "known"}</small>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="readout" aria-live="polite">
        <span className="label">Equipped in</span>
        <h3>{sel ? sel.name : "Select a skill"}</h3>
        {!sel && <p>Each slot shows the projects and roles where I used it.</p>}
        {sel && (sel.uses.length ? (
          <ul>{sel.uses.map((u) => <li key={u.name}>{u.slug ? <a href={`/work/${u.slug}`}>{u.name}</a> : <span>{u.name}</span>}</li>)}</ul>
        ) : <p>Studied and used in coursework; not in a listed project yet.</p>)}
      </div>
    </div>
  );
}

/** Thumbnails + a native <dialog> lightbox (Esc and focus handling come from the browser). */
export function Gallery({ images, variant }: { images: GalleryImg[]; variant: "film" | "gal" }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const open = (k: number) => { setI(k); dlg.current?.showModal(); };
  const step = (d: number) => setI((k) => (k + d + images.length) % images.length);
  const cur = images[i];
  return (
    <>
      <div className={`${variant} rv`}>
        {images.map((m, k) => (
          <figure key={m.url + k}>
            <button type="button" onClick={() => open(k)} aria-label={`Enlarge: ${m.alt}`}>
              <Image src={m.url} alt={m.alt} fill sizes="(max-width: 680px) 90vw, 33vw" placeholder={m.blur ? "blur" : "empty"} blurDataURL={m.blur} />
            </button>
            <figcaption>{m.caption || m.alt}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dlg}
        className="lightbox"
        aria-label="Image viewer"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => { if (e.target === e.currentTarget) dlg.current?.close(); }}
      >
        <div className="lb-bar">
          <span>{i + 1} / {images.length}</span>
          <button className="btn sm" type="button" onClick={() => dlg.current?.close()} autoFocus>Close · Esc</button>
        </div>
        <div className="lb-img">
          {images.length > 1 && <button className="btn sm nav prev" type="button" onClick={() => step(-1)} aria-label="Previous image">←</button>}
          {cur && (
            // eslint-disable-next-line @next/next/no-img-element -- full-size view of an already-optimised remote image
            <img src={cur.url} alt={cur.alt} />
          )}
          {images.length > 1 && <button className="btn sm nav next" type="button" onClick={() => step(1)} aria-label="Next image">→</button>}
        </div>
        <div className="lb-bar"><span>{cur?.caption || cur?.alt}</span></div>
      </dialog>
    </>
  );
}

/** Records a case file as opened (feeds the finale score and the first achievement). */
export function CaseOpened({ slug }: { slug: string }) {
  useEffect(() => markOpened(slug), [slug]);
  return null;
}

export function AchievementToast() {
  const [k, setK] = useState<AchievementKey | null>(null);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const on = (e: Event) => {
      setK((e as CustomEvent<AchievementKey>).detail);
      clearTimeout(t);
      t = setTimeout(() => setK(null), 3400);
    };
    window.addEventListener("ph:award", on);
    return () => { window.removeEventListener("ph:award", on); clearTimeout(t); };
  }, []);
  return (
    <div role="status" aria-live="polite">
      {k && <div className="ach"><i aria-hidden /><div><small>Achievement</small><b>{ACHIEVEMENTS[k]}</b></div></div>}
    </div>
  );
}

export function Trackima({ site }: { site: string }) {
  useEffect(() => {
    // The Trackima server only accepts data from the production domain.
    if (process.env.NODE_ENV === "production") init({ site, host: "https://trackima.pantho-haque-dev.workers.dev" });
  }, [site]);
  return null;
}
