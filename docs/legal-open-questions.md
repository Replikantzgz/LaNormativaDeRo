# Preguntas legales abiertas (para ti y un abogado/asesor)

> Esto NO es asesoramiento legal. Son los puntos que condicionan si se puede abrir a clientes reales.

## L1 — ¿Quién firma y presenta? (BLOQUEANTE antes de clientes reales)
- Situación declarada: el gestor (familiar) **no está colegiado**; presentaría con **apoderamiento + certificado digital propio**, **sin ser colaborador social** de la AEAT.
- Preguntas:
  1. ¿Qué modelos y trámites puede presentar en nombre de un cliente mediante apoderamiento (representación voluntaria) sin colaboración social? ¿Hay límites para presentaciones recurrentes de muchos clientes?
  2. ¿Se puede **cobrar** por ello siendo una actividad de asesoría fiscal / gestión? ¿Hace falta alta en un epígrafe IAE concreto (asesoría fiscal / gestoría administrativa) o colegiación?
  3. ¿«Gestor administrativo» es profesión regulada y colegiada? ¿Está restringido el uso del título «gestor/gestoría»? Si sí, cómo nos denominamos (p. ej. «asesoría fiscal», «servicio de preparación de impuestos»).
  4. ¿Qué cobertura de **seguro de responsabilidad civil profesional** hay que contratar?
  5. ¿El apoderamiento se hace por modelo AEAT en papel o telemáticamente (Registro de apoderamientos) y cómo se custodia la prueba?
- Impacto en producto: el sistema **no presenta**. El gestor presenta manualmente y marca «presentado». Si la respuesta es «no se puede ofrecer así», habría que reformular (p. ej. alianza con un colegiado o gestoría que firme).

## L2 — ¿Quién contrata con el cliente?
- ¿Persona física (autónomo) o **sociedad**? Implica responsabilidad, facturación, IVA del servicio (21 %), obligaciones LSSI, datos de contacto en el aviso legal.
- ¿Quién es el **responsable** y quién el **encargado** del tratamiento (RGPD)? Normalmente el cliente es responsable y La Normativa de Ro (o el gestor) encargado → contrato art. 28.

## L3 — Protección de datos (RGPD + LOPDGDD)
- Base jurídica, registro de actividades, **EIPD** probable (datos fiscales + IA).
- Encargados subsiguientes: Supabase (UE), Vercel, **Google (Gemini)**, correo transaccional, futura pasarela. Transferencias internacionales y cláusulas contractuales.
- Plazo de conservación de documentación fiscal vs. derecho de supresión.
- **Decisiones automatizadas** (art. 22 RGPD): la IA no decide; la decisión final es humana → debe constar en la política y en la UI.
- Transparencia IA (Reglamento europeo de IA): informar de que el chat es IA y de sus límites.

## L4 — Proveedor de IA
- Verificar términos vigentes de Gemini (servicios de pago: no entrenamiento con datos del cliente; EEE/UK/Suiza: términos de pago aplican). Documentar el hallazgo con fecha y enlace.
- Residencia de datos: Gemini API pública vs. Vertex AI UE (decisión pendiente).
- Retención de prompts y archivos en el proveedor.

## L5 — Web y comercio
- Aviso legal, privacidad, **cookies (banner real, sin cargar nada antes del consentimiento)**, términos de contratación, desistimiento (consumidores), contrato de encargado art. 28 → ver `/legal/` (borradores con [CORCHETES], «BORRADORES A REVISAR POR UN ABOGADO»).
- Facturas emitidas por el servicio (Verifactu aplica a quien emite facturas con software): comprobar cómo factura la sociedad/gestor sus propias suscripciones.

## L6 — Publicidad y promesas
- Evitar prometer «IA presenta tus impuestos» o «sin errores». Mensaje legalmente seguro: **«La IA prepara; una persona real revisa y presenta».**
- Revisar términos de «gestoría», «asesor fiscal», «gestor» en publicidad.
