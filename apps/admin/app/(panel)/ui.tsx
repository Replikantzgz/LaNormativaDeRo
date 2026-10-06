import Link from "next/link";
import { STATUS_LABEL, type FilingStatus } from "@/lib/types";

const tone: Record<FilingStatus, string> = {
  documents_received: "bg-soft text-muted border-line",
  ai_calculated: "bg-accent-soft text-accent-strong border-accent/20",
  pending_review: "bg-amber-soft text-amber border-amber/30",
  changes_requested: "bg-red-soft text-red border-red/30",
  validated: "bg-accent text-white border-accent",
  presented: "bg-ink text-white border-ink",
};

export function StatusBadge({ status }: { status: FilingStatus }) {
  return (
    <span className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium ${tone[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-white ${className}`}>{children}</div>;
}

export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card className="p-5">
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-2 font-serif text-3xl font-semibold tabular-nums text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </Card>
  );
}

export function LinkBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-medium text-accent hover:text-accent-strong">
      {children}
    </Link>
  );
}
