// Whole-page views shared by the main site and exposures. `base` is "" on the main site and "/for/<slug>"
// inside an exposure, so every project, back and next link stays inside the exposure it started in.
import Image from "next/image";
import Link from "next/link";
import type { Content, ExposureMeta } from "@/types/content";
import { caseFiles, projectsSectionId, visibleSections } from "@/lib/content";
import Engine from "./Engine";
import { CaseOpened, CopyButton, ExposureTrack, Gallery } from "./client";
import { Briefing, CaseCover, Finale, Hud, LevelMap, Md, Sections } from "./journey";

const pad = (n: number) => String(n).padStart(2, "0");

export function PreparedFor({ x }: { x: ExposureMeta }) {
  if (!x.company || !x.showPreparedFor) return null;
  return <p className="prep">Prepared for {x.company}{x.role && ` · ${x.role}`}</p>;
}

/** The scroll journey. */
export function JourneyView({ c, x, base = "" }: { c: Content; x: ExposureMeta; base?: string }) {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      {base && (
        <nav className="topbar flat" aria-label="Exposure">
          <Link className="btn sm" href={base}>← Back to the summary</Link>
          <PreparedFor x={x} />
        </nav>
      )}
      <Hud resumeUrl={c.profile.resumeUrl} />
      <div className="jr-grid">
        <main id="main" className="jr-main">
          <div className="route" aria-hidden><i /></div>
          <Briefing c={c} />
          <Sections c={c} base={base} />
          <Finale c={c} />
        </main>
        <LevelMap c={c} />
      </div>
      <Engine />
      <ExposureTrack slug={x.slug} company={x.company} role={x.role} view="full" />
    </>
  );
}

