# 1.3 Modelo de datos, roles y permisos

> Diseño conceptual (sin SQL todavía). Se traducirá a migraciones de Supabase en la Fase 2 (hito H0/H2), con tests de aislamiento como criterio de salida.

## 1. Roles

| Rol | Quién | Qué puede |
|---|---|---|
| `client` | Cliente (particular o autónomo) | Ver/editar **solo sus** datos y documentos; subir documentos; ver sus cálculos y descargar **solo lo validado**; usar el chat IA |
| `admin` | El gestor (1 persona en el MVP) | Todo el panel admin; validar y marcar presentado; ver cualquier cliente. **MFA (TOTP) obligatorio (AAL2)** |
| `assistant` (reservado) | Ayudante futuro | Preparar y revisar, **sin** poder validar ni presentar. No se implementa en el MVP, pero el modelo lo admite |

- El rol vive en `profiles.role`. Se comprueba **en servidor** (middleware/route handlers) **y en la base de datos** (RLS) mediante una función `is_admin()` (`security definer`, `search_path` fijado).
- El área de cliente y el panel admin son **rutas/layouts separados** (`/app/*` y `/admin/*`, idealmente subdominio `admin.`). Un `client` que pida `/admin/*` recibe **403**. El panel admin exige sesión AAL2.

## 2. Entidades

### Identidad y perfil
- `profiles` (id = auth.uid, role, email, nombre, teléfono, estado de cuenta, creado)
- `fiscal_profiles` (client_id, **tipo**: `particular` | `autonomo` | `sociedad`(lista de espera), NIF/NIE cifrado, régimen IVA, actividad/CNAE, empleados, fecha de alta en actividad, CCAA de residencia fiscal, método de presentación/apoderamiento: estado)
- `legal_consents` (client_id, documento, versión, fecha, IP/UA) — aceptación de términos, privacidad, encargado de tratamiento

### Planes y servicios (editables desde el admin)
- `plans` (nombre, descripción, precio, periodicidad, `features jsonb`, perfil objetivo, activo, orden)
- `subscriptions` (client_id, plan_id, estado, desde/hasta, `payment_provider` nullable) — la pasarela (Redsys previsto) queda **pendiente**; en el MVP el cobro es manual
- `service_catalog` (nombre, tipo: renta/trámite, precio, checklist de documentos `jsonb`, activo) y `service_requests` (client_id, servicio, estado, notas)

### Documentos e IA
- `documents` (client_id, tipo [factura emitida/recibida, ticket, nómina, justificante, otro], storage_path, mime, hash SHA-256, subido por, estado: `uploaded|processing|extracted|needs_review|confirmed|rejected`, fecha subida)
- `extracted_items` (document_id, fecha, base, tipo IVA, cuota, retención, total, emisor/receptor + NIF, **categoría**, `deductible_guess`, **confianza**, `confirmed_by`, origen: `ai|user|admin`)
- `expense_categories` (código, nombre, deducible por defecto, notas fiscales)
- `ai_alerts` (client_id, tipo: «deducción posible sin categorizar», «dato dudoso», …, referencia, estado)
- `chat_threads` / `chat_messages` (client_id, role, contenido, fecha) — **solo orientación**; el chat no tiene permiso de escritura sobre números

### Impuestos y estados
- `tax_periods` (client_id, año, trimestre, modelo `303|130|100`, plazo límite)
- `tax_filings` (period_id, **status**, `inputs_snapshot jsonb`, `result jsonb`, `engine_version`, `calculated_at`, `validated_by/at`, `presented_by/at`, notas del gestor)
- `generated_documents` (filing_id, tipo, storage_path, **`released boolean`** — solo true tras `validated`)
- `renta_filings` (mismo patrón que `tax_filings`, con datos fiscales AEAT, deducciones, resultado, borrador)
- `deadlines` (client_id/modelo, fecha límite, estado → semáforo rojo/ámbar/verde)

