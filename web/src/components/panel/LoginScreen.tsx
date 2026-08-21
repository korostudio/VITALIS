"use client";

import { Input } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import Link from "next/link";
import { routes } from "@/lib/routes";

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex items-center justify-center p-10 sm:p-14">
        <div className="w-full max-w-[380px]">
          <div className="mb-11 flex items-baseline gap-2">
            <span className="font-serif text-[27px] tracking-[0.14em] text-accent">VITALIS</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-hover)]" />
          </div>
          <div className="mb-3.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
            vitalis.com.mx/panel
          </div>
          <h1 className="mb-8 font-serif text-[38px] font-light leading-[1.1] text-accent">
            Panel de contenido
          </h1>
          <form
            className="flex flex-col gap-5.5"
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
          >
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/50">
                Correo
              </span>
              <Input defaultValue="admin@vitalis.com.mx" variant="secondary" className="w-full" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/50">
                Contraseña
              </span>
              <Input type="password" defaultValue="............" variant="secondary" className="w-full" />
            </label>
            <label className="flex items-center gap-2.5 text-sm font-light text-foreground/70">
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-[color:var(--color-accent)]" />
              Mantener la sesión iniciada 30 días
            </label>
            <button type="submit" className={buttonVariants({ size: "lg" }) + " !rounded-full"}>
              Entrar
            </button>
            <a href="#" className="text-center text-[13.5px] text-foreground/55">
              ¿Olvidaste tu contraseña?
            </a>
          </form>
          <div className="mt-13.5 border-t border-accent/13 pt-5 text-[12.5px] font-light leading-relaxed text-foreground/45">
            Acceso restringido al equipo de Vitalis. El portal de clientes está en{" "}
            <Link href={routes.usuarios}>vitalis.com.mx/usuarios</Link>.
          </div>
        </div>
      </div>
      <div className="hidden items-end bg-accent p-14 lg:flex">
        <div className="text-[#EAF2FA]">
          <div
            className="mb-8 flex h-[200px] items-end rounded p-5"
            style={{
              background:
                "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 12px, rgba(255,255,255,.03) 12px 24px)",
            }}
          >
            <span className="font-mono text-[10.5px] text-[#EAF2FA]/45">
              imagen editorial · opcional
            </span>
          </div>
          <div className="max-w-[420px] font-serif text-[28px] font-light italic leading-snug">
            Creamos valor en el tiempo para un futuro próspero
          </div>
        </div>
      </div>
    </div>
  );
}
