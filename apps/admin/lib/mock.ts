// DATOS DE EJEMPLO. Personas, NIF y cifras ficticios. No hay backend en esta fase.
import type { AuditEvent, Client, Filing, FilingStatus, Item, Plan, Template } from "./types";

export const DEMO_NOW = "2026-10-06T09:30:00";

export const plans: Plan[] = [
  {
    id: "autonomo-esencial",
    name: "Autónomo Esencial",
    audience: "autonomo",
    price: 49,
    period: "mes",
    features: ["303 y 130 trimestrales", "Hasta ~20 documentos/trimestre", "Chat IA", "Revisión del gestor"],
    active: true,
  },
  {
    id: "autonomo-plus",
    name: "Autónomo Plus",
    audience: "autonomo",
    price: 69,
    period: "mes",
    features: ["303 y 130 trimestrales", "Hasta ~100 documentos/trimestre", "Simulador IRPF", "Renta anual incluida", "Revisión prioritaria"],
    active: true,
  },
  {
    id: "renta-basica",
    name: "Renta básica",
    audience: "particular",
    price: 45,
    period: "puntual",
    features: ["Asalariado, un pagador, sin inmuebles"],
    active: true,
  },
  {
    id: "renta-completa",
    name: "Renta completa",
    audience: "particular",
    price: 95,
    period: "puntual",
    features: ["Alquileres, inversiones, autónomos, varias fuentes"],
    active: true,
  },
  {
    id: "tramites",
    name: "Trámites con Hacienda",
    audience: "particular",
    price: 30,
    period: "puntual",
    features: ["Domicilio fiscal, certificados, requerimientos"],
    active: true,
  },
];

export const templates: Template[] = [
  {
    id: "faltan-documentos",
    name: "Faltan documentos",
    subject: "Necesitamos unos documentos para tu {{modelo}}",
    body:
      "Hola {{nombre}},\n\nPara preparar tu {{modelo}} del {{periodo}} nos faltan estos documentos:\n{{lista_documentos}}\n\nPuedes subirlos desde tu panel en un minuto.\n\nUn saludo,\nLa Normativa de Ro",
  },
  {
    id: "plazo-cercano",
    name: "Se acerca un plazo",
    subject: "Tu {{modelo}} vence pronto",
    body:
      "Hola {{nombre}},\n\nTu {{modelo}} del {{periodo}} tiene como límite el {{fecha_limite}}. Si aún no has subido tus últimos documentos, hazlo cuanto antes para que podamos revisarlo.\n\nUn saludo,\nLa Normativa de Ro",
  },
  {
    id: "declaracion-validada",
    name: "Declaración lista",
    subject: "Tu {{modelo}} está revisado",
    body:
      "Hola {{nombre}},\n\nYa hemos revisado y validado tu {{modelo}} del {{periodo}}. Resultado estimado: {{resultado}}.\n\nPuedes consultarlo en tu panel.\n\nUn saludo,\nLa Normativa de Ro",
  },
  {
    id: "bienvenida",
    name: "Bienvenida",
    subject: "Bienvenido/a a La Normativa de Ro",
    body:
      "Hola {{nombre}},\n\nTu cuenta está creada. Completa el cuestionario fiscal y sube tus primeros documentos cuando quieras.\n\nUn saludo,\nLa Normativa de Ro",
  },
];

