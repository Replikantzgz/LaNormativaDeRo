# 1.2 Modelos fiscales del MVP y plazos

> Fecha: 2026-10-06 (hoy). **Estado de verificación: NO verificado contra fuentes oficiales.**
> Desde el entorno de investigación estaban bloqueados `sede.agenciatributaria.gob.es`, `boe.es` y `ai.google.dev`. Todo lo de abajo procede de buscadores y blogs fiscales (Quipu, Billeo, Holded, gestoria247, etc.) y de fragmentos de las instrucciones oficiales de la AEAT que devolvió el buscador.
> **Nada de esto puede entrar en código ni en la web sin pasar el checklist del final.**

## 1. Alcance fiscal del MVP

| Perfil | Modelos en el MVP | Fuera del MVP (anotado) |
|---|---|---|
| Autónomo (IRPF, estimación directa, IVA régimen general) | **303** (IVA trimestral), **130** (pago fraccionado IRPF) | 131 (módulos), 390, 190, 111/115, 347, 349, recargo de equivalencia, prorrata, intracomunitario, criterio de caja, REDEME, IGIC/Canarias/Ceuta/Melilla |
| Particular | **100** (Renta) y trámites (catálogo editable) | Impuesto sobre el Patrimonio, 720, ISD, plusvalías específicas complejas |
| Sociedad (SL) | — (lista de espera) | IS, 200, 202, cuentas anuales, 111/115 |

## 2. Plazos de presentación (a verificar)

**Modelos trimestrales (303, 130):** del día 1 al 20 del mes siguiente al cierre del trimestre.

| Trimestre | Periodo | Plazo (2026) | Domiciliación |
|---|---|---|---|
| 1T | ene–mar | 1–20 abril | hasta ~15 abril |
| 2T | abr–jun | 1–20 julio | hasta ~15 julio |
| 3T | jul–sep | **1–20 octubre 2026** | hasta ~15 octubre |
| 4T | oct–dic | 1–**30 enero 2027** (4T ampliado en 303/130/131/349) | hasta ~25 enero |

> **Dato operativo:** hoy es 2026-10-06 → el 3T 2026 vence el 20 de octubre.

**Renta (modelo 100):** campaña anual típicamente de **abril a 30 de junio** (con domiciliación más corta). *Fechas oficiales de la campaña 2026 (ejercicio 2025) y de la siguiente (abril 2027): pendiente de verificar.*

## 3. Fórmulas del MVP (a validar contra instrucciones AEAT)

### Modelo 130 (estimación directa)
Pago fraccionado = 20 % × rendimiento neto acumulado del año hasta el fin del trimestre
 − pagos fraccionados de trimestres anteriores del mismo año
 − retenciones e ingresos a cuenta soportados acumulados.
(+ posibles minoraciones específicas, p. ej. deducción por rendimientos bajos / vivienda habitual: **comprobar en instrucciones vigentes**.)
Rendimiento neto = ingresos computables − gastos fiscalmente deducibles (acumulado desde el 1 de enero).
Si el resultado es negativo no hay ingreso; se arrastra por la regla del propio modelo.

### Modelo 303 (régimen general)
- **IVA devengado** por tipo (4 %, 10 %, 21 %, y operaciones a 0 %): casillas ~01–09 y 150–152.
- **IVA soportado deducible**: casillas ~28–39 (bienes corrientes e inversión, interiores/importaciones).
- Resultado de la autoliquidación (casilla 71 según los fragmentos consultados: `71 = 69 − 70 + 109`, donde 69 es resultado de liquidación previo y 70 cuotas a compensar de periodos anteriores).
- Casos que deben desviarse a revisión manual del gestor: prorrata, regularización de inversión, operaciones intracomunitarias, inversión del sujeto pasivo, criterio de caja, recargo de equivalencia, rectificativas.

### Verifactu (contexto)
RDL 15/2025 (BOE 3 dic 2025) retrasa la obligación a **1-ene-2027** (contribuyentes del IS) y **1-jul-2027** (resto, incl. autónomos IRPF). El MVP **no emite facturas**; relevante para Fase 3 (emisión de facturas).

## 4. Principios del motor de cálculo

