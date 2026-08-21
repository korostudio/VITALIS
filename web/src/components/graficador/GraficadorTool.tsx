"use client";

import { useMemo, useState } from "react";

const series = [
  { label: "Deuda Mexicana", color: "#1D6FB8", r: [8.2, 7.5, 6.9, 7.8, 5.1, 9.4, 7.2, 8.8, 7.1, 4.6, 6.3, 4.2, 6.8, 7.4, 8.1, 9.2, 6.4, 3.8, 7.9, 11.2, 10.4, 9.1] },
  { label: "High Conviction Global Equity", color: "#0B3B66", r: [22.4, 17.8, 31.2, 12.6, -28.4, 34.7, 15.2, -3.6, 16.8, 21.4, 9.7, 3.2, 12.4, 18.6, -6.8, 24.3, 14.9, 21.7, -14.2, 19.8, 16.4, 11.3] },
  { label: "Global Balanced Asset Allocation", color: "#6FA8D8", r: [11.2, 9.4, 14.6, 7.2, -14.8, 18.4, 10.2, 1.4, 11.6, 13.2, 6.8, 2.1, 8.4, 12.7, -3.2, 17.1, 10.4, 13.8, -9.6, 13.4, 11.2, 8.6] },
  { label: "Inflación (INPC)", color: "#B08A4A", r: [5.2, 3.3, 4.1, 3.8, 6.5, 3.6, 4.4, 3.8, 3.6, 4.0, 4.1, 2.1, 3.4, 6.8, 4.8, 2.8, 3.2, 7.4, 7.8, 4.7, 4.2, 3.9] },
];
const allYears = series[0].r.map((_, i) => 2004 + i);
const periodos = ["1A", "3A", "5A", "10A", "Máx"] as const;
const vistas = ["Acumulado", "Rendimiento anual"] as const;
const spans: Record<(typeof periodos)[number], number> = { "1A": 1, "3A": 3, "5A": 5, "10A": 10, Máx: allYears.length };

const T = 8;
const B = 318;
const VH = 340;

function fmtPct(v: number) {
  return (v >= 0 ? "+" : "") + v.toFixed(1) + "%";
}

