"use client";

import Link from "next/link";
import { useState } from "react";
import { dateTimeEs } from "@/lib/calc";
import { useDemo } from "@/lib/store";
import { STATUS_LABEL } from "@/lib/types";
import { Card, PageHeader } from "../ui";

const roles = ["todos", "admin", "ia", "cliente", "sistema"] as const;

export default function Auditoria() {
  const { state } = useDemo();
  const [role, setRole] = useState<(typeof roles)[number]>("todos");
  const rows = state.events
    .filter((e) => role === "todos" || e.actorRole === role)
    .sort((a, b) => b.at.localeCompare(a.at));

  return (
    <>
      <PageHeader title="Auditoría" subtitle="Quién hizo qué y cuándo. En la versión real este registro es de solo añadir: no se puede editar ni borrar." />
      <div className="mb-5 flex flex-wrap gap-2">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
              role === r ? "border-ink bg-ink text-white" : "border-line text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Cuándo</th>
              <th className="px-5 py-3 font-medium">Quién</th>
              <th className="px-5 py-3 font-medium">Acción</th>
              <th className="px-5 py-3 font-medium">Cambio de estado</th>
              <th className="px-5 py-3 font-medium">Declaración</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((e) => (
              <tr key={e.id}>
                <td className="px-5 py-3 text-muted">{dateTimeEs(e.at)}</td>
                <td className="px-5 py-3 text-ink">{e.actor}</td>
                <td className="px-5 py-3 text-ink">{e.action}</td>
                <td className="px-5 py-3 text-xs text-muted">{e.from && e.to ? `${STATUS_LABEL[e.from]} → ${STATUS_LABEL[e.to]}` : "—"}</td>
                <td className="px-5 py-3">
                  {e.filingId ? <Link href={`/revision/${e.filingId}`} className="text-accent hover:text-accent-strong">{e.filingId}</Link> : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
