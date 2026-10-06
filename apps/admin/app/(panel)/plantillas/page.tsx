"use client";

import { useState } from "react";
import { useDemo } from "@/lib/store";
import { Card, PageHeader } from "../ui";

const sample: Record<string, string> = {
  "{{nombre}}": "Marta",
  "{{modelo}}": "modelo 303",
  "{{periodo}}": "3T 2026",
  "{{fecha_limite}}": "20 de octubre",
  "{{lista_documentos}}": "· Facturas de septiembre",
  "{{resultado}}": "1.283,00 €",
};

export default function Plantillas() {
  const { state, setTemplates } = useDemo();
  const [sel, setSel] = useState(state.templates[0]?.id);
  const t = state.templates.find((x) => x.id === sel) ?? state.templates[0];
  const patch = (p: Partial<typeof t>) => setTemplates(state.templates.map((x) => (x.id === t.id ? { ...x, ...p } : x)));
  const fill = (s: string) => Object.entries(sample).reduce((acc, [k, v]) => acc.replaceAll(k, v), s);
  const field = "mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent";

  return (
    <>
      <PageHeader title="Plantillas de email" subtitle="Recordatorios y peticiones de documentos para tus clientes." />
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Plantillas" className="flex gap-2 overflow-x-auto lg:flex-col">
          {state.templates.map((x) => (
            <button
              key={x.id}
              onClick={() => setSel(x.id)}
              className={`shrink-0 rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                x.id === t.id ? "bg-accent-soft font-medium text-accent-strong" : "text-muted hover:bg-soft hover:text-ink"
              }`}
            >
              {x.name}
            </button>
          ))}
        </nav>
        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="p-6">
            <h2 className="font-serif text-lg font-semibold text-ink">Editar</h2>
            <label className="mt-4 block text-xs font-medium text-muted">
              Asunto
              <input className={field} value={t.subject} onChange={(e) => patch({ subject: e.target.value })} />
            </label>
            <label className="mt-4 block text-xs font-medium text-muted">
              Mensaje
              <textarea rows={11} className={field} value={t.body} onChange={(e) => patch({ body: e.target.value })} />
            </label>
            <p className="mt-3 text-xs text-muted">Variables: {Object.keys(sample).join("  ")}</p>
          </Card>
          <Card className="p-6">
            <h2 className="font-serif text-lg font-semibold text-ink">Vista previa</h2>
            <div className="mt-4 rounded-xl border border-line bg-soft p-4">
              <p className="text-sm font-medium text-ink">{fill(t.subject)}</p>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted">{fill(t.body)}</pre>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
