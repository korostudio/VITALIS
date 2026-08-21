"use client";

import Link from "next/link";
import { buttonVariants } from "@heroui/styles";
import { routes } from "@/lib/routes";
import type { BlogPost } from "../blogPosts";

const filtros = ["Todas", "Publicadas", "Borradores"] as const;
type Filtro = (typeof filtros)[number];

export function BlogListScreen({
  posts,
  filter,
  onFilterChange,
  onEdit,
  onNew,
}: {
  posts: BlogPost[];
  filter: Filtro;
  onFilterChange: (f: Filtro) => void;
  onEdit: (index: number) => void;
  onNew: () => void;
}) {
  const shown = posts
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => filter === "Todas" || (filter === "Publicadas" ? p.estado === "Publicada" : p.estado === "Borrador"));

  return (
    <div className="max-w-[1080px] px-5 py-11 sm:px-9">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-7">
        <h1 className="font-serif text-[34px] font-light text-accent sm:text-[40px]">Blog</h1>
        <div className="flex gap-2.5">
          <Link
            href={routes.blog}
            className="rounded-full border border-accent/20 px-4.5 py-2.5 text-[13.5px] hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]/7"
          >
            Ver el blog
          </Link>
          <button onClick={onNew} className={buttonVariants({ size: "md" }) + " !rounded-full"}>
            Nueva publicación
          </button>
        </div>
      </div>
      <p className="mb-7 text-[15px] font-light text-foreground/55">
        Artículos y notas de prensa que salen en <span className="font-mono text-[13px]">/blog</span>. Los
        borradores no aparecen en el sitio.
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className="rounded-full border px-4 py-2 text-[13px]"
            style={{
              borderColor: filter === f ? "var(--color-accent)" : "rgba(11,59,102,.2)",
              background: filter === f ? "var(--color-accent)" : "transparent",
              color: filter === f ? "var(--background)" : "rgba(15,26,36,.6)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-md border border-accent/14 bg-background">
        <div className="overflow-x-auto">
          <div className="grid min-w-[680px] grid-cols-[2.2fr_1fr_0.8fr_0.8fr_auto] gap-4 border-b border-accent/12 bg-[#F5F2EC] px-5.5 py-3.5 font-mono text-[9.5px] uppercase tracking-[0.13em] text-foreground/45">
            <span>Título</span>
            <span>Categoría</span>
            <span>Estado</span>
            <span>Fecha</span>
            <span />
          </div>
          {shown.map(({ p, i }) => {
            const pub = p.estado === "Publicada";
            return (
              <div
                key={p.titulo + i}
                className="grid min-w-[680px] grid-cols-[2.2fr_1fr_0.8fr_0.8fr_auto] items-center gap-4 border-b border-accent/8 px-5.5 py-3.5 text-[14.5px]"
              >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-accent">{p.titulo || "Sin título"}</span>
                <span className="text-[13px] text-foreground/55">{p.cat}</span>
                <span
                  className="justify-self-start whitespace-nowrap rounded-full border px-3 py-1 text-[12.5px]"
                  style={{
                    borderColor: pub ? "rgba(62,142,90,.35)" : "rgba(11,59,102,.18)",
                    background: pub ? "rgba(62,142,90,.10)" : "rgba(11,59,102,.06)",
                    color: pub ? "#2F6B45" : "rgba(15,26,36,.5)",
                  }}
                >
                  {p.estado}
                </span>
                <span className="whitespace-nowrap font-mono text-xs text-foreground/45">{p.fecha}</span>
                <button
                  onClick={() => onEdit(i)}
                  className="justify-self-end whitespace-nowrap rounded-full border border-accent/18 px-3.5 py-1.5 text-[13px] text-accent hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]/7"
                >
                  Editar
                </button>
              </div>
            );
          })}
          {shown.length === 0 && (
            <div className="min-w-[680px] px-5.5 py-8 text-center text-[13.5px] font-light text-foreground/50">
              No hay publicaciones en este filtro.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
