import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseOpened, Gallery } from "@/components/client";
import { CaseCover, Md } from "@/components/journey";
import { caseFiles, getContent, projectsSectionId } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };
const pad = (n: number) => String(n).padStart(2, "0");

export async function generateStaticParams() {
  return caseFiles(await getContent()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = caseFiles(await getContent()).find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: p.tagline, alternates: { canonical: `/work/${p.slug}` }, openGraph: { title: p.name, description: p.tagline, url: `/work/${p.slug}` } };
}

export default async function CaseFile({ params }: Props) {
  const { slug } = await params;
  const c = await getContent();
  const files = caseFiles(c);
  const i = files.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const p = files[i], next = files[(i + 1) % files.length];
  const meta: [string, string][] = [["Role", p.role], ["Period", p.period], ["Team", p.team || "Solo"], ["Status", p.status]];
  const back = `/#lv-${projectsSectionId(c)}`;
  return (
    <>
      <nav className="topbar" aria-label="Case file">
        <Link className="btn sm" href={back}>← Back to the journey</Link>
        <span className="label">Case file {pad(i + 1)} / {pad(files.length)}</span>
        {files.length > 1 ? <Link className="btn sm" href={`/work/${next.slug}`}>Next: {next.name} →</Link> : <span />}
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
            <Link className="btn primary" href={`/work/${next.slug}`}>Open →</Link>
          </div>
        )}
      </main>
      <CaseOpened slug={p.slug} />
    </>
  );
}
