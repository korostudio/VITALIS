"use client";

import { Input } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";

export interface GlobalData {
  tel: string;
  whats: string;
  correo: string;
  cnbv: string;
  mx: string;
  ca: string;
  pt: string;
  linkedin: string;
  legal: string;
}

export const defaultGlobalData: GlobalData = {
  tel: "52 (55) 5235 3000",
  whats: "525541430497",
  correo: "contacto@vitalis.com.mx",
  cnbv: "30053",
  mx: "Gobernador Rafael Rebollar 47 y 56, San Miguel Chapultepec, C.P. 11850, CDMX",
  ca: "4400 Ch. Côte de Liesse, Porte 200, Mont-Royal, Quebec",
  pt: "Campo Grande 35, 4ºD, 1700-087, Lisboa",
  linkedin: "linkedin.com/company/vitalis-pensiones",
  legal: "Vitalis® Expertos en Pensiones S.A. de C.V.",
};

const groups: { title: string; fields: { key: keyof GlobalData; label: string; span?: boolean }[] }[] = [
  {
    title: "Contacto",
    fields: [
      { key: "tel", label: "Teléfono" },
      { key: "whats", label: "WhatsApp" },
      { key: "correo", label: "Correo de contacto" },
      { key: "cnbv", label: "Registro CNBV" },
    ],
  },
  {
    title: "Oficinas",
    fields: [
      { key: "mx", label: "Ciudad de México", span: true },
      { key: "ca", label: "Mont-Royal, Canadá", span: true },
      { key: "pt", label: "Lisboa, Portugal", span: true },
    ],
  },
  {
    title: "Pie de página",
    fields: [
      { key: "linkedin", label: "LinkedIn" },
      { key: "legal", label: "Razón social" },
    ],
  },
];

export function GlobalDataScreen({
  data,
  savedNote,
  onChange,
  onSave,
}: {
  data: GlobalData;
  savedNote: string;
  onChange: (key: keyof GlobalData, value: string) => void;
  onSave: () => void;
}) {
  return (
    <div className="max-w-[900px] px-5 py-11 sm:px-9">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-6">
        <h1 className="font-serif text-[34px] font-light text-accent sm:text-[40px]">Datos globales</h1>
        <button onClick={onSave} className={buttonVariants({ size: "md" }) + " !rounded-full"}>
          Guardar
        </button>
      </div>
      <p className="mb-10 max-w-[600px] text-[15px] font-light text-foreground/55">
        Se repiten en todas las páginas: barra superior, pie de página y botones de contacto. Cambiarlos aquí los
        cambia en todo el sitio.
        {savedNote && <span className="ml-2 text-foreground/40">{savedNote}</span>}
      </p>

      {groups.map((g) => (
        <div key={g.title} className="mb-11">
          <h2 className="mb-5 font-serif text-2xl text-accent">{g.title}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {g.fields.map((f) => (
              <label key={f.key} className={`flex flex-col gap-2 ${f.span ? "sm:col-span-2" : ""}`}>
                <span className="text-[13px] text-foreground/60">{f.label}</span>
                <Input
                  variant="secondary"
                  className="w-full"
                  value={data[f.key]}
                  onChange={(e) => onChange(f.key, e.target.value)}
                />
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
