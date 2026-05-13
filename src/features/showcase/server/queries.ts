import type { GalleryItem } from "@/features/showcase/types";
import { createSupabaseClient } from "@/lib/supabase/client";

const GALLERY_BUCKET_NAME = "gallery";

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

function getGalleryImageUrl(
  supabase: NonNullable<ReturnType<typeof createSupabaseClient>>,
  imagePath: string,
) {
  const normalizedImagePath = imagePath.trim();

  if (
    normalizedImagePath.startsWith("https://") ||
    normalizedImagePath.startsWith("http://")
  ) {
    return normalizedImagePath;
  }

  const storagePath = normalizedImagePath.replace(
    new RegExp(`^${GALLERY_BUCKET_NAME}/`),
    "",
  );

  return supabase.storage.from(GALLERY_BUCKET_NAME).getPublicUrl(storagePath).data
    .publicUrl;
}

export async function getGalleryItems() {
  const supabase = createSupabaseClient();

  if (!supabase) {
    return GALLERY_ITEMS;
  }

  const { data: galleryItems, error } = await supabase
    .from("gallery_items")
    .select("id,title,category,alt,image_path")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch gallery items from Supabase", error);
    return GALLERY_ITEMS;
  }

  return galleryItems.map((item) => {
    return {
      id: item.id,
      title: item.title,
      imageSrc: getGalleryImageUrl(supabase, item.image_path),
      alt: item.alt,
      category: item.category,
    };
  });
}
