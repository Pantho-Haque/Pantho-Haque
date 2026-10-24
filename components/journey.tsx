import { Fragment, ViewTransition, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Content, Img, Project, Section } from "@/types/content";
import { caseFiles, gainOf, usedIn, visibleSections } from "@/lib/content";
import { Clock, CopyButton, Gallery, Loadout, RailNav } from "./client";

const pad = (n: number) => String(n).padStart(2, "0");

const CHROME: Record<Section["type"], string> = {
  timeline: "Quest log", projects: "Case files", skills: "Loadout", achievements: "Unlocked",
  stats: "Readout", links: "Field notes", text: "Transcript", gallery: "Footage", quotes: "Transmissions",
};

/** Renders the one inline format content allows: **bold**. */
export function Md({ text }: { text: string }) {
  return <>{text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>))}</>;
}

export function Pic({ img, sizes, preload, decorative }: { img: Img; sizes: string; preload?: boolean; decorative?: boolean }) {
  return (
    <Image src={img.url} alt={decorative ? "" : img.alt} fill sizes={sizes} preload={preload}
      placeholder={img.blur ? "blur" : "empty"} blurDataURL={img.blur} />
  );
}

export function CaseCover({ p, sizes, preload }: { p: Project; sizes: string; preload?: boolean }) {
  return (
    <ViewTransition name={`cover-${p.slug}`} share="morph" default="none">
      <div className={preload ? "dz-hero corners" : "cv"}>
        {p.cover && <Pic img={p.cover} sizes={sizes} preload={preload} decorative={!preload} />}
        {preload && <><b /><b /><b /><b /></>}
      </div>
    </ViewTransition>
  );
}

export function Hud({ resumeUrl }: { resumeUrl: string }) {
  return (
    <header className="hud">
      <a className="mark" href="#top">PH<span>{"//"}</span>CASE FILE</a>
      <div className="xp" aria-hidden>
        <div className="row"><span id="hud-lvl">LVL 00 · Briefing</span><span><b id="hud-pct">0%</b> reviewed</span></div>
        <div className="bar"><i /></div>
      </div>
      <nav className="acts" aria-label="Quick links">
        <a className="ghost wide" href={resumeUrl} data-trackima-event="resume" data-trackima-from="hud">Résumé</a>
        <a className="ghost" href="#top" aria-label="Back to the briefing">↑</a>
      </nav>
    </header>
  );
}

export function LevelMap({ c }: { c: Content }) {
  const lv = (id: string, name: string) => <a key={id} href={`#${id}`} data-lv={id}><i aria-hidden /><span>{name}</span></a>;
  return (
    <nav className="map" aria-label="Level map">
      <span className="label">Level map</span>
      {lv("lv-briefing", "Briefing")}
      {visibleSections(c).map((s) => lv(`lv-${s.id}`, s.nav))}
      {lv("lv-end", "Debrief")}
      <div className="keys" aria-hidden><kbd>J</kbd> next · <kbd>K</kbd> back</div>
    </nav>
  );
}

export function Briefing({ c }: { c: Content }) {
  const p = c.profile, f = p.coverFocus, first = visibleSections(c)[0];
  const focus = { "--fx": `${f.x}%`, "--fy": `${f.y}%`, "--fw": `${f.w}%`, "--fh": `${f.h}%` } as CSSProperties;
  return (
    <section className="sec brief" id="lv-briefing" data-name="LVL 00 · Briefing" aria-label="Briefing">
      <div className="cam" style={focus}>
        {p.cover && <Pic img={p.cover} sizes="(max-width: 1024px) 100vw, 58vw" preload />}
        <div className="scan" /><div className="dim" />
        <div className="lock" aria-hidden><b /><b /><b /><b /></div>
        <div className="tagid" aria-hidden>
          <span>Subject 001 · identified</span>{p.name}<span>{p.headline.split(" at ")[0]}</span>
          <em>{p.available ? "● Open to work" : "○ Not looking"}</em>
        </div>
        <span className="osd tl" aria-hidden>CAM 04 · {p.location}</span>
        <span className="osd tr" aria-hidden><span className="rec">● REC</span> <Clock part="time" /></span>
        <span className="osd bl" aria-hidden><Clock part="date" /></span>
        <span className="osd br" aria-hidden>Case file v{c.meta?.version ?? 1}</span>
      </div>
      <div className="brief-copy">
        <div>
          <h1>{p.name}</h1>
          <p className="role">{p.headline}</p>
        </div>
        <p className="proof"><Md text={p.proof} /></p>
        <p className={p.available ? "status" : "status off"}>
          <i className="live" aria-hidden /><span>{p.available ? "Open to work" : "Not looking right now"}</span>
          <span className="where">/ {p.location} / {p.timezone}</span>
        </p>
        <div className="cta">
          <a className="btn primary start" href={first ? `#lv-${first.id}` : "#lv-end"} data-trackima-event="briefing_start">▶ Start the briefing</a>
          <a className="btn" href={p.resumeUrl} data-trackima-event="resume" data-trackima-from="hero">Résumé</a>
          <CopyButton text={p.email} label="Copy email" />
        </div>
        <span className="hint">Scroll, or press J / K to move between levels</span>
      </div>
    </section>
  );
}

