import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-baseline gap-2 ${className}`} aria-label="La Normativa de Ro, inicio">
      <span className="font-serif text-xl font-semibold tracking-tight text-ink">
        La Normativa <span className="text-accent">de Ro</span>
      </span>
    </Link>
  );
}
