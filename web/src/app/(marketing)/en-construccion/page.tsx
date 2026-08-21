import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@heroui/styles";
import { MinimalFooter } from "@/components/marketing/MinimalFooter";
import { routes, whatsappHref } from "@/lib/routes";

export const metadata: Metadata = { title: "En construcción · Vitalis" };

export default async function EnConstruccionPage({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }>;
}) {
  const { p } = await searchParams;
  const pageName = p || "Sección";

  return (
    <>
      <main className="flex flex-1 items-center">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-14 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:py-28">
          <div>
            <div className="mb-5.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
              {pageName}
            </div>
            <h1 className="mb-6 font-serif text-[38px] font-light leading-[1.06] tracking-[-0.02em] text-accent sm:text-[48px] lg:text-[62px]">
              Esta sección está{" "}
              <span className="italic text-[var(--color-accent-hover)]">en construcción</span>
            </h1>
            <p className="mb-9 max-w-[480px] text-lg font-light leading-relaxed text-foreground/66">
              Estamos rediseñando esta página como parte de la nueva experiencia Vitalis. Mientras
              tanto, nuestro equipo puede atenderte directamente.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link href={routes.home} className={buttonVariants({ size: "lg" }) + " !rounded-full"}>
                Ir al inicio
              </Link>
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: "lg", variant: "outline" }) + " !rounded-full"}
              >
                Escribir por WhatsApp
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 border-t border-accent/13 pt-6 text-[14.5px] font-light text-foreground/60">
              <span>T: 52 (55) 5235 3000</span>
              <span>contacto@vitalis.com.mx</span>
            </div>
          </div>
          <div
            className="flex aspect-square items-end rounded p-6"
            style={{ background: "repeating-linear-gradient(135deg, #E7EEF6 0 12px, #F3F7FB 12px 24px)" }}
          >
            <span className="font-mono text-[11px] tracking-[0.08em] text-accent/50">
              imagen de sección · pendiente
            </span>
          </div>
        </div>
      </main>
      <MinimalFooter />
    </>
  );
}
