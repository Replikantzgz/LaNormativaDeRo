import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE, demoPassword, tokenFor } from "@/lib/auth";

// Comprobación optimista. La comprobación real también se repite en el layout del panel.
export async function proxy(request: NextRequest) {
  const password = demoPassword();
  const token = request.cookies.get(COOKIE)?.value;
  const ok = password !== null && token === (await tokenFor(password));
  if (!ok) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};
