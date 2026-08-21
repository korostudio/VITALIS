import Link from "next/link";
import { routes } from "@/lib/routes";

export function SimpleFooter({
  blurb,
  links,
}: {
  blurb: string;
  links: { label: string; href: string }[];
}) {
  return (
    <footer className="bg-[#08284A] text-[14px] text-white/70">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 pb-8 pt-14 sm:px-10 sm:pt-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4.5 font-serif text-[26px] tracking-[0.14em] text-background">
            VITALIS
          </div>
          <p className="max-w-[300px] font-light leading-[1.65]">{blurb}</p>
        </div>
        <div>
          <div className="mb-4.5 font-mono text-[10.5px] uppercase tracking-[0.13em] text-white/45">
            México
          </div>
          <p className="font-light leading-[1.65]">
            Gobernador Rafael Rebollar 47 y 56, San Miguel Chapultepec, C.P. 11850, CDMX
            <br />
            T: 52 (55) 5235 3000
          </p>
        </div>
        <div>
          <div className="mb-4.5 font-mono text-[10.5px] uppercase tracking-[0.13em] text-white/45">
            Más
          </div>
          <div className="flex flex-col gap-[11px]">
            {links.map((link) => (
              <Link key={link.label} href={link.href} className="font-light text-white/72 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 border-t border-white/10 px-5 pb-10 pt-5 text-[12.5px] text-white/45 sm:flex-row sm:justify-between sm:px-10">
        <span>©2026 Todos los derechos reservados · Vitalis</span>
        <Link href={routes.enConstruccion} className="text-white/60 hover:text-white">
          Aviso de Privacidad
        </Link>
      </div>
    </footer>
  );
}
