import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { NumberedList } from "@/components/marketing/NumberedList";
import { ProcessSteps } from "@/components/marketing/ProcessSteps";
import { SimpleFooter } from "@/components/marketing/SimpleFooter";
import { NormaSelector } from "@/components/pasivos/NormaSelector";
import { CotizadorForm } from "@/components/pasivos/CotizadorForm";
import { routes, whatsappHref } from "@/lib/routes";

export const metadata: Metadata = { title: "Pasivos laborales · Vitalis" };

const conceptos = [
  { n: "01", title: "Prima de antigüedad", body: "Doce días de salario por año trabajado, con el tope legal, exigible por retiro voluntario después de quince años, despido o fallecimiento." },
  { n: "02", title: "Indemnización legal por terminación", body: "Tres meses de salario más veinte días por año en los supuestos de terminación sin causa justificada." },
  { n: "03", title: "Jubilación o plan de pensiones", body: "Beneficios por retiro cuando la empresa tiene un plan formal o una práctica establecida que genera expectativa de derecho." },
  { n: "04", title: "Beneficios posteriores al empleo", body: "Gastos médicos, seguros de vida u otros beneficios que continúan después de la terminación de la relación laboral." },
  { n: "05", title: "Beneficios por terminación negociada", body: "Programas de retiro voluntario, convenios sindicales y esquemas de separación pactados con grupos de colaboradores." },
];

const pasos = [
  { n: "01", time: "Día 1", title: "Alcance y propuesta", body: "Definimos normas aplicables, número de razones sociales y fecha de valuación. Enviamos propuesta formal." },
  { n: "02", time: "Semana 1", title: "Base de datos", body: "Recibimos el censo de personal en el formato que ya usas. Validamos integridad y detectamos inconsistencias." },
  { n: "03", time: "Semanas 2–3", title: "Valuación", body: "Corremos el modelo, definimos hipótesis financieras y demográficas y calculamos escenarios de sensibilidad." },
  { n: "04", time: "Semana 4", title: "Dictamen y presentación", body: "Entregamos el dictamen firmado y lo presentamos a tu equipo y a tus auditores." },
];

const entregables = [
  "Dictamen actuarial firmado por actuario certificado",
  "Notas de revelación listas para tus estados financieros",
  "Costo neto del periodo y proyección para el siguiente ejercicio",
  "Escenarios de sensibilidad de tasa de descuento e incremento salarial",
  "Conciliación con la valuación del año anterior",
  "Sesión de presentación con tu equipo y tus auditores",
];

const sellos = ["ABELICA", "UNPRI", "FIP 2026", "MILLAS"];

export default function PasivosLaboralesPage() {
  return (
    <main>
      <PageHero
        breadcrumb="Pasivos laborales"
        kicker="Pasivos laborales contingentes"
        title="Cuantifica tu deuda laboral"
        titleItalic="antes del cierre fiscal"
        description="Valuaciones actuariales bajo NIF D-3, IFRS, US GAAP y German GAAP, con información al 30 de septiembre para que cierres estados financieros a tiempo y sin sorpresas."
        ctas={[
          { label: "Solicitar cotización", href: "#cotizador" },
          { label: "Cotizar por WhatsApp", href: whatsappHref, variant: "outline" },
        ]}
        stats={[
          { n: "34", t: "años valuando pasivos laborales" },
          { n: "4", t: "normas: NIF D-3, IFRS, US GAAP y German GAAP" },
          { n: "48 h", t: "para recibir tu propuesta formal" },
          { n: "ABELICA", t: "red internacional de actuarios" },
        ]}
      />

      <section className="bg-accent text-[#EAF2FA]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-[110px] lg:self-start">
              <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FC0EC]">
                01 — Qué es
              </div>
              <h2 className="font-serif text-[32px] font-light leading-[1.12] text-white sm:text-[44px]">
                La deuda que se acumula mientras el trabajador presta servicio
              </h2>
              <p className="mt-5.5 text-[16.5px] font-light leading-relaxed text-[#EAF2FA]/72">
                El pasivo laboral contingente es la obligación implícita que genera cada
                colaborador durante su permanencia en la empresa y que se detona al término de la
                relación laboral. No aparece en la nómina, pero sí en tus estados financieros.
              </p>
            </div>
            <div>
              <div className="mb-5.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#EAF2FA]/50">
                Este pasivo cubre
              </div>
              <NumberedList items={conceptos} dark />
            </div>
          </div>
        </div>
      </section>

      <NormaSelector />

      <ProcessSteps
        kicker="03 — Proceso"
        title="De la base de datos al dictamen en cuatro semanas"
        steps={pasos}
      />

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-[104px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
              04 — Entregables
            </div>
            <h2 className="mb-7.5 font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
              Qué recibes al final
            </h2>
            <ul className="flex flex-col border-t border-accent/13">
              {entregables.map((e) => (
                <li
                  key={e}
                  className="flex items-baseline gap-4 border-b border-accent/13 py-4 text-base font-light text-foreground/78"
                >
                  <span className="h-1.25 w-1.25 flex-none rounded-full bg-[var(--color-accent-hover)]" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
              05 — Respaldo
            </div>
            <h2 className="mb-7.5 font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
              Una de las firmas actuariales más grandes de México
            </h2>
            <p className="mb-6.5 text-[16.5px] font-light leading-relaxed text-foreground/68">
              Pertenecemos a ABELICA Global, la red internacional de actuarios que fija estándares
              de excelencia y garantiza la calidad del servicio a clientes que operan en distintos
              países. Esa red nos mantiene al día en las mejores prácticas de diseño y
              administración de riesgos de planes de pensiones.
            </p>
            <p className="mb-8 text-[16.5px] font-light leading-relaxed text-foreground/68">
              Desde hace más de 34 años ayudamos a las empresas a cuantificar y revelar
              correctamente sus pasivos laborales, y hemos impulsado innovaciones reconocidas a
              nivel mundial como Millas para el Retiro, el primer sistema de ahorro para el retiro
              a través del gasto.
            </p>
            <div className="flex flex-wrap gap-3">
              {sellos.map((s) => (
                <div
                  key={s}
                  className="flex h-[44px] w-[118px] items-center justify-center rounded border border-accent/14 bg-[#F5F2EC] font-mono text-[10px] tracking-[0.06em] text-accent/50"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CotizadorForm />

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-8 rounded-md border border-accent/15 p-8 sm:p-11 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
              También te puede interesar
            </div>
            <h3 className="mb-3 font-serif text-2xl font-light leading-snug text-accent sm:text-[32px]">
              ¿Ya valuaste tu pasivo y quieres reducirlo?
            </h3>
            <p className="m-0 max-w-[560px] text-base font-light leading-relaxed text-foreground/66">
              Un plan de pensiones privado convierte una obligación contingente en un beneficio
              deducible y planeado en el tiempo.
            </p>
          </div>
          <Link
            href={routes.planesDePensiones}
            className="whitespace-nowrap rounded-full border border-accent/22 px-7 py-3.5 text-[15px] font-medium hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]/6"
          >
            Planes de pensiones privados →
          </Link>
        </div>
      </section>

      <SimpleFooter
        blurb="Vitalis® Expertos en Pensiones S.A. de C.V. Miembro de la red internacional de actuarios ABELICA Global."
        links={[
          { label: "Inicio", href: routes.home },
          { label: "Inversiones", href: routes.inversiones },
          { label: "Planes de pensiones", href: routes.planesDePensiones },
        ]}
      />
    </main>
  );
}
