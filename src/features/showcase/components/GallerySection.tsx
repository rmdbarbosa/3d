import Image from "next/image";
import type { GalleryItem } from "@/features/showcase/types";

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
              <div className="relative aspect-square overflow-hidden">
                <Image
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  height={760}
                  src={item.imageSrc}
                  width={760}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 to-transparent p-5">
                  <p className="text-xs font-bold uppercase tracking-normal text-[var(--accent-soft)]">
                    {item.category}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">{item.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
