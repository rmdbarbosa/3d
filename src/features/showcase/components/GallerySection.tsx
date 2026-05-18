import { GalleryItemCarousel } from "@/features/showcase/components/GalleryItemCarousel";
import type { GalleryItem } from "@/features/showcase/types";

type GallerySectionProps = {
  items: GalleryItem[];
};

export function GallerySection({ items }: GallerySectionProps) {
  return (
    <section className="bg-[#111111] px-5 sm:px-8" id="galeria">
      <div className="mx-auto w-full max-w-7xl">
        <div className="pt-16">
          <p className="text-sm font-bold uppercase tracking-normal text-[var(--accent-soft)]">
            Portfólio
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-white sm:text-4xl">
            Projetos impressos em 3D com acabamento sob medida
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#d8c2b8]">
            Veja exemplos de modelos, peças e objetos que ajudam a transformar
            ideias digitais em itens físicos para uso, apresentação ou presente.
          </p>
        </div>

        <div className="my-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
