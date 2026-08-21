import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@heroui/styles";
import { SimpleFooter } from "@/components/marketing/SimpleFooter";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Qué cambia en la NIF D-3 para el cierre 2026 · Vitalis" };

type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

const bloques: Block[] = [
  { type: "p", text: "Cada cierre de ejercicio llega con la misma pregunta del área de finanzas: cuánto va a pesar este año el pasivo laboral en el estado de resultados. La respuesta depende de tres decisiones técnicas que se toman antes de correr el modelo, y que conviene revisar ahora y no en enero." },
  { type: "h2", text: "La tasa de descuento manda" },
  { type: "p", text: "La obligación por beneficios definidos es el valor presente de pagos que ocurrirán dentro de diez, veinte o treinta años. Un movimiento de cincuenta puntos base en la tasa de descuento puede mover la obligación varios puntos porcentuales, sin que la plantilla haya cambiado en absoluto." },
  { type: "p", text: "La norma pide usar la tasa de bonos gubernamentales de largo plazo o de bonos corporativos de alta calidad, con duración consistente con la del pasivo. Ese último punto es el que más se pasa por alto: usar una tasa a diez años para una obligación con duración de veinte introduce un sesgo que el auditor va a señalar." },
  { type: "quote", text: "La duración del pasivo, no la del instrumento disponible, es la que define la tasa." },
  { type: "h2", text: "Qué revisar antes de septiembre" },
  { type: "p", text: "La valuación se corre con información al 30 de septiembre para que el cierre no se atore en diciembre. Antes de esa fecha vale la pena tener resueltos cuatro puntos:" },
  {
    type: "list",
    items: [
      "Censo de personal actualizado, con fecha de ingreso y salario integrado correctos",
      "Definición de qué beneficios son formales y cuáles son práctica establecida que genera expectativa de derecho",
      "Hipótesis de incremento salarial y rotación consistentes con lo que efectivamente pasó en los últimos tres años",
      "Conciliación con la valuación del ejercicio anterior, para explicar cada variación",
    ],
  },
  { type: "h2", text: "Las remediciones no son costo del periodo" },
  { type: "p", text: "Las ganancias y pérdidas actuariales que surgen de cambios en hipótesis o de la diferencia entre lo esperado y lo ocurrido van a Otros Resultados Integrales, no al resultado del ejercicio. Separar bien ambos componentes es lo que permite explicar al comité por qué la obligación creció sin que el costo del periodo se moviera igual." },
  { type: "p", text: "Si tu grupo consolida bajo IFRS o US GAAP, además hay que entregar el paquete de revelaciones en el formato y calendario del corporativo. Ese trabajo se planea, no se improvisa en la última semana." },
];

const relacionados = [
  { titulo: "Tasa de reemplazo: por qué el 30% no alcanza", cat: "Pensiones", fecha: "28 jul 2026", lectura: "5 min" },
  { titulo: "Carta trimestral de inversiones · 2T 2026", cat: "Inversiones", fecha: "15 jul 2026", lectura: "8 min" },
  { titulo: "Cinco preguntas que tu comité debería hacer cada año", cat: "Inversiones", fecha: "02 jul 2026", lectura: "4 min" },
];

