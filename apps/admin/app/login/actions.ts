"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, demoPassword, tokenFor } from "@/lib/auth";

export async function login(_: { error?: string } | undefined, formData: FormData) {
  const expected = demoPassword();
  if (expected === null) return { error: "Acceso no configurado. Falta ADMIN_DEMO_PASSWORD en el entorno." };
  const given = String(formData.get("password") ?? "");
  if (given !== expected) return { error: "Contraseña incorrecta." };
  (await cookies()).set(COOKIE, await tokenFor(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin", // la cookie solo viaja al servicio admin, nunca a la web
    maxAge: 60 * 60 * 12,
  });
  redirect("/");
}

export async function logout() {
  (await cookies()).set(COOKIE, "", { path: "/admin", maxAge: 0 });
  redirect("/login");
}
