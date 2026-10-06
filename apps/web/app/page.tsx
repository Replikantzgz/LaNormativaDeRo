import Link from "next/link";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { ProductPreview } from "./_components/ProductPreview";
import { oneOffServices, subscriptionPlans } from "./_data/plans";

const container = "mx-auto max-w-6xl px-5 sm:px-8";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
      {children}
    </h2>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" aria-hidden>
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const pains = [
  { before: "Papeles, correos y recibos por todas partes", after: "Haces una foto y listo. Todo queda ordenado en un solo sitio." },
  { before: "No sabes cuánto vas a pagar hasta el último día", after: "Ves tus números y tus impuestos estimados al momento." },
  { before: "Miedo a equivocarte con Hacienda", after: "La IA prepara y una persona real revisa y firma antes de presentar." },
];

const steps = [
  { n: "1", title: "Sube tus documentos", text: "Facturas, tickets, nóminas… con una foto desde el móvil o arrastrando el archivo." },
  { n: "2", title: "La IA lo prepara", text: "Lee cada documento, lo clasifica y calcula tus impuestos. Sin teclear nada." },
  { n: "3", title: "Una persona lo revisa", text: "Tu gestor comprueba los números, corrige lo que haga falta y lo valida." },
  { n: "4", title: "Presentamos y te avisamos", text: "Nada se presenta sin su visto bueno. Tú recibes el justificante y el aviso." },
];

const services = [
  {
    title: "Autónomos",
    text: "IVA e IRPF trimestrales, tus números al día y asistencia cuando la necesitas.",
    items: ["Impuestos trimestrales preparados y presentados", "Panel con ingresos, gastos y estimaciones", "Avisos de plazos y de documentos pendientes"],
  },
  {
    title: "Particulares",
    text: "Tu declaración de la Renta y tus trámites con Hacienda, sin complicaciones.",
    items: ["Renta preparada con tus datos y justificantes", "Detección de deducciones que quizá no conocías", "Trámites y certificados con seguimiento"],
  },
];

const trust = [
  { title: "Una persona real firma", text: "La IA nunca presenta nada por sí sola. Todo pasa por la revisión de tu gestor." },
  { title: "Tus datos, protegidos", text: "Aislamiento total entre clientes, documentos cifrados y registro de accesos." },
  { title: "Cumplimiento RGPD", text: "Tratamos tus datos conforme al RGPD y a la LOPDGDD, con contrato de encargado de tratamiento." },
  { title: "Tú decides", text: "Ves en cada momento en qué estado está cada declaración y quién ha hecho qué." },
];

