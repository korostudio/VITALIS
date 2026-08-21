"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

type Doc = { tipo: string; nombre: string; version: string; fecha: string; peso: string; anio: string };

const data: Record<string, { desc: string; docs: Doc[] }> = {
  Presentaciones: {
    desc: "Material corporativo y comercial de Vitalis, con la edición vigente de cada documento.",
    docs: [
      { tipo: "PDF", nombre: "Corporativa · Vitalis 2026", version: "v1", fecha: "10 feb 2026", peso: "1.4 MB", anio: "2026" },
      { tipo: "PDF", nombre: "Actuaría 2026", version: "v1", fecha: "15 feb 2026", peso: "890 KB", anio: "2026" },
      { tipo: "PDF", nombre: "Cajas y Fondos de Ahorro 2026", version: "v1", fecha: "15 feb 2026", peso: "760 KB", anio: "2026" },
      { tipo: "PDF", nombre: "Inversiones 2026", version: "v1", fecha: "20 feb 2026", peso: "1.1 MB", anio: "2026" },
      { tipo: "PDF", nombre: "Vitalis One Pager 2026", version: "v1", fecha: "05 ene 2026", peso: "320 KB", anio: "2026" },
      { tipo: "PDF", nombre: "Rendimientos Mensuales 2026", version: "v3", fecha: "01 ago 2026", peso: "410 KB", anio: "2026" },
      { tipo: "PDF", nombre: "Política ASG 2026", version: "v1", fecha: "14 feb 2026", peso: "540 KB", anio: "2026" },
      { tipo: "PDF", nombre: "Plan de Pensiones 2026", version: "v1", fecha: "03 mar 2026", peso: "780 KB", anio: "2026" },
      { tipo: "PDF", nombre: "US Residents 2026", version: "v1", fecha: "20 feb 2026", peso: "690 KB", anio: "2026" },
    ],
  },
  Webinars: {
    desc: "Grabaciones de nuestros seminarios sobre economía, pensiones y pasivos laborales, con la presentación de cada sesión.",
    docs: [
      { tipo: "MP4", nombre: "2026: Mejores perspectivas económicas, mayor volatilidad y riesgo", version: "v1", fecha: "22 ene 2026", peso: "210 MB", anio: "2026" },
      { tipo: "MP4", nombre: "Prima de antigüedad: de pasivo contingente a estrategia financiera", version: "v1", fecha: "20 nov 2025", peso: "180 MB", anio: "2025" },
      { tipo: "MP4", nombre: "Reducción en la tasa de referencia y su impacto en el pasivo laboral", version: "v1", fecha: "27 may 2025", peso: "195 MB", anio: "2025" },
      { tipo: "MP4", nombre: "Bienestar financiero", version: "v1", fecha: "06 feb 2025", peso: "160 MB", anio: "2025" },
      { tipo: "MP4", nombre: "Entrevista en directo: un diálogo abierto con actuarios expertos en pasivos laborales", version: "v1", fecha: "18 sep 2024", peso: "220 MB", anio: "2024" },
      { tipo: "MP4", nombre: "Seguridad social y planes de pensiones privados: optimizando la inversión en el talento humano", version: "v1", fecha: "25 abr 2024", peso: "175 MB", anio: "2024" },
      { tipo: "MP4", nombre: "Perspectivas económicas 2024", version: "v1", fecha: "28 nov 2023", peso: "168 MB", anio: "2023" },
      { tipo: "MP4", nombre: "Reforma IMSS: incremento en cuotas patronales", version: "v1", fecha: "26 oct 2022", peso: "150 MB", anio: "2022" },
      { tipo: "MP4", nombre: "Tasa de descuento y su impacto en el pasivo laboral", version: "v1", fecha: "14 jul 2022", peso: "140 MB", anio: "2022" },
    ],
  },
};

const carpetaLabels = Object.keys(data);
const anioLabels = ["Todos", "2026", "2025", "2024"];

