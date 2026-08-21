export type BlogPostStatus = "Publicada" | "Borrador";

export interface BlogPost {
  titulo: string;
  slug: string;
  extracto: string;
  cuerpo: string;
  autor: string;
  lectura: string;
  cat: string;
  estado: BlogPostStatus;
  destacado: boolean;
  fecha: string;
}

export const blogCategories = ["Actuaría", "Pensiones", "Inversiones", "Prensa"];

function slugify(titulo: string) {
  return (
    "/blog/" +
    titulo
      .toLowerCase()
      .replace(/[^a-z0-9áéíóúñ ]/g, "")
      .replace(/ +/g, "-")
      .slice(0, 40)
  );
}

function post(
  titulo: string,
  cat: string,
  fecha: string,
  autor: string,
  lectura: string,
  extracto: string,
  destacado = false,
): BlogPost {
  return {
    titulo,
    slug: slugify(titulo),
    extracto,
    cuerpo: `${extracto}\n\nAmpliamos el análisis con los datos que maneja nuestro equipo actuarial y de inversión, y lo que implica para tu comité en los próximos trimestres.`,
    autor,
    lectura,
    cat,
    estado: "Publicada",
    destacado,
    fecha,
  };
}

export const defaultBlogPosts: BlogPost[] = [
  post(
    "Qué cambia en la NIF D-3 para el cierre 2026",
    "Actuaría",
    "12 ago 2026",
    "Alejandra Lozano",
    "6 min",
    "Las remediciones y el tratamiento de la tasa de descuento cambian el costo neto que reconocerás este ejercicio. Qué revisar antes de septiembre.",
    true,
  ),
  post(
    "Tasa de reemplazo: por qué el 30% no alcanza",
    "Pensiones",
    "28 jul 2026",
    "Mauricio Cervantes",
    "5 min",
    "La seguridad social rara vez sostiene el nivel de vida del último salario. Cómo se construye el resto con los otros dos pilares.",
  ),
  post(
    "Carta trimestral de inversiones · 2T 2026",
    "Inversiones",
    "15 jul 2026",
    "Comité de inversión",
    "8 min",
    "Duración, exposición a divisas y las decisiones tácticas del trimestre en nuestras estrategias de deuda y renta variable.",
  ),
  post(
    "Cinco preguntas que tu comité debería hacer cada año",
    "Inversiones",
    "02 jul 2026",
    "Rodrigo Silva",
    "4 min",
    "Comisiones, benchmark, duración frente a la exigibilidad del pasivo y calidad de la información. Un guion corto para la sesión.",
  ),
  post(
    "Vitalis en el Foro de Inversión Previsional 2026",
    "Prensa",
    "18 jun 2026",
    "Comunicación",
    "3 min",
    "Participamos en el panel sobre integración de criterios ESG en portafolios de fondos de pensiones mexicanos.",
  ),
  post(
    "Millas para el Retiro cumple cinco años",
    "Prensa",
    "30 may 2026",
    "Comunicación",
    "3 min",
    "El primer sistema de ahorro para el retiro a través del gasto, y lo que aprendimos de sus primeros usuarios.",
  ),
];

export function newBlogPost(): BlogPost {
  return {
    titulo: "",
    slug: "/blog/nueva-publicacion",
    extracto: "",
    cuerpo: "",
    autor: "",
    lectura: "",
    cat: "Actuaría",
    estado: "Borrador",
    destacado: false,
    fecha: "—",
  };
}
