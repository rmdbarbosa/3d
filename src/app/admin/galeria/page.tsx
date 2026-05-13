import type { Metadata } from "next";

import { AdminGalleryPage } from "@/features/admin-gallery/components/AdminGalleryPage";
import {
  getAdminLoginMessage,
  getGalleryUploadMessage,
} from "@/features/admin-gallery/server/messages";
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

  return (
    <AdminGalleryPage
      isAuthenticated={isAuthenticated}
      loginMessage={getAdminLoginMessage(
        getSearchParam(resolvedSearchParams, "login"),
      )}
      uploadMessage={getGalleryUploadMessage(
        getSearchParam(resolvedSearchParams, "upload"),
      )}
    />
  );
}
