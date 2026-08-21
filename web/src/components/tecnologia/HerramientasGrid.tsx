"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

const toolsData = [
  { nombre: "Cotizador", publico: "Empresa", estado: "En línea", body: "Estima el costo de tu valuación de pasivos laborales con seis datos y recibe la propuesta formal por correo.", cta: "Cotizar", href: routes.pasivosLaborales + "#cotizador", grupo: "Empresa" },
  { nombre: "Calculadora de ahorro", publico: "Colaborador", estado: "En línea", body: "Cuánto necesita ahorrar cada mes un colaborador para sostener la pensión que quiere.", cta: "Probar", href: "#calculadora", grupo: "Colaborador" },
  { nombre: "Expediente digital", publico: "Empresa", estado: "Requiere acceso", body: "Dictámenes, estados de cuenta y actas del comité con control de versiones y permisos por rol.", cta: "Entrar", href: routes.expedienteDigital, grupo: "Empresa" },
  { nombre: "Graficador", publico: "Comité", estado: "En línea", body: "Compara el rendimiento de tu fondo contra su benchmark y contra las estrategias Vitalis en el periodo que elijas.", cta: "Abrir", href: routes.graficador, grupo: "Comité" },
  { nombre: "Kit de inversiones", publico: "Comité", estado: "Requiere acceso", body: "Factsheets, política de inversión, actas y material de sesión listos para tu próximo comité.", cta: "Descargar", href: "https://vitalis.com.mx/data/kitv/expv/", grupo: "Comité" },
  { nombre: "Millas para el Retiro", publico: "Colaborador", estado: "En línea", body: "El primer sistema de ahorro para el retiro a través del gasto cotidiano. Innovación reconocida a nivel mundial.", cta: "Conocer", href: "https://millasparaelretiro.com", grupo: "Colaborador" },
];

const filtros = ["Todas", "Empresa", "Comité", "Colaborador"];

export function HerramientasGrid() {
  const [filtro, setFiltro] = useState("Todas");

  const shown = useMemo(
    () => toolsData.filter((t) => filtro === "Todas" || t.grupo === filtro),
    [filtro]
  );

  return (
    <section id="herramientas" className="scroll-mt-20 border-t border-accent/12">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24">
        <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
          01 — Herramientas
        </div>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-8">
          <h2 className="max-w-[520px] font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
            Seis herramientas en operación
          </h2>
          <div className="flex flex-wrap gap-2">
            {filtros.map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className="rounded-full border px-4 py-2 text-[13.5px]"
                style={{
                  borderColor: filtro === f ? "var(--color-accent)" : "rgba(11,59,102,.2)",
                  background: filtro === f ? "var(--color-accent)" : "transparent",
                  color: filtro === f ? "var(--background)" : "rgba(15,26,36,.62)",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((t) => (
            <Link
              key={t.nombre}
              href={t.href}
              className="flex min-h-[230px] flex-col gap-3 rounded-md border border-accent/15 bg-background px-7 py-7 hover:border-[var(--color-accent-hover)]/45 hover:bg-[#F2F6FB]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10.5px] tracking-[0.1em] text-foreground/42">
                  {t.publico}
                </span>
                <span
                  className="rounded-[3px] px-2 py-0.5 font-mono text-[10px]"
                  style={{
                    background: t.estado === "En línea" ? "rgba(62,142,90,.12)" : "rgba(11,59,102,.08)",
                    color: t.estado === "En línea" ? "#2F6B45" : "rgba(15,26,36,.5)",
                  }}
                >
                  {t.estado}
                </span>
              </div>
              <span className="font-serif text-[24px] leading-snug text-accent">{t.nombre}</span>
              <span className="text-[14.5px] font-light leading-relaxed text-foreground/62">
                {t.body}
              </span>
              <span className="mt-auto text-[13.5px] text-[var(--color-accent-hover)]">
                {t.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
