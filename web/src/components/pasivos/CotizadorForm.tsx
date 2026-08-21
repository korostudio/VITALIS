"use client";

import { useState } from "react";
import { Input } from "@heroui/react";
import { routes, whatsappHref } from "@/lib/routes";
import Link from "next/link";

const campos = [
  { label: "Empresa", ph: "Razón social", span: "col-span-2" },
  { label: "Número de razones sociales", ph: "Ej. 2", span: "col-span-1" },
  { label: "Número de empleados", ph: "Ej. 350", span: "col-span-1" },
  { label: "Nombre", ph: "Nombre y apellido", span: "col-span-1" },
  { label: "Teléfono", ph: "55 0000 0000", span: "col-span-1" },
  { label: "Correo corporativo", ph: "nombre@empresa.com", span: "col-span-2" },
];

const fieldClass =
  "w-full rounded-none border-0 border-b border-accent/25 bg-transparent p-0 pb-2 text-[15px] outline-none shadow-none";

function BinaryToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/50">
        {label}
      </div>
      <div className="flex gap-2">
        {["No", "Sí"].map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="rounded-full border px-5 py-2 text-sm"
            style={{
              borderColor: value === opt ? "var(--color-accent)" : "rgba(11,59,102,.22)",
              background: value === opt ? "var(--color-accent)" : "transparent",
              color: value === opt ? "var(--background)" : "rgba(15,26,36,.6)",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CotizadorForm() {
  const [sindicato, setSindicato] = useState("No");
  const [plan, setPlan] = useState("No");

  return (
    <section id="cotizador" className="scroll-mt-20 bg-accent text-[#EAF2FA]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-14 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-[100px]">
        <div className="lg:sticky lg:top-[110px]">
          <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FC0EC]">
            06 — Cotización
          </div>
          <h2 className="mb-5.5 font-serif text-[32px] font-light leading-[1.12] sm:text-[44px]">
            Solicita tu propuesta
          </h2>
          <p className="mb-7.5 text-[16.5px] font-light leading-relaxed text-[#EAF2FA]/72">
            Seis datos y te enviamos una propuesta formal en menos de 48 horas hábiles. Sin costo
            y sin compromiso.
          </p>
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-white/35 px-6 py-3.5 text-[14.5px] font-medium text-[#EAF2FA] hover:bg-white/8"
          >
            Prefiero cotizar por WhatsApp
          </Link>
        </div>

        <div className="rounded-md bg-background p-7 text-foreground shadow-[0_30px_60px_rgba(0,0,0,0.22)] sm:p-11">
          <form className="grid grid-cols-1 gap-5.5 sm:grid-cols-2">
            {campos.map((f) => (
              <label key={f.label} className={`flex flex-col gap-2 ${f.span}`}>
                <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/50">
                  {f.label}
                </span>
                <Input placeholder={f.ph} variant="secondary" className={fieldClass} />
              </label>
            ))}
            <div className="col-span-2 mt-1 grid grid-cols-1 gap-5.5 sm:grid-cols-2">
              <BinaryToggle label="¿Tienen sindicato?" value={sindicato} onChange={setSindicato} />
              <BinaryToggle label="¿Tienen plan de pensiones?" value={plan} onChange={setPlan} />
            </div>
            <button
              type="button"
              className="col-span-2 mt-3 rounded-full bg-accent py-4 text-[15px] font-medium text-white hover:bg-[var(--color-accent-hover)]"
            >
              Solicitar propuesta
            </button>
            <p className="col-span-2 m-0 text-xs font-light leading-relaxed text-foreground/45">
              Al enviar aceptas nuestro{" "}
              <Link href={routes.enConstruccion} className="underline">
                Aviso de Privacidad
              </Link>
              . Usamos tus datos únicamente para preparar la propuesta.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
