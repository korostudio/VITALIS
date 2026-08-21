"use client";

import { useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

const archivosData: Record<string, { tipo: string; nombre: string; fecha: string; peso: string }[]> = {
  Valuaciones: [
    { tipo: "PDF", nombre: "Dictamen actuarial NIF D-3 · Ejercicio 2025", fecha: "12 ene 2026", peso: "1.2 MB" },
    { tipo: "PDF", nombre: "Notas de revelación · Estados financieros 2025", fecha: "12 ene 2026", peso: "480 KB" },
    { tipo: "XLSX", nombre: "Escenarios de sensibilidad · tasa de descuento", fecha: "09 ene 2026", peso: "220 KB" },
    { tipo: "PDF", nombre: "Dictamen actuarial NIF D-3 · Ejercicio 2024", fecha: "15 ene 2025", peso: "1.1 MB" },
  ],
  "Estados de cuenta": [
    { tipo: "PDF", nombre: "Estado de cuenta del fondo · julio 2026", fecha: "05 ago 2026", peso: "340 KB" },
    { tipo: "PDF", nombre: "Estado de cuenta del fondo · junio 2026", fecha: "04 jul 2026", peso: "336 KB" },
    { tipo: "XLSX", nombre: "Movimientos del trimestre · abril–junio 2026", fecha: "04 jul 2026", peso: "180 KB" },
  ],
  "Comité de inversión": [
    { tipo: "PDF", nombre: "Acta de sesión · comité de inversión 2026-02", fecha: "22 jul 2026", peso: "260 KB" },
    { tipo: "PPTX", nombre: "Material de sesión · desempeño y asignación", fecha: "20 jul 2026", peso: "4.6 MB" },
    { tipo: "PDF", nombre: "Política de inversión vigente", fecha: "14 feb 2026", peso: "520 KB" },
  ],
};

const carpetas = Object.keys(archivosData);

export function DocumentPreview() {
  const [carpeta, setCarpeta] = useState(carpetas[0]);

  return (
    <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-[104px]">
      <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
        03 — Documentos
      </div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[72px]">
        <div className="lg:sticky lg:top-[110px] lg:self-start">
          <h2 className="mb-5.5 font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
            Tu expediente actuarial, siempre disponible
          </h2>
          <p className="mb-6.5 text-[16.5px] font-light leading-relaxed text-foreground/68">
            Dictámenes, estados de cuenta, reportes de inversión y actas del comité en un solo
            lugar, con control de versiones y acceso por rol. Se acabó buscar el PDF en el correo
            del año pasado.
          </p>
          <Link href={routes.expedienteDigital} className="border-b border-accent/30 pb-1 text-[15px]">
            Entrar al expediente digital →
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg border border-accent/15 bg-background shadow-[0_18px_44px_rgba(11,59,102,0.09)]">
          <div className="flex items-center gap-3 border-b border-accent/12 bg-[#F5F2EC] px-4.5 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-accent/18" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/18" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/18" />
            </div>
            <span className="font-mono text-[11px] text-foreground/45">
              vitalis.com.mx/documentos
            </span>
          </div>
          <div className="flex gap-6 overflow-x-auto border-b border-accent/12 px-5">
            {carpetas.map((c) => (
              <button
                key={c}
                onClick={() => setCarpeta(c)}
                className="whitespace-nowrap border-b-2 py-3.5 text-[13.5px]"
                style={{
                  borderColor: carpeta === c ? "var(--color-accent)" : "transparent",
                  color: carpeta === c ? "var(--color-accent)" : "rgba(15,26,36,.5)",
                  fontWeight: carpeta === c ? 500 : 400,
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="py-1.5">
            {archivosData[carpeta].map((a) => (
              <div
                key={a.nombre}
                className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-accent/7 px-5 py-3.5 sm:grid-cols-[1fr_auto_auto] sm:gap-5"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <span className="flex-none rounded-[3px] border border-[var(--color-accent-hover)]/40 px-1 font-mono text-[9.5px] text-[var(--color-accent-hover)]">
                    {a.tipo}
                  </span>
                  <span className="truncate text-[14.5px] text-accent">{a.nombre}</span>
                </div>
                <span className="hidden font-mono text-[11.5px] text-foreground/45 sm:block">
                  {a.fecha}
                </span>
                <span className="font-mono text-[11.5px] text-foreground/35">{a.peso}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
