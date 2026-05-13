import Image from "next/image";
import { Save } from "lucide-react";

import {
  deleteGalleryItem,
  updateGalleryItem,
} from "@/features/admin-gallery/actions/gallery-admin-actions";
import { DeleteGalleryItemButton } from "@/features/admin-gallery/components/DeleteGalleryItemButton";
import type {
  AdminGalleryItem,
  AdminMessage,
} from "@/features/admin-gallery/types";

type GalleryItemsManagerProps = {
  items: AdminGalleryItem[];
  message: AdminMessage | null;
};

function getMessageClassName(variant: AdminMessage["variant"]) {
  if (variant === "success") {
    return "border-emerald-400/30 bg-emerald-500/10 text-emerald-100";
  }

  return "border-red-400/30 bg-red-500/10 text-red-100";
}

function formatCreatedAt(createdAt: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(createdAt));
}

export function GalleryItemsManager({
  items,
  message,
}: GalleryItemsManagerProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-[var(--accent-soft)]">
            Gerenciamento
          </p>
          <h2 className="text-2xl font-extrabold tracking-normal text-white">
            Itens cadastrados
          </h2>
        </div>
        <p className="text-sm font-semibold text-[#cbb9ae]">
          {items.length} {items.length === 1 ? "item" : "itens"}
        </p>
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

      {items.length === 0 ? (
        <div className="rounded-lg border border-[#202020] bg-[#161616] px-5 py-8 text-center text-sm font-medium text-[#cbb9ae]">
          Nenhum item cadastrado ainda.
        </div>
      ) : (
        <div className="grid gap-5">
          {items.map((item) => (
            <article
              className="rounded-lg border border-[#202020] bg-[#161616] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.2)]"
              key={item.id}
            >
              <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#2c2c2c] bg-[#101010]">
                    <Image
                      alt={item.alt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 220px, 100vw"
                      src={item.imageSrc}
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                    <span className="rounded-md bg-[#232323] px-2 py-1 text-[#f1e7e0]">
                      {item.isPublished ? "Publicado" : "Oculto"}
                    </span>
                    <span className="rounded-md bg-[#232323] px-2 py-1 text-[#f1e7e0]">
                      {item.images.length}{" "}
                      {item.images.length === 1 ? "imagem" : "imagens"}
                    </span>
                    <span className="rounded-md bg-[#232323] px-2 py-1 text-[#f1e7e0]">
                      Ordem {item.sortOrder}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[#9d8f87]">
                    Criado em {formatCreatedAt(item.createdAt)}
                  </p>
                </div>

                <div className="grid gap-4">
                  <form action={updateGalleryItem}>
                    <input name="id" type="hidden" value={item.id} />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          className="text-sm font-semibold text-[#f1e7e0]"
                          htmlFor={`title-${item.id}`}
                        >
                          Titulo
                        </label>
                        <input
                          className="mt-2 w-full rounded-lg border border-[#2c2c2c] bg-[#101010] px-4 py-3 text-base text-white outline-none transition focus:border-[var(--accent)]"
                          defaultValue={item.title}
                          id={`title-${item.id}`}
                          name="title"
                          required
                          type="text"
                        />
                      </div>

                      <div>
                        <label
                          className="text-sm font-semibold text-[#f1e7e0]"
                          htmlFor={`category-${item.id}`}
                        >
                          Categoria
                        </label>
                        <input
                          className="mt-2 w-full rounded-lg border border-[#2c2c2c] bg-[#101010] px-4 py-3 text-base text-white outline-none transition focus:border-[var(--accent)]"
                          defaultValue={item.category}
                          id={`category-${item.id}`}
                          name="category"
                          required
                          type="text"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          className="text-sm font-semibold text-[#f1e7e0]"
                          htmlFor={`alt-${item.id}`}
                        >
                          Texto alternativo
                        </label>
                        <input
                          className="mt-2 w-full rounded-lg border border-[#2c2c2c] bg-[#101010] px-4 py-3 text-base text-white outline-none transition focus:border-[var(--accent)]"
                          defaultValue={item.alt}
                          id={`alt-${item.id}`}
                          name="alt"
                          required
                          type="text"
                        />
                      </div>

                      <div>
                        <label
                          className="text-sm font-semibold text-[#f1e7e0]"
                          htmlFor={`sort-order-${item.id}`}
                        >
                          Ordem
                        </label>
                        <input
                          className="mt-2 w-full rounded-lg border border-[#2c2c2c] bg-[#101010] px-4 py-3 text-base text-white outline-none transition focus:border-[var(--accent)]"
                          defaultValue={item.sortOrder}
                          id={`sort-order-${item.id}`}
                          name="sort_order"
                          step="1"
                          type="number"
                        />
                      </div>

                      <label className="flex items-center gap-3 self-end rounded-lg border border-[#2c2c2c] bg-[#101010] px-4 py-3 text-sm font-semibold text-[#f1e7e0]">
                        <input
                          className="size-4 accent-[var(--accent)]"
                          defaultChecked={item.isPublished}
                          name="is_published"
                          type="checkbox"
                        />
                        Publicado
                      </label>

                      <div className="sm:col-span-2">
                        <label
                          className="text-sm font-semibold text-[#f1e7e0]"
                          htmlFor={`images-${item.id}`}
                        >
                          Adicionar imagens
                        </label>
                        <input
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="mt-2 w-full rounded-lg border border-[#2c2c2c] bg-[#101010] px-4 py-3 text-sm text-white outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--accent)] file:px-4 file:py-2 file:text-sm file:font-bold file:text-black focus:border-[var(--accent)]"
                          id={`images-${item.id}`}
                          multiple
                          name="images"
                          type="file"
                        />
                      </div>
                    </div>

                    <button
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-extrabold uppercase tracking-normal text-black transition hover:bg-[var(--accent-soft)] sm:w-auto"
                      type="submit"
                    >
                      <Save aria-hidden="true" size={18} />
                      Salvar alteracoes
                    </button>
                  </form>

                  <form action={deleteGalleryItem}>
                    <input name="id" type="hidden" value={item.id} />
                    <DeleteGalleryItemButton itemTitle={item.title} />
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
