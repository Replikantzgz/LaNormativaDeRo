"use client";

import { useState } from "react";

const field =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent";

export function SignupForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="mt-10 rounded-2xl border border-accent/30 bg-accent-soft p-8">
        <h2 className="font-serif text-xl font-semibold text-accent-strong">Esto es una demostración</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          En la versión real recibirías un email de confirmación y pasarías al cuestionario fiscal. De momento no se
          guarda ningún dato.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-10 space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <fieldset>
        <legend className="text-sm font-medium text-ink">¿Qué necesitas?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            { v: "autonomo", t: "Soy autónomo", d: "IVA e IRPF trimestrales" },
            { v: "particular", t: "Soy particular", d: "Renta y trámites" },
          ].map((o, i) => (
            <label
              key={o.v}
              className="flex cursor-pointer gap-3 rounded-xl border border-line p-4 transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent-soft"
            >
              <input type="radio" name="tipo" value={o.v} defaultChecked={i === 0} className="mt-1 accent-accent" />
              <span>
                <span className="block text-sm font-medium text-ink">{o.t}</span>
                <span className="block text-xs text-muted">{o.d}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block text-sm font-medium text-ink">
        Nombre
        <input required name="nombre" autoComplete="name" className={field} placeholder="Tu nombre y apellidos" />
      </label>
      <label className="block text-sm font-medium text-ink">
        Email
        <input required type="email" name="email" autoComplete="email" className={field} placeholder="tu@email.com" />
      </label>
      <label className="flex gap-3 text-xs leading-relaxed text-muted">
        <input required type="checkbox" className="mt-0.5 accent-accent" />
        <span>Acepto la política de privacidad y los términos de contratación (borradores).</span>
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent"
      >
        Crear cuenta
      </button>
    </form>
  );
}
