import Link from "next/link";
import { Logo } from "./Logo";

const nav = [
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#precios", label: "Precios" },
  { href: "/#confianza", label: "Confianza" },
  { href: "/#preguntas", label: "Preguntas" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav aria-label="Principal" className="hidden items-center gap-8 text-sm text-muted md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition-colors hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/registro"
          className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent"
        >
          Empezar
        </Link>
      </div>
    </header>
  );
}
