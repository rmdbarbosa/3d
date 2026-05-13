"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import type { GalleryItem } from "@/features/showcase/types";

type GalleryItemCarouselProps = {
  item: GalleryItem;
};

export function GalleryItemCarousel({ item }: GalleryItemCarouselProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images =
    item.images.length > 0
      ? item.images
      : [{ imagePath: item.imageSrc, imageSrc: item.imageSrc }];
  const hasMultipleImages = images.length > 1;
  const activeImage = images[activeImageIndex] ?? images[0];

  function showPreviousImage() {
    setActiveImageIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  }

  function showNextImage() {
    setActiveImageIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    );
  }

  return (
    <div className="relative aspect-square overflow-hidden">
      <Image
        alt={item.alt}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        height={760}
        src={activeImage.imageSrc}
        width={760}
      />

      {hasMultipleImages ? (
        <>
          <button
            aria-label={`Ver imagem anterior de ${item.title}`}
            className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            onClick={showPreviousImage}
            type="button"
          >
            <ChevronLeft aria-hidden="true" size={22} />
          </button>
          <button
            aria-label={`Ver proxima imagem de ${item.title}`}
            className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            onClick={showNextImage}
            type="button"
          >
            <ChevronRight aria-hidden="true" size={22} />
          </button>
          <p className="absolute right-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-bold text-white">
            {activeImageIndex + 1}/{images.length}
          </p>
        </>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 to-transparent p-5">
        <p className="text-xs font-bold uppercase tracking-normal text-[var(--accent-soft)]">
          {item.category}
        </p>
        <h3 className="mt-1 text-lg font-bold text-white">{item.title}</h3>
      </div>
    </div>
  );
}
