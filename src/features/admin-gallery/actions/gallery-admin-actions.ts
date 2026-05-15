"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  validateGalleryUpdateForm,
  validateGalleryUploadForm,
} from "@/features/admin-gallery/schemas";
import {
  createAdminSession,
  isAdminAuthConfigured,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "@/features/admin-gallery/server/session";
import { createGalleryStorageFileName } from "@/features/admin-gallery/server/uploads";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const ADMIN_GALLERY_PATH = "/admin/galeria";
const GALLERY_BUCKET_NAME = "gallery";

type SupabaseAdminClient = NonNullable<
  ReturnType<typeof createSupabaseAdminClient>
>;

function redirectToAdminWithParam(paramName: string, paramValue: string): never {
  redirect(`${ADMIN_GALLERY_PATH}?${paramName}=${paramValue}`);
}

function getStorageFilePath(imagePath: string) {
  const normalizedImagePath = imagePath.trim();

  if (
    normalizedImagePath.startsWith("https://") ||
    normalizedImagePath.startsWith("http://")
  ) {
    return null;
  }

  return normalizedImagePath.replace(new RegExp(`^${GALLERY_BUCKET_NAME}/`), "");
}

function revalidateGalleryPages() {
  revalidatePath("/");
  revalidatePath(ADMIN_GALLERY_PATH);
}

function getUniqueStorageFilePaths(imagePaths: string[]) {
  const storageFilePaths = imagePaths
    .map(getStorageFilePath)
    .filter((imagePath): imagePath is string => Boolean(imagePath));

  return Array.from(new Set(storageFilePaths));
}

async function uploadGalleryFiles(
  supabase: SupabaseAdminClient,
  files: File[],
) {
  const uploadedFileNames: string[] = [];

  for (const file of files) {
    const storageFileName = createGalleryStorageFileName(file);

    const { error: uploadError } = await supabase.storage
      .from(GALLERY_BUCKET_NAME)
      .upload(storageFileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Failed to upload gallery image to Supabase", uploadError);

      if (uploadedFileNames.length > 0) {
        await supabase.storage.from(GALLERY_BUCKET_NAME).remove(uploadedFileNames);
      }

      return { error: "storage-error" as const, fileNames: [] };
    }

    uploadedFileNames.push(storageFileName);
  }

  return { error: null, fileNames: uploadedFileNames };
}

async function updateGalleryCoverImage(
  supabase: SupabaseAdminClient,
  galleryItemId: string,
  coverImageId: string,
) {
  const { data: images, error: imagesFetchError } = await supabase
    .from("gallery_item_images")
    .select("id,image_path,sort_order,created_at")
    .eq("gallery_item_id", galleryItemId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (imagesFetchError) {
    console.error("Failed to fetch gallery item images before update", imagesFetchError);
    return { error: "database-error" as const, imagePath: null };
  }

  const galleryImages = images ?? [];
  const coverImage = galleryImages.find((image) => image.id === coverImageId);

  if (!coverImage) {
    return { error: "missing-cover-image" as const, imagePath: null };
  }

  const orderedImages = [
    coverImage,
    ...galleryImages.filter((image) => image.id !== coverImageId),
  ];

  for (const [imageIndex, image] of orderedImages.entries()) {
    if (image.sort_order === imageIndex) {
      continue;
    }

    const { error: imageUpdateError } = await supabase
      .from("gallery_item_images")
      .update({ sort_order: imageIndex })
      .eq("id", image.id);

    if (imageUpdateError) {
      console.error("Failed to update gallery image sort order", imageUpdateError);
      return { error: "database-error" as const, imagePath: null };
    }
  }

  return { error: null, imagePath: coverImage.image_path };
}

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password");

  if (!isAdminAuthConfigured()) {
    redirectToAdminWithParam("login", "missing-config");
  }

  if (typeof password !== "string" || !verifyAdminPassword(password)) {
    redirectToAdminWithParam("login", "invalid-password");
  }

  const sessionCreated = await createAdminSession();

  if (!sessionCreated) {
    redirectToAdminWithParam("login", "missing-config");
  }

  redirect(ADMIN_GALLERY_PATH);
}

export async function createGalleryItem(formData: FormData) {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirectToAdminWithParam("login", "session-expired");
  }

  const validationResult = validateGalleryUploadForm(formData);

  if (!validationResult.success) {
    redirectToAdminWithParam("upload", validationResult.error);
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    redirectToAdminWithParam("upload", "missing-config");
  }

  const { alt, category, files, isPublished, sortOrder, title } =
    validationResult.data;
  const uploadResult = await uploadGalleryFiles(supabase, files);

  if (uploadResult.error) {
    redirectToAdminWithParam("upload", "storage-error");
  }

  const imagePaths = uploadResult.fileNames.map(
    (fileName) => `${GALLERY_BUCKET_NAME}/${fileName}`,
  );

  const { data: newItem, error: insertError } = await supabase
    .from("gallery_items")
    .insert({
      alt,
      category,
      image_path: imagePaths[0],
      is_published: isPublished,
      sort_order: sortOrder,
      title,
    })
    .select("id")
    .single();

  if (insertError || !newItem) {
    console.error("Failed to create gallery item in Supabase", insertError);
    await supabase.storage.from(GALLERY_BUCKET_NAME).remove(uploadResult.fileNames);
    redirectToAdminWithParam("upload", "database-error");
  }

  const galleryItemImages = imagePaths.map((imagePath, imageIndex) => ({
    gallery_item_id: newItem.id,
    image_path: imagePath,
    sort_order: imageIndex,
  }));

  const { error: imagesInsertError } = await supabase
    .from("gallery_item_images")
    .insert(galleryItemImages);

  if (imagesInsertError) {
    console.error("Failed to create gallery item images in Supabase", imagesInsertError);
    await supabase.from("gallery_items").delete().eq("id", newItem.id);
    await supabase.storage.from(GALLERY_BUCKET_NAME).remove(uploadResult.fileNames);
    redirectToAdminWithParam("upload", "database-error");
  }

  revalidateGalleryPages();
  redirectToAdminWithParam("upload", "success");
}

