"use client";

import { useState } from "react";
import { Input } from "@heroui/react";

const bullets = [
  "Cifras preliminares al 30 de septiembre para cerrar a tiempo",
  "Dictamen actuarial firmado por actuario certificado",
  "Escenarios de sensibilidad de tasa de descuento",
  "Acompañamiento con auditores y comité de inversión",
];

const chipDefs = ["Sindicato", "Plan de pensiones", "Fondo de ahorro", "Multi-razón social"];

const fieldClass =
  "w-full rounded-none border-0 border-b border-accent/25 bg-transparent p-0 pb-2 text-[15px] outline-none shadow-none";

export function LiabilitiesSection() {
  const [chips, setChips] = useState<Record<string, boolean>>({});

  return (
    <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-14 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:py-[104px]">
      <div>
        <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
          04 — Para la dirección financiera
        </div>
        <h2 className="mb-6 font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
          Valuación de pasivos laborales con cifras anticipadas
        </h2>
        <p className="mb-8.5 text-[17px] font-light leading-[1.65] text-foreground/66">
          Realizamos tu valuación bajo NIF D-3, IFRS o US GAAP con información al 30 de
          septiembre, para que cierres estados financieros a tiempo y sin sorpresas.
        </p>
        <ul className="flex flex-col border-t border-accent/13">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-baseline gap-4 border-b border-accent/13 py-4 text-[15.5px] font-light text-foreground/78"
            >
              <span className="h-1.25 w-1.25 flex-none rounded-full bg-[var(--color-accent-hover)]" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-md border border-accent/16 bg-[#F5F2EC] p-7 sm:p-10">
        <h3 className="mb-1.5 font-serif text-2xl text-accent">Solicita tu propuesta</h3>
        <p className="mb-7 text-[13.5px] font-light text-foreground/55">
          Respuesta en menos de 48 horas hábiles.
        </p>
        <form className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="col-span-full flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/50">
              Empresa
            </span>
            <Input placeholder="Razón social" variant="secondary" className={fieldClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/50">
              Núm. de empleados
            </span>
            <Input placeholder="Ej. 350" variant="secondary" className={fieldClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/50">
              Razones sociales
            </span>
            <Input placeholder="Ej. 2" variant="secondary" className={fieldClass} />
          </label>
          <div className="col-span-full mt-1.5 flex flex-col gap-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/50">
              Perfil de la empresa
            </span>
            <div className="flex flex-wrap gap-2.5">
              {chipDefs.map((label) => {
                const on = !!chips[label];
                return (
                  <button
                    type="button"
                    key={label}
                    onClick={() => setChips((s) => ({ ...s, [label]: !s[label] }))}
                    className="rounded-full border px-4 py-2 text-[13.5px]"
                    style={{
                      background: on ? "var(--color-accent)" : "transparent",
                      color: on ? "var(--background)" : "rgba(15,26,36,.7)",
                      borderColor: on ? "var(--color-accent)" : "rgba(11,59,102,.25)",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/50">
              Nombre
            </span>
            <Input placeholder="Nombre y apellido" variant="secondary" className={fieldClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/50">
              Correo corporativo
            </span>
            <Input placeholder="nombre@empresa.com" variant="secondary" className={fieldClass} />
          </label>
          <button
            type="button"
            className="col-span-full mt-2 rounded-full bg-accent py-4 text-[15px] font-medium text-white hover:bg-[var(--color-accent-hover)]"
          >
            Solicitar propuesta
          </button>
        </form>
      </div>
    </section>
  );
}
