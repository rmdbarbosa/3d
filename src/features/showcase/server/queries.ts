import type { GalleryItem } from "@/features/showcase/types";
import { createSupabaseClient } from "@/lib/supabase/client";

const GALLERY_BUCKET_NAME = "gallery";
const SUPABASE_MISSING_TABLE_CODE = "PGRST205";

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "architectural-model",
    title: "Modelo arquitetonico",
    imageSrc: "/images/galeria-arquitetura.png",
    alt: "Modelo arquitetonico impresso em 3D com iluminacao quente",
    category: "Arquitetura",
    images: [
      {
        imagePath: "/images/galeria-arquitetura.png",
        imageSrc: "/images/galeria-arquitetura.png",
      },
    ],
  },
  {
    id: "mechanical-parts",
    title: "Pecas funcionais",
    imageSrc: "/images/galeria-pecas-mecanicas.png",
    alt: "Conjunto de engrenagens e pecas tecnicas impressas em 3D",
    category: "Prototipos",
    images: [
      {
        imagePath: "/images/galeria-pecas-mecanicas.png",
        imageSrc: "/images/galeria-pecas-mecanicas.png",
      },
    ],
  },
  {
    id: "lattice-sphere",
    title: "Objeto decorativo",
    imageSrc: "/images/galeria-esfera-organica.png",
    alt: "Esfera organica vazada impressa em 3D sobre fundo escuro",
    category: "Design",
    images: [
      {
        imagePath: "/images/galeria-esfera-organica.png",
        imageSrc: "/images/galeria-esfera-organica.png",
      },
    ],
  },
  {
    id: "tabletop-miniature",
    title: "Miniatura colecionavel",
    imageSrc: "/images/galeria-miniatura.png",
    alt: "Miniatura detalhada de personagem para colecao impressa em 3D",
    category: "Colecionaveis",
    images: [
      {
        imagePath: "/images/galeria-miniatura.png",
        imageSrc: "/images/galeria-miniatura.png",
      },
    ],
  },
  {
    id: "engineering-kit",
    title: "Kit de montagem",
    imageSrc: "/images/galeria-kit-engenharia.png",
    alt: "Kit com engrenagens e conectores impressos em 3D na cor laranja",
    category: "Engenharia",
    images: [
      {
        imagePath: "/images/galeria-kit-engenharia.png",
        imageSrc: "/images/galeria-kit-engenharia.png",
      },
    ],
  },
  {
    id: "presentation-model",
    title: "Maquete de apresentacao",
    imageSrc: "/images/galeria-maquete.png",
    alt: "Maquete de apresentacao impressa em 3D sobre base de madeira",
    category: "Apresentacao",
    images: [
      {
        imagePath: "/images/galeria-maquete.png",
        imageSrc: "/images/galeria-maquete.png",
      },
    ],
  },
];

function getGalleryImageUrl(
  supabase: NonNullable<ReturnType<typeof createSupabaseClient>>,
  imagePath: string,
) {
  const normalizedImagePath = imagePath.trim();

  if (
    normalizedImagePath.startsWith("https://") ||
    normalizedImagePath.startsWith("http://") ||
    normalizedImagePath.startsWith("/")
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

  const galleryItemIds = galleryItems.map((item) => item.id);
  const { data: galleryImages, error: imagesError } =
    galleryItemIds.length > 0
      ? await supabase
          .from("gallery_item_images")
          .select("gallery_item_id,image_path,sort_order,created_at")
          .in("gallery_item_id", galleryItemIds)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: true })
      : { data: [], error: null };

  if (imagesError && imagesError.code !== SUPABASE_MISSING_TABLE_CODE) {
    console.error("Failed to fetch gallery item images from Supabase", imagesError);
  }

  return galleryItems.map((item) => {
    const itemImages = (galleryImages ?? [])
      .filter((image) => image.gallery_item_id === item.id)
      .map((image) => ({
        imagePath: image.image_path,
        imageSrc: getGalleryImageUrl(supabase, image.image_path),
      }));
    const images =
      itemImages.length > 0
        ? itemImages
        : [
            {
              imagePath: item.image_path,
              imageSrc: getGalleryImageUrl(supabase, item.image_path),
            },
          ];

    return {
      id: item.id,
      title: item.title,
      imageSrc: images[0].imageSrc,
      alt: item.alt,
      category: item.category,
      images,
    };
  });
}
