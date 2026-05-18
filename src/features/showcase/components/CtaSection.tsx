import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { WHATSAPP_URL } from "@/features/showcase/config";

export function CtaSection() {
  return (
    <section className="bg-[var(--panel)] px-5 py-20 sm:px-8 lg:py-28" id="sobre">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <h2 className="text-3xl font-extrabold tracking-normal text-white sm:text-4xl">
          Vamos tirar sua ideia do arquivo e colocar na sua mão.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#d8c2b8]">
          Chame no WhatsApp para falar sobre medidas, uso da peça, quantidade,
          acabamento e prazo. O orçamento é feito conforme cada projeto.
        </p>

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
