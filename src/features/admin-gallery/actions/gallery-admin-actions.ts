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

function redirectToAdminWithParam(paramName: string, paramValue: string): never {
  redirect(`${ADMIN_GALLERY_PATH}?${paramName}=${paramValue}`);
}

function getStorageFilePath(imagePath: string) {
  return imagePath
    .trim()
    .replace(new RegExp(`^${GALLERY_BUCKET_NAME}/`), "");
}

function revalidateGalleryPages() {
  revalidatePath("/");
  revalidatePath(ADMIN_GALLERY_PATH);
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

  const { alt, category, file, isPublished, sortOrder, title } =
    validationResult.data;
  const storageFileName = createGalleryStorageFileName(file);

  const { error: uploadError } = await supabase.storage
    .from(GALLERY_BUCKET_NAME)
    .upload(storageFileName, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Failed to upload gallery image to Supabase", uploadError);
    redirectToAdminWithParam("upload", "storage-error");
  }

  const { error: insertError } = await supabase.from("gallery_items").insert({
    alt,
    category,
    image_path: `${GALLERY_BUCKET_NAME}/${storageFileName}`,
    is_published: isPublished,
    sort_order: sortOrder,
    title,
  });

  if (insertError) {
    console.error("Failed to create gallery item in Supabase", insertError);
    await supabase.storage.from(GALLERY_BUCKET_NAME).remove([storageFileName]);
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

  const { alt, category, file, id, isPublished, sortOrder, title } =
    validationResult.data;

  const { data: existingItem, error: fetchError } = await supabase
    .from("gallery_items")
    .select("image_path")
    .eq("id", id)
    .single();

  if (fetchError || !existingItem) {
    console.error("Failed to fetch gallery item before update", fetchError);
    redirectToAdminWithParam("manage", "not-found");
  }

  let nextImagePath = existingItem.image_path;
  let newStorageFileName: string | null = null;

  if (file) {
    newStorageFileName = createGalleryStorageFileName(file);

    const { error: uploadError } = await supabase.storage
      .from(GALLERY_BUCKET_NAME)
      .upload(newStorageFileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Failed to upload replacement gallery image", uploadError);
      redirectToAdminWithParam("manage", "storage-error");
    }

    nextImagePath = `${GALLERY_BUCKET_NAME}/${newStorageFileName}`;
  }

  const { error: updateError } = await supabase
    .from("gallery_items")
    .update({
      alt,
      category,
      image_path: nextImagePath,
      is_published: isPublished,
      sort_order: sortOrder,
      title,
    })
    .eq("id", id);

  if (updateError) {
    console.error("Failed to update gallery item in Supabase", updateError);

    if (newStorageFileName) {
      await supabase.storage.from(GALLERY_BUCKET_NAME).remove([
        newStorageFileName,
      ]);
    }

    redirectToAdminWithParam("manage", "database-error");
  }

  if (newStorageFileName) {
    const oldStorageFilePath = getStorageFilePath(existingItem.image_path);
    const { error: removeError } = await supabase.storage
      .from(GALLERY_BUCKET_NAME)
      .remove([oldStorageFilePath]);

    if (removeError) {
      console.error("Failed to remove old gallery image from Supabase", removeError);
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

  const { error: deleteError } = await supabase
    .from("gallery_items")
    .delete()
    .eq("id", id.trim());

  if (deleteError) {
    console.error("Failed to delete gallery item from Supabase", deleteError);
    redirectToAdminWithParam("manage", "database-error");
  }

  const storageFilePath = getStorageFilePath(existingItem.image_path);
  const { error: removeError } = await supabase.storage
    .from(GALLERY_BUCKET_NAME)
    .remove([storageFilePath]);

  if (removeError) {
    console.error("Failed to remove gallery image from Supabase", removeError);
    redirectToAdminWithParam("manage", "storage-error");
  }

  revalidateGalleryPages();
  redirectToAdminWithParam("manage", "delete-success");
}
