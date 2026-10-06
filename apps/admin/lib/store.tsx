"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from "react";
import { clients, DEMO_NOW, filings as seedFilings, plans as seedPlans, seedEvents, templates as seedTemplates } from "./mock";
import { ALLOWED, type AuditEvent, type Filing, type FilingStatus, type Plan, type Template } from "./types";

const KEY = "lnr-admin-demo-v1";

type State = {
  statuses: Record<string, FilingStatus>;
  events: AuditEvent[];
  plans: Plan[];
  templates: Template[];
  notes: Record<string, string>;
};

const initial = (): State => ({
  statuses: Object.fromEntries(seedFilings.map((f) => [f.id, f.status])),
  events: seedEvents,
  plans: seedPlans,
  templates: seedTemplates,
  notes: {},
});

type Action =
  | { type: "load"; state: State }
  | { type: "transition"; filingId: string; to: FilingStatus; event: AuditEvent }
  | { type: "plans"; plans: Plan[] }
  | { type: "templates"; templates: Template[] }
  | { type: "note"; clientId: string; text: string }
  | { type: "reset" };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "load":
      return a.state;
    case "transition":
      return { ...s, statuses: { ...s.statuses, [a.filingId]: a.to }, events: [a.event, ...s.events] };
    case "plans":
      return { ...s, plans: a.plans };
    case "templates":
      return { ...s, templates: a.templates };
    case "note":
      return { ...s, notes: { ...s.notes, [a.clientId]: a.text } };
    case "reset":
      return initial();
  }
}

type Ctx = {
  state: State;
  filings: Filing[];
  statusOf: (id: string) => FilingStatus;
  /** Solo una persona (gestor) puede validar o presentar. La IA nunca. */
  transition: (filingId: string, to: FilingStatus, by: "admin" | "ia" | "sistema") => { ok: boolean; reason?: string };
  setPlans: (p: Plan[]) => void;
  setTemplates: (t: Template[]) => void;
  setNote: (clientId: string, text: string) => void;
  reset: () => void;
};

const StoreCtx = createContext<Ctx | null>(null);

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initial);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) dispatch({ type: "load", state: { ...initial(), ...JSON.parse(raw) } });
    } catch {
      /* sin almacenamiento: se queda con los datos de ejemplo */
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignorar */
    }
  }, [state]);

  const statusOf = useCallback((id: string) => state.statuses[id], [state.statuses]);

  const transition = useCallback<Ctx["transition"]>(
    (filingId, to, by) => {
      const from = state.statuses[filingId];
      if (!from) return { ok: false, reason: "Declaración no encontrada" };
      if (!ALLOWED[from].includes(to)) return { ok: false, reason: "Transición no permitida" };
      if ((to === "validated" || to === "presented") && by !== "admin") {
        return { ok: false, reason: "Solo una persona puede validar o presentar" };
      }
      const event: AuditEvent = {
        id: `e${Date.now()}`,
        filingId,
        actor: by === "admin" ? "Gestor (demo)" : by === "ia" ? "IA" : "Sistema",
        actorRole: by,
        action:
          to === "validated" ? "Validado tras revisión"
          : to === "presented" ? "Marcado como presentado"
          : to === "changes_requested" ? "Cambios solicitados al cliente"
          : to === "ai_calculated" ? "Cálculo preparado"
          : to === "pending_review" ? "Enviado a revisión"
          : "Documentos recibidos",
        from,
        to,
        at: new Date().toISOString(),
      };
      dispatch({ type: "transition", filingId, to, event });
      return { ok: true };
    },
    [state.statuses],
  );

  const value = useMemo<Ctx>(
    () => ({
      state,
      filings: seedFilings.map((f) => ({ ...f, status: state.statuses[f.id] ?? f.status })),
      statusOf,
      transition,
      setPlans: (plans) => dispatch({ type: "plans", plans }),
      setTemplates: (templates) => dispatch({ type: "templates", templates }),
      setNote: (clientId, text) => dispatch({ type: "note", clientId, text }),
      reset: () => dispatch({ type: "reset" }),
    }),
    [state, statusOf, transition],
  );

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useDemo() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useDemo fuera de DemoStoreProvider");
  return c;
}

export const clientById = (id: string) => clients.find((c) => c.id === id);
export { DEMO_NOW };
