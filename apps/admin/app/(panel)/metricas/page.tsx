"use client";

import { clients, mrrSeries } from "@/lib/mock";
import { eur } from "@/lib/calc";
import { useDemo } from "@/lib/store";
import { STATUS_FLOW, STATUS_LABEL } from "@/lib/types";
import { Card, PageHeader, Stat } from "../ui";

export default function Metricas() {
  const { state, filings } = useDemo();
  const active = clients.filter((c) => c.state === "activo");
  const byPlan = state.plans
    .map((p) => {
      const n = active.filter((c) => c.planId === p.id).length;
      return { p, n, rev: p.period === "mes" ? n * p.price : 0 };
    })
    .filter((x) => x.n > 0);
  const mrr = byPlan.reduce((s, x) => s + x.rev, 0);
  const series = [...mrrSeries.slice(0, -1), { m: mrrSeries[mrrSeries.length - 1].m, v: mrr }];
  const max = Math.max(...series.map((s) => s.v), 1);
  const bajas = clients.filter((c) => c.state === "baja").length;

  return (
    <>
      <PageHeader title="Métricas" subtitle="Cómo va el negocio. Datos de ejemplo." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Clientes activos" value={String(active.length)} />
        <Stat label="Ingresos recurrentes" value={eur(mrr)} hint="al mes" />
        <Stat label="Ticket medio" value={eur(active.length ? mrr / active.length : 0)} hint="por cliente activo" />
        <Stat label="Bajas" value={String(bajas)} hint="en total" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-serif text-xl font-semibold text-ink">Ingresos recurrentes</h2>
          <p className="text-xs text-muted">€ al mes, últimos seis meses (ilustrativo)</p>
          <div className="mt-6 flex h-44 items-end gap-3" role="img" aria-label="Evolución de ingresos recurrentes mensuales">
            {series.map((s) => (
              <div key={s.m} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs tabular-nums text-muted">{s.v}</span>
                <div className="w-full rounded-t-md bg-accent" style={{ height: `${(s.v / max) * 100}%` }} />
                <span className="text-xs text-muted">{s.m}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-serif text-xl font-semibold text-ink">Clientes por plan</h2>
          <ul className="mt-5 space-y-4">
            {byPlan.map(({ p, n, rev }) => (
              <li key={p.id}>
                <div className="flex justify-between text-sm">
                  <span className="text-ink">{p.name}</span>
                  <span className="tabular-nums text-muted">{n} · {rev > 0 ? `${eur(rev)}/mes` : "puntual"}</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-line">
                  <div className="h-2 rounded-full bg-accent" style={{ width: `${(n / active.length) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="font-serif text-xl font-semibold text-ink">Declaraciones por estado</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-5">
            {STATUS_FLOW.map((s) => (
              <div key={s} className="rounded-xl border border-line bg-soft p-4">
                <p className="text-xs text-muted">{STATUS_LABEL[s]}</p>
                <p className="mt-1 font-serif text-2xl font-semibold tabular-nums">{filings.filter((f) => f.status === s).length}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
