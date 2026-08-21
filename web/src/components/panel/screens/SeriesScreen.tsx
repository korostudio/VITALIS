"use client";

import { useMemo } from "react";
import { Input } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";

const PW = 460;
const PH = 240;
const MAX = 250;

export function SeriesScreen({
  rows,
  savedNote,
  onCellChange,
  onSave,
}: {
  rows: [number, number, number][];
  savedNote: string;
  onCellChange: (rowIdx: number, col: 1 | 2, value: number) => void;
  onSave: () => void;
}) {
  const preview = useMemo(() => {
    const n = rows.length;
    const px = (i: number) => (PW * i) / (n - 1);
    const py = (v: number) => PH - 12 - (PH - 24) * (Math.max(0, Math.min(MAX, v)) / MAX);
    const deuda = rows.map((r) => r[1] || 0);
    const total = rows.map((r) => (r[1] || 0) + (r[2] || 0));
    const line = (arr: number[]) =>
      arr.map((v, i) => (i ? "L" : "M") + px(i).toFixed(1) + " " + py(v).toFixed(1)).join(" ");
    const area = (top: number[], bot: number[]) =>
      line(top) +
      " " +
      bot
        .map((_, i) => {
          const idx = bot.length - 1 - i;
          return "L" + px(idx).toFixed(1) + " " + py(bot[idx]).toFixed(1);
        })
        .join(" ") +
      " Z";
    return {
      grid: [0, 50, 100, 150, 200, 250].map((v) => py(v).toFixed(1)),
      areaDeuda: area(deuda, deuda.map(() => 0)),
      areaTotal: area(total, deuda),
    };
  }, [rows]);

  return (
    <div className="max-w-[1120px] px-5 py-11 sm:px-9">
      <div className="mb-2.5 flex flex-wrap items-start justify-between gap-7">
        <h1 className="font-serif text-[34px] font-light text-accent sm:text-[40px]">Series de rendimientos</h1>
        <div className="flex gap-2.5">
          <button onClick={onSave} className={buttonVariants({ size: "md" }) + " !rounded-full"}>
            Guardar
          </button>
        </div>
      </div>
      <p className="mb-8 max-w-[620px] text-[15px] font-light text-foreground/55">
        Alimenta la gráfica de la home. Puedes pegar dos columnas desde Excel directamente sobre la tabla.
        {savedNote && <span className="ml-2 text-foreground/40">{savedNote}</span>}
      </p>

      <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-2">
        <div className="overflow-hidden rounded-md border border-accent/14 bg-background">
          <div className="grid grid-cols-3 gap-3 border-b border-accent/12 bg-[#F5F2EC] px-4.5 py-3 font-mono text-[9.5px] uppercase tracking-[0.13em] text-foreground/45">
            <span>Año</span>
            <span>Deuda</span>
            <span>Renta variable</span>
          </div>
          <div className="max-h-[420px] overflow-y-auto">
            {rows.map((r, i) => (
              <div key={r[0]} className="grid grid-cols-3 items-center gap-3 border-b border-accent/7 px-4.5 py-1.5">
                <span className="font-mono text-[13px] text-foreground/60">{r[0]}</span>
                <Input
                  variant="secondary"
                  className="w-full"
                  value={String(r[1])}
                  onChange={(e) => onCellChange(i, 1, Number(e.target.value) || 0)}
                />
                <Input
                  variant="secondary"
                  className="w-full"
                  value={String(r[2])}
                  onChange={(e) => onCellChange(i, 2, Number(e.target.value) || 0)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-accent/14 bg-background p-5.5 lg:sticky lg:top-22">
          <div className="mb-4 font-mono text-[9.5px] uppercase tracking-[0.13em] text-foreground/45">
            Vista previa en vivo
          </div>
          <svg viewBox="0 0 460 240" className="block w-full">
            {preview.grid.map((y) => (
              <line key={y} x1="0" y1={y} x2="460" y2={y} stroke="rgba(11,59,102,.10)" strokeWidth="1" />
            ))}
            <path d={preview.areaTotal} fill="rgba(11,59,102,.16)" />
            <path d={preview.areaDeuda} fill="rgba(29,111,184,.75)" />
          </svg>
          <div className="mt-4 flex gap-4.5 text-[12.5px] text-foreground/55">
            <span className="inline-flex items-center gap-1.75">
              <span className="inline-block h-2.25 w-2.25 rounded-sm bg-[var(--color-accent-hover)]" />
              Vitalis Deuda
            </span>
            <span className="inline-flex items-center gap-1.75">
              <span className="inline-block h-2.25 w-2.25 rounded-sm bg-accent/35" />
              Vitalis Renta Variable
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
