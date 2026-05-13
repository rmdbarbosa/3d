import { CheckCircle2 } from "lucide-react";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { WHATSAPP_URL } from "@/features/showcase/config";

const CAPABILITIES = [
  "Protótipos funcionais",
  "Presentes personalizados",
  "Miniaturas e colecionáveis",
  "Maquetes e peças técnicas",
];

export function CtaSection() {
  return (
    <section className="bg-[var(--panel)] px-5 py-20 sm:px-8 lg:py-28" id="sobre">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <h2 className="text-3xl font-extrabold tracking-normal text-white sm:text-4xl">
          Vamos construir algo juntos.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#ead6cc]">
          Seja um presente único, uma peça de reposição ou uma maquete complexa,
          estamos prontos para imprimir suas grandes ideias.
        </p>

        <div className="mt-9 grid w-full max-w-3xl gap-3 text-left sm:grid-cols-2">
          {CAPABILITIES.map((capability) => (
            <div
              className="flex min-h-12 items-center gap-3 rounded-md border border-[#343434] bg-[#232323] px-4 text-sm font-medium text-[#f5e7df]"
              key={capability}
            >
              <CheckCircle2
                aria-hidden="true"
                className="shrink-0 text-[#25d366]"
                size={18}
              />
              {capability}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <WhatsAppButton
            href={WHATSAPP_URL}
            label="Chamar no WhatsApp"
            variant="whatsapp"
          />
        </div>
      </div>
    </section>
  );
}
