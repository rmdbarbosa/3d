import type { Metadata } from "next";

import {
  BUSINESS_NAME,
  SEO_DESCRIPTION,
  SEO_TITLE,
  SITE_URL,
} from "@/features/showcase/config";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: SEO_TITLE,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description: SEO_DESCRIPTION,
  verification: {
    google: "GhgUXCcXYtc78hM2V44fx-MFloox2vyg6RJQgVNJ3Xs",
  },
  applicationName: BUSINESS_NAME,
  authors: [{ name: BUSINESS_NAME }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  keywords: [
    "impressão 3D em Caraguatatuba",
    "impressao 3D em Caraguatatuba",
    "impressão 3D",
    "impressao 3D",
    "peças personalizadas 3D",
    "pecas personalizadas 3D",
    "protótipos 3D",
    "prototipos 3D",
    "miniaturas 3D",
    "maquetes 3D",
    "fourverticals 3D",
  ],
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/heroBG.png",
        width: 1200,
        height: 630,
        alt: "Impressão 3D em Caraguatatuba pela fourverticals 3D",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: ["/images/heroBG.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
