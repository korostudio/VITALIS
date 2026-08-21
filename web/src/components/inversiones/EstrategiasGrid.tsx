"use client";

import { useMemo, useState } from "react";

const estrategias = [
  { nombre: "Deuda Mexicana", clave: "VTLS-RF MXN", clase: "Deuda", moneda: "MXN" },
  { nombre: "High Conviction Global Equity", clave: "VTLS-RV MXN", clase: "Renta variable", moneda: "MXN" },
  { nombre: "High Conviction Global Equity", clave: "MH Fund RV", clase: "Renta variable", moneda: "MXN" },
  { nombre: "Global Balanceada", clave: "INBEST MXN", clase: "Balanceado", moneda: "MXN" },
  { nombre: "Global Balanced Asset Allocation", clave: "V-GAA USD", clase: "Balanceado", moneda: "USD" },
  { nombre: "Global Balanced", clave: "VITALIX-A USD", clase: "Balanceado", moneda: "USD" },
  { nombre: "European Megatrends", clave: "European Megatrends USD", clase: "Renta variable", moneda: "USD" },
  { nombre: "Global Trends", clave: "T ETF USD", clase: "Renta variable", moneda: "USD" },
  { nombre: "Global Balanced Asset Allocation", clave: "V-GAA EUR", clase: "Balanceado", moneda: "EUR" },
  { nombre: "Global Balanced", clave: "VITALIX-A EUR", clase: "Balanceado", moneda: "EUR" },
  { nombre: "European Megatrends", clave: "European Megatrends EUR", clase: "Renta variable", moneda: "EUR" },
];

const clases = ["Todas", "Deuda", "Balanceado", "Renta variable"];
const monedas = ["Todas", "MXN", "USD", "EUR"];

function FilterButton({
  label,
  active,
  onClick,
  mono = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  mono?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[13.5px] ${mono ? "font-mono" : ""}`}
      style={{
        borderColor: active ? "var(--color-accent)" : "rgba(11,59,102,.2)",
        background: active ? "var(--color-accent)" : "transparent",
        color: active ? "var(--background)" : "rgba(15,26,36,.62)",
      }}
    >
      {label}
    </button>
  );
}

export function EstrategiasGrid() {
  const [clase, setClase] = useState("Todas");
  const [moneda, setMoneda] = useState("Todas");

  const shown = useMemo(
    () =>
      estrategias.filter(
        (e) => (clase === "Todas" || e.clase === clase) && (moneda === "Todas" || e.moneda === moneda)
      ),
    [clase, moneda]
  );

  return (
    <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-[104px]">
      <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
        04 — Estrategias
      </div>
      <div className="mb-9 flex flex-wrap items-end justify-between gap-8">
        <h2 className="max-w-[520px] font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
          Once estrategias en tres monedas
        </h2>
        <p className="max-w-[400px] text-[15px] font-light leading-relaxed text-foreground/55">
          Cada estrategia cuenta con su factsheet mensual. Descárgalo para ver composición,
          rendimiento y riesgo.
        </p>
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-6 border-b border-accent/14 pb-6">
        <div className="flex flex-wrap gap-2">
          {clases.map((c) => (
            <FilterButton key={c} label={c} active={clase === c} onClick={() => setClase(c)} />
          ))}
        </div>
        <div className="h-6 w-px bg-accent/16" />
        <div className="flex flex-wrap gap-2">
          {monedas.map((m) => (
            <FilterButton key={m} label={m} active={moneda === m} onClick={() => setMoneda(m)} mono />
          ))}
        </div>
        <span className="ml-auto font-mono text-[11.5px] text-foreground/45">
          {shown.length} de {estrategias.length} estrategias
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((e, i) => (
          <div
            key={e.clave + i}
            className="flex min-h-[190px] flex-col gap-3 rounded-md border border-accent/15 bg-background px-6 py-6 hover:bg-[#F2F6FB]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10.5px] tracking-[0.1em] text-foreground/42">
                {e.clase}
              </span>
              <span className="rounded-[3px] bg-[var(--color-accent-hover)]/10 px-2 py-0.5 font-mono text-[10.5px] text-accent">
                {e.moneda}
              </span>
            </div>
            <span className="font-serif text-[21px] leading-snug text-accent">{e.nombre}</span>
            <span className="font-mono text-xs text-foreground/50">{e.clave}</span>
            <span className="mt-auto flex items-center gap-2 text-[13.5px] text-[var(--color-accent-hover)]">
              <span className="rounded-[3px] border border-[var(--color-accent-hover)]/40 px-1 font-mono text-[10px]">
                PDF
              </span>
              Factsheet
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
