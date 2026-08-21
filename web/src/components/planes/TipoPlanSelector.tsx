"use client";

import { useState } from "react";

const tipos = [
  {
    label: "Beneficio definido",
    title: "Beneficio definido",
    body: "La empresa promete una pensión calculada con una fórmula —años de servicio por salario final— y asume el riesgo de alcanzarla. La aportación varía cada año según el resultado de la valuación actuarial.",
    ideal: "Plantillas estables, con antigüedad alta y sindicato.",
    specs: [
      { k: "Riesgo", v: "Lo asume la empresa" },
      { k: "Aportación", v: "Variable, definida por valuación anual" },
      { k: "Predictibilidad para el empleado", v: "Alta" },
    ],
  },
  {
    label: "Contribución definida",
    title: "Contribución definida",
    body: "La empresa aporta un porcentaje fijo del salario a una cuenta individual. El monto de la pensión depende de lo acumulado y del rendimiento de la inversión. El costo es conocido desde el inicio.",
    ideal: "Plantillas jóvenes, con rotación media y crecimiento.",
    specs: [
      { k: "Riesgo", v: "Lo asume el colaborador" },
      { k: "Aportación", v: "Fija y presupuestable" },
      { k: "Predictibilidad para el empleado", v: "Media" },
    ],
  },
  {
    label: "Híbrido",
    title: "Plan híbrido",
    body: "Contribución definida con un piso mínimo garantizado por la empresa. Combina el costo controlado del primero con la certeza del segundo, y es la estructura que más recomendamos cuando hay dos generaciones muy distintas en la nómina.",
    ideal: "Empresas con plantilla mixta y presupuesto acotado.",
    specs: [
      { k: "Riesgo", v: "Compartido" },
      { k: "Aportación", v: "Fija más reserva por el piso garantizado" },
      { k: "Predictibilidad para el empleado", v: "Alta" },
    ],
  },
];

export function TipoPlanSelector() {
  const [active, setActive] = useState(0);
  const current = tipos[active];

  return (
    <section className="border-t border-accent/12 bg-[#F5F2EC]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-[100px]">
        <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
          03 — Tipos de plan
        </div>
        <h2 className="mb-3 max-w-[620px] font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
          Tres estructuras posibles. La diferencia está en quién asume el riesgo
        </h2>
        <p className="mb-9 text-[15px] font-light text-foreground/50">
          Selecciona una estructura para ver el detalle.
        </p>
        <div className="mb-6 flex flex-wrap gap-2.5">
          {tipos.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className="rounded-full border px-5 py-2.5 text-[14.5px]"
              style={{
                borderColor: active === i ? "var(--color-accent)" : "rgba(11,59,102,.22)",
                background: active === i ? "var(--color-accent)" : "transparent",
                color: active === i ? "var(--background)" : "rgba(15,26,36,.65)",
                fontWeight: active === i ? 500 : 400,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-10 rounded-md border border-accent/14 bg-background px-8 py-10 sm:px-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h3 className="mb-4.5 font-serif text-[26px] leading-snug text-accent sm:text-[30px]">
              {current.title}
            </h3>
            <p className="mb-6 text-[17px] font-light leading-relaxed text-foreground/72">
              {current.body}
            </p>
            <div className="text-[14.5px] font-light text-foreground/60">
              <span className="font-medium text-accent">Ideal para: </span>
              {current.ideal}
            </div>
          </div>
          <div className="flex flex-col gap-5.5 border-t border-accent/14 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {current.specs.map((s) => (
              <div key={s.k}>
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/45">
                  {s.k}
                </div>
                <div className="text-[15.5px] font-light text-foreground/78">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
