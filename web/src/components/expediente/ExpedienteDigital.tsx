"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

type Doc = { tipo: string; nombre: string; version: string; fecha: string; peso: string; anio: string };

const data: Record<string, { desc: string; docs: Doc[] }> = {
  "Valuaciones actuariales": {
    desc: "Dictámenes y notas de revelación de cada ejercicio, firmados por actuario certificado.",
    docs: [
      { tipo: "PDF", nombre: "Dictamen actuarial NIF D-3 · ejercicio 2025", version: "v2", fecha: "12 ene 2026", peso: "1.2 MB", anio: "2026" },
      { tipo: "PDF", nombre: "Notas de revelación · estados financieros 2025", version: "v1", fecha: "12 ene 2026", peso: "480 KB", anio: "2026" },
      { tipo: "XLSX", nombre: "Escenarios de sensibilidad · tasa de descuento", version: "v3", fecha: "09 ene 2026", peso: "220 KB", anio: "2026" },
      { tipo: "PDF", nombre: "Dictamen actuarial NIF D-3 · ejercicio 2024", version: "v1", fecha: "15 ene 2025", peso: "1.1 MB", anio: "2025" },
      { tipo: "PDF", nombre: "Conciliación con valuación anterior", version: "v1", fecha: "15 ene 2025", peso: "310 KB", anio: "2025" },
    ],
  },
  "Estados de cuenta": {
    desc: "Corte mensual del fondo con rendimiento, aportaciones y retiros del periodo.",
    docs: [
      { tipo: "PDF", nombre: "Estado de cuenta del fondo · julio 2026", version: "v1", fecha: "05 ago 2026", peso: "340 KB", anio: "2026" },
      { tipo: "PDF", nombre: "Estado de cuenta del fondo · junio 2026", version: "v1", fecha: "04 jul 2026", peso: "336 KB", anio: "2026" },
      { tipo: "XLSX", nombre: "Movimientos del trimestre · abril–junio 2026", version: "v2", fecha: "04 jul 2026", peso: "180 KB", anio: "2026" },
      { tipo: "PDF", nombre: "Estado de cuenta anual · ejercicio 2025", version: "v1", fecha: "20 ene 2026", peso: "620 KB", anio: "2026" },
    ],
  },
  "Comité de inversión": {
    desc: "Actas, material de sesión y política vigente del comité.",
    docs: [
      { tipo: "PDF", nombre: "Acta de sesión · comité 2026-02", version: "v1", fecha: "22 jul 2026", peso: "260 KB", anio: "2026" },
      { tipo: "PPTX", nombre: "Material de sesión · desempeño y asignación", version: "v2", fecha: "20 jul 2026", peso: "4.6 MB", anio: "2026" },
      { tipo: "PDF", nombre: "Política de inversión vigente", version: "v4", fecha: "14 feb 2026", peso: "520 KB", anio: "2026" },
      { tipo: "PDF", nombre: "Acta de sesión · comité 2025-04", version: "v1", fecha: "18 nov 2025", peso: "244 KB", anio: "2025" },
    ],
  },
  "Plan de pensiones": {
    desc: "Reglamento, registro ante autoridades y padrón de participantes.",
    docs: [
      { tipo: "PDF", nombre: "Reglamento del plan de pensiones", version: "v3", fecha: "03 mar 2026", peso: "780 KB", anio: "2026" },
      { tipo: "PDF", nombre: "Registro del plan ante autoridades", version: "v1", fecha: "28 sep 2024", peso: "410 KB", anio: "2024" },
      { tipo: "XLSX", nombre: "Padrón de participantes · corte julio 2026", version: "v7", fecha: "02 ago 2026", peso: "1.4 MB", anio: "2026" },
    ],
  },
  Contratos: {
    desc: "Contrato de servicios, convenios modificatorios y avisos de privacidad firmados.",
    docs: [
      { tipo: "PDF", nombre: "Contrato de prestación de servicios actuariales", version: "v2", fecha: "11 feb 2025", peso: "560 KB", anio: "2025" },
      { tipo: "PDF", nombre: "Convenio modificatorio · alcance IFRS", version: "v1", fecha: "06 may 2026", peso: "180 KB", anio: "2026" },
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
        <div className="border-t border-accent/10 px-5.5 py-4">
          <div className="text-[13px] font-medium text-accent">Grupo Herradura</div>
          <div className="mt-0.5 text-[11.5px] text-foreground/45">
            m.fernandez@herradura.mx · Lectura
          </div>
          <Link
            href={routes.tecnologia}
            className="mt-3 inline-block text-[12.5px] text-foreground/50"
          >
            Salir del expediente
          </Link>
        </div>
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
