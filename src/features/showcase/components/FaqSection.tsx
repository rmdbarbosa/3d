import { SHOWCASE_FAQS } from "@/features/showcase/seo";

export function FaqSection() {
  return (
    <section className="bg-[#111111] px-5 py-16 sm:px-8 lg:py-24" id="faq">
      <div className="mx-auto w-full max-w-5xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-normal text-[var(--accent-soft)]">
            Dúvidas frequentes
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-white sm:text-4xl">
            Perguntas sobre impressão 3D em Caraguatatuba
          </h2>
        </div>

        <div className="mt-8 divide-y divide-[#292929] border-y border-[#292929]">
          {SHOWCASE_FAQS.map((faq) => (
            <article className="py-6" key={faq.question}>
              <h3 className="text-lg font-bold text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-[#d8c2b8]">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
