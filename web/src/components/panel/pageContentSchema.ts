import type { PageName } from "./pageMeta";
import type { Screen } from "./types";

export type FieldType = "text" | "area" | "num" | "image" | "toggle" | "link";

export interface FieldDef {
  key: string;
  label: string;
  default: string | boolean;
  type: FieldType;
  help?: string;
  max?: number;
  req?: boolean;
  unit?: string;
  linkTo?: Screen;
  linkText?: string;
  fileName?: string;
  fileMeta?: string;
  rec?: string;
}

export interface RepeaterDef {
  name: string;
  title: string;
  labels: string[];
  defaultRows: string[][];
}

export interface GroupDef {
  title: string;
  help?: string;
  fields: FieldDef[];
  repeater?: RepeaterDef;
}

function text(key: string, label: string, def: string, opts: Partial<FieldDef> = {}): FieldDef {
  return { key, label, default: def, type: "text", ...opts };
}
function area(key: string, label: string, def: string, opts: Partial<FieldDef> = {}): FieldDef {
  return { key, label, default: def, type: "area", ...opts };
}
function num(key: string, label: string, def: string, opts: Partial<FieldDef> = {}): FieldDef {
  return { key, label, default: def, type: "num", ...opts };
}
function toggle(key: string, label: string, def: boolean, opts: Partial<FieldDef> = {}): FieldDef {
  return { key, label, default: def, type: "toggle", ...opts };
}
function link(key: string, label: string, linkTo: Screen, linkText: string): FieldDef {
  return { key, label, default: "", type: "link", linkTo, linkText };
}
function image(key: string, label: string, fileName: string, fileMeta: string, rec: string): FieldDef {
  return { key, label, default: "", type: "image", fileName, fileMeta, rec };
}

export const defaultSeries: [number, number, number][] = [
  [2004, 1, 1], [2005, 8, 9], [2006, 18, 29], [2007, 25, 39], [2008, 33, 3],
  [2009, 42, 31], [2010, 50, 26], [2011, 59, 18], [2012, 68, 20], [2013, 72, 39],
  [2014, 82, 51], [2015, 85, 62], [2016, 93, 78], [2017, 99, 80], [2018, 105, 59],
  [2019, 118, 51], [2020, 130, 59], [2021, 134, 82], [2022, 138, 50], [2023, 147, 56],
  [2024, 150, 75], [2025, 157, 62],
];

