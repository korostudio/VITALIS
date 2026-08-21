import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@heroui/styles";
import { routes } from "@/lib/routes";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-14 px-5 pb-16 pt-6 sm:px-10 sm:pb-24 sm:pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[72px] lg:pb-[96px] lg:pt-8">
      <div>
        <div className="mb-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
          <span className="inline-block h-px w-[22px] bg-[var(--color-accent-hover)]" />
          Pensiones · Pasivos laborales · Inversiones
        </div>
        <h1 className="mb-6 font-serif text-[44px] font-light leading-[1.05] tracking-[-0.02em] text-accent sm:text-[54px] lg:text-[66px]">
          Creamos valor en el tiempo
          <span className="block italic text-[var(--color-accent-hover)]">
            para un futuro próspero
          </span>
        </h1>
        <p className="mb-10 max-w-[520px] text-lg font-light leading-[1.62] text-foreground/68">
          Actuarios certificados y gestores de inversión que acompañan a empresas y a sus
          colaboradores en el diseño, valuación y administración de sus obligaciones de retiro.
        </p>
        <div className="flex flex-wrap items-center gap-3.5">
          <Link
            href={routes.enConstruccion}
            className={buttonVariants({ size: "lg" }) + " !rounded-full"}
          >
            Agendar diagnóstico
          </Link>
          <Link
            href="#calculadora"
            className={buttonVariants({ size: "lg", variant: "outline" }) + " !rounded-full"}
          >
            Calcular mi ahorro
          </Link>
        </div>
      </div>
      <div className="relative lg:self-end">
        <div className="relative aspect-[4/3.5] overflow-hidden rounded">
          <Image
            src="/images/office-hero.jpg"
            alt="Equipo de Vitalis trabajando"
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute bottom-8 left-4 rounded border border-accent/14 bg-background px-6 py-5 shadow-[0_18px_40px_rgba(11,59,102,0.10)] sm:-left-10">
          <div className="font-serif text-[38px] leading-none text-accent">
            12,177<span className="text-xl"> MDP</span>
          </div>
          <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.13em] text-foreground/50">
            Activos bajo asesoría
          </div>
        </div>
      </div>
    </section>
  );
}
