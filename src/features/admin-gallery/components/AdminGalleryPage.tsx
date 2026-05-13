import { AdminLoginForm } from "@/features/admin-gallery/components/AdminLoginForm";
import { GalleryItemsManager } from "@/features/admin-gallery/components/GalleryItemsManager";
import { GalleryUploadForm } from "@/features/admin-gallery/components/GalleryUploadForm";
import type {
  AdminGalleryItem,
  AdminMessage,
} from "@/features/admin-gallery/types";

type AdminGalleryPageProps = {
  galleryItems: AdminGalleryItem[];
  isAuthenticated: boolean;
  loginMessage: AdminMessage | null;
  manageMessage: AdminMessage | null;
  uploadMessage: AdminMessage | null;
};

export function AdminGalleryPage({
  galleryItems,
  isAuthenticated,
  loginMessage,
  manageMessage,
  uploadMessage,
}: AdminGalleryPageProps) {
  return (
    <main className="min-h-screen bg-[#111111] text-[var(--foreground)]">
      {isAuthenticated ? (
        <>
          <GalleryUploadForm message={uploadMessage} />
          <GalleryItemsManager items={galleryItems} message={manageMessage} />
        </>
      ) : (
        <AdminLoginForm message={loginMessage} />
      )}
    </main>
  );
}
