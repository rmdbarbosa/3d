import Link from "next/link";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { WHATSAPP_URL } from "@/features/showcase/config";

const NAVIGATION_ITEMS = [
  { href: "#inicio", label: "Início" },
  { href: "#galeria", label: "Galeria" },
  { href: "#sobre", label: "Sobre" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[#111111]/92 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
        <Link
          className="text-xl font-extrabold tracking-normal text-[var(--accent-soft)] sm:text-2xl"
          href="#inicio"
        >
          fourverticals 3D
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-9 md:flex">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              className="border-b-2 border-transparent pb-1 text-sm font-medium text-[#f4ded2] transition hover:border-[var(--accent)] hover:text-white"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:block">
          <WhatsAppButton
            href={WHATSAPP_URL}
            label="Chamar no WhatsApp"
            size="compact"
          />
        </div>
      </div>
    </header>
  );
}
