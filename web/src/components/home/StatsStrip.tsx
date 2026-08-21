const stats = [
  { value: "25", label: "años de experiencia actuarial" },
  { value: "1,800", label: "razones sociales asesoradas" },
  { value: "1°", label: "asesor mexicano certificado UNPRI" },
  { value: "3", label: "países: México, Canadá y Portugal" },
];

export function StatsStrip() {
  return (
    <section className="border-y border-accent/12 bg-[#F5F2EC]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 divide-y divide-accent/12 px-5 sm:px-10 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="px-0 py-9 first:pr-8 lg:px-8 lg:first:pl-0">
            <div className="font-serif text-4xl leading-none text-accent sm:text-[46px]">
              {stat.value}
            </div>
            <div className="mt-2.5 text-[13.5px] font-light text-foreground/60">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
