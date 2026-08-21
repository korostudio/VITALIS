import Link from "next/link";
import { routes } from "@/lib/routes";

const services = [
  {
    num: "01",
    title: "Inversiones",
    body: "Gestión de activos institucionales con procesos y rendimientos auditados.",
    href: routes.inversiones,
  },
  {
    num: "02",
    title: "Pasivos laborales",
    body: "Valuaciones actuariales bajo NIF D-3, IFRS y US GAAP.",
    href: routes.pasivosLaborales,
  },
  {
    num: "03",
    title: "Planes de pensiones",
    body: "Diseño, implementación y administración de planes privados.",
    href: routes.planesDePensiones,
  },
  {
    num: "04",
    title: "Tecnología",
    body: "Calculadora, cotizador y expediente digital para tu comité.",
    href: routes.tecnologia,
  },
];

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-[104px]">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-8 sm:mb-12">
        <div>
          <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
            01 — Nuestros servicios
          </div>
          <h2 className="max-w-[560px] font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
            Cuatro prácticas, una sola conversación sobre el futuro
          </h2>
        </div>
        <Link
          href={routes.enConstruccion}
          className="whitespace-nowrap border-b border-accent/30 pb-1 text-[14.5px]"
        >
          Ver todos los servicios →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-px border border-accent/13 bg-accent/13 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Link
            key={service.num}
            href={service.href}
            className="flex min-h-[280px] flex-col gap-4 bg-background px-7 py-9 hover:bg-[#F2F6FB]"
          >
            <span className="font-mono text-[11px] tracking-[0.14em] text-foreground/35">
              {service.num}
            </span>
            <span className="font-serif text-[25px] leading-tight text-accent">
              {service.title}
            </span>
            <span className="text-[14.5px] font-light leading-relaxed text-foreground/62">
              {service.body}
            </span>
            <span className="mt-auto text-[13.5px] text-[var(--color-accent-hover)]">
              Conocer más →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
