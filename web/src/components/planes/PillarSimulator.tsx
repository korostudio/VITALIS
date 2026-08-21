"use client";

import { useMemo, useState } from "react";
import { Slider } from "@heroui/react";

const pilares = [
  { tag: "Pilar 1", title: "Gobierno", body: "Pensión otorgada por las instituciones de seguridad social." },
  { tag: "Pilar 2", title: "Empresa", body: "Aportaciones de la empresa a través de un plan privado de pensiones." },
  { tag: "Pilar 3", title: "Ahorro personal", body: "Aportaciones voluntarias del empleado a su propia cuenta." },
];

export function PillarSimulator() {
  const [empresa, setEmpresa] = useState(6);
  const [ahorro, setAhorro] = useState(4);

  const { total, wGob, wEmp, wAho } = useMemo(() => {
    const gob = 30;
    const emp = empresa * 3.2;
    const aho = ahorro * 2.6;
    const total = gob + emp + aho;
    const w = (v: number) => ((v / total) * 100).toFixed(1) + "%";
    return { total, wGob: w(gob), wEmp: w(emp), wAho: w(aho) };
  }, [empresa, ahorro]);

  return (
    <section id="simulador" className="scroll-mt-20 bg-accent text-[#EAF2FA]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-[110px] lg:self-start">
            <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FC0EC]">
              01 — El modelo de tres pilares
            </div>
            <h2 className="mb-5.5 font-serif text-[32px] font-light leading-[1.12] text-white sm:text-[44px]">
              Ninguna pensión digna se sostiene sobre un solo pilar
            </h2>
            <p className="mb-5 text-[16.5px] font-light leading-relaxed text-[#EAF2FA]/72">
              Combinamos las ventajas fiscales que otorga el gobierno con la tecnología que
              desarrollamos, para llegar a una solución económicamente viable para la jubilación
              de los trabajadores.
            </p>
            <p className="m-0 text-sm font-light leading-relaxed text-[#EAF2FA]/50">
              Internamente le llamamos el modelo capuchino: tres ingredientes que por separado no
              son gran cosa y juntos hacen algo que vale la pena.
            </p>
          </div>

          <div>
            <div className="mb-9 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <Slider
                value={empresa}
                onChange={(v) => setEmpresa(Array.isArray(v) ? v[0] : v)}
                minValue={0}
                maxValue={12}
                className="flex flex-col gap-3"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-[#EAF2FA]/60">
                    Aportación de la empresa
                  </span>
                  <span className="font-serif text-[22px] text-white">{empresa}% del salario</span>
                </div>
                <Slider.Track className="h-1 rounded-full bg-white/20">
                  <Slider.Fill className="rounded-full bg-[#8FC0EC]" />
                  <Slider.Thumb className="border-[#8FC0EC]" />
                </Slider.Track>
              </Slider>
              <Slider
                value={ahorro}
                onChange={(v) => setAhorro(Array.isArray(v) ? v[0] : v)}
                minValue={0}
                maxValue={10}
                className="flex flex-col gap-3"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-[#EAF2FA]/60">
                    Ahorro voluntario del empleado
                  </span>
                  <span className="font-serif text-[22px] text-white">{ahorro}% del salario</span>
                </div>
                <Slider.Track className="h-1 rounded-full bg-white/20">
                  <Slider.Fill className="rounded-full bg-[#8FC0EC]" />
                  <Slider.Thumb className="border-[#8FC0EC]" />
                </Slider.Track>
              </Slider>
            </div>

            <div className="flex h-[68px] overflow-hidden rounded border border-white/22">
              <div
                className="flex items-center justify-center text-[13px] text-white"
                style={{ width: wGob, background: "rgba(234,242,250,.20)" }}
              >
                Gobierno
              </div>
              <div
                className="flex items-center justify-center text-[13px] text-[#08284A]"
                style={{ width: wEmp, background: "#8FC0EC" }}
              >
                Empresa
              </div>
              <div
                className="flex items-center justify-center text-[13px] text-[#08284A]"
                style={{ width: wAho, background: "#EAF2FA" }}
              >
                Ahorro
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-px border border-white/18 bg-white/18 sm:grid-cols-3">
              {pilares.map((p) => (
                <div key={p.tag} className="bg-accent px-5 py-5.5">
                  <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.13em] text-[#8FC0EC]">
                    {p.tag}
                  </div>
                  <div className="mb-2 text-base text-white">{p.title}</div>
                  <p className="m-0 text-[13.5px] font-light leading-snug text-[#EAF2FA]/62">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-baseline gap-5 border-t border-white/20 pt-6.5">
              <div>
                <div className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.13em] text-[#EAF2FA]/55">
                  Tasa de reemplazo estimada
                </div>
                <div className="font-serif text-[48px] leading-none text-white sm:text-[56px]">
                  {Math.round(total)}%
                </div>
              </div>
              <p className="m-0 max-w-[340px] text-[13.5px] font-light leading-snug text-[#EAF2FA]/55">
                Porcentaje del último salario que el colaborador recibiría al retirarse. La OCDE
                recomienda al menos 70%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
