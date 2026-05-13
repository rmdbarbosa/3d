const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export type GalleryUploadInput = {
  file: File;
  title: string;
  category: string;
  alt: string;
  sortOrder: number;
  isPublished: boolean;
};

export type GalleryUploadValidationResult =
  | {
      data: GalleryUploadInput;
      success: true;
    }
  | {
      error:
        | "missing-fields"
        | "missing-file"
        | "invalid-file-type"
        | "file-too-large"
        | "invalid-sort-order";
      success: false;
    };

function getRequiredText(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function getSortOrder(formData: FormData) {
  const value = getRequiredText(formData, "sort_order");

  if (!value) {
    return 0;
  }

  const numberValue = Number(value);

  if (!Number.isInteger(numberValue)) {
    return null;
  }

  return numberValue;
}

function getImageFile(formData: FormData) {
  const file = formData.get("image");

  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  return file;
}

export function validateGalleryUploadForm(
  formData: FormData,
): GalleryUploadValidationResult {
  const file = getImageFile(formData);

  if (!file) {
    return { error: "missing-file", success: false };
  }

  if (!ACCEPTED_IMAGE_TYPES.has(file.type)) {
    return { error: "invalid-file-type", success: false };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return { error: "file-too-large", success: false };
  }

  const title = getRequiredText(formData, "title");
  const category = getRequiredText(formData, "category");
  const alt = getRequiredText(formData, "alt");

  if (!title || !category || !alt) {
    return { error: "missing-fields", success: false };
  }

  const sortOrder = getSortOrder(formData);

  if (sortOrder === null) {
    return { error: "invalid-sort-order", success: false };
  }

  return {
    data: {
      alt,
      category,
      file,
      isPublished: formData.get("is_published") === "on",
      sortOrder,
      title,
    },
    success: true,
  };
}