type C = Omit<Client, "docsLimit"> & { docsLimit?: number };
const rawClients: C[] = [
  { id: "c01", name: "Marta Iglesias Roca", email: "marta.iglesias@example.com", type: "autonomo", planId: "autonomo-plus", activity: "Diseño gráfico", region: "Aragón", since: "2025-02-03", state: "activo", docsThisPeriod: 42, missing: [] },
  { id: "c02", name: "Álvaro Pérez Ginés", email: "alvaro.perez@example.com", type: "autonomo", planId: "autonomo-esencial", activity: "Fontanería", region: "Aragón", since: "2025-05-12", state: "activo", docsThisPeriod: 19, missing: ["Facturas de combustible de septiembre"] },
  { id: "c03", name: "Lucía Navarro Ferrer", email: "lucia.navarro@example.com", type: "autonomo", planId: "autonomo-plus", activity: "Consultoría de marketing", region: "Cataluña", since: "2024-11-20", state: "activo", docsThisPeriod: 63, missing: [] },
  { id: "c04", name: "Javier Romero Sanz", email: "javier.romero@example.com", type: "autonomo", planId: "autonomo-esencial", activity: "Electricista", region: "Aragón", since: "2025-09-01", state: "activo", docsThisPeriod: 7, missing: ["Facturas emitidas de julio y agosto", "Justificante de cuota de autónomos"] },
  { id: "c05", name: "Carmen Ortiz Lahoz", email: "carmen.ortiz@example.com", type: "autonomo", planId: "autonomo-plus", activity: "Fisioterapia", region: "Madrid", since: "2025-01-15", state: "activo", docsThisPeriod: 55, missing: [] },
  { id: "c06", name: "Diego Marín Ibáñez", email: "diego.marin@example.com", type: "autonomo", planId: "autonomo-esencial", activity: "Desarrollo web", region: "Valencia", since: "2026-01-09", state: "activo", docsThisPeriod: 16, missing: [] },
  { id: "c07", name: "Elena Casas Pardo", email: "elena.casas@example.com", type: "autonomo", planId: "autonomo-esencial", activity: "Fotografía", region: "Aragón", since: "2026-03-22", state: "activo", docsThisPeriod: 11, missing: ["Tickets de equipo fotográfico"] },
  { id: "c08", name: "Raúl Benítez Cano", email: "raul.benitez@example.com", type: "autonomo", planId: "autonomo-plus", activity: "Transporte de mercancías", region: "Aragón", since: "2024-06-30", state: "activo", docsThisPeriod: 88, missing: [] },
  { id: "c09", name: "Sofía Aguilar Luna", email: "sofia.aguilar@example.com", type: "particular", planId: "renta-basica", activity: "Asalariada", region: "Aragón", since: "2026-09-18", state: "activo", docsThisPeriod: 4, missing: ["Certificado de retenciones del segundo pagador"] },
  { id: "c10", name: "Pablo Herrera Vidal", email: "pablo.herrera@example.com", type: "particular", planId: "renta-completa", activity: "Alquiler de vivienda + asalariado", region: "Navarra", since: "2026-09-25", state: "activo", docsThisPeriod: 9, missing: [] },
  { id: "c11", name: "Nuria Campos Gil", email: "nuria.campos@example.com", type: "autonomo", planId: null, activity: "Traducción", region: "Aragón", since: "2026-10-02", state: "alta pendiente", docsThisPeriod: 0, missing: ["Cuestionario fiscal sin completar"] },
  { id: "c12", name: "Iván Soler Prieto", email: "ivan.soler@example.com", type: "autonomo", planId: "autonomo-esencial", activity: "Hostelería (bar)", region: "Baleares", since: "2025-03-10", state: "baja", docsThisPeriod: 0, missing: [] },
];

export const clients: Client[] = rawClients.map((c) => ({
  ...c,
  docsLimit: c.planId === "autonomo-plus" ? 100 : c.planId === "autonomo-esencial" ? 20 : 30,
}));

// Generador determinista de documentos extraídos (ficticios)
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const expenseConcepts = [
  "Material de oficina", "Combustible", "Suscripción de software", "Seguro de responsabilidad civil",
  "Servicios de gestoría", "Teléfono e internet", "Material de trabajo", "Reparación de equipo", "Formación",
];
const incomeConcepts = ["Factura de cliente", "Servicio profesional", "Trabajo realizado", "Proyecto"];

function makeItems(seed: number, incomes: number, expenses: number, scale: number): Item[] {
  const rnd = seeded(seed);
  const items: Item[] = [];
  for (let i = 0; i < incomes; i++) {
    const base = Math.round((300 + rnd() * 1400) * scale);
    items.push({
      id: `i${seed}-${i}`,
      kind: "emitida",
      concept: `${incomeConcepts[Math.floor(rnd() * incomeConcepts.length)]} ${i + 1}`,
      date: `2026-0${7 + Math.floor(rnd() * 3)}-${String(1 + Math.floor(rnd() * 27)).padStart(2, "0")}`,
      base,
      ivaPct: 21,
      confidence: 0.9 + rnd() * 0.1,
    });
  }
  for (let i = 0; i < expenses; i++) {
    const base = Math.round((20 + rnd() * 380) * scale);
    const confidence = 0.62 + rnd() * 0.38;
    items.push({
      id: `g${seed}-${i}`,
      kind: "recibida",
      concept: expenseConcepts[Math.floor(rnd() * expenseConcepts.length)],
      date: `2026-0${7 + Math.floor(rnd() * 3)}-${String(1 + Math.floor(rnd() * 27)).padStart(2, "0")}`,
      base,
      ivaPct: rnd() > 0.15 ? 21 : 10,
      confidence,
      note: confidence < 0.75 ? "Lectura dudosa: confirmar importe y NIF del emisor" : undefined,
    });
  }
  return items;
}

type F = {
  id: string; clientId: string; seed: number; status: FilingStatus; inc: number; exp: number; scale: number;
  prev: number; ret: number; warnings?: string[]; model?: "303" | "130" | "100"; renta?: number;
};

