import Image from "next/image";
import { HashLink } from "@/components/shared/HashLink";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-[#0d0d0d]/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center px-5 sm:px-8">
        <HashLink aria-label="Voltar ao início" href="#inicio">
          <Image
            alt="fourverticals 3D"
            className="h-12 w-12 rounded-sm object-cover"
            height={48}
            priority
            src="/images/logo.webp"
            width={48}
          />
        </HashLink>
      </div>
    </header>
  );
}