/** One project's page. Returns null when the project isn't a case file here (caller 404s). */
export function CaseFileView({ c, x, slug, base = "" }: { c: Content; x: ExposureMeta; slug: string; base?: string }) {
  const files = caseFiles(c);
  const i = files.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  const p = files[i], next = files[(i + 1) % files.length];
  const meta: [string, string][] = [["Role", p.role], ["Period", p.period], ["Team", p.team || "Solo"], ["Status", p.status]];
  const back = `${base ? `${base}/full` : "/"}#lv-${projectsSectionId(c)}`;
  return (
    <>
      <nav className="topbar" aria-label="Case file">
        <Link className="btn sm" href={back}>← Back to the journey</Link>
        <span className="label">Case file {pad(i + 1)} / {pad(files.length)}</span>
        {files.length > 1 ? <Link className="btn sm" href={`${base}/work/${next.slug}`}>Next: {next.name} →</Link> : <span />}
      </nav>
      <main className="dz">
        <CaseCover p={p} sizes="(max-width: 1000px) 100vw, 980px" preload />
        <div className="dz-title">
          <span className="label">{p.stack.join(" · ")}</span>
          <h1>{p.name}</h1>
          <p>{p.tagline}</p>
          <div className="cta">
            {p.links.live && <a className="btn primary" href={p.links.live} rel="noopener" data-trackima-event="project_visit" data-trackima-project={p.slug} data-trackima-kind="live">Visit live ↗</a>}
            {p.links.code && <a className="btn" href={p.links.code} rel="noopener" data-trackima-event="project_visit" data-trackima-project={p.slug} data-trackima-kind="code">Source ↗</a>}
          </div>
        </div>
        <dl className="dz-meta">
          {meta.filter(([, v]) => v).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        {p.metrics.length > 0 && (
          <div className="dz-metrics">{p.metrics.map((m) => <div key={m.label}><b>{m.value}</b><span>{m.label}</span></div>)}</div>
        )}
        {(p.problem || p.approach || p.outcome) && (
          <div className="dz-story">
            {p.problem && <><h2>Problem</h2><p><Md text={p.problem} /></p></>}
            {p.approach && <><h2>Approach</h2><p><Md text={p.approach} /></p></>}
            {p.outcome && <><h2>Outcome</h2><p><Md text={p.outcome} /></p></>}
          </div>
        )}
        {p.gallery.length > 0 && (
          <section aria-label="Evidence" style={{ display: "grid", gap: 10 }}>
            <span className="label">Evidence · {p.gallery.length} image{p.gallery.length > 1 ? "s" : ""}</span>
            <Gallery images={p.gallery} variant="gal" />
          </section>
        )}
        {files.length > 1 && (
          <div className="dz-next">
            <div><span className="label">Next case file</span><b>{next.name}</b></div>
            <Link className="btn primary" href={`${base}/work/${next.slug}`}>Open →</Link>
          </div>
        )}
      </main>
      <CaseOpened slug={p.slug} />
      {base && <ExposureTrack slug={x.slug} company={x.company} role={x.role} view="full" />}
    </>
  );
}

/** The one-page summary recruiters land on. Everything important above the fold, the journey one click away. */
export function BriefView({ c, x, base }: { c: Content; x: ExposureMeta; base: string }) {
  const p = c.profile;
  const secs = visibleSections(c);
  const timelines = secs.filter((s) => s.type === "timeline");
  const skills = secs.find((s) => s.type === "skills");
  const files = caseFiles(c);
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="hud br-hud">
        <span className="mark">PH<span>{"//"}</span>CASE FILE</span>
        <nav className="acts" aria-label="Quick links">
          <a className="ghost wide" href={p.resumeUrl} data-trackima-event="resume" data-trackima-from="hud">Résumé</a>
        </nav>
      </header>
      <main id="main" className="br">
        <section className="br-hero" aria-labelledby="br-name">
          <PreparedFor x={x} />
          <div className="br-id">
            {p.photo && (
              <div className="br-photo corners">
                <Image src={p.photo.url} alt={p.photo.alt} fill sizes="112px" preload placeholder={p.photo.blur ? "blur" : "empty"} blurDataURL={p.photo.blur} />
                <b /><b /><b /><b />
              </div>
            )}
            <div>
              <h1 id="br-name">{p.name}</h1>
              <p className="role">{p.headline}</p>
            </div>
          </div>
          <p className="proof"><Md text={p.proof} /></p>
          <p className={p.available ? "status" : "status off"}>
            <i className="live" aria-hidden /><span>{p.available ? "Open to work" : "Not looking right now"}</span>
            <span className="where">/ {p.location} / {p.timezone}</span>
          </p>
          <div className="br-go">
            <Link className="btn primary" href={`${base}/full`} data-trackima-event="view_details" data-trackima-app="portfolio">Open the full case file →</Link>
            <span className="hint">Interactive walkthrough · about 4 minutes</span>
          </div>
          <div className="cta">
            <a className="btn" href={p.resumeUrl} data-trackima-event="resume" data-trackima-from="brief">Résumé</a>
            <CopyButton text={p.email} label="Copy email" />
          </div>
        </section>

        {timelines.map((s) => s.type === "timeline" && (
          <section className="br-sec" key={s.id} aria-labelledby={`br-${s.id}`}>
            <h2 className="label" id={`br-${s.id}`}>{s.title}</h2>
            <div className="br-list">
              {s.items.map((it, n) => (
                <article key={it.title + it.org + n}>
                  <div className="br-row"><h3>{it.title} · <span>{it.org}</span></h3><span className="when">{it.start} — {it.end || "Present"}</span></div>
                  {it.highlights.length > 0 && <ul>{it.highlights.slice(0, 2).map((h, i) => <li key={i}><Md text={h} /></li>)}</ul>}
                </article>
              ))}
            </div>
          </section>
        ))}

        {files.length > 0 && (
          <section className="br-sec" aria-labelledby="br-work">
            <h2 className="label" id="br-work">Case files</h2>
            <ul className="br-cards">
              {files.map((f, i) => (
                <li className="cardf" key={f.slug}>
                  <div style={{ position: "relative" }}>
                    <span className="no">FILE {pad(i + 1)}</span>
                    <CaseCover p={f} sizes="(max-width: 680px) 92vw, 300px" />
                  </div>
                  <div className="bd">
                    <h3>{f.name}</h3>
                    <p>{f.tagline}</p>
                    {f.metrics[0] && <div className="kpi"><b>{f.metrics[0].value}</b><span>{f.metrics[0].label}</span></div>}
                    <Link className="btn sm open" href={`${base}/work/${f.slug}`} data-trackima-event="project_open" data-trackima-project={f.slug}>Open case file<span className="sr">: {f.name}</span> →</Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {skills?.type === "skills" && (
          <section className="br-sec" aria-labelledby="br-skills">
            <h2 className="label" id="br-skills">{skills.title}</h2>
            <dl className="br-skills">
              {skills.groups.map((g) => (
                <div key={g.name}><dt>{g.name}</dt><dd><ul className="tags">{g.items.map((t) => <li key={t}>{t}</li>)}</ul></dd></div>
              ))}
            </dl>
          </section>
        )}

        <footer className="br-sec br-contact">
          <h2 className="label">Contact</h2>
          <div className="cta">
            <CopyButton text={p.email} label="Copy email" className="btn primary" />
            {p.links.filter((l) => l.icon !== "mail").map((l) => <a key={l.url} className="btn" href={l.url} rel="noopener" data-trackima-event="contact" data-trackima-via={l.icon}>{l.label}</a>)}
          </div>
          <span className="mail">{p.email}</span>
        </footer>
      </main>
      <ExposureTrack slug={x.slug} company={x.company} role={x.role} view="one-page" />
    </>
  );
}
