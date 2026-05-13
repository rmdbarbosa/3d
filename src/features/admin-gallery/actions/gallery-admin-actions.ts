"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { validateGalleryUploadForm } from "@/features/admin-gallery/schemas";
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

  revalidatePath("/");
  redirectToAdminWithParam("upload", "success");
}
