"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Slider } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";

const RETIRE_AGE = 65;
const PENSION_YEARS = 18;
const ANNUAL_RETURN = 0.05;

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("es-MX");
}

export function SavingsCalculator({
  kicker = "02 — Para el colaborador",
  title = "Ahorra, vive y disfruta",
  description = "Descubre cuánto necesitas ahorrar cada mes para sostener la pensión que quieres. Un cálculo simple, con supuestos reales de rendimiento.",
}: {
  kicker?: string;
  title?: string;
  description?: string;
} = {}) {
  const [age, setAge] = useState(34);
  const [pension, setPension] = useState(25000);

  const { monthly, capital, yearsLeft } = useMemo(() => {
    const clampedAge = Math.min(age, RETIRE_AGE - 1);
    const yearsLeft = Math.max(1, RETIRE_AGE - clampedAge);
    const capital = pension * 12 * PENSION_YEARS;
    const r = ANNUAL_RETURN / 12;
    const n = yearsLeft * 12;
    const monthly = (capital * r) / (Math.pow(1 + r, n) - 1);
    return { monthly, capital, yearsLeft };
  }, [age, pension]);

  return (
    <section id="calculadora" className="bg-accent text-[#EAF2FA]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-[100px]">
        <div>
          <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FC0EC]">
            {kicker}
          </div>
          <h2 className="mb-5.5 font-serif text-[32px] font-light leading-[1.12] sm:text-[44px]">
            {title}
          </h2>
          <p className="mb-7.5 max-w-[420px] text-[17px] font-light leading-[1.65] text-[#EAF2FA]/72">
            {description}
          </p>
          <div className="font-mono text-[11.5px] leading-[1.8] text-[#EAF2FA]/50">
            Rendimiento real anual supuesto: 5%
            <br />
            Retiro a los {RETIRE_AGE} años · {PENSION_YEARS} años de pensión
          </div>
        </div>

        <div className="rounded-md bg-background p-7 text-foreground shadow-[0_30px_60px_rgba(0,0,0,0.22)] sm:p-11">
          <div className="mb-8 grid grid-cols-1 gap-7 sm:grid-cols-2">
            <Slider
              value={age}
              onChange={(v) => setAge(Array.isArray(v) ? v[0] : v)}
              minValue={18}
              maxValue={64}
              className="flex flex-col gap-3"
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-foreground/50">
                Edad actual · {age} años
              </span>
              <Slider.Track className="h-1 rounded-full bg-accent/15">
                <Slider.Fill className="rounded-full bg-[var(--color-accent-hover)]" />
                <Slider.Thumb className="border-[var(--color-accent-hover)]" />
              </Slider.Track>
            </Slider>

            <label className="flex flex-col gap-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-foreground/50">
                Pensión mensual deseada
              </span>
              <input
                type="text"
                value={fmt(pension)}
                onChange={(e) => {
                  const digits = e.target.value.replace(/[^0-9]/g, "");
                  const v = digits ? parseInt(digits, 10) : 0;
                  setPension(Math.min(v, 500000));
                }}
                className="border-0 border-b border-accent/28 bg-transparent p-0 pb-2 font-serif text-[22px] text-accent outline-none"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-accent/14 pt-7.5">
            <div>
              <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.13em] text-foreground/50">
                Ahorro mensual necesario
              </div>
              <div className="font-serif text-[42px] leading-none text-accent sm:text-[56px]">
                {fmt(monthly)}
              </div>
              <div className="mt-2.5 text-[13px] font-light text-foreground/55">
                durante {yearsLeft} años · capital objetivo {fmt(capital)}
              </div>
            </div>
            <Link
              href="https://millasparaelretiro.com"
              className={buttonVariants({ size: "md" }) + " !rounded-full"}
            >
              Empezar mi plan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
