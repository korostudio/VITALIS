import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/BlogListing";
import { SimpleFooter } from "@/components/marketing/SimpleFooter";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Blog · Vitalis" };

export default function BlogPage() {
  return (
    <main>
      <BlogListing />

      <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-10 sm:pb-24">
        <div className="grid grid-cols-1 items-center gap-8 rounded-lg border border-accent/15 bg-[#F5F2EC] px-8 py-10 sm:px-11 sm:py-12 lg:grid-cols-[1fr_auto]">
          <div>
            <h3 className="mb-3 font-serif text-[26px] font-light leading-snug text-accent sm:text-[32px]">
              Recibe nuestra carta trimestral
            </h3>
            <p className="m-0 max-w-[520px] text-base font-light leading-relaxed text-foreground/65">
              Análisis de mercados y cambios normativos que afectan tus obligaciones laborales.
              Cuatro correos al año, sin promociones.
            </p>
          </div>
          <form className="flex min-w-0 flex-col gap-3 sm:min-w-[400px] sm:flex-row sm:items-center">
            <input
              type="email"
              placeholder="nombre@empresa.com"
              className="flex-1 rounded-full border border-accent/22 bg-background px-5 py-3.5 text-[14.5px] outline-none"
            />
            <button
              type="button"
              className="whitespace-nowrap rounded-full bg-accent px-6 py-3.5 text-[14.5px] font-medium text-white hover:bg-[var(--color-accent-hover)]"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>

      <SimpleFooter
        blurb="Vitalis® Expertos en Pensiones S.A. de C.V. Miembro de la red internacional de actuarios ABELICA Global."
        links={[
          { label: "Inicio", href: routes.home },
          { label: "Inversiones", href: routes.inversiones },
          { label: "Tecnología", href: routes.tecnologia },
        ]}
      />
    </main>
  );
}
