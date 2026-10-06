import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-soft px-5">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 shadow-[0_24px_60px_-34px_rgba(16,24,40,0.3)]">
        <p className="font-serif text-xl font-semibold text-ink">
          La Normativa <span className="text-accent">de Ro</span>
        </p>
        <h1 className="mt-6 text-lg font-semibold text-ink">Plataforma de gestión</h1>
        <p className="mt-1 text-sm text-muted">Acceso de demostración.</p>
        <LoginForm />
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Versión de demostración con datos ficticios. El acceso real usará cuenta personal y doble factor.
        </p>
      </div>
    </main>
  );
}
