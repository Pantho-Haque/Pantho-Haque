import { JourneyView } from "@/components/views";
import { exposureFor } from "@/lib/content";

export default async function Full({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { content, exposure } = await exposureFor(slug);
  return <JourneyView c={content} x={exposure} base={`/for/${slug}`} />;
}
