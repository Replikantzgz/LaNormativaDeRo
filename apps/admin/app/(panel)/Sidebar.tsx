"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "../login/actions";
import { useDemo } from "@/lib/store";

const nav = [
  { href: "/", label: "Resumen" },
  { href: "/revision", label: "Pendientes de revisión", badge: true },
  { href: "/clientes", label: "Clientes (CRM)" },
  { href: "/alertas", label: "Alertas" },
  { href: "/planes", label: "Planes y servicios" },
  { href: "/plantillas", label: "Plantillas de email" },
  { href: "/metricas", label: "Métricas" },
  { href: "/auditoria", label: "Auditoría" },
];

export function Sidebar() {
  const path = usePathname();
  const { filings, reset } = useDemo();
  const pending = filings.filter((f) => f.status === "pending_review").length;

  return (
    <aside className="border-b border-line bg-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col px-4 py-4 lg:py-6">
        <div className="px-2 lg:mb-6">
          <p className="font-serif text-lg font-semibold text-ink">
            La Normativa <span className="text-accent">de Ro</span>
          </p>
          <p className="text-xs text-muted">Plataforma de gestión</p>
        </div>
        <nav aria-label="Panel" className="mt-3 flex gap-1 overflow-x-auto lg:mt-0 lg:flex-1 lg:flex-col lg:overflow-visible">
          {nav.map((n) => {
            const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-accent-soft font-medium text-accent-strong" : "text-muted hover:bg-soft hover:text-ink"
                }`}
              >
                {n.label}
                {n.badge && pending > 0 && (
                  <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] font-medium text-white">{pending}</span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 hidden space-y-2 border-t border-line pt-4 lg:block">
          <button onClick={reset} className="w-full rounded-lg px-3 py-2 text-left text-xs text-muted hover:bg-soft hover:text-ink">
            Reiniciar datos de la demo
          </button>
          <form action={logout}>
            <button className="w-full rounded-lg px-3 py-2 text-left text-xs text-muted hover:bg-soft hover:text-ink">Salir</button>
          </form>
        </div>
      </div>
    </aside>
  );
}
