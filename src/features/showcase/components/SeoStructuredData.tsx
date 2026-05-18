import { getStructuredDataJson } from "@/features/showcase/seo";

export function SeoStructuredData() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: getStructuredDataJson() }}
      type="application/ld+json"
    />
  );
}
