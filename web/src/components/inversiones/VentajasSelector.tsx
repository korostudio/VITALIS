"use client";

import { useState } from "react";

const ventajas = [
  { n: "01", title: "Estrategia personalizada", body: "Entendemos las necesidades, la naturaleza y los riesgos de las obligaciones detrás de los activos de cada cliente, para ofrecer un producto adecuado y rendimientos consistentes a través del tiempo." },
  { n: "02", title: "Incentivos alineados", body: "Estamos siempre alineados con el rendimiento de nuestros clientes: nuestros honorarios dependen principalmente del desempeño de las inversiones." },
  { n: "03", title: "Independencia sin retrocesión", body: "Independencia frente a los intermediarios financieros relacionados con nuestro proceso de inversión. No recibimos remuneración alguna, ni en dinero ni en especie." },
  { n: "04", title: "Seguimiento continuo", body: "Contamos con una metodología de seguimiento diario que nos permite controlar y monitorear rendimientos, benchmarking y comisiones cobradas por las instituciones financieras." },
  { n: "05", title: "Sólida experiencia actuarial", body: "El asset allocation se construye a partir de la demografía de la empresa y la exigibilidad de las obligaciones en el tiempo. Con ese análisis optimizamos los portafolios e invertimos con mayor eficiencia." },
];

export function VentajasSelector() {
  const [active, setActive] = useState(0);
  const current = ventajas[active];

  return (
    <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-[104px]">
      <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
        02 — Ventajas competitivas
      </div>
      <h2 className="mb-3 max-w-[620px] font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
        Cinco razones por las que un comité de inversión nos elige
      </h2>
      <p className="mb-11 text-[15px] font-light text-foreground/50">
        Selecciona una para ver el detalle.
      </p>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col border-t border-accent/14">
          {ventajas.map((v, i) => (
            <button
              key={v.n}
              onClick={() => setActive(i)}
              className="flex items-baseline gap-4 border-b border-accent/14 py-5 pl-4 text-left"
              style={{
                borderLeft: `2px solid ${active === i ? "var(--color-accent)" : "transparent"}`,
                background: active === i ? "rgba(29,111,184,.07)" : "transparent",
              }}
            >
              <span className="font-mono text-[11px] text-foreground/40">{v.n}</span>
              <span
                className="text-[17px]"
                style={{
                  color: active === i ? "var(--color-accent)" : "rgba(15,26,36,.7)",
                  fontWeight: active === i ? 500 : 400,
                }}
              >
                {v.title}
              </span>
            </button>
          ))}
        </div>
        <div className="flex min-h-[300px] flex-col rounded-md border border-accent/14 bg-[#F5F2EC] px-8 py-10 sm:px-10">
          <div className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-accent-hover)]">
            {current.n} · Ventaja
          </div>
          <h3 className="mb-5 font-serif text-[26px] leading-snug text-accent sm:text-[32px]">
            {current.title}
          </h3>
          <p className="m-0 text-[17px] font-light leading-relaxed text-foreground/72">
            {current.body}
          </p>
        </div>
      </div>
    </section>
  );
}