const faqs = [
  { q: "¿La IA presenta mis impuestos?", a: "No. La IA calcula y prepara. Es una persona real quien revisa, valida y presenta. Nada se descarga ni se presenta sin ese visto bueno." },
  { q: "¿Qué pasa si la IA se equivoca al leer un documento?", a: "Te mostramos lo que ha entendido para que lo confirmes, y tu gestor lo revisa antes de calcular nada definitivo." },
  { q: "¿Puedo subir los documentos desde el móvil?", a: "Sí. Puedes hacer una foto y subirla en segundos desde el navegador de tu móvil." },
  { q: "¿Y si soy autónomo y además quiero hacer la Renta?", a: "Es lo habitual. Con Autónomo Plus tu Renta anual va incluida; con Esencial la contratas aparte." },
  { q: "¿Cómo se protegen mis datos?", a: "Cada cliente solo puede ver sus propios datos, los documentos se guardan cifrados y se registra quién accede a qué." },
  { q: "¿Puedo hablar con una persona?", a: "Sí. El asistente de IA resuelve dudas del día a día y, para lo importante, tienes a tu gestor." },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className={`${container} grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]`}>
            <div>
              <Eyebrow>Gestoría digital con IA</Eyebrow>
              <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
                Tus impuestos, preparados por IA.{" "}
                <span className="text-accent">Revisados y firmados por una persona.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Sube tus facturas con el móvil y ve tus números al momento. Nosotros preparamos tus declaraciones y un
                gestor real las revisa antes de presentarlas.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/registro"
                  className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent"
                >
                  Crear mi cuenta
                </Link>
                <Link
                  href="/#como-funciona"
                  className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  Ver cómo funciona
                </Link>
              </div>
              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                {["Para autónomos y particulares", "Más rápido y más barato que una gestoría tradicional", "RGPD"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check />{t}</li>
                ))}
              </ul>
            </div>
            <ProductPreview />
          </div>
        </section>

        {/* Problema / solución */}
        <section className="border-y border-line bg-soft">
          <div className={`${container} py-20`}>
            <Eyebrow>El problema</Eyebrow>
            <H2>Los impuestos no deberían quitarte el sueño.</H2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {pains.map((p) => (
                <div key={p.before} className="rounded-2xl border border-line bg-white p-6">
                  <p className="text-sm text-muted line-through decoration-line">{p.before}</p>
                  <p className="mt-4 font-serif text-xl font-semibold leading-snug text-ink">{p.after}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className={`${container} scroll-mt-20 py-20`}>
          <Eyebrow>Cómo funciona</Eyebrow>
          <H2>Cuatro pasos. La IA hace el trabajo pesado; una persona, el importante.</H2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft font-serif text-lg font-semibold text-accent-strong">
                  {s.n}
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Servicios */}
        <section id="servicios" className="scroll-mt-20 border-y border-line bg-soft">
          <div className={`${container} py-20`}>
            <Eyebrow>Servicios</Eyebrow>
            <H2>Para cada situación, lo que necesitas.</H2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {services.map((s) => (
                <div key={s.title} className="rounded-2xl border border-line bg-white p-8">
                  <h3 className="font-serif text-2xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-3 text-muted">{s.text}</p>
                  <ul className="mt-6 space-y-3 text-sm text-ink">
                    {s.items.map((i) => (
                      <li key={i} className="flex gap-3"><Check />{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Precios */}
        <section id="precios" className={`${container} scroll-mt-20 py-20`}>
          <Eyebrow>Precios</Eyebrow>
          <H2>Claros desde el primer día.</H2>
          <p className="mt-4 text-sm text-muted">Precios orientativos de lanzamiento. IVA no incluido.</p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {subscriptionPlans.map((p) => (
              <div
                key={p.id}
                className={`rounded-2xl border p-8 ${p.highlight ? "border-accent shadow-[0_20px_50px_-30px_rgba(31,111,92,0.55)]" : "border-line"}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-ink">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted">{p.audience}</p>
                  </div>
                  {p.highlight && (
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-strong">Más completo</span>
                  )}
                </div>
                <p className="mt-6">
                  <span className="font-serif text-5xl font-semibold tracking-tight text-ink">{p.price}</span>
                  <span className="ml-1 text-sm text-muted">{p.unit}</span>
                </p>
                <ul className="mt-6 space-y-3 text-sm text-ink">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3"><Check />{f}</li>
                  ))}
                </ul>
                <Link
                  href="/registro"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                    p.highlight ? "bg-ink text-white hover:bg-accent" : "border border-line text-ink hover:border-ink"
                  }`}
                >
                  Empezar con {p.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-soft p-6 sm:p-8">
            <h3 className="font-serif text-xl font-semibold text-ink">¿Solo necesitas la Renta o un trámite?</h3>
            <ul className="mt-5 divide-y divide-line">
              {oneOffServices.map((s) => (
                <li key={s.name} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                  <div>
                    <p className="font-medium text-ink">{s.name}</p>
                    <p className="text-sm text-muted">{s.detail}</p>
                  </div>
                  <p className="font-semibold tabular-nums text-ink">{s.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Confianza */}
        <section id="confianza" className="scroll-mt-20 border-y border-line bg-soft">
          <div className={`${container} py-20`}>
            <Eyebrow>Confianza</Eyebrow>
            <H2>Tecnología para ir rápido. Una persona para dar la cara.</H2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {trust.map((t) => (
                <div key={t.title} className="rounded-2xl border border-line bg-white p-6">
                  <h3 className="font-serif text-lg font-semibold text-ink">{t.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="preguntas" className={`${container} scroll-mt-20 py-20`}>
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <H2>Lo que suelen preguntarnos.</H2>
          <div className="mt-10 max-w-3xl divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium text-ink">
                  {f.q}
                  <span className="text-xl text-muted transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-6xl rounded-3xl bg-ink px-8 py-16 text-center sm:px-16">
            <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Deja los impuestos en buenas manos.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">Crea tu cuenta y sube tu primer documento en minutos.</p>
            <Link
              href="/registro"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
            >
              Crear mi cuenta
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
