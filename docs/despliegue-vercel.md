# Despliegue de la demo en Vercel (2 proyectos, 5 minutos)

El conector de Vercel de la sesión no tiene permiso para crear proyectos (error 403), así que se hace a mano. Son **dos proyectos independientes** del mismo repositorio:

| Proyecto | Root Directory | Framework | Variables de entorno |
|---|---|---|---|
| `lanormativadero-web` (web pública) | `apps/web` | Next.js | ninguna |
| `lanormativadero-admin` (plataforma de gestión) | `apps/admin` | Next.js | `ADMIN_DEMO_PASSWORD` = contraseña a tu elección |

## Pasos
1. Vercel → **Add New → Project** → importa `Replikantzgz/LaNormativaDeRo`.
2. En **Root Directory** pon `apps/web` (primer proyecto). Despliega.
3. Repite con **Add New → Project** sobre el mismo repo, Root Directory `apps/admin`, y antes de desplegar añade `ADMIN_DEMO_PASSWORD` (Settings → Environment Variables).
4. Rama a desplegar: `claude/vibrant-carson-0s9xif` (de momento no existe `main`). Para producción: Settings → Git → Production Branch.
5. Si Vercel muestra «Vercel Authentication» activada, desactívala en Settings → Deployment Protection para que la interesada pueda abrir el enlace sin cuenta de Vercel (la plataforma de gestión ya tiene su propia contraseña de demo).

## Notas
- Sin `ADMIN_DEMO_PASSWORD` en producción, el panel admin queda **cerrado** a propósito (no hay contraseña por defecto fuera de desarrollo).
- Todo son datos ficticios; no hay base de datos ni Supabase en esta fase.
- La contraseña de demo NO es la seguridad final: en la versión real habrá cuenta personal + doble factor.
