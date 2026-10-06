"use client";

import Link from "next/link";
import { clients } from "@/lib/mock";
import { useDemo } from "@/lib/store";
import { Card, PageHeader } from "../ui";

export default function Alertas() {
  const { filings } = useDemo();
  const missing = clients.filter((c) => c.missing.length > 0 && c.state !== "baja");
  const nearLimit = clients.filter((c) => c.state === "activo" && c.docsThisPeriod / c.docsLimit >= 0.9);
  const ai = filings.filter((f) => f.aiWarnings.length > 0 && f.status !== "presented");

  return (
    <>
      <PageHeader title="Alertas" subtitle="Documentación incompleta y avisos que merecen un vistazo." />
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="font-serif text-xl font-semibold text-ink">Documentación incompleta <span className="text-muted">({missing.length})</span></h2>
          <ul className="mt-4 divide-y divide-line">
            {missing.map((c) => (
              <li key={c.id} className="flex flex-wrap items-start justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium text-ink">{c.name}</p>
                  <ul className="mt-1 list-disc pl-5 text-xs text-muted">{c.missing.map((m) => <li key={m}>{m}</li>)}</ul>
                </div>
                <Link href={`/clientes/${c.id}`} className="rounded-full border border-line px-4 py-1.5 text-xs font-medium hover:border-ink">
                  Pedir documentos
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="font-serif text-xl font-semibold text-ink">Avisos de la IA <span className="text-muted">({ai.length})</span></h2>
          <ul className="mt-4 divide-y divide-line">
            {ai.map((f) => {
              const c = clients.find((x) => x.id === f.clientId)!;
              return (
                <li key={f.id} className="py-3">
                  <Link href={`/revision/${f.id}`} className="text-sm font-medium text-ink hover:text-accent">{c.name} · modelo {f.model}</Link>
                  <ul className="mt-1 list-disc pl-5 text-xs text-muted">{f.aiWarnings.map((w) => <li key={w}>{w}</li>)}</ul>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="font-serif text-xl font-semibold text-ink">Cerca del límite de documentos <span className="text-muted">({nearLimit.length})</span></h2>
          {nearLimit.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Nadie cerca del límite.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {nearLimit.map((c) => (
                <li key={c.id} className="flex items-center justify-between py-3 text-sm">
                  <Link href={`/clientes/${c.id}`} className="text-ink hover:text-accent">{c.name}</Link>
                  <span className="tabular-nums text-muted">{c.docsThisPeriod}/{c.docsLimit}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
