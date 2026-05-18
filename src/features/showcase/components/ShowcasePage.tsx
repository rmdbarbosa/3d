import { SiteFooter } from "@/components/shared/SiteFooter";
import { CtaSection } from "@/features/showcase/components/CtaSection";
import { FaqSection } from "@/features/showcase/components/FaqSection";
import { GallerySection } from "@/features/showcase/components/GallerySection";
import { HeroSection } from "@/features/showcase/components/HeroSection";
import { SeoStructuredData } from "@/features/showcase/components/SeoStructuredData";
import { ServicesSection } from "@/features/showcase/components/ServicesSection";
import { getGalleryItems } from "@/features/showcase/server/queries";

export async function ShowcasePage() {
  const galleryItems = await getGalleryItems();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SeoStructuredData />
      <main>
        <HeroSection />
        <ServicesSection />
        <GallerySection items={galleryItems} />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
