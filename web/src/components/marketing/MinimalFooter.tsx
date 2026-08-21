import Link from "next/link";
import { routes } from "@/lib/routes";

export function MinimalFooter({ className = "" }: { className?: string }) {
  return (
    <footer className={`bg-[#08284A] text-[12.5px] text-white/55 ${className}`}>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-6.5 sm:flex-row sm:justify-between sm:px-10">
        <span>©2026 Todos los derechos reservados · Vitalis</span>
        <Link href={routes.enConstruccion} className="text-white/60 hover:text-white">
          Aviso de Privacidad
        </Link>
      </div>
    </footer>
  );
}