export const pageContentSchema: Record<PageName, Record<string, GroupDef[]>> = {
  Home: {
    Portada: [
      {
        title: "Encabezado",
        help: "Se muestra en la primera pantalla del sitio, sobre la imagen principal.",
        fields: [
          text("antetitulo", "Antetítulo", "Pensiones · Pasivos laborales · Inversiones", {
            help: "Texto corto en mayúsculas encima del título.",
          }),
          area("titulo", "Título", "Creamos valor en el tiempo para un futuro próspero", {
            max: 70,
            req: true,
            help: "La segunda mitad se muestra en cursiva automáticamente.",
          }),
          area(
            "bajada",
            "Bajada",
            "Actuarios certificados y gestores de inversión que acompañan a empresas y a sus colaboradores en el diseño, valuación y administración de sus obligaciones de retiro.",
            { max: 220 },
          ),
          image("img", "Imagen principal", "home-hero-equipo.jpg", "412KB — 1600x2000 — image/jpeg", "1600×2000 px"),
        ],
      },
      {
        title: "Botones",
        fields: [
          text("cta1", "Botón principal", "Agendar diagnóstico", { max: 28, req: true }),
          text("cta2", "Botón secundario", "Calcular mi ahorro", { max: 28 }),
        ],
      },
      {
        title: "Dato destacado",
        help: "Tarjeta flotante sobre la imagen.",
        fields: [
          text("badgeCifra", "Cifra", "12,177 MDP"),
          text("badgeTexto", "Descripción", "MDP asesorados"),
        ],
      },
    ],
    Cifras: [
      {
        title: "Cifras clave",
        help: "Cuatro columnas bajo la portada. Si agregas más de cuatro, se acomodan en dos filas.",
        fields: [],
        repeater: {
          name: "Cifras",
          title: "Cifras",
          labels: ["Cifra", "Descripción"],
          defaultRows: [
            ["34", "años de experiencia auditada"],
            ["1,800", "razones sociales asesoradas"],
            ["1°", "asesor mexicano certificado UNPRI"],
            ["3", "países: México, Canadá y Portugal"],
          ],
        },
      },
    ],
    Servicios: [
      {
        title: "Servicios",
        fields: [area("secServicios", "Título de sección", "Cuatro prácticas, una sola conversación sobre el futuro", { max: 80 })],
        repeater: {
          name: "Servicios",
          title: "Tarjetas de servicio",
          labels: ["Título", "Descripción"],
          defaultRows: [
            ["Inversiones", "Gestión de activos institucionales con procesos y rendimientos auditados."],
            ["Pasivos laborales", "Valuaciones actuariales bajo NIF D-3, IFRS y US GAAP."],
            ["Planes de pensiones", "Diseño, implementación y administración de planes privados."],
            ["Tecnología", "Calculadora, cotizador y expediente digital para tu comité."],
          ],
        },
      },
    ],
    Rendimientos: [
      {
        title: "Gráfica de rendimientos",
        fields: [
          toggle("mostrarRend", "Mostrar sección", true),
          area("rendTitulo", "Título", "Veintiún años de rendimiento acumulado", { max: 80 }),
          area("rendNota", "Nota al pie", "Cifras ilustrativas. Rendimientos pasados no garantizan resultados futuros.", { max: 160 }),
          link("link", "Datos de la gráfica", "series", "Editar series de rendimientos →"),
        ],
      },
    ],
    Calculadora: [
      {
        title: "Textos",
        fields: [
          text("calcTitulo", "Título", "Ahorra, vive y disfruta"),
          area("calcBajada", "Bajada", "Descubre cuánto necesitas ahorrar cada mes para sostener la pensión que quieres.", { max: 200 }),
        ],
      },
      {
        title: "Supuestos del cálculo",
        help: "La fórmula no se modifica desde el panel. Cambiar estos valores actualiza el resultado que ve el usuario.",
        fields: [
          num("edadRetiro", "Edad de retiro", "65", { unit: "años · entre 55 y 70" }),
          num("rendReal", "Rendimiento real anual", "5", { unit: "% · entre 1 y 9" }),
          num("aniosPension", "Años de pensión", "18", { unit: "años" }),
        ],
      },
    ],
    Cotizador: [
      {
        title: "Formulario de propuesta",
        help: "Los envíos llegan al correo indicado y quedan guardados en Solicitudes.",
        fields: [
          area("cotTitulo", "Título", "Valuación de pasivos laborales con cifras anticipadas", { max: 90 }),
          text("cotCorreo", "Correo de aviso", "cotizaciones@vitalis.com.mx", { req: true }),
          link("link2", "Solicitudes recibidas", "leads", "Ver solicitudes →"),
        ],
      },
    ],
    Clientes: [
      {
        title: "Logos de clientes",
        help: "Se muestran en escala de grises. Sube SVG o PNG con fondo transparente.",
        fields: [],
        repeater: {
          name: "Clientes",
          title: "Logos",
          labels: ["Nombre", "Archivo"],
          defaultRows: [
            ["Logo 01", "cliente-01.svg"],
            ["Logo 02", "cliente-02.svg"],
            ["Logo 03", "cliente-03.svg"],
            ["Logo 04", "cliente-04.svg"],
            ["Logo 05", "cliente-05.svg"],
            ["Logo 06", "cliente-06.svg"],
          ],
        },
      },
    ],
    Presencia: [
      {
        title: "Oficinas",
        fields: [],
        repeater: {
          name: "Presencia",
          title: "Oficinas",
          labels: ["Ciudad", "Dirección"],
          defaultRows: [
            ["Ciudad de México", "Gobernador Rafael Rebollar 47 y 56, San Miguel Chapultepec"],
            ["Mont-Royal", "4400 Ch. Côte de Liesse, Porte 200, Quebec"],
            ["Lisboa", "Campo Grande 35, 4ºD, 1700-087"],
          ],
        },
      },
    ],
    Cierre: [
      {
        title: "Cierre",
        fields: [
          area("cierreTitulo", "Título", "Hablemos de tu obligación laboral", { max: 70 }),
          area("cierreBajada", "Bajada", "Un diagnóstico inicial sin costo con uno de nuestros actuarios certificados.", { max: 160 }),
          text("whats", "Número de WhatsApp", "525541430497", { help: "Sin espacios, con código de país." }),
          toggle("floating", "Botón flotante de WhatsApp", true),
        ],
      },
    ],
  },

  Inversiones: {
    Portada: [
      {
        title: "Encabezado",
        help: "Primera pantalla de la página de Inversiones.",
        fields: [
          text("antetitulo", "Antetítulo", "Gestión de inversiones"),
          area("titulo", "Título", "Generamos rendimientos reales por encima de la inflación"),
          area("bajada", "Bajada", "Administramos portafolios institucionales de fondos de pensiones, cajas de ahorro y tesorerías corporativas."),
          text("stats", "Cifras del encabezado", "34 años · 11 estrategias · CNBV 30053 · UNPRI"),
        ],
      },
    ],
    Filosofía: [
      {
        title: "Filosofía de inversión",
        help: "Bloque azul con los principios numerados.",
        fields: [
          area("titulo", "Título", "Invertir es entender la empresa detrás del precio"),
          area("bajada", "Bajada", "Manejo activo con horizonte de mediano y largo plazo, y un objetivo total por encima de la inflación."),
          area("p1", "Principio 01", "Manejo activo de portafolios con horizonte de mediano y largo plazo."),
          area("p2", "Principio 02", "Análisis fundamental constante de las variables macroeconómicas y de cada empresa."),
        ],
      },
    ],
    Ventajas: [
      {
        title: "Ventajas competitivas",
        help: "Lista seleccionable de cinco ventajas.",
        fields: [
          area("titulo", "Título", "Cinco razones por las que un comité de inversión nos elige"),
          text("v1", "Ventaja 01 · título", "Estrategia personalizada"),
          area("v1b", "Ventaja 01 · texto", "Entendemos las necesidades, la naturaleza y los riesgos de las obligaciones detrás de los activos de cada cliente."),
          text("v2", "Ventaja 02 · título", "Incentivos alineados"),
        ],
      },
    ],
    Rendimientos: [
      {
        title: "Gráfica de rendimientos",
        fields: [
          toggle("mostrar", "Mostrar sección", true),
          area("titulo", "Título", "Rendimiento acumulado de nuestras estrategias insignia"),
          area("nota", "Nota al pie", "Cifras ilustrativas. Rendimientos pasados no garantizan resultados futuros."),
          link("link", "Datos de la gráfica", "series", "Editar series de rendimientos →"),
        ],
      },
    ],
    Estrategias: [
      {
        title: "Estrategias",
        help: "Once tarjetas filtrables por clase de activo y moneda.",
        fields: [
          area("titulo", "Título", "Once estrategias en tres monedas"),
          area("bajada", "Bajada", "Cada estrategia cuenta con su factsheet mensual."),
          text("clases", "Filtros de clase", "Deuda, Balanceado, Renta variable"),
          text("monedas", "Filtros de moneda", "MXN, USD, EUR"),
        ],
      },
    ],
    Cierre: [
      {
        title: "Cierre",
        fields: [
          area("titulo", "Título", "Revisemos el portafolio de tu fondo"),
          area("bajada", "Bajada", "Analizamos tu asignación actual, comisiones y benchmark. Sin costo y sin compromiso."),
          text("cta", "Botón principal", "Agendar diagnóstico"),
        ],
      },
    ],
  },

  "Pasivos laborales": {
    Portada: [
      {
        title: "Encabezado",
        fields: [
          text("antetitulo", "Antetítulo", "Pasivos laborales contingentes"),
          area("titulo", "Título", "Cuantifica tu deuda laboral antes del cierre fiscal"),
          area("bajada", "Bajada", "Valuaciones actuariales bajo NIF D-3, IFRS, US GAAP y German GAAP, con información al 30 de septiembre."),
          text("aviso", "Aviso de la barra superior", "Valuaciones con cifras al 30 de septiembre"),
        ],
      },
    ],
    Conceptos: [
      {
        title: "Qué cubre el pasivo",
        help: "Cinco conceptos numerados en el bloque azul.",
        fields: [
          area("titulo", "Título", "La deuda que se acumula mientras el trabajador presta servicio"),
          text("c1", "Concepto 01", "Prima de antigüedad"),
          text("c2", "Concepto 02", "Indemnización legal por terminación"),
          text("c3", "Concepto 03", "Jubilación o plan de pensiones"),
        ],
      },
    ],
    Normas: [
      {
        title: "Normatividad",
        help: "Selector de las cuatro normas.",
        fields: [
          area("titulo", "Título", "Valuamos bajo la norma que te exige tu matriz o tu auditor"),
          text("n1", "Norma 01", "NIF D-3"),
          text("n2", "Norma 02", "IFRS · IAS 19"),
          text("n3", "Norma 03", "US GAAP · ASC 715"),
          text("n4", "Norma 04", "German GAAP"),
        ],
      },
    ],
    Proceso: [
      {
        title: "Proceso",
        help: "Cuatro pasos con tiempos.",
        fields: [
          area("titulo", "Título", "De la base de datos al dictamen en cuatro semanas"),
          text("p1", "Paso 01", "Alcance y propuesta · Día 1"),
          text("p2", "Paso 02", "Base de datos · Semana 1"),
          text("p3", "Paso 03", "Valuación · Semanas 2–3"),
          text("p4", "Paso 04", "Dictamen y presentación · Semana 4"),
        ],
      },
    ],
    Entregables: [
      {
        title: "Entregables y respaldo",
        fields: [
          area("titulo", "Título", "Qué recibes al final"),
          text("e1", "Entregable 01", "Dictamen actuarial firmado por actuario certificado"),
          text("e2", "Entregable 02", "Notas de revelación listas para tus estados financieros"),
          area("respaldo", "Texto de respaldo", "Pertenecemos a ABELICA Global, la red internacional de actuarios."),
        ],
      },
    ],
    Cotizador: [
      {
        title: "Formulario de cotización",
        help: "Los envíos quedan guardados en Solicitudes.",
        fields: [
          area("titulo", "Título", "Solicita tu propuesta"),
          area("bajada", "Bajada", "Seis datos y te enviamos una propuesta formal en menos de 48 horas hábiles."),
          text("correo", "Correo de aviso", "cotizaciones@vitalis.com.mx"),
          link("link", "Solicitudes recibidas", "leads", "Ver solicitudes →"),
        ],
      },
    ],
  },

  "Planes de pensiones": {
    Portada: [
      {
        title: "Encabezado",
        fields: [
          text("antetitulo", "Antetítulo", "Planes de pensiones privados"),
          area("titulo", "Título", "Un beneficio que retiene talento y ordena tu relevo generacional"),
          area("bajada", "Bajada", "Mecanismo de ahorro de largo plazo para el justo reemplazo del personal a edad avanzada."),
        ],
      },
    ],
    Pilares: [
      {
        title: "Modelo de tres pilares",
        help: "Simulador interactivo del bloque azul.",
        fields: [
          area("titulo", "Título", "Ninguna pensión digna se sostiene sobre un solo pilar"),
          area("nota", "Nota al pie", "Internamente le llamamos el modelo capuchino."),
          num("gob", "Aporte base del gobierno", "30"),
          num("factorEmp", "Factor por punto de aportación de empresa", "3.2"),
          num("factorAho", "Factor por punto de ahorro voluntario", "2.6"),
        ],
      },
    ],
    Beneficios: [
      {
        title: "Beneficios",
        help: "Dos columnas: empresa y colaborador.",
        fields: [
          area("titulo", "Título", "Lo que gana la empresa y lo que gana el colaborador"),
          text("e1", "Empresa · beneficio 01", "Las aportaciones son deducibles de ISR dentro de los límites de ley"),
          text("c1", "Colaborador · beneficio 01", "Complementa la pensión de la seguridad social"),
        ],
      },
    ],
    "Tipos de plan": [
      {
        title: "Tipos de plan",
        help: "Selector de las tres estructuras.",
        fields: [
          area("titulo", "Título", "Tres estructuras posibles. La diferencia está en quién asume el riesgo"),
          text("t1", "Estructura 01", "Beneficio definido"),
          text("t2", "Estructura 02", "Contribución definida"),
          text("t3", "Estructura 03", "Híbrido"),
        ],
      },
    ],
    Implementación: [
      {
        title: "Implementación",
        fields: [
          area("titulo", "Título", "Del diagnóstico al primer depósito"),
          text("p1", "Paso 01", "Diagnóstico · Semana 1"),
          text("p2", "Paso 02", "Diseño del plan · Semanas 2–4"),
          text("p3", "Paso 03", "Constitución · Semanas 5–8"),
          text("p4", "Paso 04", "Administración · Continuo"),
        ],
      },
    ],
  },

  Tecnología: {
    Portada: [
      {
        title: "Encabezado",
        fields: [
          area("titulo", "Título", "La actuaría deja de ser una caja negra"),
          area("bajada", "Bajada", "Desarrollamos nuestras propias herramientas para que puedas cotizar, calcular y consultar sin esperar un correo."),
        ],
      },
    ],
    Herramientas: [
      {
        title: "Herramientas",
        help: "Tarjetas filtrables por público. El estado controla la etiqueta verde o gris.",
        fields: [
          area("titulo", "Título", "Seis herramientas en operación"),
          text("h1", "Herramienta 01", "Cotizador · Empresa · En línea"),
          text("h2", "Herramienta 02", "Calculadora de ahorro · Colaborador · En línea"),
          text("h3", "Herramienta 03", "Expediente digital · Empresa · Requiere acceso"),
          text("h4", "Herramienta 04", "Graficador · Comité · En línea"),
          text("kit", "Enlace del Kit de inversiones", "https://vitalis.com.mx/data/kitv/expv/"),
        ],
      },
    ],
    Calculadora: [
      {
        title: "Calculadora",
        help: "Supuestos del cálculo que ve el usuario.",
        fields: [
          text("titulo", "Título", "Pruébala aquí mismo"),
          num("edad", "Edad de retiro", "65"),
          num("rend", "Rendimiento real anual", "5"),
          num("anios", "Años de pensión", "18"),
        ],
      },
    ],
    Expediente: [
      {
        title: "Expediente digital",
        fields: [
          area("titulo", "Título", "Tu expediente actuarial, siempre disponible"),
          area("bajada", "Bajada", "Dictámenes, estados de cuenta y actas del comité con control de versiones y acceso por rol."),
          text("carpetas", "Carpetas visibles en la vista previa", "Valuaciones, Estados de cuenta, Comité de inversión"),
        ],
      },
    ],
    Cierre: [
      {
        title: "Cierre",
        fields: [
          area("titulo", "Título", "Te damos una demo en vivo"),
          area("bajada", "Bajada", "Veinte minutos con tu equipo para recorrer el cotizador y el expediente digital."),
        ],
      },
    ],
  },

  Usuarios: {
    Portada: [
      {
        title: "Encabezado",
        fields: [
          area("titulo", "Título", "Entra a tu cuenta"),
          area("bajada", "Bajada", "Elige el tipo de acceso. Si es tu primera vez, tu empresa te envió las credenciales."),
          text("soporte", "Correo de soporte", "soporte@vitalis.com.mx"),
        ],
      },
    ],
    Accesos: [
      {
        title: "Tarjetas de acceso",
        help: "Los dos accesos del sitio.",
        fields: [
          text("a1", "Acceso 01 · título", "Empleado"),
          area("a1b", "Acceso 01 · texto", "Consulta el saldo de tu plan, tu proyección de pensión y tus estados de cuenta."),
          text("a1u", "Acceso 01 · destino", "/usuarios/empleado"),
          text("a2", "Acceso 02 · título", "Empresa"),
          area("a2b", "Acceso 02 · texto", "Entra al expediente digital de tu empresa."),
          text("a2u", "Acceso 02 · destino", "/documentos"),
        ],
      },
    ],
  },

  Graficador: {
    Portada: [
      {
        title: "Encabezado",
        fields: [
          text("titulo", "Título", "Graficador"),
          area("bajada", "Bajada", "Compara el rendimiento histórico de nuestras estrategias entre sí y contra la inflación."),
          area("nota", "Nota al pie", "Cifras ilustrativas para efectos de demostración."),
        ],
      },
    ],
    Series: [
      {
        title: "Series disponibles",
        help: "Qué estrategias puede comparar el visitante.",
        fields: [
          text("s1", "Serie 01", "Deuda Mexicana"),
          text("s2", "Serie 02", "High Conviction Global Equity"),
          text("s3", "Serie 03", "Global Balanced Asset Allocation"),
          text("s4", "Serie 04", "Inflación (INPC)"),
          link("link", "Datos de las series", "series", "Editar series de rendimientos →"),
        ],
      },
    ],
  },

  "Expediente digital": {
    Carpetas: [
      {
        title: "Carpetas",
        help: "Las carpetas que ve el cliente al entrar.",
        fields: [
          text("c1", "Carpeta 01", "Valuaciones actuariales"),
          text("c2", "Carpeta 02", "Estados de cuenta"),
          text("c3", "Carpeta 03", "Comité de inversión"),
          text("c4", "Carpeta 04", "Plan de pensiones"),
          text("c5", "Carpeta 05", "Contratos"),
        ],
      },
    ],
    Permisos: [
      {
        title: "Permisos",
        help: "Qué carpetas ve cada rol del lado del cliente.",
        fields: [
          text("r1", "Finanzas", "Valuaciones, Estados de cuenta, Contratos"),
          text("r2", "Recursos Humanos", "Plan de pensiones, Valuaciones"),
          text("r3", "Comité de inversión", "Comité de inversión, Estados de cuenta"),
          toggle("bitacora", "Registrar bitácora de consultas", true),
        ],
      },
    ],
  },

  Blog: {
    Portada: [
      {
        title: "Encabezado del blog",
        help: "Las publicaciones se administran en Blog, no aquí.",
        fields: [
          text("titulo", "Título", "Publicaciones"),
          area("bajada", "Bajada", "Lo que escriben nuestros actuarios y gestores sobre normatividad, pensiones y mercados."),
          text("cats", "Categorías del filtro", "Actuaría, Pensiones, Inversiones, Prensa"),
          link("link", "Administrar publicaciones", "blogList", "Ver publicaciones →"),
        ],
      },
    ],
    Suscripción: [
      {
        title: "Carta trimestral",
        help: "Bloque de suscripción al pie del listado.",
        fields: [
          text("titulo", "Título", "Recibe nuestra carta trimestral"),
          area("bajada", "Bajada", "Análisis de mercados y cambios normativos que afectan tus obligaciones laborales. Cuatro correos al año, sin promociones."),
          text("correo", "Correo de aviso de suscripciones", "comunicacion@vitalis.com.mx"),
          toggle("mostrar", "Mostrar bloque", true),
        ],
      },
    ],
  },

  Nosotros: {
    Portada: [
      {
        title: "Encabezado",
        fields: [
          text("antetitulo", "Antetítulo", "Vitalis Today for Tomorrow"),
          area("titulo", "Título", "Preservamos el valor en el tiempo, con una visión de legado y"),
          area("tituloCursiva", "Título · parte en cursiva", "por un mundo de mayor riqueza"),
          area("bajada", "Bajada", "Somos una empresa global especializada en gestión de inversiones, con amplia experiencia en pensiones y previsión social."),
        ],
      },
    ],
    Cifras: [
      {
        title: "Cifras clave",
        help: "Cuatro columnas bajo la portada.",
        fields: [],
        repeater: {
          name: "NosotrosCifras",
          title: "Cifras",
          labels: ["Cifra", "Descripción"],
          defaultRows: [
            ["34", "años de experiencia, con procesos y rendimientos auditados"],
            ["1,800", "razones sociales asesoradas"],
            ["500 mil", "trabajadores impactados a través de planes, fondos y cajas de ahorro"],
            ["12,177", "millones de pesos asesorados en cuentas discrecionales y consultoría"],
          ],
        },
      },
    ],
    "Quiénes somos": [
      {
        title: "Quiénes somos",
        help: "Bloque de cuatro párrafos numerados.",
        fields: [area("titulo", "Título", "Treinta y cuatro años invirtiendo a largo plazo")],
        repeater: {
          name: "QuienesSomos",
          title: "Párrafos",
          labels: ["Texto"],
          defaultRows: [
            ["Somos una empresa global especializada en gestión de inversiones, con amplia experiencia en pensiones y previsión social."],
            ["Contamos con más de 34 años de experiencia, con procesos y rendimientos auditados, buscamos ayudar a las empresas y a las personas en la gestión de sus activos de largo plazo."],
            ["Damos asesoría a más de 1,800 razones sociales, generamos impacto en más de 500,000 trabajadores a través de planes de pensiones, fondos y cajas de ahorro."],
            ["Contamos con un área actuarial que genera mucho valor al diseñar estrategias donde la exigibilidad de los recursos en el tiempo son un factor esencial."],
          ],
        },
      },
    ],
    "Misión y visión": [
      {
        title: "Misión",
        fields: [
          area(
            "mision",
            "Texto de misión",
            "Invertimos por un futuro de nuevos comienzos. Creemos en los comienzos tempranos y en el milagro de la disciplina financiera para un legado sólido.",
          ),
        ],
      },
      {
        title: "Visión",
        fields: [
          area("vision", "Texto de visión", "Crear valor en el tiempo para un futuro próspero."),
          area(
            "visionNota",
            "Nota al pie",
            'Desde 2018 somos signatarios de los "Principios de Inversión Responsable" de la Organización de las Naciones Unidas. Fuimos el primer asesor independiente mexicano en adherirse a estos principios.',
          ),
        ],
      },
    ],
    Valores: [
      {
        title: "Valores",
        help: "Seis frases que decimos en voz alta.",
        fields: [
          area("titulo", "Título", "Seis frases que decimos en voz alta"),
          text("bajada", "Bajada", "Así se habla dentro de Vitalis."),
        ],
        repeater: {
          name: "Valores",
          title: "Frases",
          labels: ["Etiqueta", "Frase", "Color"],
          defaultRows: [
            ["Valor 01", "Si yo brinco, tu brincas.", "azul"],
            ["Valor 02", "¡Siempre existe una oportunidad para ayudar a los demás!", "arena"],
            ["Valor 03", "Bien, de buenas y a la primera.", "azul"],
            ["Valor 04", "Nuestro comportamiento es ejemplar.", "arena"],
            ["Valor 05", "Nos motivamos a ser mejores personas.", "azul"],
            ["Valor 06", "¡Si quedas, lo cumples!", "arena"],
          ],
        },
      },
    ],
    Presencia: [
      {
        title: "Presencia y respaldo",
        fields: [
          area("titulo", "Título", "Tres oficinas y una red internacional"),
          text("sellos", "Sellos y certificaciones", "UNPRI, ABELICA GLOBAL, FIP 2026, MILLAS"),
        ],
        repeater: {
          name: "NosotrosPresencia",
          title: "Oficinas",
          labels: ["Ciudad", "Dirección", "Teléfono"],
          defaultRows: [
            ["México", "Gobernador Rafael Rebollar No. 47 y No. 56 piso 3, San Miguel Chapultepec, C.P. 11850, Ciudad de México.", "52 (55) 5235 3000"],
            ["Canadá", "4400 Ch. Côte de Liesse, Porte 200, Mont-Royal (Quebec) H4N 2P7", "(514) 987-9550"],
            ["Portugal", "Campo Grande 35, 4ºD — 1700-087, Lisboa, Portugal", ""],
          ],
        },
      },
    ],
  },

  Contacto: {
    Portada: [
      {
        title: "Encabezado",
        help: "Página en construcción.",
        fields: [
          area("titulo", "Título", ""),
          text("correo", "Correo de aviso del formulario", "contacto@vitalis.com.mx"),
        ],
      },
    ],
    Cierre: [
      {
        title: "Cierre",
        fields: [area("titulo", "Título", "")],
      },
    ],
  },
};
