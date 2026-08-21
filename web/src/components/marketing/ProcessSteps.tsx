type Step = { n: string; time: string; title: string; body: string };

export function ProcessSteps({
  kicker,
  title,
  steps,
  tinted = true,
}: {
  kicker: string;
  title: string;
  steps: Step[];
  tinted?: boolean;
}) {
  return (
    <section className={tinted ? "border-t border-accent/12 bg-[#F5F2EC]" : ""}>
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-[100px]">
        <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
          {kicker}
        </div>
        <h2 className="mb-12 max-w-[560px] font-serif text-[32px] font-light leading-[1.12] text-accent sm:mb-[52px] sm:text-[44px]">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.n} className="border-t-2 border-accent pt-5.5">
              <div className="mb-3.5 flex items-baseline justify-between gap-3">
                <span className="font-mono text-[11px] text-foreground/40">{step.n}</span>
                <span className="font-mono text-[10.5px] text-[var(--color-accent-hover)]">
                  {step.time}
                </span>
              </div>
              <div className="mb-3 font-serif text-2xl leading-tight text-accent">
                {step.title}
              </div>
              <p className="text-[14.5px] font-light leading-relaxed text-foreground/62">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
