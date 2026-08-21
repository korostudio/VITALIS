import Link from "next/link";
import { routes } from "@/lib/routes";

const footerCols = [
  {
    title: "Experiencia",
    links: [
      { label: "Pasivos laborales", href: routes.pasivosLaborales },
      { label: "Planes de pensiones", href: routes.planesDePensiones },
      { label: "Inversiones", href: routes.inversiones },
    ],
  },
  {
    title: "Tecnología",
    links: [
      { label: "Calculadora", href: routes.tecnologia },
      { label: "Cotizador", href: routes.pasivosLaborales },
      { label: "Documentos", href: routes.tecnologia },
    ],
  },
  {
    title: "Vitalis",
    links: [
      { label: "Nosotros", href: routes.nosotros },
      { label: "Usuarios", href: routes.usuarios },
      { label: "Contacto", href: routes.enConstruccion },
    ],
  },
];

const badges = ["UNPRI", "ABELICA", "FIP 2026"];

export function Footer() {
  return (
    <footer className="bg-[#08284A] text-[14px] text-white/70">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 pb-10 pt-16 sm:px-10 sm:pt-[72px] md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-[18px] font-serif text-[26px] tracking-[0.14em] text-background">
            VITALIS
          </div>
          <p className="mb-[22px] max-w-[280px] font-light leading-[1.65]">
            Vitalis® Expertos en Pensiones S.A. de C.V. Asesor independiente certificado UNPRI.
          </p>
          <div className="flex gap-2.5">
            {badges.map((badge) => (
              <div
                key={badge}
                className="flex h-[34px] w-[88px] items-center justify-center rounded-[3px] bg-white/9 font-mono text-[9px] text-white/50"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
        {footerCols.map((col) => (
          <div key={col.title}>
            <div className="mb-[18px] font-mono text-[10.5px] uppercase tracking-[0.13em] text-white/45">
              {col.title}
            </div>
            <div className="flex flex-col gap-[11px]">
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-light text-white/72 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 border-t border-white/10 px-5 pb-10 pt-[22px] text-[12.5px] text-white/45 sm:flex-row sm:justify-between sm:px-10">
        <span>©2026 Todos los derechos reservados · Vitalis</span>
        <Link href={routes.enConstruccion} className="text-white/60 hover:text-white">
          Aviso de Privacidad
        </Link>
      </div>
    </footer>
  );
}
