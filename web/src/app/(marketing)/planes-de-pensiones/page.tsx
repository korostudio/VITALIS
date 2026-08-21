import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { ProcessSteps } from "@/components/marketing/ProcessSteps";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { SimpleFooter } from "@/components/marketing/SimpleFooter";
import { PillarSimulator } from "@/components/planes/PillarSimulator";
import { TipoPlanSelector } from "@/components/planes/TipoPlanSelector";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Planes de pensiones · Vitalis" };

const beneficios = [
  {
    tag: "Para la empresa",
    title: "Costo previsible y deducible",
    bg: "bg-background",
    items: [
      "Las aportaciones son deducibles de ISR dentro de los límites que marca la ley",
      "Reduce el pasivo laboral contingente que hoy revelas en tus estados financieros",
      "Ordena el relevo generacional: el retiro deja de posponerse por falta de ingreso",
      "Diferencia tu oferta de valor frente a competidores que solo ofrecen sueldo",
      "Los recursos se administran en un fideicomiso independiente del patrimonio de la empresa",
    ],
  },
  {
    tag: "Para el colaborador",
    title: "Un ingreso que sí alcanza",
    bg: "bg-[#F5F2EC]",
    items: [
      "Complementa la pensión de la seguridad social, que rara vez llega al 30% del último salario",
      "Las aportaciones voluntarias son deducibles en su declaración anual",
      "Portabilidad del saldo acumulado conforme a las reglas del plan",
      "Consulta de su saldo y proyección de pensión en línea, cuando quiera",
      "Acompañamiento de educación financiera durante toda su vida laboral",
    ],
  },
];

const pasos = [
  { n: "01", time: "Semana 1", title: "Diagnóstico", body: "Analizamos demografía, rotación y nómina para ver qué estructura sostiene tu plantilla." },
  { n: "02", time: "Semanas 2–4", title: "Diseño del plan", body: "Definimos fórmula de beneficio, elegibilidad, aportaciones y costo proyectado a diez años." },
  { n: "03", time: "Semanas 5–8", title: "Constitución", body: "Registro del plan ante las autoridades, constitución del fideicomiso y reglamento interno." },
  { n: "04", time: "Continuo", title: "Administración", body: "Inversión de los recursos, valuación anual, comunicación al personal y reportes al comité." },
];

export default function PlanesDePensionesPage() {
  return (
    <main>
      <PageHero
        breadcrumb="Planes de pensiones privados"
        kicker="Planes de pensiones privados"
        title="Un beneficio que retiene talento"
        titleItalic="y ordena tu relevo generacional"
        description="Los planes de pensiones privados son un mecanismo de ahorro de largo plazo para el justo reemplazo del personal a edad avanzada, y para retribuir al trabajador con un ingreso complementario al que la seguridad social le dará al momento de su retiro."
        ctas={[
          { label: "Agendar diagnóstico", href: routes.enConstruccion },
          { label: "Ver los tres pilares", href: "#simulador", variant: "outline" },
        ]}
        stats={[
          { n: "34", t: "años diseñando planes privados" },
          { n: "3", t: "estructuras: BD, CD e híbrida" },
          { n: "100%", t: "deducible dentro de los límites de ley" },
          { n: "ABELICA", t: "estándares actuariales internacionales" },
        ]}
      />

      <PillarSimulator />

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-[104px]">
        <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
          02 — Beneficios
        </div>
        <h2 className="mb-12 max-w-[620px] font-serif text-[32px] font-light leading-[1.12] text-accent sm:mb-[52px] sm:text-[44px]">
          Lo que gana la empresa y lo que gana el colaborador
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {beneficios.map((b) => (
            <div key={b.tag} className={`rounded-md border border-accent/15 px-7 py-9 sm:px-9 ${b.bg}`}>
              <div className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-accent-hover)]">
                {b.tag}
              </div>
              <h3 className="mb-6 font-serif text-[28px] text-accent">{b.title}</h3>
              <ul className="border-t border-accent/12">
                {b.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3.5 border-b border-accent/12 py-3.5 text-[15.5px] font-light leading-snug text-foreground/75"
                  >
                    <span className="h-1.25 w-1.25 flex-none rounded-full bg-[var(--color-accent-hover)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <TipoPlanSelector />

      <ProcessSteps
        kicker="04 — Implementación"
        title="Del diagnóstico al primer depósito"
        steps={pasos}
        tinted={false}
      />

      <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-10 sm:pb-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-md border border-accent/15 px-8 py-10 sm:px-10">
            <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
              05 — Ahorro del colaborador
            </div>
            <h3 className="mb-4.5 font-serif text-2xl font-light leading-snug text-accent sm:text-[32px]">
              Millas para el Retiro
            </h3>
            <p className="mb-7 text-base font-light leading-relaxed text-foreground/66">
              El primer sistema de ahorro para el retiro a través del gasto. El tercer pilar deja
              de depender de la disciplina del empleado y empieza a construirse con lo que ya
              compra todos los días.
            </p>
            <Link
              href="https://millasparaelretiro.com"
              className="mt-auto border-t border-accent/14 pt-5 text-[15px]"
            >
              Conocer Millas para el Retiro →
            </Link>
          </div>
          <div className="flex flex-col rounded-md border border-accent/15 bg-[#F5F2EC] px-8 py-10 sm:px-10">
            <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
              También te puede interesar
            </div>
            <h3 className="mb-4.5 font-serif text-2xl font-light leading-snug text-accent sm:text-[32px]">
              Antes de diseñar el plan, mide la obligación
            </h3>
            <p className="mb-7 text-base font-light leading-relaxed text-foreground/66">
              La valuación de pasivos laborales te dice cuánto pesa hoy tu obligación y cuánto la
              reduciría un plan formal de pensiones.
            </p>
            <Link
              href={routes.pasivosLaborales}
              className="mt-auto border-t border-accent/14 pt-5 text-[15px]"
            >
              Ver pasivos laborales →
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta
        title="Diseñemos el plan que"
        titleItalic="tu plantilla necesita"
        description="Una sesión con un actuario certificado para revisar la demografía de tu empresa y las estructuras que tienen sentido para ella."
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
