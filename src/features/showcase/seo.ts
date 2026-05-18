import {
  BUSINESS_NAME,
  BUSINESS_PHONE,
  INSTAGRAM_URL,
  SEO_DESCRIPTION,
  SEO_TITLE,
  SERVICE_AREAS,
  SITE_URL,
} from "@/features/showcase/config";

export const SHOWCASE_SERVICES = [
  {
    title: "Peças personalizadas",
    description:
      "Impressão 3D sob medida para itens de uso pessoal, decoração, organização e reposição simples.",
  },
  {
    title: "Protótipos",
    description:
      "Modelos físicos para validar ideias, encaixes, volumes e apresentações antes da produção final.",
  },
  {
    title: "Miniaturas",
    description:
      "Miniaturas, colecionáveis e modelos detalhados para presentes, hobbies e projetos criativos.",
  },
  {
    title: "Brindes e presentes",
    description:
      "Itens personalizados para lembranças, marcas, eventos e presentes com acabamento cuidadoso.",
  },
  {
    title: "Maquetes",
    description:
      "Maquetes e modelos de apresentação para arquitetura, estudos, projetos acadêmicos e demonstrações.",
  },
  {
    title: "Peças funcionais",
    description:
      "Suportes, adaptadores, componentes técnicos e peças de reposição avaliadas conforme a aplicação.",
  },
] as const;

export const SHOWCASE_FAQS = [
  {
    question: "Onde encontro impressão 3D em Caraguatatuba?",
    answer:
      "A fourverticals 3D atende pedidos de impressão 3D em Caraguatatuba pelo WhatsApp, com orçamento conforme arquivo, medida, material, acabamento e prazo.",
  },
  {
    question: "A fourverticals 3D envia impressão 3D para outras cidades?",
    answer:
      "Sim. Além do atendimento local em Caraguatatuba, a fourverticals 3D envia peças impressas em 3D para todo o Brasil.",
  },
  {
    question: "Quais tipos de peças podem ser impressas em 3D?",
    answer:
      "Podem ser avaliados protótipos, peças personalizadas, miniaturas, maquetes, brindes, presentes, suportes e peças funcionais.",
  },
  {
    question: "Como pedir um orçamento de impressão 3D?",
    answer:
      "Envie a ideia, arquivo 3D ou referências pelo WhatsApp. A resposta considera tamanho, quantidade, uso da peça, acabamento desejado e prazo.",
  },
] as const;

export function getShowcaseStructuredData() {
  const logoUrl = `${SITE_URL}/images/logo.webp`;
  const serviceUrl = `${SITE_URL}/#servicos`;
  const areaServed = SERVICE_AREAS.map((areaName) => ({
    "@type":
      areaName === "Brasil"
        ? "Country"
        : areaName === "Litoral Norte de SP"
          ? "AdministrativeArea"
          : "City",
    name: areaName,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: BUSINESS_NAME,
        url: SITE_URL,
        logo: logoUrl,
        image: logoUrl,
        telephone: BUSINESS_PHONE,
        sameAs: [INSTAGRAM_URL],
        areaServed,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: BUSINESS_PHONE,
            contactType: "customer service",
            availableLanguage: ["Portuguese"],
            areaServed: "BR",
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#impressao-3d`,
        name: SEO_TITLE,
        description: SEO_DESCRIPTION,
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        areaServed,
        serviceType: "Impressão 3D",
        url: serviceUrl,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          areaServed,
          url: serviceUrl,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: SHOWCASE_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: BUSINESS_NAME,
        url: SITE_URL,
        inLanguage: "pt-BR",
        description: SEO_DESCRIPTION,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        about: {
          "@id": `${SITE_URL}/#impressao-3d`,
        },
      },
    ],
  };
}

export function getStructuredDataJson() {
  return JSON.stringify(getShowcaseStructuredData()).replace(/</g, "\\u003c");
}
