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