export function GraficadorTool() {
  const [periodo, setPeriodo] = useState<(typeof periodos)[number]>("Máx");
  const [vista, setVista] = useState<(typeof vistas)[number]>("Acumulado");
  const [on, setOn] = useState<Record<number, boolean>>({ 0: true, 1: true, 3: true });
  const [hover, setHover] = useState<number | null>(null);

  const acum = vista === "Acumulado";

  const chart = useMemo(() => {
    const span = spans[periodo];
    const start = Math.max(0, allYears.length - span);
    const years = allYears.slice(start);
    const idx = series.map((_, i) => i).filter((i) => on[i]);

    const curves = idx.map((i) => {
      const vals = [100];
      for (let k = start; k < allYears.length; k++) {
        vals.push(vals[vals.length - 1] * (1 + series[i].r[k] / 100));
      }
      return { i, vals, rets: series[i].r.slice(start) };
    });

    const pts = acum ? years.length + 1 : years.length;
    let lo: number, hi: number;
    if (acum) {
      const all = curves.reduce((a: number[], c) => a.concat(c.vals), [100]);
      lo = Math.min(...all);
      hi = Math.max(...all);
    } else {
      const all = curves.reduce((a: number[], c) => a.concat(c.rets), [0]);
      lo = Math.min(...all);
      hi = Math.max(...all);
    }
    const pad = (hi - lo) * 0.12 || 10;
    hi = hi + pad;
    lo = acum ? Math.max(0, lo - pad) : lo - pad;

    const slot = 900 / Math.max(1, years.length);
    const X = (i: number) => (pts === 1 ? 450 : (900 * i) / (pts - 1));
    const Y = (v: number) => B - (B - T) * ((v - lo) / (hi - lo));

    const ticks = [];
    for (let k = 0; k <= 5; k++) {
      const v = lo + ((hi - lo) * k) / 5;
      ticks.push({
        y: Y(v).toFixed(1),
        top: ((Y(v) / VH) * 100).toFixed(2) + "%",
        label: acum ? String(Math.round(v)) : Math.round(v) + "%",
      });
    }

    const paths = acum
      ? curves.map((c) => ({
          color: series[c.i].color,
          d: c.vals.map((v, k) => (k ? "L" : "M") + X(k).toFixed(1) + " " + Y(v).toFixed(1)).join(" "),
        }))
      : [];

    const bars: { x: string; y: string; w: string; h: string; fill: string }[] = [];
    if (!acum && curves.length) {
      const bw = Math.max(2, (slot * 0.68) / curves.length);
      const y0 = Y(0);
      curves.forEach((c, ci) => {
        c.rets.forEach((v, k) => {
          const x = slot * k + slot * 0.16 + bw * ci;
          const y = Math.min(Y(v), y0);
          const h = Math.abs(Y(v) - y0);
          bars.push({ x: x.toFixed(1), y: y.toFixed(1), w: bw.toFixed(1), h: Math.max(1, h).toFixed(1), fill: series[c.i].color });
        });
      });
    }

    const hpos = hover == null ? years.length - 1 : Math.min(hover, years.length - 1);

    const stats = curves.map((c) => {
      const tot = c.vals[c.vals.length - 1] / 100 - 1;
      const n = c.rets.length;
      return {
        label: series[c.i].label,
        color: series[c.i].color,
        acum: fmtPct(tot * 100),
        anual: fmtPct((Math.pow(1 + tot, 1 / n) - 1) * 100),
        mejor: fmtPct(Math.max(...c.rets)),
        peor: fmtPct(Math.min(...c.rets)),
        positivos: c.rets.filter((v) => v > 0).length + " de " + n,
      };
    });

    return {
      years,
      ticks,
      paths,
      bars,
      hoverYear: years[hpos] ?? "—",
      hoverVals: curves.map((c) => ({
        label: series[c.i].label,
        color: series[c.i].color,
        value: acum ? Math.round(c.vals[hpos]) : fmtPct(c.rets[hpos]),
      })),
      dots: acum ? curves.map((c) => ({ x: X(hpos).toFixed(1), y: Y(c.vals[hpos]).toFixed(1), color: series[c.i].color })) : [],
      cursorX: X(hpos).toFixed(1),
      cursorOn: acum ? (hover == null ? 0.4 : 1) : 0,
      stats,
      rango: years[0] + " – " + years[years.length - 1] + (acum ? " · base 100" : " · variación anual"),
      xLabels: years.map((y, i) => ({ left: ((X(i) / 900) * 100).toFixed(2) + "%", label: String(y) })),
    };
  }, [periodo, acum, on, hover]);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const i = Math.round(((e.clientX - rect.left) / rect.width) * (chart.years.length - 1));
    setHover(Math.max(0, Math.min(chart.years.length - 1, i)));
  };

  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-10 sm:px-10">
      <div className="overflow-hidden rounded-lg border border-accent/15 bg-background">
        <div className="flex flex-wrap items-center gap-6 border-b border-accent/12 bg-[#F5F2EC] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.13em] text-foreground/45">
              Periodo
            </span>
            <div className="flex gap-0.5 rounded-full bg-accent/6 p-0.5">
              {periodos.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPeriodo(p);
                    setHover(null);
                  }}
                  className="rounded-full px-3.5 py-1.5 font-mono text-[12.5px] font-medium"
                  style={{
                    background: periodo === p ? "var(--color-accent)" : "transparent",
                    color: periodo === p ? "#fff" : "rgba(15,26,36,.55)",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.13em] text-foreground/45">
              Vista
            </span>
            <div className="flex gap-0.5 rounded-full bg-accent/6 p-0.5">
              {vistas.map((v) => (
                <button
                  key={v}
                  onClick={() => setVista(v)}
                  className="rounded-full px-3.5 py-1.5 text-[12.5px] font-medium"
                  style={{
                    background: vista === v ? "var(--color-accent)" : "transparent",
                    color: vista === v ? "#fff" : "rgba(15,26,36,.55)",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <span className="ml-auto font-mono text-[11px] text-foreground/42">{chart.rango}</span>
        </div>

        <div className="flex flex-wrap gap-2.5 border-b border-accent/10 px-5 py-4">
          {series.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setOn((st) => ({ ...st, [i]: !st[i] }))}
              className="flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px]"
              style={{
                borderColor: on[i] ? "rgba(29,111,184,.4)" : "rgba(11,59,102,.18)",
                background: on[i] ? "rgba(29,111,184,.08)" : "transparent",
                color: on[i] ? "var(--color-accent)" : "rgba(15,26,36,.42)",
              }}
            >
              <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
              {s.label}
            </button>
          ))}
        </div>

        <div className="px-5 pb-4 pt-6 sm:px-6.5">
          <div className="mb-3.5 flex min-h-[52px] flex-wrap gap-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/45">
                Año
              </div>
              <div className="font-serif text-[26px] leading-tight text-accent sm:text-[30px]">
                {chart.hoverYear}
              </div>
            </div>
            {chart.hoverVals.map((h) => (
              <div key={h.label}>
                <div className="max-w-[140px] truncate font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/45">
                  {h.label}
                </div>
                <div className="font-serif text-[26px] leading-tight sm:text-[30px]" style={{ color: h.color }}>
                  {h.value}
                </div>
              </div>
            ))}
          </div>

          <div className="pl-11 sm:pl-13">
            <div className="relative">
              {chart.ticks.map((g, i) => (
                <div
                  key={i}
                  className="absolute w-10 -translate-y-1/2 text-right font-mono text-[10px] text-foreground/40"
                  style={{ left: "-44px", top: g.top }}
                >
                  {g.label}
                </div>
              ))}
              <svg
                viewBox="0 0 900 340"
                onMouseMove={onMove}
                onMouseLeave={() => setHover(null)}
                className="block w-full cursor-crosshair"
              >
                {chart.ticks.map((g, i) => (
                  <line key={i} x1="0" y1={g.y} x2="900" y2={g.y} stroke="rgba(11,59,102,.10)" strokeWidth="1" />
                ))}
                {chart.bars.map((b, i) => (
                  <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.fill} />
                ))}
                {chart.paths.map((p, i) => (
                  <path key={i} d={p.d} fill="none" stroke={p.color} strokeWidth="2" strokeLinejoin="round" />
                ))}
                <g opacity={chart.cursorOn}>
                  <line x1={chart.cursorX} y1="8" x2={chart.cursorX} y2="318" stroke="#0B3B66" strokeWidth="1" strokeDasharray="3 3" />
                  {chart.dots.map((d, i) => (
                    <circle key={i} cx={d.x} cy={d.y} r="4.5" fill={d.color} stroke="#fff" strokeWidth="2" />
                  ))}
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

        <div className="overflow-x-auto border-t border-accent/12">
          <div className="grid min-w-[640px] grid-cols-[1.6fr_repeat(5,1fr)] gap-3.5 bg-[#F5F2EC] px-6.5 py-3.5 font-mono text-[9.5px] uppercase tracking-[0.13em] text-foreground/45">
            <span>Estrategia</span>
            <span>Acumulado</span>
            <span>Anualizado</span>
            <span>Mejor año</span>
            <span>Peor año</span>
            <span>Años positivos</span>
          </div>
          {chart.stats.map((s) => (
            <div
              key={s.label}
              className="grid min-w-[640px] grid-cols-[1.6fr_repeat(5,1fr)] items-center gap-3.5 border-b border-accent/7 px-6.5 py-3.5 text-sm"
            >
              <span className="flex items-center gap-2.5 font-medium text-accent">
                <span className="inline-block h-2.5 w-2.5 flex-none rounded-sm" style={{ background: s.color }} />
                {s.label}
              </span>
              <span className="font-mono text-[13.5px]">{s.acum}</span>
              <span className="font-mono text-[13.5px]">{s.anual}</span>
              <span className="font-mono text-[13.5px] text-[#2F6B45]">{s.mejor}</span>
              <span className="font-mono text-[13.5px] text-[#B4483C]">{s.peor}</span>
              <span className="font-mono text-[13.5px] text-foreground/60">{s.positivos}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[12.5px] font-light text-foreground/45">
        Cifras ilustrativas para efectos de demostración. Rendimientos pasados no garantizan
        resultados futuros. Consulta el factsheet de cada estrategia en la{" "}
        <a href="/inversiones">página de Inversiones</a>.
      </p>
    </section>
  );
}