### Auditoría y operación
- `filing_events` (**append-only**): `id, filing_id, actor_id, actor_role, from_status, to_status, motivo, timestamp, ip`
- `access_log` (actor, recurso, acción: `view|download|sign_url`, timestamp, ip)
- `notifications` / `email_templates` (plantillas editables por el admin) / `email_outbox`
- `admin_notes` (solo admin; invisibles para el cliente)
- `crm_events` (cambios de estado de cliente/plan)

## 3. Máquina de estados

```
documents_received ──► ai_calculated ──► pending_review ──► validated ──► presented
                                              │                │
                                              └──► changes_requested ◄──┘ (vuelve a documents_received / ai_calculated)
```
- Transiciones **solo vía función SQL/RPC** (`transition_filing(filing_id, to_status, reason)`), que comprueba rol, MFA y transición permitida, y escribe en `filing_events` en la misma transacción.
- `documents_received → ai_calculated`: proceso del motor (servicio, no usuario).
- `ai_calculated → pending_review`: automático si pasa las comprobaciones; si hay datos dudosos queda marcado y aparece en «alertas».
- `pending_review → validated` y `validated → presented`: **solo `admin` con AAL2**.
- La IA **nunca** puede ejecutar `validated` ni `presented`. Hay un test que lo garantiza.
- Los estados de `renta_filings` y `service_requests` siguen el mismo patrón.

## 4. Seguridad por fila (RLS)

Regla general: **RLS activado en TODAS las tablas**; sin política = sin acceso.

| Tabla | Cliente | Admin |
|---|---|---|
| `profiles`, `fiscal_profiles` | SELECT/UPDATE de la fila propia (`id = auth.uid()`; el cliente **no** puede cambiar su `role`) | SELECT/UPDATE todo |
| `documents`, `extracted_items` | CRUD propio (`client_id = auth.uid()`), sin borrar si ya está en un filing validado | Todo |
| `tax_filings`, `renta_filings` | SELECT propio; **sin** INSERT/UPDATE directo (solo RPC) | Todo vía RPC |
| `generated_documents` | SELECT solo si `released = true` y propio | Todo |
| `filing_events`, `access_log` | SELECT propio (eventos de sus filings) | SELECT todo; **INSERT solo por funciones**; `UPDATE/DELETE` revocados (append-only) |
| `plans`, `service_catalog` | SELECT de los activos | CRUD |
| `admin_notes` | Sin acceso | Todo |
| `chat_*` | CRUD propio | SELECT |

**Storage:**
- Buckets **privados** (`documents`, `generated`); rutas `{client_id}/{año}/{uuid}`.
- El cliente sube a su carpeta; no hay URL pública. Las descargas se hacen con **URLs firmadas de vida corta (60 s)** emitidas por servidor tras comprobar rol, propiedad y, para `generated`, `released = true`.
- Cifrado en reposo (AES-256 del proveedor) + opción de cifrado a nivel de aplicación para NIF/NIE y datos sensibles en columnas (pgcrypto/Vault).
- Cada firma de URL escribe en `access_log`.

## 5. Criterios de salida (Fase 2, H0/H12)

1. Test: cliente A no puede leer filas ni archivos de cliente B (todas las tablas y buckets).
2. Test: cliente → `/admin/*` = **403**; cliente no puede escalar su `role`.
3. Test: ningún `generated_document` es descargable antes de `validated`.
4. Test: la IA/servicio no puede llegar a `validated` ni `presented`.
5. Test: `filing_events` no admite UPDATE/DELETE.
6. Admin sin MFA (AAL1) no puede acceder al panel ni validar.

## 6. Preguntas que afectan al modelo (resolver en 1.6)
- ¿Un mismo usuario puede ser particular **y** autónomo (una cuenta, dos perfiles fiscales)? Propuesta: sí, un `fiscal_profile` por rol fiscal.
- Retención de documentos: ¿cuántos años y cómo se gestiona la baja del cliente (RGPD: supresión vs. obligación de conservación de documentación fiscal)?
- ¿El gestor accede a datos AEAT del cliente con su propio certificado (fuera de la plataforma) y sube el borrador, o se almacena algo de esa sesión? Propuesta: **nunca guardar certificados ni credenciales** del gestor ni de los clientes en la plataforma.
