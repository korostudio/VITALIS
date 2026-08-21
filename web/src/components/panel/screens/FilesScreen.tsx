"use client";

import { useState } from "react";

const azul = "repeating-linear-gradient(135deg,#E7EEF6 0 10px,#F3F7FB 10px 20px)";
const arena = "repeating-linear-gradient(135deg,#EDEAE2 0 10px,#F7F5F0 10px 20px)";
const logo = "#F1F4F8";
const doc = "#F5F2EC";

const archData = [
  { nombre: "home-hero-equipo.jpg", tipo: "JPG", meta: "1600×2000 · 412 KB", usada: "Home · portada", cat: "Imágenes", tint: azul },
  { nombre: "oficina-cdmx.jpg", tipo: "JPG", meta: "2000×1333 · 620 KB", usada: "Home · presencia", cat: "Imágenes", tint: arena },
  { nombre: "equipo-actuarial.jpg", tipo: "JPG", meta: "1800×1200 · 540 KB", usada: "Sin usar", cat: "Imágenes", tint: azul },
  { nombre: "cliente-01.svg", tipo: "SVG", meta: "vectorial · 12 KB", usada: "Home · clientes", cat: "Logos", tint: logo },
  { nombre: "cliente-02.svg", tipo: "SVG", meta: "vectorial · 9 KB", usada: "Home · clientes", cat: "Logos", tint: logo },
  { nombre: "abelica-global.svg", tipo: "SVG", meta: "vectorial · 14 KB", usada: "Pasivos laborales", cat: "Logos", tint: logo },
  { nombre: "politica-esg-2026.pdf", tipo: "PDF", meta: "520 KB", usada: "Inversiones", cat: "Documentos", tint: doc },
  { nombre: "guia-servicios-2026.pdf", tipo: "PDF", meta: "610 KB", usada: "Inversiones", cat: "Documentos", tint: doc },
];

const filtros = ["Todos", "Imágenes", "Documentos", "Logos"] as const;

export function FilesScreen() {
  const [filter, setFilter] = useState<(typeof filtros)[number]>("Todos");
  const shown = filter === "Todos" ? archData : archData.filter((a) => a.cat === filter);

  return (
    <div className="max-w-[1120px] px-5 py-11 sm:px-9">
      <h1 className="mb-2 font-serif text-[34px] font-light text-accent sm:text-[40px]">Archivos</h1>
      <p className="mb-7 text-[15px] font-light text-foreground/55">
        Imágenes y documentos que usan las páginas del sitio.
      </p>

      <div className="mb-7 rounded-md border border-dashed border-accent/28 bg-[#F5F2EC] p-8.5 text-center">
        <div className="mb-1.5 text-[15.5px] text-accent">Arrastra archivos aquí</div>
        <div className="text-[13px] font-light text-foreground/50">JPG, PNG, SVG o PDF · hasta 10 MB por archivo</div>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2.5">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
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
        <span className="ml-auto font-mono text-[11.5px] text-foreground/45">
          {shown.length} de {archData.length} archivos
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((a) => (
          <div key={a.nombre} className="overflow-hidden rounded-md border border-accent/14 bg-background">
            <div className="flex h-27.5 items-end p-2.5" style={{ background: a.tint }}>
              <span className="rounded-[3px] bg-background px-1.5 py-0.5 font-mono text-[9.5px] text-[var(--color-accent-hover)]">
                {a.tipo}
              </span>
            </div>
            <div className="px-3.5 py-3.5">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-accent">{a.nombre}</div>
              <div className="mt-1.25 font-mono text-[10.5px] text-foreground/42">{a.meta}</div>
              <div className="mt-1.75 text-[11.5px] font-light text-foreground/45">{a.usada}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
