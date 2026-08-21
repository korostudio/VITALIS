import { routes } from "@/lib/routes";

export const pageOrder = [
  "Home",
  "Inversiones",
  "Pasivos laborales",
  "Planes de pensiones",
  "Tecnología",
  "Usuarios",
  "Graficador",
  "Expediente digital",
  "Blog",
  "Nosotros",
  "Contacto",
] as const;

export type PageName = (typeof pageOrder)[number];

export const pageMeta: Record<PageName, { url: string; tabs: string[] }> = {
  Home: {
    url: routes.home,
    tabs: ["Portada", "Cifras", "Servicios", "Rendimientos", "Calculadora", "Cotizador", "Clientes", "Presencia", "Cierre"],
  },
  Inversiones: {
    url: routes.inversiones,
    tabs: ["Portada", "Filosofía", "Ventajas", "Rendimientos", "Estrategias", "Cierre"],
  },
  "Pasivos laborales": {
    url: routes.pasivosLaborales,
    tabs: ["Portada", "Conceptos", "Normas", "Proceso", "Entregables", "Cotizador"],
  },
  "Planes de pensiones": {
    url: routes.planesDePensiones,
    tabs: ["Portada", "Pilares", "Beneficios", "Tipos de plan", "Implementación"],
  },
  Tecnología: {
    url: routes.tecnologia,
    tabs: ["Portada", "Herramientas", "Calculadora", "Expediente", "Cierre"],
  },
  Usuarios: {
    url: routes.usuarios,
    tabs: ["Portada", "Accesos"],
  },
  Graficador: {
    url: routes.graficador,
    tabs: ["Portada", "Series"],
  },
  "Expediente digital": {
    url: routes.expedienteDigital,
    tabs: ["Carpetas", "Permisos"],
  },
  Blog: {
    url: routes.blog,
    tabs: ["Portada", "Suscripción"],
  },
  Nosotros: {
    url: routes.nosotros,
    tabs: ["Portada", "Cifras", "Quiénes somos", "Misión y visión", "Valores", "Presencia"],
  },
  Contacto: {
    url: routes.enConstruccion + "?p=Contacto",
    tabs: ["Portada", "Cierre"],
  },
};

export type PageStatus = "Publicada" | "En construcción";

export const defaultPageStatus: Record<PageName, PageStatus> = {
  Home: "Publicada",
  Inversiones: "Publicada",
  "Pasivos laborales": "Publicada",
  "Planes de pensiones": "Publicada",
  Tecnología: "Publicada",
  Usuarios: "Publicada",
  Graficador: "Publicada",
  "Expediente digital": "Publicada",
  Blog: "Publicada",
  Nosotros: "Publicada",
  Contacto: "En construcción",
};
