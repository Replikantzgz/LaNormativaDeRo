# La Normativa de Ro — PLAN

> Gestoría digital con IA + **persona real que revisa y firma**. Autónomos y particulares (España).
> Marca: **La Normativa de Ro**.

## Reglas innegociables
1. **Cero código hasta que el producto esté 100% definido y aprobado.** Primero investigación, definición y preguntas.
2. **La IA calcula y prepara; NUNCA presenta** ante Hacienda ni Seguridad Social. Todo documento final pasa por validación humana del gestor antes de poder descargarse o presentarse.

## Cómo retomar
Marca `[x]` y haz commit tras cada punto. Si se corta la sesión, retomar por el primer punto sin marcar.

## Documentos de la Fase 1
| Doc | Contenido |
|---|---|
| `docs/research/competencia.md` | 1.1 Billeo, Declarando, Quipu, Holded |
| `docs/research/fiscal.md` | 1.2 Modelos 303/130/100, plazos, **checklist de reverificación (bloqueante)** |
| `docs/design/datos-y-permisos.md` | 1.3 Entidades, roles, RLS, estados, criterios de seguridad |
| `docs/design/planes.md` | 1.4 Planes y servicios (datos editables) |
| `docs/design/direccion-visual.md` | Fondo blanco, elegante, claro, simple; **esperar captura de referencia** |
| `docs/legal-open-questions.md` | Preguntas legales abiertas (quién firma y presenta, RGPD, IA…) |

---

## FASE 1 — DEFINICIÓN (sin código)
- [x] 1.1 Competencia → `docs/research/competencia.md`
- [x] 1.2 Modelos fiscales y plazos + checklist de reverificación → `docs/research/fiscal.md`
- [x] 1.3 Modelo de datos, roles y permisos → `docs/design/datos-y-permisos.md`
- [x] 1.4 Estructura de planes → `docs/design/planes.md`
- [x] 1.5 Plan técnico completo en este `PLAN.md`
- [x] 1.6 PARAR: presentado y preguntas respondidas por el usuario (ver «Decisiones ronda 2»). Aprobado construir la **demo de web + panel admin**.

## DECISIONES RONDA 2 (usuario)
- **Renta: SÍ en el MVP.** MVP primero.
- **Web primero. PWA más adelante, solo cuando el usuario la pida** (tarea marcada después de Redsys). Se puede darle «forma» (maqueta/artefacto) pero no construirla ahora.
- **IA: Gemini de pago** (se creará cuenta y recarga). Aún no se integra.
- **Supabase y Vercel: proyectos NUEVOS.** Supabase solo permite 2 proyectos en la cuenta actual → **no se usa Supabase en esta fase**: todo con datos de ejemplo (mock) para no gastar proyectos. Vercel: un proyecto por app.
- **Pasarela: Redsys, aplazado.**
- **Urgente: enseñar a «la interesada» dos cosas:** (1) **web pública**, (2) **plataforma de gestión (dashboard admin)**.
- **Dashboard de cliente y panel admin son aplicaciones DISTINTAS**, construidas por separado (otra app, otra ruta de despliegue, otro código). Ahora se construyen web y admin; el cliente después.
- Diseño: fondo blanco, elegante, claro, sin complicaciones (el usuario subirá captura si hace falta).

## FASE 2A — DEMO PARA ENSEÑAR (en curso; datos de ejemplo, sin backend)
Estructura del repo: `apps/web` (web pública), `apps/admin` (panel de gestión), `apps/client` (dashboard cliente, después). Cada una es una app Next.js independiente, desplegable como proyecto Vercel propio.
- [x] A1 `apps/web`: web pública (hero, problema/solución, cómo funciona, precios, confianza, CTA, legal placeholder)
- [x] A2 `apps/admin`: panel de gestión con datos de ejemplo (CRM, cola de revisión, flujo de estados, plazos, planes editables, métricas, plantillas)
- [x] A3 Pruebas locales (build, lint, navegación) y capturas
- [ ] A4 Despliegue en Vercel como UN proyecto con servicios (`vercel.json`: web en `/`, admin en `/admin`). Configurado y probado en local; falta que el dueño cree el proyecto (el conector no puede). Ver `docs/despliegue-vercel.md`
- [x] A5 Acceso del admin en demo: contraseña de demo simple (sin datos reales); NO es la seguridad final

## FASE 2B — Después de la demo (orden provisional)
1. `apps/client` (dashboard cliente, separado) 2. Backend real (Supabase en cuenta/proyecto nuevo, RLS, auth, MFA) 3. Motor 303/130/Renta 4. OCR/IA Gemini 5. Legal `/legal/` 6. Endurecimiento.

## TAREAS APLAZADAS (se hacen cuando el usuario lo pida)
- [ ] T1 Pasarela de pago **Redsys**
- [ ] T2 **PWA** (instalable, cámara, cola offline) — después de Redsys o cuando el usuario lo solicite; mientras tanto solo maqueta/artefacto si se pide

