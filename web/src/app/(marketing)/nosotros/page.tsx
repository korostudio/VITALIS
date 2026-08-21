import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/marketing/PageHero";
import { NumberedList } from "@/components/marketing/NumberedList";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { SimpleFooter } from "@/components/marketing/SimpleFooter";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Nosotros · Vitalis" };

const cifras = [
  { n: "34", t: "años de experiencia, con procesos y rendimientos auditados" },
  { n: "1,800", t: "razones sociales asesoradas" },
  { n: "500 mil", t: "trabajadores impactados a través de planes, fondos y cajas de ahorro" },
  { n: "12,177", t: "millones de pesos asesorados en cuentas discrecionales y consultoría" },
];

const quienes = [
  { n: "01", body: "Somos una empresa global especializada en gestión de inversiones, con amplia experiencia en pensiones y previsión social." },
  { n: "02", body: "Contamos con más de 34 años de experiencia, con procesos y rendimientos auditados, buscamos ayudar a las empresas y a las personas en la gestión de sus activos de largo plazo, invirtiendo los recursos de manera profesional y contribuyendo de esta manera al desarrollo económico." },
  { n: "03", body: "Damos asesoría a más de 1,800 razones sociales, generamos impacto en más de 500,000 trabajadores a través de planes de pensiones, fondos y cajas de ahorro y contamos con más de 12,177 MDP asesorados a través de cuentas discrecionales y consultoría." },
  { n: "04", body: "Contamos con un área actuarial que genera mucho valor al diseñar estrategias donde la exigibilidad de los recursos en el tiempo son un factor esencial." },
];

const valores = [
  { n: "Valor 01", t: "Si yo brinco, tu brincas.", tint: "azul" },
  { n: "Valor 02", t: "¡Siempre existe una oportunidad para ayudar a los demás!", tint: "arena" },
  { n: "Valor 03", t: "Bien, de buenas y a la primera.", tint: "azul" },
  { n: "Valor 04", t: "Nuestro comportamiento es ejemplar.", tint: "arena" },
  { n: "Valor 05", t: "Nos motivamos a ser mejores personas.", tint: "azul" },
  { n: "Valor 06", t: "¡Si quedas, lo cumples!", tint: "arena" },
];

const tints: Record<string, string> = {
  azul: "repeating-linear-gradient(135deg, #E7EEF6 0 14px, #F3F7FB 14px 28px)",
  arena: "repeating-linear-gradient(135deg, #EDEAE2 0 14px, #F7F5F0 14px 28px)",
};

const oficinas = [
  { ciudad: "México", dir: "Gobernador Rafael Rebollar No. 47 y No. 56 piso 3, San Miguel Chapultepec, C.P. 11850, Ciudad de México.", tel: "T: 52 (55) 5235 3000" },
  { ciudad: "Canadá", dir: "4400 Ch. Côte de Liesse, Porte 200, Mont-Royal (Quebec) H4N 2P7", tel: "T: (514) 987-9550" },
  { ciudad: "Portugal", dir: "Campo Grande 35, 4ºD — 1700-087, Lisboa, Portugal", tel: "" },
];

const sellos = ["UNPRI", "ABELICA GLOBAL", "FIP 2026", "MILLAS"];

