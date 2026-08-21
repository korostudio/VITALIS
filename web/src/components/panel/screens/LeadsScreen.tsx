"use client";

import { useState } from "react";

const leadRows = [
  { empresa: "Grupo Herradura", contacto: "M. Fernández", empleados: "1,240", origen: "Cotizador", fecha: "18 ago 2026" },
  { empresa: "Textiles del Bajío", contacto: "R. Cordero", empleados: "380", origen: "Diagnóstico", fecha: "17 ago 2026" },
  { empresa: "Nova Farma", contacto: "L. Pineda", empleados: "94", origen: "WhatsApp", fecha: "15 ago 2026" },
  { empresa: "Constructora Peña", contacto: "J. Alcántara", empleados: "610", origen: "Cotizador", fecha: "14 ago 2026" },
  { empresa: "Aceros Monterrey", contacto: "S. Vidal", empleados: "2,100", origen: "Diagnóstico", fecha: "12 ago 2026" },
  { empresa: "Editorial Cauce", contacto: "P. Ruiz", empleados: "58", origen: "Cotizador", fecha: "11 ago 2026" },
];

const filtros = ["Todas", "Cotizador", "Diagnóstico", "WhatsApp"] as const;

export function LeadsScreen() {
  const [filter, setFilter] = useState<(typeof filtros)[number]>("Todas");
  const shown = filter === "Todas" ? leadRows : leadRows.filter((l) => l.origen === filter);

  return (
    <div className="max-w-[1180px] px-5 py-11 sm:px-9">
      <h1 className="mb-2 font-serif text-[34px] font-light text-accent sm:text-[40px]">Solicitudes</h1>
      <p className="mb-7 text-[15px] font-light text-foreground/55">
        Formularios de cotización y diagnósticos agendados desde el sitio.
      </p>
      <div className="mb-5 flex flex-wrap gap-2">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="rounded-full border px-4 py-2 text-[13px]"
            style={{
              borderColor: filter === f ? "var(--color-accent)" : "rgba(11,59,102,.2)",
              background: filter === f ? "var(--color-accent)" : "transparent",
              color: filter === f ? "var(--background)" : "rgba(15,26,36,.6)",
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-md border border-accent/14 bg-background">
        <div className="overflow-x-auto">
          <div className="grid min-w-[760px] grid-cols-[1.4fr_1.2fr_0.8fr_1fr_0.9fr] gap-3.5 border-b border-accent/12 bg-[#F5F2EC] px-5 py-3.5 font-mono text-[9.5px] uppercase tracking-[0.13em] text-foreground/45">
            <span>Empresa</span>
            <span>Contacto</span>
            <span>Empleados</span>
            <span>Origen</span>
            <span>Fecha</span>
          </div>
          {shown.map((l) => (
            <div
              key={l.empresa}
              className="grid min-w-[760px] grid-cols-[1.4fr_1.2fr_0.8fr_1fr_0.9fr] items-center gap-3.5 border-b border-accent/8 px-5 py-3.5 text-sm"
            >
              <span className="font-medium text-accent">{l.empresa}</span>
              <span className="font-light text-foreground/70">{l.contacto}</span>
              <span className="font-mono text-[12.5px] text-foreground/55">{l.empleados}</span>
              <span className="text-[12.5px] text-foreground/55">{l.origen}</span>
              <span className="font-mono text-xs text-foreground/45">{l.fecha}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
