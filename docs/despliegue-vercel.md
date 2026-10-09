# Despliegue en Vercel: un proyecto, dos servicios

El repositorio se despliega como **un único proyecto de Vercel con varios servicios** (ver `vercel.json` en la raíz). Un dominio, una configuración de variables de entorno.

| Servicio | Carpeta | Ruta pública | Qué es |
|---|---|---|---|
| `web` | `apps/web` | `/` (todo lo que no sea `/admin`) | Web pública |
| `admin` | `apps/admin` | `/admin` y `/admin/*` | Plataforma de gestión (demo) |

Los rewrites van de lo más específico a lo menos: `/admin/:path*` → `admin`, y `/(.*)` → `web` al final.
No hay llamadas entre servicios, así que **no hay `bindings`**. Cuando exista el dashboard de cliente (`apps/client`) se añade como tercer servicio, por ejemplo en `/app`.

## Pasos (los hace el dueño de la cuenta de Vercel)
1. Vercel → **Add New → Project** → importa `Replikantzgz/LaNormativaDeRo`.
2. **Root Directory**: la raíz del repo (donde está `vercel.json`). Vercel detecta los servicios.
3. Rama a desplegar: `claude/vibrant-carson-0s9xif` (de momento no existe `main`).
4. **Settings → Environment Variables**: añade `ADMIN_DEMO_PASSWORD` con la contraseña de la demo.
5. Si «Vercel Authentication» está activada, desactívala en **Settings → Deployment Protection** para que la interesada abra el enlace sin cuenta de Vercel.

## Cómo está preparado el código
- `apps/admin/next.config.ts` tiene `basePath: "/admin"`: enlaces, recursos (`/admin/_next/...`) y redirecciones llevan el prefijo.
- `apps/admin/proxy.ts` redirige con `request.nextUrl.clone()` (respeta el `basePath`).
- La cookie de sesión de demo se limita a `path=/admin`: nunca viaja al servicio `web`.

## Comprobado en local
Con las dos apps detrás de una pasarela que imita los rewrites: la web responde en `/`; `/admin` redirige a `/admin/login`; tras entrar se navega por el panel sin ningún enlace sin prefijo ni respuestas de error; salir vuelve a `/admin/login`.
**No** se ha podido probar con `vercel dev` ni desplegar (la red de la sesión bloquea Vercel y la conexión no puede crear proyectos).

## Notas
- Sin `ADMIN_DEMO_PASSWORD` en producción, el panel queda **cerrado** a propósito.
- Todo son datos ficticios; no hay base de datos ni Supabase en esta fase.
- La contraseña de demo NO es la seguridad final: la versión real tendrá cuenta personal + doble factor.
