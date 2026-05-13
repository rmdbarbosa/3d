import { AdminLoginForm } from "@/features/admin-gallery/components/AdminLoginForm";
import { GalleryUploadForm } from "@/features/admin-gallery/components/GalleryUploadForm";
import type { AdminMessage } from "@/features/admin-gallery/types";

type AdminGalleryPageProps = {
  isAuthenticated: boolean;
  loginMessage: AdminMessage | null;
  uploadMessage: AdminMessage | null;
};

export function AdminGalleryPage({
  isAuthenticated,
  loginMessage,
  uploadMessage,
}: AdminGalleryPageProps) {
  return (
    <main className="min-h-screen bg-[#111111] text-[var(--foreground)]">
      {isAuthenticated ? (
        <GalleryUploadForm message={uploadMessage} />
      ) : (
        <AdminLoginForm message={loginMessage} />
      )}
    </main>
  );
}
