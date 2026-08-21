const clients = Array.from({ length: 6 }, () => "logo cliente");

export function ClientsStrip() {
  return (
    <section className="border-t border-accent/12 bg-[#F5F2EC]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-12 sm:px-10 sm:py-16">
        <div className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
          Confían en Vitalis
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((label, i) => (
            <div
              key={i}
              className="flex h-16 items-center justify-center rounded-sm font-mono text-[10px] tracking-[0.06em] text-accent/45"
              style={{
                background:
                  "repeating-linear-gradient(135deg, #E7EEF6 0 10px, #EFF4F9 10px 20px)",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
