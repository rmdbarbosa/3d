import { CheckCircle2, PackageCheck, Truck } from "lucide-react";

import { PRIMARY_CITY } from "@/features/showcase/config";
import { SHOWCASE_SERVICES } from "@/features/showcase/seo";

export function ServicesSection() {
  return (
    <section className="bg-[#141414] px-5 py-16 sm:px-8 lg:py-24" id="servicos">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-normal text-[var(--accent-soft)]">
            Serviços de impressão 3D
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-white sm:text-4xl">
            Impressão 3D em {PRIMARY_CITY} para ideias, protótipos e peças sob medida
          </h2>
          <p className="mt-4 text-base leading-7 text-[#d8c2b8]">
            A fourverticals 3D transforma arquivos, referências e necessidades
            práticas em peças físicas com atendimento em {PRIMARY_CITY} e
            envio para todo o Brasil.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SHOWCASE_SERVICES.map((service) => (
            <article
              className="rounded-lg border border-[#292929] bg-[#1b1b1b] p-5"
              key={service.title}
            >
              <CheckCircle2
                aria-hidden="true"
                className="text-[var(--accent-soft)]"
                size={22}
              />
              <h3 className="mt-4 text-lg font-bold text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#d8c2b8]">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="flex gap-4 rounded-lg border border-[#292929] bg-[#1b1b1b] p-5">
            <PackageCheck
              aria-hidden="true"
              className="mt-1 shrink-0 text-[var(--accent)]"
              size={24}
            />
            <div>
              <h3 className="text-lg font-bold text-white">
                Atendimento em {PRIMARY_CITY}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#d8c2b8]">
                Orçamentos pelo WhatsApp para clientes de Caraguatatuba e
                região, com avaliação do uso da peça, dimensões, acabamento e
                prazo.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-lg border border-[#292929] bg-[#1b1b1b] p-5">
            <Truck
              aria-hidden="true"
              className="mt-1 shrink-0 text-[var(--accent)]"
              size={24}
            />
            <div>
              <h3 className="text-lg font-bold text-white">
                Envio para todo o Brasil
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#d8c2b8]">
                Projetos aprovados podem ser enviados para outras cidades,
                mantendo a comunicação simples e o acompanhamento direto pelo
                WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
