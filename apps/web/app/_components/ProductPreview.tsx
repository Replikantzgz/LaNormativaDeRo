// Maqueta visual del panel del cliente con datos de EJEMPLO (no reales).
const stats = [
  { label: "Ingresos", value: "8.420 €", note: "este trimestre" },
  { label: "Gastos", value: "2.310 €", note: "este trimestre" },
  { label: "IVA estimado", value: "1.283 €", note: "a ingresar" },
  { label: "IRPF estimado", value: "1.222 €", note: "pago fraccionado" },
];

const deadlines = [
  { name: "Impuesto trimestral de IVA", state: "Esta semana", tone: "red" as const },
  { name: "Pago fraccionado de IRPF", state: "Este mes", tone: "amber" as const },
  { name: "Declaración de la Renta", state: "Más adelante", tone: "green" as const },
];

const toneClass = {
  red: "bg-red",
  amber: "bg-amber",
  green: "bg-accent",
};

export function ProductPreview() {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_24px_60px_-28px_rgba(16,24,40,0.28)] sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">Tu panel</p>
          <p className="font-serif text-lg font-semibold text-ink">Hola, Marta</p>
        </div>
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-strong">
          Revisado por tu gestor
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-soft p-3.5">
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-ink">{s.value}</p>
            <p className="text-[11px] text-muted">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">Próximos plazos</p>
        <ul className="mt-2 divide-y divide-line">
          {deadlines.map((d) => (
            <li key={d.name} className="flex items-center justify-between py-2.5 text-sm">
              <span className="flex items-center gap-2.5 text-ink">
                <span className={`h-2.5 w-2.5 rounded-full ${toneClass[d.tone]}`} aria-hidden />
                {d.name}
              </span>
              <span className="text-muted">{d.state}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-[11px] text-muted">Datos de ejemplo.</p>
    </div>
  );
}
