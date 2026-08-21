import Link from "next/link";
import { buttonVariants } from "@heroui/styles";
import { routes } from "@/lib/routes";

type Stat = { n: string; t: string };
type Cta = { label: string; href: string; variant?: "solid" | "outline" };

export function PageHero({
  breadcrumb,
  kicker,
  title,
  titleItalic,
  description,
  ctas,
  stats,
  visual,
}: {
  breadcrumb: string;
  kicker: string;
  title: string;
  titleItalic?: string;
  description: string;
  ctas?: Cta[];
  stats?: Stat[];
  visual?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1280px] px-5 pt-6 sm:px-10 sm:pt-8">
      <div className="mb-6 font-mono text-[11.5px] text-foreground/45 sm:mb-8">
        <Link href={routes.home} className="text-foreground/45 hover:text-[var(--color-accent-hover)]">
          Inicio
        </Link>{" "}
        · <span className="text-accent">{breadcrumb}</span>
      </div>
      <div className="grid grid-cols-1 items-start gap-14 pb-14 sm:gap-[72px] sm:pb-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
            <span className="inline-block h-px w-[22px] bg-[var(--color-accent-hover)]" />
            {kicker}
          </div>
          <h1 className="mb-6 font-serif text-[38px] font-light leading-[1.06] tracking-[-0.02em] text-accent sm:text-[48px] lg:text-[62px]">
            {title}
            {titleItalic && <span className="block italic text-[var(--color-accent-hover)]">{titleItalic}</span>}
          </h1>
          <p className="mb-9 max-w-[560px] text-lg font-light leading-[1.62] text-foreground/68">
            {description}
          </p>
          {ctas && ctas.length > 0 && (
            <div className="flex flex-wrap gap-3.5">
              {ctas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={
                    buttonVariants({ size: "lg", variant: cta.variant === "outline" ? "outline" : "primary" }) +
                    " !rounded-full"
                  }
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}
        </div>
        {visual ?? (
          <div className="grid grid-cols-2 gap-px border border-accent/14 bg-accent/14">
            {(stats ?? []).map((stat) => (
              <div key={stat.t} className="bg-background px-5 py-6">
                <div className="font-serif text-[28px] leading-none text-accent sm:text-[34px]">
                  {stat.n}
                </div>
                <div className="mt-2 text-[12.5px] font-light leading-snug text-foreground/55">
                  {stat.t}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