function Body({ s, c }: { s: Section; c: Content }) {
  switch (s.type) {
    case "timeline":
      return (
        <div className="quests">
          {s.items.map((it, n) => (
            <article className="quest rv" key={it.title + it.org + n}>
              <div className="when"><span>{it.start} — {it.end || "Present"}</span>{!it.end && <b>● Active</b>}</div>
              <div>
                <h3>{it.title} · {it.url ? <a href={it.url} rel="noopener">{it.org}</a> : <span>{it.org}</span>}</h3>
                {it.summary && <p className="sum"><Md text={it.summary} /></p>}
                {it.highlights.length > 0 && (
                  <ol>
                    {it.highlights.map((h, i) => {
                      const g = gainOf(h);
                      return (
                        <li className="rv" style={{ "--i": i } as CSSProperties} key={i}>
                          <span className="ok" aria-hidden>✓</span><span><Md text={h} /></span>
                          {g && <span className="gain" aria-hidden>{g}</span>}
                        </li>
                      );
                    })}
                  </ol>
                )}
                {it.tags.length > 0 && <ul className="tags" aria-label="Stack">{it.tags.map((t) => <li key={t}>{t}</li>)}</ul>}
              </div>
            </article>
          ))}
        </div>
      );
    case "projects": {
      const files = s.show === "all" ? c.projects : caseFiles(c);
      const rest = s.show === "all" ? [] : c.projects.filter((p) => !p.featured);
      const rail = `rail-${s.id}`;
      return (
        <div className="railwrap rv">
          <div className="railbar">
            <span className="hint">{files.length} case file{files.length === 1 ? "" : "s"} · swipe or use the arrows</span>
            <RailNav railId={rail} />
          </div>
          <ul className="rail" id={rail}>
            {files.map((p, i) => (
              <li className="cardf" key={p.slug}>
                <div style={{ position: "relative" }}>
                  <span className="no">FILE {pad(i + 1)}</span>
                  <CaseCover p={p} sizes="(max-width: 680px) 84vw, 40vw" />
                </div>
                <div className="bd">
                  <span className="eyebrow">{[p.status, p.period].filter(Boolean).join(" · ")}</span>
                  <h3>{p.name}</h3>
                  <p>{p.tagline}</p>
                  {p.metrics[0] && <div className="kpi"><b>{p.metrics[0].value}</b><span>{p.metrics[0].label}</span></div>}
                  {p.featured
                    ? <Link className="btn sm open" href={`/work/${p.slug}`} data-trackima-event="project_open" data-trackima-project={p.slug}>Open case file<span className="sr">: {p.name}</span> →</Link>
                    : (p.links.live || p.links.code) && <a className="btn sm open" href={p.links.live || p.links.code} rel="noopener" data-trackima-event="project_visit" data-trackima-project={p.slug} data-trackima-kind={p.links.live ? "live" : "code"}>Visit ↗</a>}
                </div>
              </li>
            ))}
          </ul>
          {rest.length > 0 && (
            <div className="others" aria-label="More projects">
              {rest.map((p) => (
                <div key={p.slug}>
                  <b>{p.name}</b><span>{p.tagline}</span>
                  {p.links.live || p.links.code
                    ? <a href={p.links.live || p.links.code} rel="noopener" data-trackima-event="project_visit" data-trackima-project={p.slug} data-trackima-kind={p.links.live ? "live" : "code"}>{p.links.live ? "Live ↗" : "Code ↗"}<span className="sr"> {p.name}</span></a>
                    : <i />}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    case "skills":
      return <Loadout groups={s.groups.map((g) => ({ name: g.name, items: g.items.map((name) => ({ name, uses: usedIn(name, c) })) }))} />;
    case "achievements":
      return (
        <ul className="badges">
          {s.items.map((a, i) => (
            <li className="badge rv" style={{ "--i": i } as CSSProperties} key={a.title}>
              <span className="lk" aria-hidden>Unlocked</span>
              <div className="ic" aria-hidden><span>{a.title.charAt(0)}</span></div>
              <b>{a.url ? <a href={a.url} rel="noopener">{a.title}</a> : a.title}</b>
              <small>{[a.issuer, a.date].filter(Boolean).join(" · ")}</small>
            </li>
          ))}
        </ul>
      );
    case "stats":
      return <div className="stats rv">{s.items.map((x) => <div key={x.label}><b>{x.value}</b><span>{x.label}</span></div>)}</div>;
    case "links":
      return (
        <div className="intel">
          {s.items.map((x, i) => (
            <a className="rv" style={{ "--i": i } as CSSProperties} href={x.url} rel="noopener" key={x.url + i}><span>{x.topic}</span>{x.title}</a>
          ))}
        </div>
      );
    case "text":
      return <div className="textblk rv">{s.body.split(/\n\s*\n/).map((para, i) => <p key={i}><Md text={para} /></p>)}</div>;
    case "gallery":
      return <Gallery images={s.images} variant="film" />;
    case "quotes":
      return (
        <div className="quotes">
          {s.items.map((q, i) => (
            <blockquote className="rv" style={{ "--i": i } as CSSProperties} key={i}>
              <span className="lbl">Incoming transmission</span><p>“{q.quote}”</p><cite>{q.name} · {q.role}</cite>
            </blockquote>
          ))}
        </div>
      );
  }
}

export function Sections({ c }: { c: Content }) {
  return visibleSections(c).map((s, i) => (
    <section className="sec" id={`lv-${s.id}`} key={s.id} data-level="1" data-name={`LVL ${pad(i + 1)} · ${s.title}`} aria-labelledby={`h-${s.id}`}>
      <div className="sec-h">
        <i className="cp" aria-hidden />
        <div className="kick"><b>LVL {pad(i + 1)}</b><span>{CHROME[s.type]}</span><span className="stamp" aria-hidden>✓ Checkpoint</span></div>
        <h2 id={`h-${s.id}`}>{s.title}</h2>
        {s.intro && <p><Md text={s.intro} /></p>}
      </div>
      <Body s={s} c={c} />
    </section>
  ));
}

export function Finale({ c }: { c: Content }) {
  const p = c.profile, total = visibleSections(c).length;
  return (
    <section className="sec" id="lv-end" data-name="Debrief · mission complete" aria-labelledby="h-end">
      <div className="finale">
        <div className="kick"><b>Mission complete</b><span>End of file</span></div>
        <h2 id="h-end">You&apos;ve seen the evidence.<br />Let&apos;s build something.</h2>
        <div className="score" aria-label="Your run">
          <div><b id="score-lv">0/{total}</b><span>Levels cleared</span></div>
          <div><b id="score-cf">0</b><span>Case files opened</span></div>
          <div><b id="score-tm">0:00</b><span>Time on file</span></div>
        </div>
        <div className="cta">
          <CopyButton text={p.email} label="Copy email" className="btn primary" />
          {p.links.filter((l) => l.icon !== "mail").map((l) => <a key={l.url} className="btn" href={l.url} rel="noopener" data-trackima-event="contact" data-trackima-via={l.icon}>{l.label}</a>)}
          <a className="btn" href={p.resumeUrl} data-trackima-event="resume" data-trackima-from="finale">Résumé</a>
          <a className="btn" href="#top" data-trackima-event="replay">↺ Replay</a>
        </div>
        <span className="mail">{p.email}</span>
      </div>
      <div className="jr-foot"><span>© {new Date().getFullYear()} {p.name}</span><span>Content from the Control Room · v{c.meta?.version ?? 1}</span></div>
    </section>
  );
}
