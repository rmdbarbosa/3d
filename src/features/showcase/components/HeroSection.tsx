import Image from "next/image";
import Link from "next/link";

import { HeroLogo } from "@/features/showcase/components/HeroLogo";
import { PRIMARY_CITY, WHATSAPP_URL } from "@/features/showcase/config";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[100svh] overflow-hidden border-b border-[#181818] bg-[#111111]"
      id="inicio"
    >
      <Image
        alt="Símbolo da fourverticals 3D"
        className="object-cover object-center"
        fill
        priority
        sizes="100vw"
        src="/images/heroBG.png"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.32)_58%,rgba(17,17,17,0.82)_100%)]" />
      <div className="absolute inset-0 shadow-[inset_0_0_90px_28px_rgba(0,0,0,0.78),inset_0_0_220px_70px_rgba(0,0,0,0.42)] sm:shadow-[inset_0_0_130px_40px_rgba(0,0,0,0.8),inset_0_0_260px_86px_rgba(0,0,0,0.45)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center px-5 py-24 sm:px-8">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          <HeroLogo />
          <h1 className="text-4xl font-extrabold leading-tight tracking-normal text-white drop-shadow-[0_6px_26px_rgba(0,0,0,0.48)] sm:text-6xl">
            Impressão 3D em {PRIMARY_CITY}
            <span className="text-[var(--accent-soft)]">
              {" "}
              com precisão em cada camada.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#f1ded4] drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)] sm:text-lg">
            Peças personalizadas, protótipos, miniaturas, maquetes e presentes
            sob medida, com atendimento rápido e envio para todo o Brasil.
          </p>
          <div className="mt-6">
            <Link
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-[var(--accent)] px-8 text-xs font-medium text-[#1d0c05] shadow-[0_16px_42px_rgba(255,106,25,0.34)] transition hover:bg-[#ff7d35]"
              href={WHATSAPP_URL}
              rel="noreferrer"
              target="_blank"
            >
              Solicitar impressão personalizada
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
