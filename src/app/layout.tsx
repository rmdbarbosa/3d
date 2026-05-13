import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "fourverticals 3D | Impressão 3D sob medida",
  description:
    "Portfólio de impressão 3D com peças personalizadas, protótipos, miniaturas e modelos arquitetônicos.",
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
