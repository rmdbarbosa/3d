import { ImagePlus, Upload } from "lucide-react";

import { createGalleryItem } from "@/features/admin-gallery/actions/gallery-admin-actions";
import type { AdminMessage } from "@/features/admin-gallery/types";

type GalleryUploadFormProps = {
  message: AdminMessage | null;
};

function getMessageClassName(variant: AdminMessage["variant"]) {
  if (variant === "success") {
    return "border-emerald-400/30 bg-emerald-500/10 text-emerald-100";
  }

  return "border-red-400/30 bg-red-500/10 text-red-100";
}

export function GalleryUploadForm({ message }: GalleryUploadFormProps) {
  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-lg bg-[var(--accent)] text-black">
          <ImagePlus aria-hidden="true" size={24} />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-[var(--accent-soft)]">
            Admin
          </p>
          <h1 className="text-3xl font-extrabold tracking-normal text-white">
            Nova imagem da galeria
          </h1>
        </div>
      </div>

      {message ? (
        <p
          className={`mb-6 rounded-lg border px-4 py-3 text-sm ${getMessageClassName(
            message.variant,
          )}`}
          role="status"
        >
          {message.text}
        </p>
      ) : null}

      <form
        action={createGalleryItem}
        className="rounded-lg border border-[#202020] bg-[#161616] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.24)] sm:p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              className="text-sm font-semibold text-[#f1e7e0]"
              htmlFor="image"
            >
              Imagem
            </label>
            <input
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="mt-2 w-full rounded-lg border border-[#2c2c2c] bg-[#101010] px-4 py-3 text-sm text-white outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--accent)] file:px-4 file:py-2 file:text-sm file:font-bold file:text-black focus:border-[var(--accent)]"
              id="image"
              name="image"
              required
              type="file"
            />
          </div>

          <div>
            <label
              className="text-sm font-semibold text-[#f1e7e0]"
              htmlFor="title"
            >
              Título
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-[#2c2c2c] bg-[#101010] px-4 py-3 text-base text-white outline-none transition focus:border-[var(--accent)]"
              id="title"
              name="title"
              required
              type="text"
            />
          </div>

          <div>
            <label
              className="text-sm font-semibold text-[#f1e7e0]"
              htmlFor="category"
            >
              Categoria
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-[#2c2c2c] bg-[#101010] px-4 py-3 text-base text-white outline-none transition focus:border-[var(--accent)]"
              id="category"
              name="category"
              required
              type="text"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              className="text-sm font-semibold text-[#f1e7e0]"
              htmlFor="alt"
            >
              Texto alternativo
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-[#2c2c2c] bg-[#101010] px-4 py-3 text-base text-white outline-none transition focus:border-[var(--accent)]"
              id="alt"
              name="alt"
              required
              type="text"
            />
          </div>

          <div>
            <label
              className="text-sm font-semibold text-[#f1e7e0]"
              htmlFor="sort_order"
            >
              Ordem
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-[#2c2c2c] bg-[#101010] px-4 py-3 text-base text-white outline-none transition focus:border-[var(--accent)]"
              defaultValue="0"
              id="sort_order"
              name="sort_order"
              step="1"
              type="number"
            />
          </div>

          <label className="flex items-center gap-3 self-end rounded-lg border border-[#2c2c2c] bg-[#101010] px-4 py-3 text-sm font-semibold text-[#f1e7e0]">
            <input
              className="size-4 accent-[var(--accent)]"
              defaultChecked
              name="is_published"
              type="checkbox"
            />
            Publicado
          </label>
        </div>

        <button
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-extrabold uppercase tracking-normal text-black transition hover:bg-[var(--accent-soft)] sm:w-auto"
          type="submit"
        >
          <Upload aria-hidden="true" size={18} />
          Enviar imagem
        </button>
      </form>
    </section>
  );
}
