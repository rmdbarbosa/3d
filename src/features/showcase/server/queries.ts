import type { GalleryItem } from "@/features/showcase/types";

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "architectural-model",
    title: "Modelo arquitetônico",
    imageSrc: "/images/galeria-arquitetura.png",
    alt: "Modelo arquitetônico impresso em 3D com iluminação quente",
    category: "Arquitetura",
  },
  {
    id: "mechanical-parts",
    title: "Peças funcionais",
    imageSrc: "/images/galeria-pecas-mecanicas.png",
    alt: "Conjunto de engrenagens e peças técnicas impressas em 3D",
    category: "Protótipos",
  },
  {
    id: "lattice-sphere",
    title: "Objeto decorativo",
    imageSrc: "/images/galeria-esfera-organica.png",
    alt: "Esfera orgânica vazada impressa em 3D sobre fundo escuro",
    category: "Design",
  },
  {
    id: "tabletop-miniature",
    title: "Miniatura colecionável",
    imageSrc: "/images/galeria-miniatura.png",
    alt: "Miniatura detalhada de personagem para coleção impressa em 3D",
    category: "Colecionáveis",
  },
  {
    id: "engineering-kit",
    title: "Kit de montagem",
    imageSrc: "/images/galeria-kit-engenharia.png",
    alt: "Kit com engrenagens e conectores impressos em 3D na cor laranja",
    category: "Engenharia",
  },
  {
    id: "presentation-model",
    title: "Maquete de apresentação",
    imageSrc: "/images/galeria-maquete.png",
    alt: "Maquete de apresentação impressa em 3D sobre base de madeira",
    category: "Apresentação",
  },
];

export async function getGalleryItems() {
  return GALLERY_ITEMS;
}