## ESTADO ACTUAL — EN PAUSA (decisión del usuario)
La demo (web + panel admin) está desplegada en https://lanormativadero.vercel.app (`/` y `/admin`) y ya se ha enseñado.
**No se construye nada más hasta que la clienta entregue TODA su información**: diseño propio, logo, estructura de la web e instrucciones. Entonces se siguen **al pie de la letra** (sin reinterpretar) y se rehace la web/panel con su diseño.
Después, integraciones (en este orden): backend real (Supabase en cuenta nueva), motor fiscal verificado, IA (Gemini).
Cuentas que creará el usuario a nombre de la clienta (ella las gestiona y paga): Gmail, Gemini API de pago con su tarjeta de recarga, y su Supabase/Vercel cuando toque.
**Antes de abrir a clientes reales:** verificar cifras fiscales en fuentes oficiales y resolver `docs/legal-open-questions.md` (sobre todo L1: quién puede presentar con apoderamiento sin colegiación).
Al retomar: leer este bloque, la web y el panel actuales son solo una maqueta de la estructura, no el diseño final.

---

## PRODUCTO

**Clientes:** particulares (Renta y trámites) y autónomos (303 + 130, IRPF/IVA). Sociedades → lista de espera.
**Promesa:** «Sube tus facturas con el móvil. La IA prepara tus impuestos y una persona real los revisa y presenta.»
**Superficies:**
1. **Web pública** que vende el servicio: hero, problema/solución, cómo funciona, precios (leídos de BD), confianza (RGPD, persona real), CTA de registro repetido. Móvil primero.
2. **Registro y onboarding:** email de confirmación + cuestionario fiscal (particular/autónomo, régimen IVA, actividad, empleados, fecha de alta).
3. **Área de cliente (PWA instalable, cámara):** dashboard (ingresos, gastos, IVA e IRPF estimados al momento), semáforo de plazos, carga de documentos (foto desde el móvil), chat IA (solo orientación), histórico descargable, datos y configuración, notificaciones por email.
4. **Panel admin (ruta/sistema separado, solo `admin`, MFA, 403 al cliente):** CRM, entrar en el área de cualquier cliente, cola «pendientes de revisión», alertas de documentación incompleta, descarga de lo validado, métricas (clientes activos, ingresos recurrentes), plantillas de comunicación, **planes y servicios editables**.
5. **Flujo de estados** con auditoría: `documents_received → ai_calculated → pending_review → validated → presented`.
6. **Motor IA:** OCR + clasificación de facturas/gastos, cálculo determinista de 303 y 130, alertas de deducciones, simulador IRPF en tiempo real, Renta (modelo 100) para particulares.

### Diseño visual
Fondo blanco, elegante, claro, sin complicaciones. Móvil primero. **El usuario subirá una captura de referencia; se espera antes de diseñar la web (H1).** `ui-ux-pro-max` y `frontend-design` no están disponibles; no se instala nada sin permiso.

## ARQUITECTURA

```
 Navegador / PWA (Next.js, App Router, TS, Tailwind)
        │  Server Components + Route Handlers (control de acceso en servidor)
        ▼
 Next.js en Vercel ──► Supabase (UE): Auth (+MFA), Postgres (RLS), Storage privado, RPC/funciones
        │                       ▲
        └──► Servicios de IA ───┘  (Gemini: solo extracción/clasificación/chat; modelo configurable por env)
```

- **Rutas:** `/` pública · `/precios` · `/registro` · `/app/*` cliente · `/admin/*` (idealmente `admin.<dominio>`), con middleware que verifica rol y AAL2 y devuelve 403.
- **Motor fiscal:** paquete TypeScript puro (`packages/tax-engine`), **sin I/O**, con tests; reglas versionadas por año en datos. `engine_version` y `inputs_snapshot` guardados en cada cálculo.
- **IA:** el LLM devuelve JSON validado con esquema (Zod) + confianza; lo dudoso va a revisión. Nunca hace aritmética ni cambia estados. Chat sin herramientas de escritura.
- **Estados:** solo vía RPC SQL con comprobación de rol/MFA y escritura atómica en `filing_events`.
- **Documentos:** buckets privados, URL firmada de 60 s emitida por servidor tras comprobar rol, propiedad y `released`.
- **Emails:** proveedor transaccional (a decidir), plantillas editables.
- **Pagos:** abstracción `PaymentProvider`; **sin integración en MVP** (Redsys previsto, aplazado). Suscripción = estado en BD.
- **PWA:** manifest, service worker, cámara (`<input capture>` / MediaDevices), cola offline de subidas.
- **Observabilidad:** logs de auditoría en BD; errores sin datos personales.

## SEGURIDAD
Aislamiento total entre clientes (RLS en todas las tablas), cifrado en reposo y TLS, cifrado de NIF/NIE, MFA admin, registro de accesos, auditoría append-only, rate limiting, validación con Zod en el borde, cabeceras de seguridad/CSP, secretos solo en variables de entorno, **nunca guardar certificados ni credenciales AEAT**. Proveedor de IA: tier de pago sin entrenamiento; verificar términos y documentar (ver `docs/legal-open-questions.md` L4). Detalle y tests: `docs/design/datos-y-permisos.md` §4–5.

