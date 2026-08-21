"use client";

import { useMemo, useState } from "react";

const DEUDA = [1, 8, 18, 25, 33, 42, 50, 59, 68, 72, 82, 85, 93, 99, 105, 118, 130, 134, 138, 147, 150, 157];
const TOTAL = [2, 17, 47, 64, 36, 73, 76, 77, 88, 111, 133, 147, 171, 179, 164, 169, 189, 216, 188, 203, 225, 219];
const YEARS = DEUDA.map((_, i) => 2004 + i);

const L = 0;
const R = 900;
const T = 10;
const B = 300;
const VH = 320;
const MAX = 250;

const X = (i: number) => L + ((R - L) * i) / (YEARS.length - 1);
const Y = (v: number) => B - ((B - T) * v) / MAX;
const line = (arr: number[]) =>
  arr.map((v, i) => (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(v).toFixed(1)).join(" ");
const areaOf = (top: number[], bottom: number[]) =>
  line(top) +
  " " +
  bottom
    .map((_, i) => {
      const idx = bottom.length - 1 - i;
      return "L" + X(idx).toFixed(1) + " " + Y(bottom[idx]).toFixed(1);
    })
    .join(" ") +
  " Z";
const pct = (n: number) => n.toFixed(1) + "%";

export function ReturnsChart({
  kicker = "03 — Rendimientos",
  title = "Veintiún años de rendimiento acumulado",
  note = "Cifras ilustrativas de la gráfica actual del sitio. Rendimientos pasados no garantizan resultados futuros.",
}: {
  kicker?: string;
  title?: string;
  note?: string;
} = {}) {
  const [showDeuda, setShowDeuda] = useState(true);
  const [showRv, setShowRv] = useState(true);
  const [hover, setHover] = useState<number | null>(null);

  const chart = useMemo(() => {
    const dSeries = DEUDA.map((v) => (showDeuda ? v : 0));
    const tSeries = DEUDA.map((v, i) => (showDeuda ? v : 0) + (showRv ? TOTAL[i] - v : 0));
    const zeros = dSeries.map(() => 0);
    const hi = hover ?? YEARS.length - 1;

    return {
      gridLines: [0, 50, 100, 150, 200, 250].map((v) => ({
        y: Y(v).toFixed(1),
        top: ((Y(v) / VH) * 100).toFixed(2) + "%",
        label: String(v),
      })),
      xLabels: YEARS.map((y, i) => ({
        left: ((X(i) / 900) * 100).toFixed(2) + "%",
        label: String(y),
      })),
      areaDeuda: showDeuda ? areaOf(dSeries, zeros) : "",
      areaTotal: showRv ? areaOf(tSeries, dSeries) : "",
      lineDeuda: showDeuda ? line(dSeries) : "",
      lineTotal: showRv ? line(tSeries) : "",
      cursorX: X(hi).toFixed(1),
      cursorYd: Y(dSeries[hi]).toFixed(1),
      cursorYt: Y(tSeries[hi]).toFixed(1),
      cursorOn: hover == null ? 0.45 : 1,
      hoverYear: YEARS[hi],
      hoverDeuda: pct(DEUDA[hi]),
      hoverRv: pct(TOTAL[hi] - DEUDA[hi]),
    };
  }, [showDeuda, showRv, hover]);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 900;
    const i = Math.round(((px - L) / (R - L)) * (YEARS.length - 1));
    setHover(Math.max(0, Math.min(YEARS.length - 1, i)));
  };

  const toggles = [
    { key: "deuda", label: "Vitalis Deuda", on: showDeuda, dot: "var(--color-accent-hover)", set: setShowDeuda },
    { key: "rv", label: "Vitalis Renta Variable", on: showRv, dot: "rgba(11,59,102,.35)", set: setShowRv },
  ];

  return (
    <section className="border-t border-accent/12">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-[104px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
              {kicker}
            </div>
            <h2 className="max-w-[560px] font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
              {title}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {toggles.map((t) => (
              <button
                key={t.key}
                onClick={() => t.set((v) => !v)}
                className="flex items-center gap-2 rounded-full border px-4 py-2 text-[13.5px]"
                style={{
                  borderColor: t.on ? "rgba(29,111,184,.4)" : "rgba(11,59,102,.18)",
                  background: t.on ? "rgba(29,111,184,.08)" : "transparent",
                  color: t.on ? "var(--color-accent)" : "rgba(15,26,36,.42)",
                }}
              >
                <span
                  className="inline-block h-2.5 w-2.5 rounded-sm"
                  style={{ background: t.dot }}
                />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative rounded-md border border-accent/14 bg-background p-5 pb-4 sm:p-7">
          <div className="mb-4.5 flex min-h-13 flex-wrap gap-8 sm:gap-11">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/45">
                Año
              </div>
              <div className="font-serif text-[26px] leading-tight text-accent sm:text-[30px]">
                {chart.hoverYear}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/45">
                Vitalis Deuda
              </div>
              <div className="font-serif text-[26px] leading-tight text-[var(--color-accent-hover)] sm:text-[30px]">
                {chart.hoverDeuda}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/45">
                Vitalis Renta Variable
              </div>
              <div className="font-serif text-[26px] leading-tight text-accent sm:text-[30px]">
                {chart.hoverRv}
              </div>
            </div>
            <div className="ml-auto self-end text-[12.5px] font-light text-foreground/45">
              Índice base 100 = enero 2004
            </div>
          </div>

          <div className="pl-9 sm:pl-11">
            <div className="relative">
              {chart.gridLines.map((g) => (
                <div
                  key={g.label}
                  className="absolute w-8 -translate-y-1/2 text-right font-mono text-[10px] text-foreground/40 sm:w-[34px]"
                  style={{ left: "-36px", top: g.top }}
                >
                  {g.label}
                </div>
              ))}
              <svg
                viewBox="0 0 900 320"
                onMouseMove={onMove}
                onMouseLeave={() => setHover(null)}
                className="block w-full cursor-crosshair"
              >
                {chart.gridLines.map((g) => (
                  <line
                    key={g.label}
                    x1="0"
                    y1={g.y}
                    x2="900"
                    y2={g.y}
                    stroke="rgba(11,59,102,.10)"
                    strokeWidth="1"
                  />
                ))}
                {chart.areaTotal && <path d={chart.areaTotal} fill="rgba(11,59,102,.16)" />}
                {chart.areaDeuda && <path d={chart.areaDeuda} fill="rgba(29,111,184,.75)" />}
                {chart.lineTotal && (
                  <path d={chart.lineTotal} fill="none" stroke="#0B3B66" strokeWidth="1.4" />
                )}
                {chart.lineDeuda && (
                  <path d={chart.lineDeuda} fill="none" stroke="#0B3B66" strokeWidth="1.4" />
                )}
                <g opacity={chart.cursorOn}>
                  <line
                    x1={chart.cursorX}
                    y1="10"
                    x2={chart.cursorX}
                    y2="300"
                    stroke="#0B3B66"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <circle cx={chart.cursorX} cy={chart.cursorYd} r="4.5" fill="#1D6FB8" stroke="#fff" strokeWidth="2" />
                  <circle cx={chart.cursorX} cy={chart.cursorYt} r="4.5" fill="#0B3B66" stroke="#fff" strokeWidth="2" />
                </g>
              </svg>
            </div>
            <div className="relative mt-1.5 h-5.5">
              {chart.xLabels.map((x) => (
                <div
                  key={x.label}
                  className="absolute -translate-x-1/2 whitespace-nowrap font-mono text-[9.5px] text-foreground/42 max-sm:[&:nth-child(4n+2)]:hidden max-sm:[&:nth-child(4n+3)]:hidden max-sm:[&:nth-child(4n+4)]:hidden"
                  style={{ left: x.left }}
                >
                  {x.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-[12.5px] font-light text-foreground/45">{note}</p>
      </div>
    </section>
  );
}