1. **Determinista y testeable.** El LLM solo extrae y clasifica documentos (importe, fecha, NIF, tipo de IVA, categoría, confianza). La aritmética fiscal la hace código con tests.
2. **Versionado.** Cada cálculo guarda `engine_version`, `inputs_snapshot` y la fecha de las reglas aplicadas.
3. **Reglas como datos** (tipos de IVA, porcentaje del 130, fechas límite) en tablas versionadas por año, para no depender de un redeploy cuando cambie la norma.
4. **Todo cálculo es un borrador** hasta que el gestor lo valida (regla 2).

## 5. Particulares: renta y trámites — necesidades

- Fuente primaria de datos: **datos fiscales / borrador de la AEAT** (acceso por Cl@ve o certificado del cliente, o del gestor vía apoderamiento).
- Documentación que aporta el cliente: justificantes de deducciones (alquiler, donativos, planes de pensiones, guardería, hijos, vivienda, gastos autonómicos), rentas de capital/inmuebles, información de actividad económica si también es autónomo.
- Trámites iniciales propuestos (catálogo editable): alta de autónomo (036/037), cambio de domicilio fiscal, certificados de estar al corriente, respuesta a requerimientos, alta Cl@ve. *Definir con el gestor cuáles puede presentar con apoderamiento.*

## 6. Quién puede presentar (resumen para el módulo legal)

- Respuesta del usuario: el gestor **no está colegiado**; presentaría con **apoderamiento + certificado digital propio**.
- Fragmentos consultados indican que la **colaboración social** (presentar masivamente declaraciones de terceros) exige pertenecer a un colegio/asociación con convenio con la AEAT; el **apoderamiento** voluntario (Registro de apoderamientos) es la vía individual por cliente.
- **Implicación:** el sistema no se conecta a la AEAT en el MVP; el gestor presenta manualmente en la sede con su certificado y luego marca «presentado». Qué modelos/trámites cubre exactamente cada apoderamiento y si hay límites por no estar colegiado → **pregunta legal abierta** (ver `docs/legal-open-questions.md`).

## 7. Checklist de reverificación (bloqueante antes de Fase 2)

Marcar con fuente oficial y fecha de consulta.

- [ ] Calendario del contribuyente 2026 y 2027 (AEAT): fechas exactas 303, 130, 100 y domiciliación.
- [ ] Instrucciones modelo 303 vigentes (casillas, fórmula del resultado, regímenes que obligan a revisión manual).
- [ ] Instrucciones modelo 130 vigentes (porcentaje, deducciones, tratamiento de negativos, 4T).
- [ ] Campaña de Renta: fechas, tramos y deducciones estatales vigentes; deducciones autonómicas de las CCAA donde estén los primeros clientes.
- [ ] Obligación de presentar la declaración de la Renta y umbrales.
- [ ] Tipos de IVA aplicables (4/10/21 %, 0 %), excepciones temporales vigentes.
- [ ] Verifactu: fechas finales y alcance (confirmar RDL 15/2025 en BOE).
- [ ] Apoderamiento: trámites habilitados a un representante no colegiado (sede AEAT, Orden HAC y normativa de representación).
- [ ] Términos vigentes de la Gemini API (servicios de pago, uso de datos, retención) en ai.google.dev/gemini-api/terms.
- [ ] Modelo de Gemini elegido y su fecha de deprecación (2.5 Flash anunciado para deprecación el 2026-10-16).
- [ ] Contrastar `jaimebs2/OpenSpain` y `alexdcd/Mafia-Claude-Skills` (solo referencia; no se instalan).

**Cómo desbloquear:** el usuario habilita esos dominios en la red del entorno o aporta los PDFs oficiales (instrucciones 303, 130, calendario, campaña de Renta).

## Fuentes consultadas (secundarias)
- Calendario fiscal 2026: getquipu.com/blog/calendario-fiscal · gestoria247.com/blog/calendario-fiscal-autonomo-2026 · conversoriaecnae.es/calendario-fiscal
- Modelo 130: invoo.es, gestoria247.com, billeo.es/modelos/modelo-130, guiafiscal.es
- Modelo 303 (fragmentos AEAT): sede.agenciatributaria.gob.es/…/modelo-303-iva-autoliquidacion_/instrucciones-2026
- Verifactu: legaltoday.com, billin.net, guiafiscal.es
- Colaboración social: sede.agenciatributaria.gob.es (presentación de declaraciones por colaboradores sociales)
