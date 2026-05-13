import type { Metadata } from "next";

import { AdminGalleryPage } from "@/features/admin-gallery/components/AdminGalleryPage";
import {
  getAdminLoginMessage,
  getGalleryManageMessage,
  getGalleryUploadMessage,
} from "@/features/admin-gallery/server/messages";
import { getAdminGalleryItems } from "@/features/admin-gallery/server/queries";
import { isAdminAuthenticated } from "@/features/admin-gallery/server/session";

export const metadata: Metadata = {
  title: "Admin | Galeria",
};

type AdminGalleryRouteProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSearchParam(
  searchParams: Record<string, string | string[] | undefined> | undefined,
  paramName: string,
) {
  const value = searchParams?.[paramName];

  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function Page({ searchParams }: AdminGalleryRouteProps) {
  const resolvedSearchParams = await searchParams;
  const isAuthenticated = await isAdminAuthenticated();
  const galleryItems = isAuthenticated ? await getAdminGalleryItems() : [];

  return (
    <AdminGalleryPage
      galleryItems={galleryItems}
      isAuthenticated={isAuthenticated}
      loginMessage={getAdminLoginMessage(
        getSearchParam(resolvedSearchParams, "login"),
      )}
      manageMessage={getGalleryManageMessage(
        getSearchParam(resolvedSearchParams, "manage"),
      )}
      uploadMessage={getGalleryUploadMessage(
        getSearchParam(resolvedSearchParams, "upload"),
      )}
    />
  );
}
