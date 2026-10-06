import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "La Normativa de Ro · Gestoría con IA y persona real",
  description:
    "La IA prepara tus impuestos y una persona real los revisa y presenta. Gestoría digital para autónomos y particulares en España.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-white text-ink">{children}</body>
    </html>
  );
}