export default function ArticuloPage() {
  return (
    <main>
      <article className="mx-auto max-w-[1280px] px-5 pt-10 sm:px-10 sm:pt-14">
        <div className="mb-8 font-mono text-[11.5px] text-foreground/45">
          <Link href={routes.home} className="text-foreground/45 hover:text-[var(--color-accent-hover)]">
            Inicio
          </Link>{" "}
          ·{" "}
          <Link href={routes.blog} className="text-foreground/45 hover:text-[var(--color-accent-hover)]">
            Blog
          </Link>{" "}
          · <span className="text-accent">Actuaría</span>
        </div>

        <div className="mx-auto max-w-[760px]">
          <div className="mb-5.5 flex items-center gap-3.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent-hover)]">
              Actuaría
            </span>
            <span className="h-px w-5 bg-accent/25" />
            <span className="font-mono text-[11px] text-foreground/45">
              12 ago 2026 · 6 min de lectura
            </span>
          </div>
          <h1 className="mb-5.5 font-serif text-[34px] font-light leading-[1.1] tracking-[-0.02em] text-accent sm:text-[44px] lg:text-[52px]">
            Qué cambia en la NIF D-3 para el cierre 2026
          </h1>
          <p className="mb-8 text-[19px] font-light leading-[1.55] text-foreground/62 sm:text-[21px]">
            Las remediciones y el tratamiento de la tasa de descuento cambian el costo neto que
            reconocerás este ejercicio. Qué revisar antes de septiembre.
          </p>
          <div className="mb-11 flex items-center gap-3.5 border-y border-accent/14 py-5.5">
            <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full bg-accent/10 text-sm font-medium text-accent">
              AL
            </span>
            <div className="leading-tight">
              <div className="text-[14.5px] font-medium text-accent">Alejandra Lozano</div>
              <div className="text-[13px] font-light text-foreground/50">
                Actuaria certificada · Dirección de Actuaría
              </div>
            </div>
          </div>
        </div>

        <div className="relative mb-11 h-[280px] overflow-hidden rounded-lg sm:h-[420px]">
          <Image
            src="/images/article-cover.jpg"
            alt="Qué cambia en la NIF D-3 para el cierre 2026"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="mx-auto max-w-[760px]">
          {bloques.map((b, i) => {
            if (b.type === "h2") {
              return (
                <h2
                  key={i}
                  className="mb-4 mt-11 font-serif text-2xl leading-snug text-accent sm:text-[32px]"
                >
                  {b.text}
                </h2>
              );
            }
            if (b.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="my-9 border-l-2 border-[var(--color-accent-hover)] pl-6 font-serif text-[22px] italic leading-snug text-accent sm:text-[26px]"
                >
                  {b.text}
                </blockquote>
              );
            }
            if (b.type === "list") {
              return (
                <ul key={i} className="mb-7 border-t border-accent/13">
                  {b.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-4 border-b border-accent/13 py-3.5 text-base font-light leading-relaxed text-foreground/78 sm:text-[17px]"
                    >
                      <span className="h-1.25 w-1.25 flex-none rounded-full bg-[var(--color-accent-hover)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mb-7 text-base font-light leading-[1.72] text-foreground/78 sm:text-lg">
                {b.text}
              </p>
            );
          })}

          <div className="mt-14 grid grid-cols-1 items-center gap-8 rounded-lg border border-accent/15 bg-[#F5F2EC] px-7 py-9 sm:px-9 sm:py-10 lg:grid-cols-[1fr_auto]">
            <div>
              <h3 className="mb-2.5 font-serif text-2xl text-accent">
                ¿Ya tienes tu valuación del ejercicio?
              </h3>
              <p className="m-0 text-[15px] font-light leading-relaxed text-foreground/65">
                Solicita una propuesta y recíbela en menos de 48 horas hábiles.
              </p>
            </div>
            <Link
              href={routes.pasivosLaborales + "#cotizador"}
              className={buttonVariants({ size: "md" }) + " !rounded-full whitespace-nowrap"}
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </article>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24">
        <div className="mb-7 flex items-baseline justify-between gap-6">
          <h2 className="m-0 font-serif text-2xl font-light text-accent sm:text-[32px]">
            Sigue leyendo
          </h2>
          <Link href={routes.blog} className="text-[14.5px]">
            Ver todo el blog →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relacionados.map((r) => (
            <Link
              key={r.titulo}
              href={routes.blog + "/articulo"}
              className="flex min-h-[180px] flex-col gap-3 rounded-lg border border-accent/15 bg-background px-6.5 py-7 hover:border-[var(--color-accent-hover)]/45 hover:bg-[#F7FAFD]"
            >
              <span className="font-mono text-[10.5px] tracking-[0.1em] text-foreground/42">
                {r.cat} · {r.fecha}
              </span>
              <span className="font-serif text-[21px] leading-snug text-accent">{r.titulo}</span>
              <span className="mt-auto text-[13px] text-[var(--color-accent-hover)]">
                {r.lectura}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <SimpleFooter
        blurb="Vitalis® Expertos en Pensiones S.A. de C.V. Miembro de la red internacional de actuarios ABELICA Global."
        links={[
          { label: "Inicio", href: routes.home },
          { label: "Blog", href: routes.blog },
          { label: "Tecnología", href: routes.tecnologia },
        ]}
      />
    </main>
  );
}
