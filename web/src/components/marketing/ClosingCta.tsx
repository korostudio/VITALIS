import Link from "next/link";
import { buttonVariants } from "@heroui/styles";
import { routes, whatsappHref } from "@/lib/routes";

export function ClosingCta({
  title,
  titleItalic,
  description,
  primaryLabel = "Agendar diagnóstico",
  primaryHref = routes.enConstruccion,
}: {
  title: string;
  titleItalic: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="bg-accent text-[#EAF2FA]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[1fr_auto] lg:py-24">
        <div>
          <h2 className="mb-5 font-serif text-[36px] font-light leading-[1.08] sm:text-[52px]">
            {title} <span className="italic text-[#8FC0EC]">{titleItalic}</span>
          </h2>
          <p className="max-w-[540px] text-[17px] font-light leading-[1.6] text-[#EAF2FA]/70">
            {description}
          </p>
        </div>
        <div className="flex min-w-[260px] flex-col gap-3.5">
          <Link
            href={primaryHref}
            className={buttonVariants({ size: "lg" }) + " !rounded-full !bg-background !text-accent hover:!bg-[#8FC0EC]"}
          >
            {primaryLabel}
          </Link>
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg", variant: "outline" }) + " !rounded-full !border-white/35 !text-[#EAF2FA] hover:!bg-white/8"}
          >
            Escribir por WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
