import type { AdminGalleryItem } from "@/features/admin-gallery/types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const GALLERY_BUCKET_NAME = "gallery";

function getGalleryImageUrl(
  supabase: NonNullable<ReturnType<typeof createSupabaseAdminClient>>,
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

  return galleryItems.map((item) => {
    return {
      id: item.id,
      title: item.title,
      category: item.category,
      alt: item.alt,
      imagePath: item.image_path,
      imageSrc: getGalleryImageUrl(supabase, item.image_path),
      sortOrder: item.sort_order,
      isPublished: item.is_published,
      createdAt: item.created_at,
    };
  });
}
