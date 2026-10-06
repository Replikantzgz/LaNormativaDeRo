import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, demoPassword, tokenFor } from "@/lib/auth";
import { DemoStoreProvider } from "@/lib/store";
import { Sidebar } from "./Sidebar";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  // Comprobación en servidor (además del proxy): el panel nunca se renderiza sin sesión de demo.
  const password = demoPassword();
  const token = (await cookies()).get(COOKIE)?.value;
  if (password === null || token !== (await tokenFor(password))) redirect("/login");

  return (
    <DemoStoreProvider>
      <div className="min-h-screen lg:grid lg:grid-cols-[248px_1fr]">
        <Sidebar />
        <div className="min-w-0">
          <div className="border-b border-amber/30 bg-amber-soft px-5 py-2 text-center text-xs text-amber sm:px-8">
            DEMOSTRACIÓN · Datos ficticios · Los cálculos son ilustrativos y no están verificados con la AEAT
          </div>
          <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">{children}</main>
        </div>
      </div>
    </DemoStoreProvider>
  );
}
