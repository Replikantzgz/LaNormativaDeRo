"use client";

import { useDemo } from "@/lib/store";
import type { Plan } from "@/lib/types";
import { Card, PageHeader } from "../ui";

const input = "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent";

export default function Planes() {
  const { state, setPlans } = useDemo();
  const update = (id: string, patch: Partial<Plan>) =>
    setPlans(state.plans.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const add = () =>
    setPlans([
      ...state.plans,
      { id: `nuevo-${Date.now()}`, name: "Nuevo plan", audience: "autonomo", price: 0, period: "mes", features: [], active: false },
    ]);

  return (
    <>
      <PageHeader
        title="Planes y servicios"
        subtitle="Son datos, no código: lo que cambies aquí es lo que verá la web pública."
        action={<button onClick={add} className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-white hover:bg-accent">Añadir plan</button>}
      />
      <div className="space-y-4">
        {state.plans.map((p) => (
          <Card key={p.id} className={`p-6 ${p.active ? "" : "opacity-70"}`}>
            <div className="grid gap-4 md:grid-cols-[1.4fr_0.8fr_0.9fr_0.9fr]">
              <label className="text-xs font-medium text-muted">
                Nombre
                <input className={`${input} mt-1`} value={p.name} onChange={(e) => update(p.id, { name: e.target.value })} />
              </label>
              <label className="text-xs font-medium text-muted">
                Precio (€, sin IVA)
                <input
                  type="number"
                  min={0}
                  className={`${input} mt-1`}
                  value={p.price}
                  onChange={(e) => update(p.id, { price: Number(e.target.value) })}
                />
              </label>
              <label className="text-xs font-medium text-muted">
                Para
                <select className={`${input} mt-1`} value={p.audience} onChange={(e) => update(p.id, { audience: e.target.value as Plan["audience"] })}>
                  <option value="autonomo">Autónomos</option>
                  <option value="particular">Particulares</option>
                </select>
              </label>
              <label className="text-xs font-medium text-muted">
                Cobro
                <select className={`${input} mt-1`} value={p.period} onChange={(e) => update(p.id, { period: e.target.value as Plan["period"] })}>
                  <option value="mes">Mensual</option>
                  <option value="puntual">Puntual</option>
                </select>
              </label>
            </div>
            <label className="mt-4 block text-xs font-medium text-muted">
              Qué incluye (una línea por punto)
              <textarea
                rows={5}
                className={`${input} mt-1`}
                value={p.features.join("\n")}
                onChange={(e) => update(p.id, { features: e.target.value.split("\n") })}
              />
            </label>
            <label className="mt-4 flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={p.active} onChange={(e) => update(p.id, { active: e.target.checked })} className="accent-accent" />
              Activo (visible y contratable)
            </label>
          </Card>
        ))}
      </div>
    </>
  );
}
