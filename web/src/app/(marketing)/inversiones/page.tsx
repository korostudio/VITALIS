import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { NumberedList } from "@/components/marketing/NumberedList";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { SimpleFooter } from "@/components/marketing/SimpleFooter";
import { ReturnsChart } from "@/components/home/ReturnsChart";
import { VentajasSelector } from "@/components/inversiones/VentajasSelector";
import { EstrategiasGrid } from "@/components/inversiones/EstrategiasGrid";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Inversiones · Vitalis" };

const filosofia = [
  { n: "01", body: "Manejo activo de portafolios con horizonte de mediano y largo plazo, y un objetivo total por encima de la inflación." },
  { n: "02", body: "Análisis fundamental constante de las variables macroeconómicas, de la industria y de la situación específica de cada empresa." },
  { n: "03", body: "Cada activo del portafolio pasa por un extenso proceso de investigación fundamental, lo que nos da una comprensión real de la empresa y sus variables." },
  { n: "04", body: "Buscamos determinar si los factores que hoy dan valor a la acción son temporales o permanentes." },
  { n: "05", body: "Tomamos decisiones tácticas de duración y exposición a divisas." },
  { n: "06", body: "Nuestro propósito es obtener rendimientos superiores a los del mercado en el tiempo." },
];

export default function InversionesPage() {
  return (
    <main>
      <PageHero
        breadcrumb="Inversiones"
        kicker="Gestión de inversiones"
        title="Generamos rendimientos reales"
        titleItalic="por encima de la inflación"
        description="Administramos portafolios institucionales de fondos de pensiones, cajas de ahorro y tesorerías corporativas. Manejo activo, análisis fundamental y una estructura de honorarios que depende de nuestro desempeño."
        stats={[
          { n: "34", t: "años gestionando activos institucionales" },
          { n: "11", t: "estrategias en MXN, USD y EUR" },
          { n: "30053", t: "registro CNBV como asesor independiente" },
          { n: "UNPRI", t: "firmante de los Principios de Inversión Responsable" },
        ]}
      />

      <section className="bg-accent text-[#EAF2FA]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-[110px] lg:self-start">
              <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FC0EC]">
                01 — Filosofía de inversión
              </div>
              <h2 className="mb-5 font-serif text-[32px] font-light leading-[1.12] text-white sm:text-[44px]">
                Invertir es entender la empresa detrás del precio
              </h2>
              <p className="text-[16.5px] font-light leading-relaxed text-[#EAF2FA]/70">
                Manejo activo con horizonte de mediano y largo plazo, y un objetivo total por
                encima de la inflación.
              </p>
            </div>
            <NumberedList items={filosofia} dark />
          </div>
        </div>
      </section>

      <VentajasSelector />

      <ReturnsChart
        kicker="03 — Rendimientos"
        title="Rendimiento acumulado de nuestras estrategias insignia"
        note="Cifras ilustrativas. Rendimientos pasados no garantizan resultados futuros."
      />

      <EstrategiasGrid />

      <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-10 sm:pb-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-md border border-accent/15 px-8 py-10 sm:px-10">
            <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
              05 — Inversión responsable
            </div>
            <h3 className="mb-4.5 font-serif text-2xl font-light leading-snug text-accent sm:text-[32px]">
              Primer asesor independiente mexicano firmante de UNPRI
            </h3>
            <p className="mb-7 text-base font-light leading-relaxed text-foreground/66">
              Integramos criterios ambientales, sociales y de gobernanza en el análisis de cada
              emisora y reportamos su aplicación al comité de inversión de nuestros clientes.
            </p>
            <div className="mt-auto flex items-center gap-3 border-t border-accent/14 pt-5 text-[15px]">
              <span className="rounded-[3px] border border-[var(--color-accent-hover)]/40 px-1 font-mono text-[10px] text-[var(--color-accent-hover)]">
                PDF
              </span>
              Política de Inversión Responsable · Vitalis ESG 2026
            </div>
          </div>
          <div className="flex flex-col rounded-md border border-accent/15 bg-[#F5F2EC] px-8 py-10 sm:px-10">
            <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
              06 — Regulación
            </div>
            <h3 className="mb-4.5 font-serif text-2xl font-light leading-snug text-accent sm:text-[32px]">
              Registrados ante la CNBV con el número 30053
            </h3>
            <p className="mb-7 text-base font-light leading-relaxed text-foreground/66">
              Vitalis opera como asesor independiente de inversión. No recibimos remuneración de
              intermediarios financieros, ni en dinero ni en especie.
            </p>
            <div className="mt-auto flex items-center gap-3 border-t border-accent/14 pt-5 text-[15px]">
              <span className="rounded-[3px] border border-[var(--color-accent-hover)]/40 px-1 font-mono text-[10px] text-[var(--color-accent-hover)]">
                PDF
              </span>
              Guía de Servicios de Inversión · Vitalis 2026
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        title="Revisemos el"
        titleItalic="portafolio de tu fondo"
        description="Analizamos tu asignación actual, comisiones y benchmark frente a la exigibilidad de tus obligaciones. Sin costo y sin compromiso."
      />
      <SimpleFooter
        blurb="Vitalis® Expertos en Pensiones S.A. de C.V. Asesor independiente de inversión registrado ante la CNBV No. 30053."
        links={[
          { label: "Inicio", href: routes.home },
          { label: "Pasivos laborales", href: routes.pasivosLaborales },
          { label: "Contacto", href: routes.enConstruccion },
        ]}
      />
    </main>
  );
}
