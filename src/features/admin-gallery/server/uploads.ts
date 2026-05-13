import { randomUUID } from "crypto";

const MIME_TYPE_EXTENSION_MAP = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

function getSafeFileNameSegment(fileName: string) {
  const extensionIndex = fileName.lastIndexOf(".");
  const nameWithoutExtension =
    extensionIndex >= 0 ? fileName.slice(0, extensionIndex) : fileName;

  const safeSegment = nameWithoutExtension
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return safeSegment || "imagem";
}

export function createGalleryStorageFileName(file: File) {
  const extension = MIME_TYPE_EXTENSION_MAP.get(file.type) ?? "jpg";
  const fileNameSegment = getSafeFileNameSegment(file.name);

  return `${Date.now()}-${fileNameSegment}-${randomUUID()}.${extension}`;
}
