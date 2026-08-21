"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";

const data = [
  { titulo: "Qué cambia en la NIF D-3 para el cierre 2026", cat: "Actuaría", fecha: "12 ago 2026", autor: "Alejandra Lozano", lectura: "6 min", extracto: "Las remediciones y el tratamiento de la tasa de descuento cambian el costo neto que reconocerás este ejercicio. Qué revisar antes de septiembre.", tint: "azul" },
  { titulo: "Tasa de reemplazo: por qué el 30% no alcanza", cat: "Pensiones", fecha: "28 jul 2026", autor: "Mauricio Cervantes", lectura: "5 min", extracto: "La seguridad social rara vez sostiene el nivel de vida del último salario. Cómo se construye el resto con los otros dos pilares.", tint: "arena" },
  { titulo: "Carta trimestral de inversiones · 2T 2026", cat: "Inversiones", fecha: "15 jul 2026", autor: "Comité de inversión", lectura: "8 min", extracto: "Duración, exposición a divisas y las decisiones tácticas del trimestre en nuestras estrategias de deuda y renta variable.", tint: "azul" },
  { titulo: "Cinco preguntas que tu comité debería hacer cada año", cat: "Inversiones", fecha: "02 jul 2026", autor: "Rodrigo Silva", lectura: "4 min", extracto: "Comisiones, benchmark, duración frente a la exigibilidad del pasivo y calidad de la información. Un guion corto para la sesión.", tint: "arena" },
  { titulo: "Vitalis en el Foro de Inversión Previsional 2026", cat: "Prensa", fecha: "18 jun 2026", autor: "Comunicación", lectura: "3 min", extracto: "Participamos en el panel sobre integración de criterios ESG en portafolios de fondos de pensiones mexicanos.", tint: "azul" },
  { titulo: "Millas para el Retiro cumple cinco años", cat: "Prensa", fecha: "30 may 2026", autor: "Comunicación", lectura: "3 min", extracto: "El primer sistema de ahorro para el retiro a través del gasto, y lo que aprendimos de sus primeros usuarios.", tint: "arena" },
];

const filtros = ["Todas", "Actuaría", "Pensiones", "Inversiones", "Prensa"];

export function BlogListing() {
  const [cat, setCat] = useState("Todas");

  const { destacado, resto } = useMemo(() => {
    const shown = data.filter((p) => cat === "Todas" || p.cat === cat);
    const dest = cat === "Todas" ? shown[0] : null;
    return { destacado: dest, resto: dest ? shown.slice(1) : shown };
  }, [cat]);

  return (
    <>
      <section className="mx-auto max-w-[1280px] px-5 pt-10 sm:px-10 sm:pt-16">
        <div className="mb-8 font-mono text-[11.5px] text-foreground/45">
          <Link href={routes.home} className="text-foreground/45 hover:text-[var(--color-accent-hover)]">
            Inicio
          </Link>{" "}
          · <span className="text-accent">Blog</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-accent/14 pb-8">
          <div>
            <h1 className="mb-3.5 font-serif text-[38px] font-light leading-[1.05] tracking-[-0.02em] text-accent sm:text-[48px] lg:text-[56px]">
              Publicaciones
            </h1>
            <p className="max-w-[520px] text-[17.5px] font-light leading-relaxed text-foreground/65">
              Lo que escriben nuestros actuarios y gestores sobre normatividad, pensiones y
              mercados.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filtros.map((f) => (
              <button
                key={f}
                onClick={() => setCat(f)}
                className="rounded-full border px-4 py-2 text-[13.5px]"
                style={{
                  borderColor: cat === f ? "var(--color-accent)" : "rgba(11,59,102,.2)",
                  background: cat === f ? "var(--color-accent)" : "transparent",
                  color: cat === f ? "var(--background)" : "rgba(15,26,36,.62)",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 pt-10 sm:px-10">
        {destacado && (
          <Link
            href={routes.blog + "/articulo"}
            className="mb-10 grid grid-cols-1 overflow-hidden rounded-lg border border-accent/15 bg-background hover:border-[var(--color-accent-hover)]/45 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10"
          >
            <div className="px-7 py-10 sm:px-11 sm:py-12">
              <div className="mb-5 flex items-center gap-3.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent-hover)]">
                  Destacado
                </span>
                <span className="h-px w-5 bg-accent/25" />
                <span className="font-mono text-[11px] text-foreground/45">
                  {destacado.cat} · {destacado.fecha}
                </span>
              </div>
              <h2 className="mb-4.5 font-serif text-[28px] font-light leading-snug text-accent sm:text-[34px]">
                {destacado.titulo}
              </h2>
              <p className="mb-6 text-[16.5px] font-light leading-relaxed text-foreground/66">
                {destacado.extracto}
              </p>
              <div className="flex items-center gap-3.5 text-[13.5px] text-foreground/50">
                <span>{destacado.autor}</span>
                <span className="opacity-40">·</span>
                <span>{destacado.lectura}</span>
              </div>
            </div>
            <div className="relative min-h-[220px] lg:min-h-[340px]">
              <Image
                src="/images/article-cover.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 gap-6 pb-16 sm:grid-cols-2 sm:pb-24 lg:grid-cols-3">
          {resto.map((p) => (
            <Link
              key={p.titulo}
              href={routes.blog + "/articulo"}
              className="flex flex-col overflow-hidden rounded-lg border border-accent/15 bg-background hover:border-[var(--color-accent-hover)]/45 hover:bg-[#F7FAFD]"
            >
              <div className="relative flex h-[160px] items-end p-3.5">
                <Image
                  src="/images/article-cover.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover"
                />
                <span className="relative rounded-[3px] bg-background px-2 py-1 font-mono text-[9.5px] text-[var(--color-accent-hover)]">
                  {p.cat}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 px-6 py-6">
                <span className="font-mono text-[11px] text-foreground/45">{p.fecha}</span>
                <span className="font-serif text-[22px] leading-snug text-accent">{p.titulo}</span>
                <span className="text-[14.5px] font-light leading-relaxed text-foreground/62">
                  {p.extracto}
                </span>
                <span className="mt-auto flex items-center justify-between gap-3 border-t border-accent/12 pt-4 text-[13px] text-foreground/50">
                  {p.autor}
                  <span className="text-[var(--color-accent-hover)]">{p.lectura}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
        {resto.length === 0 && !destacado && (
          <div className="py-16 text-center text-[15.5px] font-light text-foreground/50">
            Todavía no hay publicaciones en esta categoría.
          </div>
        )}
      </section>
    </>
  );
}
