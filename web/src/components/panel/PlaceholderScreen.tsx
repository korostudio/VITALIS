export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <div className="max-w-[900px] px-5 py-16 sm:px-9">
      <div className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent-hover)]">
        Próximamente
      </div>
      <h1 className="mb-4 font-serif text-[32px] font-light text-accent">{title}</h1>
      <p className="text-[15px] font-light leading-relaxed text-foreground/60">
        Esta pantalla se construye en la siguiente fase de la migración.
      </p>
    </div>
  );
}