export function ExpedienteDigital() {
  const [carpeta, setCarpeta] = useState(carpetaLabels[0]);
  const [anio, setAnio] = useState("Todos");
  const [query, setQuery] = useState("");

  const folder = data[carpeta];
  const docs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return folder.docs.filter(
      (d) => (anio === "Todos" || d.anio === anio) && (!q || d.nombre.toLowerCase().includes(q))
    );
  }, [folder, anio, query]);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[250px_1fr]">
      <aside className="flex flex-col border-b border-accent/12 bg-[#F5F2EC] lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="border-b border-accent/10 px-5.5 py-5.5">
          <Link href={routes.home} className="mb-4 flex items-baseline gap-2">
            <span className="font-serif text-xl tracking-[0.14em] text-accent">VITALIS</span>
            <span className="inline-block h-1.25 w-1.25 rounded-full bg-[var(--color-accent-hover)]" />
          </Link>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-foreground/40">
            Expediente digital
          </div>
        </div>
        <nav className="flex flex-wrap gap-2 overflow-y-auto p-4.5 lg:block lg:flex-1 lg:gap-0 lg:p-0 lg:py-4.5">
          <div className="mb-2.5 hidden font-mono text-[9.5px] uppercase tracking-[0.14em] text-foreground/38 lg:block lg:px-5.5">
            Carpetas
          </div>
          {carpetaLabels.map((label) => {
            const active = carpeta === label;
            return (
              <button
                key={label}
                onClick={() => {
                  setCarpeta(label);
                  setAnio("Todos");
                  setQuery("");
                }}
                className="flex w-auto items-center gap-2.5 rounded-full border-0 px-4 py-2.5 text-sm lg:w-full lg:justify-between lg:rounded-none lg:border-l-2 lg:px-5.5 lg:py-2.5"
                style={{
                  background: active ? "rgba(29,111,184,.10)" : "transparent",
                  color: active ? "var(--color-accent)" : "rgba(15,26,36,.7)",
                  fontWeight: active ? 500 : 400,
                  borderLeftColor: active ? "var(--color-accent)" : "transparent",
                }}
              >
                {label}
                <span className="font-mono text-[10.5px] text-foreground/35">
                  {data[label].docs.length}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3.5 border-b border-accent/12 bg-background/95 px-5 py-3.5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-2 text-[13.5px] text-foreground/50">
            <span>Expediente</span>
            <span className="opacity-40">/</span>
            <span className="text-foreground">{carpeta}</span>
          </div>
          <div className="flex w-full items-center gap-3.5 sm:w-auto sm:flex-1 sm:justify-end">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar documento…"
              className="min-w-0 flex-1 rounded-full border border-accent/18 bg-background px-4.5 py-2.5 text-[13.5px] outline-none sm:max-w-[260px]"
            />
            <button className="whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-[13.5px] font-medium text-white hover:bg-[var(--color-accent-hover)]">
              Descargar selección
            </button>
          </div>
        </header>

        <div className="max-w-[1180px] px-5 py-6.5 sm:px-8 sm:py-9">
          <h1 className="mb-2 font-serif text-[30px] font-light leading-tight text-accent sm:text-[38px]">
            {carpeta}
          </h1>
          <p className="mb-7 text-[14.5px] font-light text-foreground/55">{folder.desc}</p>

          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            {anioLabels.map((label) => (
              <button
                key={label}
                onClick={() => setAnio(label)}
                className="rounded-full border px-4 py-2 font-mono text-[13px]"
                style={{
                  borderColor: anio === label ? "var(--color-accent)" : "rgba(11,59,102,.2)",
                  background: anio === label ? "var(--color-accent)" : "transparent",
                  color: anio === label ? "var(--background)" : "rgba(15,26,36,.6)",
                }}
              >
                {label}
              </button>
            ))}
            <span className="ml-auto font-mono text-[11.5px] text-foreground/45">
              {docs.length} de {folder.docs.length} documentos
            </span>
          </div>

          <div className="overflow-hidden rounded-md border border-accent/15 bg-background">
            <div className="overflow-x-auto">
              <div className="grid min-w-[640px] grid-cols-[2fr_minmax(88px,0.8fr)_minmax(88px,0.8fr)_minmax(64px,0.6fr)_auto] gap-4 border-b border-accent/12 bg-[#F5F2EC] px-5.5 py-3.5 font-mono text-[9.5px] uppercase tracking-[0.13em] text-foreground/45">
                <span>Documento</span>
                <span>Versión</span>
                <span>Actualizado</span>
                <span>Peso</span>
                <span />
              </div>
              {docs.length === 0 ? (
                <div className="px-5.5 py-14 text-center text-[14.5px] font-light text-foreground/45">
                  No hay documentos que coincidan con la búsqueda.
                </div>
              ) : (
                docs.map((d) => (
                  <div
                    key={d.nombre}
                    className="grid min-w-[640px] grid-cols-[2fr_minmax(88px,0.8fr)_minmax(88px,0.8fr)_minmax(64px,0.6fr)_auto] items-center gap-4 border-b border-accent/7 px-5.5 py-3.5 text-[14.5px]"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="flex-none rounded-[3px] border border-[var(--color-accent-hover)]/40 px-1 font-mono text-[9.5px] text-[var(--color-accent-hover)]">
                        {d.tipo}
                      </span>
                      <span className="truncate text-accent">{d.nombre}</span>
                    </span>
                    <span className="whitespace-nowrap font-mono text-xs text-foreground/50">{d.version}</span>
                    <span className="whitespace-nowrap font-mono text-[11.5px] text-foreground/45">{d.fecha}</span>
                    <span className="whitespace-nowrap font-mono text-[11.5px] text-foreground/35">{d.peso}</span>
                    <a href="#" className="whitespace-nowrap text-[13px] text-[var(--color-accent-hover)]">
                      Descargar
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6.5 grid grid-cols-1 gap-4.5 sm:grid-cols-2">
            <div className="rounded-md border border-accent/14 bg-[#F5F2EC] px-6.5 py-6.5">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/45">
                Control de versiones
              </div>
              <p className="m-0 text-[14.5px] font-light leading-relaxed text-foreground/65">
                Cada documento conserva sus versiones anteriores. Si tu auditor pide la corrida
                original de marzo, sigue ahí.
              </p>
            </div>
            <div className="rounded-md border border-accent/14 bg-[#F5F2EC] px-6.5 py-6.5">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/45">
                Permisos por rol
              </div>
              <p className="m-0 text-[14.5px] font-light leading-relaxed text-foreground/65">
                Finanzas, RH y los miembros del comité ven carpetas distintas. Toda consulta queda
                en bitácora.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
