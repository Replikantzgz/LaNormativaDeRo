"use client";

import Link from "next/link";
import { clients } from "@/lib/mock";
import { calc130, calc303, dateTimeEs, eur } from "@/lib/calc";
import { useDemo } from "@/lib/store";
import { STATUS_FLOW, STATUS_LABEL } from "@/lib/types";
import { Card, LinkBtn, PageHeader, Stat, StatusBadge } from "./ui";

export default function Resumen() {
  const { filings, state } = useDemo();
  const active = clients.filter((c) => c.state === "activo");
  const mrr = active.reduce((s, c) => {
    const p = state.plans.find((x) => x.id === c.planId);
    return s + (p && p.period === "mes" ? p.price : 0);
  }, 0);
  const pending = filings.filter((f) => f.status === "pending_review");
  const alerts = clients.filter((c) => c.missing.length > 0 && c.state !== "baja").length;
  const flow = STATUS_FLOW.map((s) => ({ s, n: filings.filter((f) => f.status === s).length }));
  const total = filings.length;

  return (
    <>
      <PageHeader title="Resumen" subtitle="Lo que necesita tu atención hoy." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Clientes activos" value={String(active.length)} hint={`${clients.length} en total`} />
        <Stat label="Ingresos recurrentes" value={eur(mrr)} hint="al mes, sin IVA" />
        <Stat label="Pendientes de revisión" value={String(pending.length)} hint="esperan tu validación" />
        <Stat label="Alertas de documentación" value={String(alerts)} hint="clientes con documentos pendientes" />
      </div>

      <Card className="mt-6 p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-xl font-semibold text-ink">Flujo de declaraciones</h2>
          <p className="text-xs text-muted">3T 2026 y campaña de Renta</p>
        </div>
        <ol className="mt-5 grid gap-3 sm:grid-cols-5">
          {flow.map(({ s, n }) => (
            <li key={s} className="rounded-xl border border-line bg-soft p-4">
              <p className="text-xs text-muted">{STATUS_LABEL[s]}</p>
              <p className="mt-1 font-serif text-2xl font-semibold tabular-nums text-ink">{n}</p>
              <div className="mt-2 h-1.5 rounded-full bg-line">
                <div className="h-1.5 rounded-full bg-accent" style={{ width: `${total ? (n / total) * 100 : 0}%` }} />
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-muted">
          La IA prepara. Solo tú puedes pasar una declaración a «Validado» y «Presentado».
        </p>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-xl font-semibold text-ink">Cola de revisión</h2>
            <LinkBtn href="/revision">Ver todo</LinkBtn>
          </div>
          {pending.length === 0 ? (
            <p className="mt-6 text-sm text-muted">No hay nada pendiente. Buen trabajo.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {pending.slice(0, 6).map((f) => {
                const c = clients.find((x) => x.id === f.clientId)!;
                const res = f.model === "303" ? calc303(f).resultado : f.model === "130" ? calc130(f).resultado : (f.rentaEstimate ?? 0);
                return (
                  <li key={f.id}>
                    <Link href={`/revision/${f.id}`} className="flex items-center justify-between gap-4 py-3 hover:bg-soft sm:-mx-3 sm:px-3 sm:rounded-lg">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink">{c.name}</p>
                        <p className="text-xs text-muted">Modelo {f.model} · {f.period}{f.aiWarnings.length > 0 && ` · ${f.aiWarnings.length} aviso(s) de la IA`}</p>
                      </div>
                      <p className="text-sm font-semibold tabular-nums text-ink">{eur(res)}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-xl font-semibold text-ink">Actividad reciente</h2>
            <LinkBtn href="/auditoria">Auditoría</LinkBtn>
          </div>
          <ul className="mt-4 space-y-4">
            {state.events.slice(0, 6).map((e) => (
              <li key={e.id} className="text-sm">
                <p className="text-ink">{e.action}</p>
                <p className="text-xs text-muted">
                  {e.actor} · {dateTimeEs(e.at)}
                  {e.to && <> · <StatusBadge status={e.to} /></>}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
