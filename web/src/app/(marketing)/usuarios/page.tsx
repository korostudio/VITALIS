import type { Metadata } from "next";
import Link from "next/link";
import { MinimalFooter } from "@/components/marketing/MinimalFooter";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Acceso usuarios · Vitalis" };

const accesos = [
  {
    tag: "Colaborador",
    title: "Empleado",
    body: "Consulta el saldo de tu plan, tu proyección de pensión y tus estados de cuenta.",
    href: routes.enConstruccion,
    tint: "repeating-linear-gradient(135deg, #E7EEF6 0 14px, #F3F7FB 14px 28px)",
    ph: "ilustración empleado",
  },
  {
    tag: "Cliente institucional",
    title: "Empresa",
    body: "Entra al expediente digital de tu empresa: dictámenes, fondo y actas del comité.",
    href: routes.expedienteDigital,
    tint: "repeating-linear-gradient(135deg, #EDEAE2 0 14px, #F7F5F0 14px 28px)",
    ph: "ilustración empresa",
  },
];

export default function UsuariosPage() {
  return (
    <>
    <main className="flex flex-1 items-center">
      <section className="mx-auto w-full max-w-[1280px] px-5 pb-16 pt-6 sm:px-10 sm:pb-24 sm:pt-8">
        <div className="mb-6 font-mono text-[11.5px] text-foreground/45 sm:mb-8">
          <Link href={routes.home} className="text-foreground/45 hover:text-[var(--color-accent-hover)]">
            Inicio
          </Link>{" "}
          · <span className="text-accent">Acceso usuarios</span>
        </div>

        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <div className="mb-5.5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
              <span className="inline-block h-px w-[22px] bg-[var(--color-accent-hover)]" />
              Acceso usuarios
            </div>
            <h1 className="mb-6 font-serif text-[40px] font-light leading-[1.06] tracking-[-0.02em] text-accent sm:text-[56px]">
              Entra a tu cuenta
            </h1>
            <p className="mb-8 max-w-[440px] text-[17.5px] font-light leading-relaxed text-foreground/66">
              Elige el tipo de acceso. Si es tu primera vez, tu empresa te envió las credenciales
              al correo con el que estás registrado.
            </p>
            <div className="border-t border-accent/14 pt-5.5 text-[14.5px] font-light leading-relaxed text-foreground/60">
              ¿No puedes entrar? Escríbenos a{" "}
              <a href="mailto:soporte@vitalis.com.mx">soporte@vitalis.com.mx</a> o llama al{" "}
              <a href="tel:525552353000">52 (55) 5235 3000</a>.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2">
            {accesos.map((a) => (
              <Link
                key={a.title}
                href={a.href}
                className="flex min-h-[280px] flex-col items-start gap-3.5 rounded-lg border border-accent/16 bg-background px-7 pb-6 pt-7 hover:border-[var(--color-accent-hover)]/50 hover:bg-[#F4F8FC]"
              >
                <div
                  className="mb-1 flex h-[100px] w-full items-end rounded p-3.5"
                  style={{ background: a.tint }}
                >
                  <span className="font-mono text-[10px] tracking-[0.08em] text-accent/42">
                    {a.ph}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent-hover)]">
                  {a.tag}
                </span>
                <span className="font-serif text-[28px] leading-tight text-accent">{a.title}</span>
                <span className="text-[14.5px] font-light leading-relaxed text-foreground/62">
                  {a.body}
                </span>
                <span className="mt-auto w-full border-t border-accent/13 pt-5 text-[14.5px] font-medium text-[var(--color-accent-hover)]">
                  Entrar →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
    <MinimalFooter />
    </>
  );
}
