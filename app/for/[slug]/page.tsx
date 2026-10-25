import { BriefView } from "@/components/views";
import { exposureFor } from "@/lib/content";

export default async function Brief({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { content, exposure } = await exposureFor(slug);
  return <BriefView c={content} x={exposure} base={`/for/${slug}`} />;
}
