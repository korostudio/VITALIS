import type { Screen } from "../types";
import type { PageName, PageStatus } from "../pageMeta";
import type { BlogPost } from "../blogPosts";

type Card = { title: string; body: string; meta?: string; screen: Screen; page?: PageName };
type Group = { title: string; cards: Card[] };

export function DashboardScreen({
  pageStatus,
  posts,
  onNavigate,
}: {
  pageStatus: Record<PageName, PageStatus>;
  posts: BlogPost[];
  onNavigate: (s: Screen, page?: PageName) => void;
}) {
  const pubCount = Object.values(pageStatus).filter((s) => s === "Publicada").length;
  const wipCount = Object.values(pageStatus).length - pubCount;
  const postPubCount = posts.filter((p) => p.estado === "Publicada").length;
  const postDraftCount = posts.length - postPubCount;

  const groups: Group[] = [
    {
      title: "Páginas",
      cards: [
        {
          title: "Home",
          body: "Portada: hero, cifras, servicios, gráfica, calculadora y cotizador.",
          meta: pageStatus.Home,
          screen: "pageEditor",
          page: "Home",
        },
        {
          title: "Todas las páginas",
          body: "Inversiones, Actuaría, Tecnología, Usuarios, Nosotros y Contacto.",
          meta: `${pubCount} publicadas · ${wipCount} en construcción`,
          screen: "pages",
        },
      ],
    },
    {
      title: "Contenido",
      cards: [
        { title: "Blog", body: "Artículos y notas de prensa que salen en /blog.", meta: `${postPubCount} publicadas · ${postDraftCount} borradores`, screen: "blogList" },
        { title: "Series de rendimientos", body: "Datos anuales que alimentan la gráfica de la home.", meta: "2004 – 2025", screen: "series" },
        { title: "Solicitudes", body: "Cotizaciones y diagnósticos recibidos desde el sitio.", meta: "6 sin leer", screen: "leads" },
      ],
    },
    {
      title: "Configuración",
      cards: [
        { title: "Usuarios", body: "Cuentas y roles del panel.", screen: "usuarios" },
        { title: "Archivos", body: "Imágenes y documentos del sitio.", screen: "archivos" },
        { title: "Datos globales", body: "Teléfonos, WhatsApp, oficinas, redes y avisos legales.", screen: "datos" },
      ],
    },
  ];

  return (
    <div className="max-w-[1120px] px-5 py-14 sm:px-9 sm:py-16">
      <h1 className="mb-2 font-serif text-[36px] font-light text-accent sm:text-[44px]">
        Panel de contenido
      </h1>
      <p className="mb-11 text-base font-light text-foreground/55">Elige qué quieres editar.</p>

      {groups.map((g) => (
        <div key={g.title} className="mb-10">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
            {g.title}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.cards.map((c) => (
              <button
                key={c.title}
                onClick={() => onNavigate(c.screen, c.page)}
                className="flex min-h-[104px] flex-col gap-1.5 rounded-md border border-accent/15 border-l-[3px] border-l-[var(--color-accent-hover)] bg-background px-6 py-5.5 text-left hover:border-accent hover:border-l-accent hover:bg-[#F4F8FC]"
              >
                <span className="text-base font-medium text-accent">{c.title}</span>
                <span className="text-[13.5px] font-light leading-snug text-foreground/55">{c.body}</span>
                {c.meta && (
                  <span className="mt-auto font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/38">
                    {c.meta}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
