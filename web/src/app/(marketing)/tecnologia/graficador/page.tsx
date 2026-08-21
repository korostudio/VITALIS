import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@heroui/styles";
import { GraficadorTool } from "@/components/graficador/GraficadorTool";
import { MinimalFooter } from "@/components/marketing/MinimalFooter";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Graficador · Vitalis" };

export default function GraficadorPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1280px] px-5 pt-8 sm:px-10 sm:pt-10">
        <div className="mb-6 font-mono text-[11.5px] text-foreground/45">
          <Link href={routes.home} className="text-foreground/45 hover:text-[var(--color-accent-hover)]">
            Inicio
          </Link>{" "}
          ·{" "}
          <Link href={routes.tecnologia} className="text-foreground/45 hover:text-[var(--color-accent-hover)]">
            Tecnología
          </Link>{" "}
          · <span className="text-accent">Graficador</span>
        </div>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-8">
          <div>
            <h1 className="mb-3 font-serif text-[34px] font-light leading-[1.08] text-accent sm:text-[46px]">
              Graficador
            </h1>
            <p className="max-w-[560px] text-[16.5px] font-light leading-relaxed text-foreground/62">
              Compara el rendimiento histórico de nuestras estrategias entre sí y contra la
              inflación. Elige el periodo y la vista.
            </p>
          </div>
          <div className="flex gap-2.5">
            <button className="rounded-full border border-accent/20 px-5 py-2.5 text-[13.5px] text-accent hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]/6">
              Descargar CSV
            </button>
            <Link
              href={routes.enConstruccion}
              className={buttonVariants({ size: "sm" }) + " !rounded-full"}
            >
              Hablar con un asesor
            </Link>
          </div>
        </div>
      </section>

      <GraficadorTool />

      <MinimalFooter className="mt-14" />
    </main>
  );
}
