import Link from "next/link";
import { MessageCircle, Share2 } from "lucide-react";
import { HashLink } from "@/components/shared/HashLink";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/features/showcase/config";

const FOOTER_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#galeria", label: "Galeria" },
  { href: "#sobre", label: "Contato" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[#101010]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <HashLink
            className="text-xl font-extrabold tracking-normal text-[var(--accent-soft)]"
            href="#inicio"
          >
            fourverticals 3D
          </HashLink>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
            Impressão 3D precisa para tirar suas ideias do papel.
          </p>
          <p className="mt-3 text-xs text-[#8f7d73]">
            © 2026 fourverticals 3D. Todos os direitos reservados.
          </p>
        </div>

        <nav aria-label="Links do rodapé" className="flex flex-wrap gap-6 text-sm text-[#f1ded4]">
          {FOOTER_LINKS.map((item) => (
            <HashLink className="transition hover:text-[var(--accent-soft)]" href={item.href} key={item.href}>
              {item.label}
            </HashLink>
          ))}
        </nav>

        <div className="flex gap-3">
          <HashLink
            aria-label="Compartilhar o site"
            className="grid size-11 place-items-center rounded-full bg-[#242424] text-[#f1ded4] transition hover:bg-[#303030] hover:text-white"
            href="#inicio"
          >
            <Share2 aria-hidden="true" size={18} />
          </HashLink>
          <Link
            aria-label="Abrir Instagram da fourverticals 3D"
            className="grid size-11 place-items-center rounded-full bg-[#242424] text-[#f1ded4] transition hover:bg-[#303030] hover:text-white"
            href={INSTAGRAM_URL}
            rel="noreferrer"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              className="size-[18px]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <rect
                height="17"
                rx="5"
                stroke="currentColor"
                strokeWidth="2"
                width="17"
                x="3.5"
                y="3.5"
              />
              <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="2" />
              <circle cx="17" cy="7" fill="currentColor" r="1.2" />
            </svg>
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
