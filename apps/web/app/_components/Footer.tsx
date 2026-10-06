import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            La IA prepara. Una persona real revisa y presenta. Gestoría digital para autónomos y particulares en España.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink">Servicio</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/#como-funciona" className="hover:text-ink">Cómo funciona</Link></li>
            <li><Link href="/#precios" className="hover:text-ink">Precios</Link></li>
            <li><Link href="/registro" className="hover:text-ink">Crear cuenta</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink">Legal</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/legal/aviso-legal" className="hover:text-ink">Aviso legal</Link></li>
            <li><Link href="/legal/privacidad" className="hover:text-ink">Privacidad</Link></li>
            <li><Link href="/legal/cookies" className="hover:text-ink">Cookies</Link></li>
            <li><Link href="/legal/terminos" className="hover:text-ink">Términos de contratación</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted sm:px-8">
          © {new Date().getFullYear()} La Normativa de Ro. Versión de demostración: los datos que ves son de ejemplo.
        </p>
      </div>
    </footer>
  );
}
