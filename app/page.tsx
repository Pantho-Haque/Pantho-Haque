import { JourneyView } from "@/components/views";
import { getExposure, SITE_URL } from "@/lib/content";

export default async function Home() {
  const { content: c, exposure: x } = (await getExposure("main"))!;
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
      <JourneyView c={c} x={x} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
    </>
  );
}
