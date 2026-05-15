const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export type GalleryUploadInput = {
  files: File[];
  title: string;
  category: string;
  alt: string;
  sortOrder: number;
  isPublished: boolean;
};

export type GalleryUpdateInput = {
  coverImageId: string;
  id: string;
  files: File[];
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

export type GalleryUpdateValidationResult =
  | {
      data: GalleryUpdateInput;
      success: true;
    }
  | {
      error:
        | "missing-fields"
        | "missing-cover-image"
        | "missing-item"
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

function getImageFiles(formData: FormData) {
  return formData
    .getAll("images")
    .filter((file): file is File => file instanceof File && file.size > 0);
}

function validateImageFile(file: File) {
  if (!ACCEPTED_IMAGE_TYPES.has(file.type)) {
    return "invalid-file-type";
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return "file-too-large";
  }

  return null;
}

type GalleryFieldsValidationResult =
  | {
      data: Omit<GalleryUploadInput, "files">;
      success: true;
    }
  | {
      error: "missing-fields" | "invalid-sort-order";
      success: false;
    };

function validateGalleryFormFields(
  formData: FormData,
): GalleryFieldsValidationResult {
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
      isPublished: formData.get("is_published") === "on",
      sortOrder,
      title,
    },
    success: true,
  };
}

export function validateGalleryUploadForm(
  formData: FormData,
): GalleryUploadValidationResult {
  const files = getImageFiles(formData);

  if (files.length === 0) {
    return { error: "missing-file", success: false };
  }

  const imageError = files.map(validateImageFile).find(Boolean);

  if (imageError) {
    return { error: imageError, success: false };
  }

  const fields = validateGalleryFormFields(formData);

  if (!fields.success) {
    return { error: fields.error, success: false };
  }

  return {
    data: {
      files,
      ...fields.data,
    },
    success: true,
  };
}

export function validateGalleryUpdateForm(
  formData: FormData,
): GalleryUpdateValidationResult {
  const id = getRequiredText(formData, "id");
  const coverImageId = getRequiredText(formData, "cover_image_id");

  if (!id) {
    return { error: "missing-item", success: false };
  }

  if (!coverImageId) {
    return { error: "missing-cover-image", success: false };
  }

  const files = getImageFiles(formData);

  if (files.length > 0) {
    const imageError = files.map(validateImageFile).find(Boolean);

    if (imageError) {
      return { error: imageError, success: false };
    }
  }

  const fields = validateGalleryFormFields(formData);

  if (!fields.success) {
    return { error: fields.error, success: false };
  }

  return {
    data: {
      coverImageId,
      files,
      id,
      ...fields.data,
    },
    success: true,
  };
}
