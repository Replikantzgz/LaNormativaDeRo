"use client";

import Link from "next/link";
import { useState } from "react";
import { clients } from "@/lib/mock";
import { calc130, calc303, dateEs, dateTimeEs, eur } from "@/lib/calc";
import { useDemo } from "@/lib/store";
import { STATUS_FLOW, STATUS_LABEL, type FilingStatus } from "@/lib/types";
import { Card, PageHeader, StatusBadge } from "../../ui";

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-2.5 text-sm ${strong ? "font-semibold text-ink" : "text-muted"}`}>
      <span>{label}</span>
      <span className={`tabular-nums ${strong ? "text-lg" : "text-ink"}`}>{value}</span>
    </div>
  );
}

export function FilingDetail({ id }: { id: string }) {
  const { filings, transition, state } = useDemo();
  const [msg, setMsg] = useState<string | null>(null);
  const f = filings.find((x) => x.id === id);
  if (!f) {
    return (
      <>
        <PageHeader title="Declaración no encontrada" />
        <Link href="/revision" className="text-accent">Volver a la cola</Link>
      </>
    );
  }
  const c = clients.find((x) => x.id === f.clientId)!;
  const events = state.events.filter((e) => e.filingId === f.id.replace(/b$/, "") || e.filingId === f.id);
  const released = f.status === "validated" || f.status === "presented";

  const act = (to: FilingStatus, by: "admin" | "ia" | "sistema") => {
    const r = transition(f.id, to, by);
    setMsg(r.ok ? null : (r.reason ?? "No se pudo"));
  };

  const t303 = f.model === "303" ? calc303(f) : null;
  const t130 = f.model === "130" ? calc130(f) : null;

  const download = () => {
    const lines = [
      `La Normativa de Ro — borrador DEMO (datos ficticios)`,
      `Cliente: ${c.name}`,
      `Modelo ${f.model} · ${f.period}`,
      t303 ? `Resultado IVA (ilustrativo): ${eur(t303.resultado)}` : "",
      t130 ? `Pago fraccionado IRPF (ilustrativo): ${eur(t130.resultado)}` : "",
      f.model === "100" ? `Estimación Renta (ilustrativa): ${eur(f.rentaEstimate ?? 0)}` : "",
      `Estado: ${STATUS_LABEL[f.status]}`,
    ].filter(Boolean);
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `borrador-${f.model}-${c.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stepIndex = f.status === "changes_requested" ? 2 : STATUS_FLOW.indexOf(f.status);

  return (
    <>
      <Link href="/revision" className="text-sm text-muted hover:text-ink">← Cola de revisión</Link>
      <div className="mt-3">
        <PageHeader
          title={`Modelo ${f.model} · ${c.name}`}
          subtitle={`${f.period} · Plazo: ${f.dueLabel}`}
          action={<StatusBadge status={f.status} />}
        />
      </div>

      <ol className="mb-8 grid grid-cols-5 gap-2" aria-label="Progreso">
        {STATUS_FLOW.map((s, i) => (
          <li key={s}>
            <div className={`h-1.5 rounded-full ${i <= stepIndex ? "bg-accent" : "bg-line"}`} />
            <p className={`mt-2 text-[11px] leading-tight ${i === stepIndex ? "font-medium text-ink" : "text-muted"}`}>{STATUS_LABEL[s]}</p>
          </li>
        ))}
      </ol>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-xl font-semibold text-ink">Cálculo preparado por la IA</h2>
            <p className="text-xs text-muted">Ilustrativo. El motor real será determinista y verificado con la AEAT.</p>
            <div className="mt-4 divide-y divide-line">
              {t303 && (
                <>
                  <Row label="Base de ingresos" value={eur(t303.ingresos)} />
                  <Row label="IVA devengado" value={eur(t303.ivaDevengado)} />
                  <Row label="Base de gastos" value={eur(t303.gastos)} />
                  <Row label="IVA soportado deducible" value={eur(t303.ivaSoportado)} />
                  <Row label="Resultado de la autoliquidación" value={eur(t303.resultado)} strong />
                </>
              )}
              {t130 && (
                <>
                  <Row label="Ingresos acumulados" value={eur(t130.ingresos)} />
                  <Row label="Gastos deducibles acumulados" value={eur(t130.gastos)} />
                  <Row label="Rendimiento neto" value={eur(t130.rendimiento)} />
                  <Row label="20 % del rendimiento" value={eur(t130.bruto)} />
                  <Row label="Pagos fraccionados anteriores" value={`− ${eur(t130.previousPayments)}`} />
                  <Row label="Retenciones soportadas" value={`− ${eur(t130.withholdings)}`} />
                  <Row label="Resultado a ingresar" value={eur(t130.resultado)} strong />
                </>
              )}
              {f.model === "100" && (
                <>
                  <Row label="Documentos aportados" value={String(f.items.length)} />
                  <Row label="Estimación de resultado de la Renta" value={eur(f.rentaEstimate ?? 0)} strong />
                </>
              )}
            </div>
          </Card>

          {f.aiWarnings.length > 0 && (
            <Card className="border-amber/40 bg-amber-soft p-6">
              <h2 className="font-serif text-lg font-semibold text-amber">Avisos de la IA</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink">
                {f.aiWarnings.map((w) => <li key={w}>{w}</li>)}
              </ul>
            </Card>
          )}

          <Card className="overflow-x-auto">
            <div className="p-6 pb-3">
              <h2 className="font-serif text-xl font-semibold text-ink">Documentos de origen</h2>
              <p className="text-xs text-muted">Lo que la IA ha leído. Confianza baja = revisar a mano.</p>
            </div>
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-y border-line text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-6 py-2 font-medium">Concepto</th>
                  <th className="px-3 py-2 font-medium">Fecha</th>
                  <th className="px-3 py-2 text-right font-medium">Base</th>
                  <th className="px-3 py-2 text-right font-medium">IVA</th>
                  <th className="px-6 py-2 text-right font-medium">Confianza</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {f.items.map((i) => (
                  <tr key={i.id} className={i.confidence < 0.75 ? "bg-amber-soft/60" : ""}>
                    <td className="px-6 py-2.5">
                      <p className="text-ink">{i.concept}</p>
                      <p className="text-xs text-muted">{i.kind === "emitida" ? "Emitida" : "Recibida"}{i.note && ` · ${i.note}`}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-muted">{dateEs(i.date)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{eur(i.base)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right tabular-nums text-muted">{i.ivaPct} %</td>
                    <td className={`px-6 py-2.5 text-right tabular-nums ${i.confidence < 0.75 ? "font-medium text-amber" : "text-muted"}`}>
                      {Math.round(i.confidence * 100)} %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-xl font-semibold text-ink">Decisión</h2>
            <p className="mt-1 text-xs text-muted">Solo una persona puede validar y marcar como presentado.</p>
            <div className="mt-5 space-y-2.5">
              {f.status === "documents_received" && (
                <button onClick={() => act("ai_calculated", "ia")} className="w-full rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-ink">
                  Simular cálculo de la IA
                </button>
              )}
              {f.status === "ai_calculated" && (
                <button onClick={() => act("pending_review", "sistema")} className="w-full rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-ink">
                  Enviar a revisión
                </button>
              )}
              {f.status === "pending_review" && (
                <button onClick={() => act("validated", "admin")} className="w-full rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-strong">
                  Validar
                </button>
              )}
              {(f.status === "pending_review" || f.status === "validated") && (
                <button onClick={() => act("changes_requested", "admin")} className="w-full rounded-full border border-red/40 px-5 py-2.5 text-sm font-medium text-red hover:bg-red-soft">
                  Pedir cambios al cliente
                </button>
              )}
              {f.status === "changes_requested" && (
                <button onClick={() => act("documents_received", "sistema")} className="w-full rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-ink">
                  Cliente ha aportado documentos
                </button>
              )}
              {f.status === "validated" && (
                <button onClick={() => act("presented", "admin")} className="w-full rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-accent">
                  Marcar como presentado
                </button>
              )}
              <button
                onClick={download}
                disabled={!released}
                className="w-full rounded-full border border-line px-5 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-45 enabled:hover:border-ink"
              >
                Descargar documento
              </button>
              {!released && <p className="text-xs text-muted">La descarga se habilita al validar.</p>}
              {msg && <p role="alert" className="text-xs text-red">{msg}</p>}
              {f.status !== "presented" && f.status === "validated" && (
                <p className="text-xs text-muted">La presentación la haces tú en la sede de la AEAT; aquí solo se registra.</p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-lg font-semibold text-ink">Cliente</h2>
            <p className="mt-3 text-sm font-medium text-ink">{c.name}</p>
            <p className="text-xs text-muted">{c.activity} · {c.region}</p>
            <Link href={`/clientes/${c.id}`} className="mt-3 inline-block text-sm text-accent hover:text-accent-strong">Ver ficha completa</Link>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-lg font-semibold text-ink">Historial</h2>
            {events.length === 0 ? (
              <p className="mt-3 text-sm text-muted">Sin eventos todavía.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {events.map((e) => (
                  <li key={e.id} className="border-l-2 border-line pl-3 text-sm">
                    <p className="text-ink">{e.action}</p>
                    <p className="text-xs text-muted">{e.actor} · {dateTimeEs(e.at)}</p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
