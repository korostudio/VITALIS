"use client";

import { useState } from "react";

const normas = [
  { code: "NIF D-3", title: "Norma de Información Financiera D-3", body: "Beneficios a los empleados bajo normatividad mexicana. Determina el costo neto del periodo, la obligación por beneficios definidos y las remediciones que van a ORI. Es la norma que exige tu auditor si reportas en México.", aplica: "Empresas mexicanas que reportan bajo NIF." },
  { code: "IFRS · IAS 19", title: "IAS 19 · Employee Benefits", body: "Estándar internacional para grupos que consolidan bajo IFRS. Incluye el detalle de sensibilidad de la tasa de descuento y el análisis de duración de la obligación que solicitan los comités de auditoría.", aplica: "Filiales de grupos internacionales y emisoras en bolsa." },
  { code: "US GAAP · ASC 715", title: "ASC 715 · Compensation — Retirement Benefits", body: "Requerido cuando la matriz reporta en Estados Unidos. Entregamos el paquete de revelaciones en el formato y calendario que pide el corporativo, en inglés si se necesita.", aplica: "Subsidiarias de matrices estadounidenses." },
  { code: "German GAAP", title: "German GAAP · HGB", body: "Valuación bajo normatividad alemana para grupos con matriz en Alemania, incluyendo el uso de las tasas promedio publicadas por el Bundesbank.", aplica: "Subsidiarias de grupos alemanes." },
];

export function NormaSelector() {
  const [active, setActive] = useState(0);
  const current = normas[active];

  return (
    <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-[104px]">
      <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
        02 — Normatividad
      </div>
      <h2 className="mb-3 max-w-[620px] font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
        Valuamos bajo la norma que te exige tu matriz o tu auditor
      </h2>
      <p className="mb-9 text-[15px] font-light text-foreground/50">
        Selecciona una norma para ver el alcance.
      </p>
      <div className="mb-5.5 flex flex-wrap gap-2.5">
        {normas.map((n, i) => (
          <button
            key={n.code}
            onClick={() => setActive(i)}
            className="rounded-full border px-5 py-2.5 text-[14.5px]"
            style={{
              borderColor: active === i ? "var(--color-accent)" : "rgba(11,59,102,.22)",
              background: active === i ? "var(--color-accent)" : "transparent",
              color: active === i ? "var(--background)" : "rgba(15,26,36,.65)",
              fontWeight: active === i ? 500 : 400,
            }}
          >
            {n.code}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-10 rounded-md border border-accent/14 bg-[#F5F2EC] px-8 py-10 sm:px-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <h3 className="mb-4.5 font-serif text-[26px] leading-snug text-accent sm:text-[30px]">
            {current.title}
          </h3>
          <p className="m-0 text-[17px] font-light leading-relaxed text-foreground/72">
            {current.body}
          </p>
        </div>
        <div className="border-t border-accent/14 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
            Aplica a
          </div>
          <p className="m-0 text-[15px] font-light leading-relaxed text-foreground/70">
            {current.aplica}
          </p>
        </div>
      </div>
    </section>
  );
}