export async function updateGalleryItem(formData: FormData) {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirectToAdminWithParam("login", "session-expired");
  }

  const validationResult = validateGalleryUpdateForm(formData);

  if (!validationResult.success) {
    redirectToAdminWithParam("manage", validationResult.error);
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    redirectToAdminWithParam("manage", "missing-config");
  }

  const {
    alt,
    category,
    coverImageId,
    files,
    id,
    isPublished,
    sortOrder,
    title,
  } = validationResult.data;

  const coverUpdateResult = await updateGalleryCoverImage(
    supabase,
    id,
    coverImageId,
  );

  if (coverUpdateResult.error) {
    redirectToAdminWithParam("manage", coverUpdateResult.error);
  }

  const coverImagePath = coverUpdateResult.imagePath;

  if (!coverImagePath) {
    redirectToAdminWithParam("manage", "database-error");
  }

  const { error: updateError } = await supabase
    .from("gallery_items")
    .update({
      alt,
      category,
      image_path: coverImagePath,
      is_published: isPublished,
      sort_order: sortOrder,
      title,
    })
    .eq("id", id);

  if (updateError) {
    console.error("Failed to update gallery item in Supabase", updateError);
    redirectToAdminWithParam("manage", "database-error");
  }

  if (files.length > 0) {
    const uploadResult = await uploadGalleryFiles(supabase, files);

    if (uploadResult.error) {
      redirectToAdminWithParam("manage", "storage-error");
    }

    const { data: latestImage } = await supabase
      .from("gallery_item_images")
      .select("sort_order")
      .eq("gallery_item_id", id)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    const nextSortOrder = (latestImage?.sort_order ?? -1) + 1;
    const imageRows = uploadResult.fileNames.map((fileName, imageIndex) => ({
      gallery_item_id: id,
      image_path: `${GALLERY_BUCKET_NAME}/${fileName}`,
      sort_order: nextSortOrder + imageIndex,
    }));

    const { error: imagesInsertError } = await supabase
      .from("gallery_item_images")
      .insert(imageRows);

    if (imagesInsertError) {
      console.error("Failed to append gallery item images in Supabase", imagesInsertError);
      await supabase.storage.from(GALLERY_BUCKET_NAME).remove(uploadResult.fileNames);
      redirectToAdminWithParam("manage", "database-error");
    }
  }

  revalidateGalleryPages();
  redirectToAdminWithParam("manage", "update-success");
}

export async function deleteGalleryItem(formData: FormData) {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirectToAdminWithParam("login", "session-expired");
  }

  const id = formData.get("id");

  if (typeof id !== "string" || !id.trim()) {
    redirectToAdminWithParam("manage", "missing-item");
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    redirectToAdminWithParam("manage", "missing-config");
  }

  const { data: existingItem, error: fetchError } = await supabase
    .from("gallery_items")
    .select("image_path")
    .eq("id", id.trim())
    .single();

  if (fetchError || !existingItem) {
    console.error("Failed to fetch gallery item before delete", fetchError);
    redirectToAdminWithParam("manage", "not-found");
  }

  const { data: existingImages, error: imagesFetchError } = await supabase
    .from("gallery_item_images")
    .select("image_path")
    .eq("gallery_item_id", id.trim());

  if (imagesFetchError) {
    console.error("Failed to fetch gallery item images before delete", imagesFetchError);
    redirectToAdminWithParam("manage", "database-error");
  }

  const { error: deleteError } = await supabase
    .from("gallery_items")
    .delete()
    .eq("id", id.trim());

  if (deleteError) {
    console.error("Failed to delete gallery item from Supabase", deleteError);
    redirectToAdminWithParam("manage", "database-error");
  }

  const storageFilePaths = getUniqueStorageFilePaths([
    existingItem.image_path,
    ...(existingImages ?? []).map((image) => image.image_path),
  ]);

  if (storageFilePaths.length === 0) {
    revalidateGalleryPages();
    redirectToAdminWithParam("manage", "delete-success");
  }

  const { error: removeError } = await supabase.storage
    .from(GALLERY_BUCKET_NAME)
    .remove(storageFilePaths);

  if (removeError) {
    console.error("Failed to remove gallery image from Supabase", removeError);
    redirectToAdminWithParam("manage", "storage-error");
  }

  revalidateGalleryPages();
  redirectToAdminWithParam("manage", "delete-success");
}