const spec: F[] = [
  { id: "f01", clientId: "c01", seed: 11, status: "pending_review", inc: 6, exp: 9, scale: 1.2, prev: 1180, ret: 320, warnings: ["Posible gasto deducible sin categorizar: 'Curso de ilustración digital'"] },
  { id: "f02", clientId: "c03", seed: 23, status: "pending_review", inc: 8, exp: 12, scale: 1.5, prev: 2100, ret: 540, warnings: ["Factura recibida con IVA del 10 % que podría ser del 21 %", "Posible duplicado: dos facturas del mismo proveedor con el mismo importe"] },
  { id: "f03", clientId: "c05", seed: 37, status: "validated", inc: 7, exp: 8, scale: 1.1, prev: 900, ret: 0 },
  { id: "f04", clientId: "c06", seed: 41, status: "ai_calculated", inc: 4, exp: 6, scale: 0.9, prev: 350, ret: 0 },
  { id: "f05", clientId: "c08", seed: 53, status: "pending_review", inc: 9, exp: 14, scale: 1.8, prev: 3400, ret: 0, warnings: ["Gasto de combustible elevado frente a trimestres anteriores"] },
  { id: "f06", clientId: "c02", seed: 67, status: "documents_received", inc: 3, exp: 5, scale: 0.8, prev: 200, ret: 0, warnings: ["Faltan documentos de septiembre"] },
  { id: "f07", clientId: "c04", seed: 71, status: "changes_requested", inc: 2, exp: 3, scale: 0.7, prev: 0, ret: 0, warnings: ["Faltan facturas emitidas de julio y agosto"] },
  { id: "f08", clientId: "c07", seed: 83, status: "ai_calculated", inc: 3, exp: 5, scale: 0.8, prev: 150, ret: 0 },
  { id: "f09", clientId: "c01", seed: 97, status: "presented", inc: 6, exp: 8, scale: 1.1, prev: 600, ret: 280 },
  { id: "f10", clientId: "c09", seed: 101, status: "documents_received", inc: 1, exp: 3, scale: 0.5, prev: 0, ret: 0, model: "100", renta: -312, warnings: ["Falta certificado de retenciones del segundo pagador"] },
  { id: "f11", clientId: "c10", seed: 113, status: "pending_review", inc: 3, exp: 6, scale: 0.9, prev: 0, ret: 0, model: "100", renta: 486, warnings: ["Revisar deducción por alquiler de vivienda habitual"] },
];

export const filings: Filing[] = spec.flatMap((s) => {
  const model = s.model ?? "303";
  const base: Filing = {
    id: s.id,
    clientId: s.clientId,
    model,
    period: model === "100" ? "Renta (campaña próxima)" : s.id === "f09" ? "2T 2026" : "3T 2026",
    dueLabel: model === "100" ? "Abril–junio 2027 (por verificar)" : s.id === "f09" ? "Presentado" : "20 oct 2026 (por verificar)",
    status: s.status,
    items: makeItems(s.seed, s.inc, s.exp, s.scale),
    previousPayments: Math.round(s.prev * 0.35),
    withholdings: Math.round(s.ret * 0.35),
    rentaEstimate: s.renta,
    aiWarnings: s.warnings ?? [],
  };
  // Los autónomos con 303 también tienen su 130 del mismo trimestre
  if (model === "303") {
    return [
      base,
      { ...base, id: `${s.id}b`, model: "130" as const, items: base.items },
    ];
  }
  return [base];
});

const mk = (n: number, filingId: string | null, actor: string, role: AuditEvent["actorRole"], action: string, at: string, from?: FilingStatus, to?: FilingStatus): AuditEvent => ({
  id: `e${n}`, filingId, actor, actorRole: role, action, at, from, to,
});

export const seedEvents: AuditEvent[] = [
  mk(1, "f01", "IA", "ia", "Cálculo preparado", "2026-10-05T18:12:00", "documents_received", "ai_calculated"),
  mk(2, "f01", "Sistema", "sistema", "Enviado a revisión", "2026-10-05T18:12:30", "ai_calculated", "pending_review"),
  mk(3, "f03", "IA", "ia", "Cálculo preparado", "2026-10-03T10:01:00", "documents_received", "ai_calculated"),
  mk(4, "f03", "Gestor (demo)", "admin", "Validado tras revisión", "2026-10-04T12:40:00", "pending_review", "validated"),
  mk(5, "f09", "Gestor (demo)", "admin", "Marcado como presentado", "2026-07-17T09:15:00", "validated", "presented"),
  mk(6, null, "Nuria Campos Gil", "cliente", "Alta de cliente", "2026-10-02T16:20:00"),
  mk(7, "f07", "Gestor (demo)", "admin", "Cambios solicitados: faltan facturas emitidas", "2026-10-04T17:05:00", "pending_review", "changes_requested"),
  mk(8, "f02", "IA", "ia", "Cálculo preparado con 2 avisos", "2026-10-05T20:45:00", "ai_calculated", "pending_review"),
];

// Evolución ilustrativa de ingresos recurrentes (€/mes)
export const mrrSeries = [
  { m: "May", v: 180 }, { m: "Jun", v: 245 }, { m: "Jul", v: 310 },
  { m: "Ago", v: 372 }, { m: "Sep", v: 420 }, { m: "Oct", v: 487 },
];
