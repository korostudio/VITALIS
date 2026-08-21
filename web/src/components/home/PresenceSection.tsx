const offices = [
  {
    city: "Ciudad de México",
    country: "México",
    address: "Gobernador Rafael Rebollar 47 y 56, San Miguel Chapultepec, C.P. 11850",
    phone: "52 (55) 5235 3000",
  },
  {
    city: "Mont-Royal",
    country: "Canadá",
    address: "4400 Ch. Côte de Liesse, Porte 200, Quebec H4N 2P7",
    phone: "(514) 987 9550",
  },
  {
    city: "Lisboa",
    country: "Portugal",
    address: "Campo Grande 35, 4ºD, 1700-087 Lisboa",
    phone: "contacto@vitalis.com.mx",
  },
];

export function PresenceSection() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-24 lg:py-[104px]">
      <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
        05 — Presencia
      </div>
      <h2 className="mb-12 max-w-[600px] font-serif text-[32px] font-light leading-[1.12] text-accent sm:mb-[52px] sm:text-[44px]">
        Tres oficinas, una red actuarial global
      </h2>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {offices.map((office) => (
          <div key={office.city} className="border-t-2 border-accent pt-6">
            <div className="mb-1.5 font-serif text-[28px] text-accent">{office.city}</div>
            <div className="mb-4.5 font-mono text-[10.5px] uppercase tracking-[0.13em] text-foreground/45">
              {office.country}
            </div>
            <div className="text-[15px] font-light leading-[1.65] text-foreground/66">
              {office.address}
            </div>
            <div className="mt-3.5 text-sm text-[var(--color-accent-hover)]">{office.phone}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
