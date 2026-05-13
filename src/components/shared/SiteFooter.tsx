import Link from "next/link";
import { MessageCircle, Share2 } from "lucide-react";
import { WHATSAPP_URL } from "@/features/showcase/config";

const FOOTER_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#galeria", label: "Galeria" },
  { href: "#sobre", label: "Contato" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[#101010]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            className="text-xl font-extrabold tracking-normal text-[var(--accent-soft)]"
            href="#inicio"
          >
            fourverticals 3D
          </Link>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
            Impressão 3D precisa para tirar suas ideias do papel.
          </p>
          <p className="mt-3 text-xs text-[#8f7d73]">
            © 2026 fourverticals 3D. Todos os direitos reservados.
          </p>
        </div>

        <nav aria-label="Links do rodapé" className="flex flex-wrap gap-6 text-sm text-[#f1ded4]">
          {FOOTER_LINKS.map((item) => (
            <Link className="transition hover:text-[var(--accent-soft)]" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-3">
          <Link
            aria-label="Compartilhar o site"
            className="grid size-11 place-items-center rounded-full bg-[#242424] text-[#f1ded4] transition hover:bg-[#303030] hover:text-white"
            href="#inicio"
          >
            <Share2 aria-hidden="true" size={18} />
          </Link>
          <Link
            aria-label="Abrir contato pelo WhatsApp"
            className="grid size-11 place-items-center rounded-full bg-[#242424] text-[#f1ded4] transition hover:bg-[#303030] hover:text-white"
            href={WHATSAPP_URL}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle aria-hidden="true" size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
