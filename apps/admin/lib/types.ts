export type FilingStatus =
  | "documents_received"
  | "ai_calculated"
  | "pending_review"
  | "changes_requested"
  | "validated"
  | "presented";

export const STATUS_FLOW: FilingStatus[] = [
  "documents_received",
  "ai_calculated",
  "pending_review",
  "validated",
  "presented",
];

export const STATUS_LABEL: Record<FilingStatus, string> = {
  documents_received: "Documentos recibidos",
  ai_calculated: "Calculado por IA",
  pending_review: "Pendiente de revisión",
  changes_requested: "Cambios solicitados",
  validated: "Validado",
  presented: "Presentado",
};

// Transiciones permitidas. validated y presented SOLO las ejecuta una persona (gestor).
export const ALLOWED: Record<FilingStatus, FilingStatus[]> = {
  documents_received: ["ai_calculated"],
  ai_calculated: ["pending_review"],
  pending_review: ["validated", "changes_requested"],
  changes_requested: ["documents_received"],
  validated: ["presented", "changes_requested"],
  presented: [],
};

export type ClientType = "autonomo" | "particular";
export type ClientState = "activo" | "alta pendiente" | "baja";
export type Model = "303" | "130" | "100";

export type Client = {
  id: string;
  name: string;
  email: string;
  type: ClientType;
  planId: string | null;
  activity: string;
  region: string;
  since: string;
  state: ClientState;
  docsThisPeriod: number;
  docsLimit: number;
  missing: string[];
};

export type Item = {
  id: string;
  kind: "emitida" | "recibida";
  concept: string;
  date: string;
  base: number;
  ivaPct: number;
  confidence: number; // 0..1 confianza del OCR/IA
  note?: string;
};

export type Filing = {
  id: string;
  clientId: string;
  model: Model;
  period: string;
  dueLabel: string;
  status: FilingStatus;
  items: Item[];
  // 130
  previousPayments: number;
  withholdings: number;
  // 100 (estimación ilustrativa)
  rentaEstimate?: number;
  aiWarnings: string[];
};

export type AuditEvent = {
  id: string;
  filingId: string | null;
  actor: string;
  actorRole: "admin" | "ia" | "cliente" | "sistema";
  action: string;
  from?: FilingStatus;
  to?: FilingStatus;
  at: string; // ISO
};

export type Plan = {
  id: string;
  name: string;
  audience: "autonomo" | "particular";
  price: number;
  period: "mes" | "puntual";
  features: string[];
  active: boolean;
};

export type Template = {
  id: string;
  name: string;
  subject: string;
  body: string;
};
