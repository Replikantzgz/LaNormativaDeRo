"use client";

import Link from "next/link";
import { useState } from "react";
import { clients } from "@/lib/mock";
import { calc130, calc303, eur } from "@/lib/calc";
import { useDemo } from "@/lib/store";
import { STATUS_LABEL, type FilingStatus } from "@/lib/types";
import { Card, PageHeader, StatusBadge } from "../ui";

const tabs: (FilingStatus | "all")[] = ["pending_review", "all", "changes_requested", "ai_calculated", "validated", "presented"];

export default function Revision() {
  const { filings } = useDemo();
  const [tab, setTab] = useState<FilingStatus | "all">("pending_review");
  const rows = filings.filter((f) => tab === "all" || f.status === tab);

  return (
    <>
      <PageHeader title="Pendientes de revisión" subtitle="Lo que la IA ha calculado y espera tu validación." />
      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const n = t === "all" ? filings.length : filings.filter((f) => f.status === t).length;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                tab === t ? "border-ink bg-ink text-white" : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {t === "all" ? "Todas" : STATUS_LABEL[t]} <span className="opacity-60">{n}</span>
            </button>
          );
        })}
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Cliente</th>
              <th className="px-5 py-3 font-medium">Modelo</th>
              <th className="px-5 py-3 font-medium">Periodo</th>
              <th className="px-5 py-3 text-right font-medium">Resultado</th>
              <th className="px-5 py-3 font-medium">Avisos IA</th>
              <th className="px-5 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-muted">Nada en este estado.</td></tr>
            )}
            {rows.map((f) => {
              const c = clients.find((x) => x.id === f.clientId)!;
              const res = f.model === "303" ? calc303(f).resultado : f.model === "130" ? calc130(f).resultado : (f.rentaEstimate ?? 0);
              return (
                <tr key={f.id} className="hover:bg-soft">
                  <td className="px-5 py-3">
                    <Link href={`/revision/${f.id}`} className="font-medium text-ink hover:text-accent">{c.name}</Link>
                  </td>
                  <td className="px-5 py-3 text-muted">{f.model}</td>
                  <td className="px-5 py-3 text-muted">{f.period}</td>
                  <td className="px-5 py-3 text-right font-medium tabular-nums">{eur(res)}</td>
                  <td className="px-5 py-3">
                    {f.aiWarnings.length > 0 ? (
                      <span className="rounded-full bg-amber-soft px-2 py-0.5 text-xs text-amber">{f.aiWarnings.length}</span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3"><StatusBadge status={f.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}
