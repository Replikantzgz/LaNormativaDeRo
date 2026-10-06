"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { clients } from "@/lib/mock";
import { dateEs } from "@/lib/calc";
import { useDemo } from "@/lib/store";
import { Card, PageHeader } from "../ui";

const stateTone = {
  activo: "bg-accent-soft text-accent-strong",
  "alta pendiente": "bg-amber-soft text-amber",
  baja: "bg-soft text-muted",
} as const;

export default function Clientes() {
  const { state } = useDemo();
  const [q, setQ] = useState("");
  const [type, setType] = useState("todos");
  const [st, setSt] = useState("todos");

  const rows = useMemo(
    () =>
      clients.filter(
        (c) =>
          (type === "todos" || c.type === type) &&
          (st === "todos" || c.state === st) &&
          (q === "" || `${c.name} ${c.email} ${c.activity}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, type, st],
  );

  const sel = "rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent";

  return (
    <>
      <PageHeader title="Clientes" subtitle={`${clients.length} clientes en el CRM`} />
      <div className="mb-5 flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre, email o actividad"
          aria-label="Buscar clientes"
          className={`${sel} min-w-[240px] flex-1`}
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className={sel} aria-label="Tipo">
          <option value="todos">Todos los tipos</option>
          <option value="autonomo">Autónomos</option>
          <option value="particular">Particulares</option>
        </select>
        <select value={st} onChange={(e) => setSt(e.target.value)} className={sel} aria-label="Estado">
          <option value="todos">Todos los estados</option>
          <option value="activo">Activos</option>
          <option value="alta pendiente">Alta pendiente</option>
          <option value="baja">Baja</option>
        </select>
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Cliente</th>
              <th className="px-5 py-3 font-medium">Tipo</th>
              <th className="px-5 py-3 font-medium">Plan</th>
              <th className="px-5 py-3 font-medium">Estado</th>
              <th className="px-5 py-3 font-medium">Documentos</th>
              <th className="px-5 py-3 font-medium">Alta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-muted">Sin resultados.</td></tr>}
            {rows.map((c) => {
              const plan = state.plans.find((p) => p.id === c.planId);
              const pct = Math.min(100, Math.round((c.docsThisPeriod / c.docsLimit) * 100));
              return (
                <tr key={c.id} className="hover:bg-soft">
                  <td className="px-5 py-3">
                    <Link href={`/clientes/${c.id}`} className="font-medium text-ink hover:text-accent">{c.name}</Link>
                    <p className="text-xs text-muted">{c.activity}</p>
                  </td>
                  <td className="px-5 py-3 text-muted">{c.type === "autonomo" ? "Autónomo" : "Particular"}</td>
                  <td className="px-5 py-3 text-muted">{plan?.name ?? "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${stateTone[c.state]}`}>{c.state}</span>
                    {c.missing.length > 0 && c.state !== "baja" && (
                      <span className="ml-2 rounded-full bg-red-soft px-2 py-0.5 text-xs text-red">{c.missing.length} pendiente(s)</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 rounded-full bg-line">
                        <div className={`h-1.5 rounded-full ${pct > 90 ? "bg-amber" : "bg-accent"}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs tabular-nums text-muted">{c.docsThisPeriod}/{c.docsLimit}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted">{dateEs(c.since)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}
