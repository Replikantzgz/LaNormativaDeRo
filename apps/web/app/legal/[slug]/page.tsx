import { notFound } from "next/navigation";
import { Header } from "../../_components/Header";
import { Footer } from "../../_components/Footer";

const docs: Record<string, { title: string; points: string[] }> = {
  "aviso-legal": {
    title: "Aviso legal",
    points: ["Titular: [NOMBRE O RAZÓN SOCIAL]", "NIF: [NIF]", "Domicilio: [DOMICILIO]", "Contacto: [EMAIL]", "Datos registrales: [SI APLICA]"],
  },
  privacidad: {
    title: "Política de privacidad",
    points: ["Responsable del tratamiento: [RESPONSABLE]", "Finalidades y bases jurídicas: [DETALLAR]", "Encargados y transferencias: [DETALLAR]", "Plazos de conservación: [DETALLAR]", "Derechos RGPD y LOPDGDD: [DETALLAR]"],
  },
  cookies: {
    title: "Política de cookies",
    points: ["Esta versión de demostración no usa cookies de seguimiento.", "Cookies técnicas, analíticas y de terceros: [DETALLAR]", "Gestión del consentimiento: [BANNER REAL PENDIENTE]"],
  },
  terminos: {
    title: "Términos de contratación",
    points: ["Servicio y alcance: [DETALLAR]", "Precios y facturación: [DETALLAR]", "Desistimiento y baja: [DETALLAR]", "Responsabilidad y revisión humana: [DETALLAR]", "Contrato de encargado de tratamiento (art. 28 RGPD): [ANEXO]"],
  },
};

export function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({ slug }));
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const doc = docs[slug];
  if (!doc) notFound();
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="inline-block rounded-full bg-amber-soft px-3 py-1 text-xs font-medium text-amber">
          BORRADOR A REVISAR POR UN ABOGADO
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-ink">{doc.title}</h1>
        <ul className="mt-8 space-y-3 text-muted">
          {doc.points.map((p) => (
            <li key={p} className="rounded-xl border border-line bg-soft px-4 py-3 text-sm">{p}</li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
