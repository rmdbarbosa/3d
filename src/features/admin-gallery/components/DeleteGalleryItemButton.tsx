"use client";

import { Trash2 } from "lucide-react";
import type { MouseEvent } from "react";

type DeleteGalleryItemButtonProps = {
  itemTitle: string;
};

export function DeleteGalleryItemButton({
  itemTitle,
}: DeleteGalleryItemButtonProps) {
  function confirmDelete(event: MouseEvent<HTMLButtonElement>) {
    const shouldDelete = window.confirm(
      `Excluir "${itemTitle}"? Esta acao nao pode ser desfeita.`,
    );

    if (!shouldDelete) {
      event.preventDefault();
    }
  }

  return (
    <button
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100 transition hover:bg-red-500/20 sm:w-auto"
      onClick={confirmDelete}
      type="submit"
    >
      <Trash2 aria-hidden="true" size={17} />
      Excluir
    </button>
  );
}
