import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";
import { SignupForm } from "./SignupForm";

export const metadata = { title: "Crear cuenta · La Normativa de Ro" };

export default function RegistroPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink">Crea tu cuenta</h1>
        <p className="mt-3 text-muted">Cuéntanos quién eres y te preparamos el resto.</p>
        <SignupForm />
      </main>
      <Footer />
    </>
  );
}
