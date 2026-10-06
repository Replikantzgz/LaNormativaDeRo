"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-6 space-y-4">
      <label className="block text-sm font-medium text-ink">
        Contraseña
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </label>
      {state?.error && <p role="alert" className="text-sm text-red">{state.error}</p>}
      <button
        disabled={pending}
        className="w-full rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
