"use client";

import Link from "next/link";
import { useState } from "react";
import { clients } from "@/lib/mock";
import { dateEs, eur } from "@/lib/calc";
import { useDemo } from "@/lib/store";
import { Card, PageHeader, StatusBadge } from "../../ui";

export function ClientDetail({ id }: { id: string }) {
  const { filings, state, setNote } = useDemo();
  const [tpl, setTpl] = useState(state.templates[0]?.id ?? "");
  const [sent, setSent] = useState(false);
  const c = clients.find((x) => x.id === id);
  if (!c) {
    return (
      <>
        <PageHeader title="Cliente no encontrado" />
        <Link href="/clientes" className="text-accent">Volver a clientes</Link>
      </>
    );
  }
  const plan = state.plans.find((p) => p.id === c.planId);
  const own = filings.filter((f) => f.clientId === c.id);
  const template = state.templates.find((t) => t.id === tpl);
  const fill = (s: string) =>
    s
      .replaceAll("{{nombre}}", c.name.split(" ")[0])
      .replaceAll("{{modelo}}", own[0] ? `modelo ${own[0].model}` : "declaración")
      .replaceAll("{{periodo}}", own[0]?.period ?? "periodo actual")
      .replaceAll("{{fecha_limite}}", "20 de octubre")
      .replaceAll("{{lista_documentos}}", c.missing.map((m) => `· ${m}`).join("\n") || "· (ninguno)")
      .replaceAll("{{resultado}}", "—");

  return (
    <>
      <Link href="/clientes" className="text-sm text-muted hover:text-ink">← Clientes</Link>
      <div className="mt-3">
        <PageHeader title={c.name} subtitle={`${c.email} · ${c.activity} · ${c.region}`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-xl font-semibold text-ink">Ficha</h2>
            <dl className="mt-4 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
              {[
                ["Tipo", c.type === "autonomo" ? "Autónomo" : "Particular"],
                ["Estado", c.state],
                ["Plan", plan ? `${plan.name} · ${eur(plan.price)}${plan.period === "mes" ? "/mes" : ""}` : "Sin plan"],
                ["Cliente desde", dateEs(c.since)],
                ["Documentos del periodo", `${c.docsThisPeriod} de ${c.docsLimit}`],
                ["Comunidad autónoma", c.region],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-wider text-muted">{k}</dt>
                  <dd className="mt-1 first-letter:uppercase text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-xl font-semibold text-ink">Declaraciones</h2>
            {own.length === 0 ? (
              <p className="mt-3 text-sm text-muted">Sin declaraciones todavía.</p>
            ) : (
              <ul className="mt-4 divide-y divide-line">
                {own.map((f) => (
                  <li key={f.id} className="flex items-center justify-between gap-4 py-3">
                    <Link href={`/revision/${f.id}`} className="text-sm text-ink hover:text-accent">
                      Modelo {f.model} · {f.period}
                    </Link>
                    <StatusBadge status={f.status} />
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-xl font-semibold text-ink">Notas internas</h2>
            <p className="text-xs text-muted">Solo las ves tú. El cliente nunca.</p>
            <textarea
              value={state.notes[c.id] ?? ""}
              onChange={(e) => setNote(c.id, e.target.value)}
              rows={4}
              aria-label="Notas internas"
              className="mt-3 w-full rounded-xl border border-line p-3 text-sm outline-none focus:border-accent"
              placeholder="Apuntes sobre este cliente…"
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-lg font-semibold text-ink">Documentación pendiente</h2>
            {c.missing.length === 0 ? (
              <p className="mt-3 text-sm text-muted">Todo en orden.</p>
            ) : (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink">
                {c.missing.map((m) => <li key={m}>{m}</li>)}
              </ul>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-lg font-semibold text-ink">Comunicar al cliente</h2>
            <select
              value={tpl}
              onChange={(e) => { setTpl(e.target.value); setSent(false); }}
              className="mt-3 w-full rounded-xl border border-line px-3 py-2 text-sm"
              aria-label="Plantilla"
            >
              {state.templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            {template && (
              <div className="mt-3 rounded-xl border border-line bg-soft p-3 text-xs leading-relaxed text-ink">
                <p className="font-medium">{fill(template.subject)}</p>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-muted">{fill(template.body)}</pre>
              </div>
            )}
            <button
              onClick={() => setSent(true)}
              className="mt-3 w-full rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-accent"
            >
              Enviar (demo)
            </button>
            {sent && <p className="mt-2 text-xs text-accent-strong">Enviado en modo demostración: no se ha mandado ningún email.</p>}
          </Card>
        </div>
      </div>
    </>
  );
}
