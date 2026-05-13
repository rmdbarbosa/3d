import type { GalleryItem } from "@/features/showcase/types";
import { GalleryItemCarousel } from "@/features/showcase/components/GalleryItemCarousel";

type GallerySectionProps = {
  items: GalleryItem[];
};

export function GallerySection({ items }: GallerySectionProps) {
  return (
    <section className="bg-[#111111] px-5 py-20 sm:px-8 lg:py-28" id="galeria">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-normal text-white sm:text-4xl">
            Criado com precisão
          </h2>
          <p className="mt-4 text-base leading-7 text-[#d8c2b8]">
            Uma seleção de projetos recentes, mostrando detalhe, acabamento e
            qualidade em impressões personalizadas.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              className="group overflow-hidden rounded-lg border border-[#202020] bg-[#171717] shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
              key={item.id}
            >
              <GalleryItemCarousel item={item} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
