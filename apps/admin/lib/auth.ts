// ACCESO DE DEMO (NO es la seguridad final).
// En producción: Supabase Auth + MFA obligatorio (AAL2) + rol admin comprobado en servidor y en RLS.
// Aquí solo hay una contraseña compartida (ADMIN_DEMO_PASSWORD) para que la demo no sea pública.
export const COOKIE = "lnr_admin_demo";

export async function tokenFor(password: string): Promise<string> {
  const data = new TextEncoder().encode(`lnr-demo:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function demoPassword(): string | null {
  const p = process.env.ADMIN_DEMO_PASSWORD;
  if (p) return p;
  // Sin variable: solo se permite en desarrollo local. En producción el acceso queda cerrado.
  return process.env.NODE_ENV === "production" ? null : "demo";
}
