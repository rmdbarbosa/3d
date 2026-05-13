import Image from "next/image";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { WHATSAPP_URL } from "@/features/showcase/config";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-[#181818] bg-[#111111]"
      id="inicio"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(255,106,25,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_42%)]" />
      <div className="relative mx-auto grid min-h-[620px] w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="max-w-xl">
          <p className="inline-flex rounded-full bg-[#3a251c] px-3 py-1 text-xs font-bold uppercase tracking-normal text-[#ffd3bf]">
            Estúdio de criação 3D
          </p>
          <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-normal text-white sm:text-6xl">
            Sua visão,
            <span className="block text-[var(--accent-soft)]">
              perfeitamente impressa.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#ead6cc]">
            Transformamos ideias digitais em objetos reais. Impressão 3D de alta
            precisão para criadores, colecionadores e projetos sob medida.
          </p>
          <div className="mt-9">
            <WhatsAppButton href={WHATSAPP_URL} label="Solicitar impressão personalizada" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl">
          <div className="overflow-hidden rounded-lg border border-[#171717] bg-[#080808] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
            <Image
              alt="Impressora 3D criando uma peça laranja com acabamento detalhado"
              className="aspect-[1.12/1] h-auto w-full object-cover"
              height={980}
              priority
              src="/images/hero-impressao-3d.png"
              width={1100}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
