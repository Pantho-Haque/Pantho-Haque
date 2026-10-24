import Engine from "@/components/Engine";
import { Briefing, Finale, Hud, LevelMap, Sections } from "@/components/journey";
import { getContent, SITE_URL } from "@/lib/content";

export default async function Home() {
  const c = await getContent();
  const p = c.profile;
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.headline.split(" at ")[0],
    email: `mailto:${p.email}`,
    url: SITE_URL,
    address: { "@type": "PostalAddress", addressLocality: p.location },
    sameAs: p.links.filter((l) => l.url.startsWith("http")).map((l) => l.url),
    ...(p.photo && { image: p.photo.url }),
  };
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Hud resumeUrl={p.resumeUrl} />
      <div className="jr-grid">
        <main id="main" className="jr-main">
          <div className="route" aria-hidden><i /></div>
          <Briefing c={c} />
          <Sections c={c} />
          <Finale c={c} />
        </main>
        <LevelMap c={c} />
      </div>
      <Engine />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
    </>
  );
}
