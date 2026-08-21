type Item = { n: string; title?: string; body: string };

export function NumberedList({ items, dark = false }: { items: Item[]; dark?: boolean }) {
  const borderColor = dark ? "border-white/16" : "border-accent/13";
  const numberColor = dark ? "text-[#8FC0EC]" : "text-[var(--color-accent-hover)]";
  const titleColor = dark ? "text-white" : "text-accent";
  const bodyColor = dark ? "text-[#EAF2FA]/68" : "text-foreground/76";
  const bodySize = dark ? "text-[15.5px]" : "text-lg";

  return (
    <div>
      {items.map((item) => (
        <div key={item.n} className={`grid grid-cols-[40px_1fr] gap-5 border-b ${borderColor} py-6 sm:grid-cols-[52px_1fr] sm:gap-6`}>
          <span className={`pt-1 font-mono text-xs ${numberColor}`}>{item.n}</span>
          <div>
            {item.title && <div className={`mb-1.5 text-[19px] ${titleColor}`}>{item.title}</div>}
            <p className={`m-0 font-light leading-relaxed ${bodySize} ${bodyColor}`}>{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
