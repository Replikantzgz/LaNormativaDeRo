// CÁLCULOS ILUSTRATIVOS PARA LA DEMO.
// No están verificados contra las instrucciones oficiales de la AEAT (ver docs/research/fiscal.md §7).
// En la versión real el motor es un paquete determinista, versionado y con tests.
import type { Filing } from "./types";

const r2 = (n: number) => Math.round(n * 100) / 100;

export function totals(f: Filing) {
  const emitidas = f.items.filter((i) => i.kind === "emitida");
  const recibidas = f.items.filter((i) => i.kind === "recibida");
  const ingresos = emitidas.reduce((s, i) => s + i.base, 0);
  const gastos = recibidas.reduce((s, i) => s + i.base, 0);
  const ivaDevengado = emitidas.reduce((s, i) => s + (i.base * i.ivaPct) / 100, 0);
  const ivaSoportado = recibidas.reduce((s, i) => s + (i.base * i.ivaPct) / 100, 0);
  return {
    ingresos: r2(ingresos),
    gastos: r2(gastos),
    ivaDevengado: r2(ivaDevengado),
    ivaSoportado: r2(ivaSoportado),
  };
}

export function calc303(f: Filing) {
  const t = totals(f);
  return { ...t, resultado: r2(t.ivaDevengado - t.ivaSoportado) };
}

export function calc130(f: Filing) {
  const t = totals(f);
  const rendimiento = t.ingresos - t.gastos;
  const bruto = 0.2 * rendimiento;
  const resultado = Math.max(0, bruto - f.previousPayments - f.withholdings);
  return {
    ingresos: t.ingresos,
    gastos: t.gastos,
    rendimiento: r2(rendimiento),
    bruto: r2(bruto),
    previousPayments: f.previousPayments,
    withholdings: f.withholdings,
    resultado: r2(resultado),
  };
}

export const eur = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", useGrouping: "always" }).format(n);

export const dateEs = (iso: string) =>
  new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso));

export const dateTimeEs = (iso: string) =>
  new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