## LEGAL (`/legal/`, en Fase 2)
Borradores marcados **«BORRADOR A REVISAR POR UN ABOGADO»** con campos `[CORCHETES]`: aviso legal, política de privacidad (RGPD + LOPDGDD), política de cookies + **banner real**, términos de contratación, **contrato de encargado de tratamiento (art. 28)**. Pregunta abierta para el usuario: estructura legal del negocio (quién firma y presenta) → `docs/legal-open-questions.md`.

## FASE 2 — CONSTRUCCIÓN (solo tras aprobación explícita)
Cada hito es demostrable, con tests, y se commitea al cerrar.
- [ ] H0 Andamiaje (Next.js + TS + lint/test + CI), proyecto Supabase UE, migraciones, **RLS + tests de aislamiento**
- [ ] H1 Web pública (fondo blanco, según captura de referencia), precios leídos de BD
- [ ] H2 Registro, confirmación por email, onboarding fiscal (particular/autónomo)
- [ ] H3 PWA: subida de documentos con cámara + dashboard (datos de ejemplo)
- [ ] H4 Motor 303/130 determinista + tests con casos resueltos a mano
- [ ] H5 OCR/clasificación con Gemini (JSON validado, confianza, revisión del usuario)
- [ ] H6 Panel admin: CRM, entrar en cliente, cola de revisión, alertas, estados + auditoría, **planes/servicios editables**, plantillas
- [ ] H7 Semáforo de plazos + emails (faltan documentos / plazo cercano)
- [ ] H8 Chat IA (solo orientación)
- [ ] H9 Simulador IRPF en tiempo real
- [ ] H10 Renta (modelo 100) para particulares + catálogo de trámites (antes de abril 2027)
- [ ] H11 `/legal/` borradores + cookies con banner real
- [ ] H12 Endurecimiento + checklist previo a clientes reales (pruebas de seguridad, accesibilidad, rendimiento)

**Criterios de salida generales:** todos los tests de `datos-y-permisos.md §5` en verde; motor 303/130 contrastado con casos reales verificados por el gestor; ningún documento generado descargable antes de `validated`; checklist de reverificación fiscal completo.

## FASE 3 — Anotado, NO se construye ahora
Captura de facturas por WhatsApp · email de entrada · nóminas de empleados · simulador avanzado · alta de autónomo como servicio puntual · sociedades (IS, 200, 202, cuentas anuales) · pasarela de pago (Redsys previsto) · modelos 131/390/190/347/349 · emisión de facturas con Verifactu · app nativa si la PWA se queda corta.

## RIESGOS
| # | Riesgo | Mitigación |
|---|---|---|
| R1 | **Legal:** presentar por terceros con apoderamiento sin colegiación/colaboración social | `docs/legal-open-questions.md` L1; consulta a asesor **antes** de clientes reales; el sistema no presenta |
| R2 | Cifras fiscales sin verificar en origen | Checklist de reverificación (`fiscal.md §7`); bloqueante de Fase 2 |
| R3 | Error de OCR/clasificación | Confianza, confirmación del usuario, revisión del gestor, motor determinista |
| R4 | Fuga entre clientes | RLS + tests de aislamiento + URLs firmadas |
| R5 | Modelo de IA deprecado (Gemini 2.5 Flash, 16-oct-2026) | Modelo por variable de entorno, verificación antes de H5 |
| R6 | Residencia de datos del proveedor de IA | Decisión Gemini API vs Vertex AI UE (pregunta abierta) |
| R7 | Campaña de Renta (abril 2027) llega antes que H10 | Hito con fecha límite blanda; priorizar si se confirma Renta en MVP |

## PREGUNTAS PENDIENTES PARA 1.6
1. **Captura de diseño:** ¿puedes subir la captura del estilo que quieres? (esperamos antes de H1).
2. **Renta en el MVP:** ¿entra en el MVP o justo después, antes de abril 2027? ¿Qué trámites concretos en el catálogo inicial?
3. **Orden de hitos:** ¿ver pronto web + PWA con dashboard de ejemplo (H1, H3) antes del motor IA?
4. **IA:** ¿Gemini API de pago o Vertex AI en región UE?
5. **Datos del negocio:** dominio, nombre legal, quién contrata, datos para `/legal/`.
6. **Supabase/Vercel:** ¿creo proyectos nuevos o usas existentes? Región UE (Irlanda/Frankfurt). No se toca nada sin tu OK.
7. **Acceso a fuentes oficiales:** habilitar dominios AEAT/BOE/Google o aportar PDFs (instrucciones 303, 130, calendario, campaña de Renta, términos de Gemini).
8. **Legal:** respuestas a `docs/legal-open-questions.md` (sobre todo L1 y L2), idealmente con un asesor.
9. **Planes:** validar precios, prueba/garantía, descuento anual (`planes.md §D`).
10. **Skills de diseño:** ¿instalo alguna? (no sin tu permiso).
11. **Particular y autónomo a la vez:** ¿una cuenta con dos perfiles fiscales? Retención de documentos y baja (RGPD).
12. **Pasarela de pago:** Redsys previsto; se decide después de ver el producto.