export default function NosotrosPage() {
  return (
    <main>
      <PageHero
        breadcrumb="Nosotros"
        kicker="Vitalis Today for Tomorrow"
        title="Preservamos el valor en el tiempo, con una visión de legado y"
        titleItalic="por un mundo de mayor riqueza"
        description="Somos una empresa global especializada en gestión de inversiones, con amplia experiencia en pensiones y previsión social."
        visual={
          <div className="relative aspect-[4/5] overflow-hidden rounded-md lg:aspect-auto lg:h-[420px]">
            <Image
              src="/images/team.jpg"
              alt="Equipo de Vitalis"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        }
      />

      <section className="border-t border-accent/12 bg-[#F5F2EC]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
          <div className="grid grid-cols-1 gap-px bg-accent/14 sm:grid-cols-2 lg:grid-cols-4">
            {cifras.map((c) => (
              <div key={c.t} className="bg-[#F5F2EC] px-6 py-9">
                <div className="font-serif text-[38px] leading-none text-accent sm:text-[46px]">{c.n}</div>
                <div className="mt-3.5 text-[14.5px] font-light leading-snug text-foreground/60">{c.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-[104px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-[110px] lg:self-start">
            <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
              01 — Quiénes somos
            </div>
            <h2 className="font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
              Treinta y cuatro años invirtiendo a largo plazo
            </h2>
          </div>
          <NumberedList items={quienes} />
        </div>
      </section>

      <section className="bg-accent text-[#EAF2FA]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="mb-5.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FC0EC]">
                02 — Nuestra misión
              </div>
              <p className="font-serif text-[26px] font-light leading-[1.28] text-white sm:text-[32px]">
                Invertimos por un futuro de nuevos comienzos. Creemos en los comienzos tempranos y en
                el milagro de la disciplina financiera para un legado sólido.
              </p>
            </div>
            <div>
              <div className="mb-5.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FC0EC]">
                03 — Nuestra visión
              </div>
              <p className="mb-7 font-serif text-[26px] font-light italic leading-[1.28] text-white sm:text-[32px]">
                Crear valor en el tiempo para un futuro próspero.
              </p>
              <div className="border-t border-white/20 pt-6.5 text-base font-light leading-relaxed text-[#EAF2FA]/68">
                Desde 2018 somos signatarios de los &ldquo;Principios de Inversión Responsable&rdquo; de la
                Organización de las Naciones Unidas. Fuimos el primer asesor independiente mexicano en
                adherirse a estos principios.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-[104px]">
        <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
          04 — Nuestros valores
        </div>
        <h2 className="mb-3 max-w-[620px] font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
          Seis frases que decimos en voz alta
        </h2>
        <p className="mb-11 text-[15px] font-light text-foreground/50">Así se habla dentro de Vitalis.</p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {valores.map((v) => (
            <div key={v.n} className="overflow-hidden rounded-md border border-accent/15 bg-background">
              <div className="h-[130px]" style={{ background: tints[v.tint] }} />
              <div className="px-6 py-7">
                <div className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent-hover)]">
                  {v.n}
                </div>
                <p className="m-0 font-serif text-[24px] leading-snug text-accent">{v.t}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-accent/12 bg-[#F5F2EC]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
                05 — Presencia y respaldo
              </div>
              <h2 className="mb-6 font-serif text-[32px] font-light leading-[1.12] text-accent sm:text-[44px]">
                Tres oficinas y una red internacional
              </h2>
              <div className="flex flex-wrap gap-3">
                {sellos.map((s) => (
                  <div
                    key={s}
                    className="flex h-[46px] w-[120px] items-center justify-center rounded border border-accent/14 bg-background font-mono text-[10px] tracking-[0.06em] text-accent/50"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {oficinas.map((o) => (
                <div key={o.ciudad} className="border-t-2 border-accent pt-6">
                  <div className="mb-3.5 font-serif text-[27px] leading-tight text-accent">{o.ciudad}</div>
                  <p className="mb-3 text-[14.5px] font-light leading-relaxed text-foreground/65">{o.dir}</p>
                  {o.tel && <div className="font-mono text-xs text-foreground/50">{o.tel}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        title="Hablemos de tu"
        titleItalic="obligación laboral"
        description="Un diagnóstico inicial sin costo con uno de nuestros actuarios certificados."
      />
      <SimpleFooter
        blurb="Vitalis® Expertos en Pensiones S.A. de C.V. Miembro de la red internacional de actuarios ABELICA Global."
        links={[
          { label: "Inicio", href: routes.home },
          { label: "Inversiones", href: routes.inversiones },
          { label: "Blog", href: routes.blog },
        ]}
      />
    </main>
  );
}
