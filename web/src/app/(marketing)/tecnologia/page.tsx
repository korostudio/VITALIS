import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { SimpleFooter } from "@/components/marketing/SimpleFooter";
import { HerramientasGrid } from "@/components/tecnologia/HerramientasGrid";
import { DocumentPreview } from "@/components/tecnologia/DocumentPreview";
import { SavingsCalculator } from "@/components/home/SavingsCalculator";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Tecnología · Vitalis" };

const principios = [
  { title: "Desarrollado en casa", body: "Actuarios y desarrolladores trabajando en el mismo equipo. El modelo de cálculo y la interfaz se diseñan juntos, no se compran por separado." },
  { title: "Datos que no salen de México", body: "La información de tu personal se procesa bajo la Ley Federal de Protección de Datos Personales, con acceso por rol y bitácora de consultas." },
  { title: "Integrable con tu nómina", body: "Recibimos el censo en el formato que ya exportas. No cambiamos tu sistema para que hable con el nuestro." },
];

export default function TecnologiaPage() {
  return (
    <main>
      <PageHero
        breadcrumb="Tecnología"
        kicker="Tecnología"
        title="La actuaría deja de ser"
        titleItalic="una caja negra"
        description="Desarrollamos nuestras propias herramientas para que puedas cotizar, calcular, consultar tus documentos y seguir tus rendimientos sin esperar a que alguien te mande un correo."
        ctas={[
          { label: "Ver herramientas", href: "#herramientas" },
          { label: "Probar la calculadora", href: "#calculadora", variant: "outline" },
        ]}
        stats={[
          { n: "6", t: "herramientas propias en operación" },
          { n: "24/7", t: "acceso al expediente digital" },
          { n: "0", t: "licencias de terceros en el cálculo actuarial" },
          { n: "1°", t: "sistema de ahorro para el retiro vía gasto" },
        ]}
      />

      <HerramientasGrid />

      <SavingsCalculator
        kicker="02 — Calculadora"
        title="Pruébala aquí mismo"
        description="Sin registro y sin descargar nada. La misma calculadora que integramos en el portal de tus colaboradores."
      />

      <DocumentPreview />

      <section className="border-t border-accent/12 bg-[#F5F2EC]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24">
          <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
            04 — Cómo trabajamos
          </div>
          <h2 className="mb-12 max-w-[600px] font-serif text-[32px] font-light leading-[1.12] text-accent sm:mb-[52px] sm:text-[44px]">
            Software propio, no licencias de terceros
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {principios.map((p) => (
              <div key={p.title} className="border-t-2 border-accent pt-5.5">
                <div className="mb-3.5 font-serif text-[26px] leading-tight text-accent">
                  {p.title}
                </div>
                <p className="m-0 text-[15.5px] font-light leading-relaxed text-foreground/65">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        title="Te damos una"
        titleItalic="demo en vivo"
        description="Veinte minutos con tu equipo para recorrer el cotizador, el expediente digital y el portal del colaborador con datos de ejemplo."
        primaryLabel="Agendar demo"
      />
      <SimpleFooter
        blurb="Vitalis® Expertos en Pensiones S.A. de C.V. Miembro de la red internacional de actuarios ABELICA Global."
        links={[
          { label: "Inicio", href: routes.home },
          { label: "Inversiones", href: routes.inversiones },
          { label: "Pasivos laborales", href: routes.pasivosLaborales },
        ]}
      />
    </main>
  );
}
