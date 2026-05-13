import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { CtaSection } from "@/features/showcase/components/CtaSection";
import { GallerySection } from "@/features/showcase/components/GallerySection";
import { HeroSection } from "@/features/showcase/components/HeroSection";
import { getGalleryItems } from "@/features/showcase/server/queries";

export async function ShowcasePage() {
  const galleryItems = await getGalleryItems();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <main>
        <HeroSection />
        <GallerySection items={galleryItems} />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
