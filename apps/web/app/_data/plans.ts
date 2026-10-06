// Datos de ejemplo. En la versión real los planes se leen de la base de datos
// y se editan desde el panel de gestión (nunca viven en el código).
export type Plan = {
  id: string;
  name: string;
  audience: string;
  price: string;
  unit: string;
  highlight?: boolean;
  features: string[];
};

export const subscriptionPlans: Plan[] = [
  {
    id: "autonomo-esencial",
    name: "Autónomo Esencial",
    audience: "Para empezar con tranquilidad",
    price: "49 €",
    unit: "/mes + IVA",
    features: [
      "IVA e IRPF trimestrales preparados y presentados",
      "Tus números al día en tu panel",
      "Sube tickets y facturas desde el móvil",
      "Asistente de IA para tus dudas",
      "Revisión y firma de una persona real",
    ],
  },
  {
    id: "autonomo-plus",
    name: "Autónomo Plus",
    audience: "Para quien factura más",
    price: "69 €",
    unit: "/mes + IVA",
    highlight: true,
    features: [
      "Todo lo de Esencial, con más documentos",
      "Simulador de IRPF en tiempo real",
      "Alertas de deducciones que no estás aprovechando",
      "Revisión prioritaria",
      "Tu Renta anual incluida",
    ],
  },
];

export const oneOffServices = [
  { name: "Renta básica", detail: "Asalariados, un pagador, sin inmuebles", price: "desde 35 €" },
  { name: "Renta completa", detail: "Alquileres, inversiones, autónomos, varias fuentes", price: "desde 80 €" },
  { name: "Trámites con Hacienda", detail: "Domicilio fiscal, certificados, requerimientos…", price: "desde 20 €" },
];
