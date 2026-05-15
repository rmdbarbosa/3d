import type { AdminGalleryItem } from "@/features/admin-gallery/types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const GALLERY_BUCKET_NAME = "gallery";
const SUPABASE_MISSING_TABLE_CODE = "PGRST205";

function getGalleryImageUrl(
  supabase: NonNullable<ReturnType<typeof createSupabaseAdminClient>>,
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

  return supabase.storage.from(GALLERY_BUCKET_NAME).getPublicUrl(storagePath)
    .data.publicUrl;
}

export async function getAdminGalleryItems(): Promise<AdminGalleryItem[]> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  const { data: galleryItems, error } = await supabase
    .from("gallery_items")
    .select("id,title,category,alt,image_path,sort_order,is_published,created_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch admin gallery items from Supabase", error);
    return [];
  }

  const galleryItemIds = galleryItems.map((item) => item.id);
  const { data: galleryImages, error: imagesError } =
    galleryItemIds.length > 0
      ? await supabase
          .from("gallery_item_images")
          .select("id,gallery_item_id,image_path,sort_order,created_at")
          .in("gallery_item_id", galleryItemIds)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: true })
      : { data: [], error: null };

  if (imagesError && imagesError.code !== SUPABASE_MISSING_TABLE_CODE) {
    console.error("Failed to fetch admin gallery item images from Supabase", imagesError);
  }

  return galleryItems.map((item) => {
    const itemImages = (galleryImages ?? [])
      .filter((image) => image.gallery_item_id === item.id)
      .map((image) => ({
        id: image.id,
        imagePath: image.image_path,
        imageSrc: getGalleryImageUrl(supabase, image.image_path),
        sortOrder: image.sort_order,
      }));
    const images =
      itemImages.length > 0
        ? itemImages
        : [
            {
              id: "",
              imagePath: item.image_path,
              imageSrc: getGalleryImageUrl(supabase, item.image_path),
              sortOrder: 0,
            },
          ];

    return {
      id: item.id,
      title: item.title,
      category: item.category,
      alt: item.alt,
      imagePath: item.image_path,
      imageSrc: images[0].imageSrc,
      images,
      sortOrder: item.sort_order,
      isPublished: item.is_published,
      createdAt: item.created_at,
    };
  });
}
