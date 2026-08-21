import Link from "next/link";
import { routes } from "@/lib/routes";

export function TopBar() {
  return (
    <div className="bg-accent text-white text-[12.5px] tracking-[0.02em]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-end gap-6 px-5 py-2.5 sm:justify-between sm:px-10">
        <span className="hidden opacity-80 sm:inline">
          Vitalis® Expertos en Pensiones · 34 años administrando el futuro de México
        </span>
        <div className="flex items-center gap-4 sm:gap-[18px]">
          <a href="tel:525552353000" className="text-white opacity-85 hover:text-white">
            52 (55) 5235 3000
          </a>
          <div className="flex items-center gap-0.5">
            <span className="rounded-[3px] bg-white/15 px-2 py-0.5 font-semibold text-white">
              ES
            </span>
            <a href="#!" className="px-2 py-0.5 text-white opacity-60 hover:text-white">
              EN
            </a>
            <a href="#!" className="px-2 py-0.5 text-white opacity-60 hover:text-white">
              FR
            </a>
          </div>
          <Link
            href={routes.panel}
            aria-label="Panel de contenido"
            className="flex items-center text-white opacity-50 hover:opacity-90"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="11" width="16" height="9" rx="1.5" />
              <path d="M7.5 11V7.5a4.5 4.5 0 0 1 9 0V11" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
