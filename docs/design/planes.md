# 1.4 Estructura de planes (propuesta inicial)

> Todo lo de este documento son **datos editables desde el panel admin** (tablas `plans`, `service_catalog`): nombre, precio, qué incluye, límites. Nada se fija en el código. Precios sin IVA (+21 % en factura). Las cifras son de partida; se ajustan contigo.

## Referencias de mercado (ver `docs/research/competencia.md`)
- Gestoría online autónomos: ~49–80 €/mes (Billeo desde ~65 €; Declarando tarifas variables).
- Software de facturación: 8–30 €/mes (no incluye persona que presente).
- Renta: desde ~40 € (Billeo).

## A. Suscripciones mensuales (autónomos)

| | **Autónomo Esencial** | **Autónomo Plus** |
|---|---|---|
| Precio propuesto | **49 €/mes** + IVA | **69 €/mes** + IVA |
| Modelos | 303 y 130 trimestrales | 303 y 130 trimestrales |
| Documentos | hasta ~20 por trimestre | hasta ~100 por trimestre |
| Dashboard en tiempo real, semáforo de plazos | ✔ | ✔ |
| Subida por móvil (PWA con cámara) + OCR/IA | ✔ | ✔ |
| Chat IA (orientación) | ✔ | ✔ |
| Revisión y presentación por el gestor | ✔ | ✔ (prioritaria) |
| Simulador de IRPF | — | ✔ |
| Alertas de deducciones | básicas | avanzadas |
| Renta anual (modelo 100) del titular | pago aparte | **incluida** (cuando el módulo exista) |
| Histórico descargable | ✔ | ✔ |

- Sin permanencia (mensaje de confianza; los competidores lo destacan).
- Exceder el límite de documentos no bloquea: avisa y sugiere pasar a Plus (el gestor decide).
- **Sociedades (SL), 150–180 €/mes:** *lista de espera, Fase 3* (IS, 202, cuentas anuales; el 130 no aplica).

## B. Servicios puntuales (particulares y autónomos)

| Servicio | Precio propuesto | Notas |
|---|---|---|
| **Renta básica** (asalariado, un pagador, sin inmuebles) | 35–60 € | modelo 100; IA prepara, el gestor valida y presenta |
| **Renta Plus** (alquileres, inversiones, autónomo, varias fuentes) | 80–150 € | incluye revisión de deducciones autonómicas |
| **Alta de autónomo** (036/037) | 50–100 € | Fase 3 como servicio puntual |
| **Trámites** (domicilio fiscal, certificados, requerimientos, Cl@ve) | 20–100 € | catálogo editable con checklist de documentos |

## C. Reglas de datos

- `plans.features` (jsonb) lleva: `max_docs_per_quarter`, `models[]`, `chat_ai`, `ai_alerts_level`, `tax_simulator`, `renta_included`, `priority_review`.
- Cambiar el precio de un plan **no altera** suscripciones ya contratadas hasta que el admin lo decida (la suscripción guarda el precio pactado).
- Un plan inactivo sigue visible para quien lo tenga; no se puede contratar nuevo.
- La web pública lee los planes de la BD (no se duplican en el código).

## D. Decisiones pendientes (para 1.6)
1. ¿Pasarela de cobro? Previsto **Redsys**, **aplazado**; en el MVP el cobro es manual y la suscripción es un estado en BD.
2. ¿Periodo de prueba/garantía (p. ej. 15 días de reembolso como Declarando)?
3. ¿Precio anual con descuento (p. ej. 2 meses gratis)?
4. ¿Se cobra la renta del titular aparte en Plus hasta que el módulo exista?
