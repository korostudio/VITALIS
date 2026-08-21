import { pageMeta, pageOrder } from "../pageMeta";
import type { PageName, PageStatus } from "../pageMeta";

export function PagesScreen({
  pageStatus,
  onToggle,
  onEdit,
}: {
  pageStatus: Record<PageName, PageStatus>;
  onToggle: (page: PageName) => void;
  onEdit: (page: PageName) => void;
}) {
  return (
    <div className="max-w-[1120px] px-5 py-12 sm:px-9 sm:py-13">
      <h1 className="mb-2 font-serif text-[34px] font-light text-accent sm:text-[40px]">Páginas</h1>
      <p className="mb-9 text-[15.5px] font-light leading-relaxed text-foreground/55">
        Marca una página como &ldquo;En construcción&rdquo; para mostrar el aviso en el sitio
        mientras la terminamos.
      </p>

      <div className="overflow-hidden rounded-md border border-accent/14 bg-background">
        <div className="overflow-x-auto">
          <div className="grid min-w-[560px] grid-cols-[2fr_1.4fr_1fr_100px] gap-4 border-b border-accent/12 bg-[#F5F2EC] px-5.5 py-3.5 font-mono text-[9.5px] uppercase tracking-[0.13em] text-foreground/45">
            <span>Página</span>
            <span>URL</span>
            <span>Estado</span>
            <span />
          </div>
          {pageOrder.map((name) => {
            const status = pageStatus[name];
            const pub = status === "Publicada";
            return (
              <div
                key={name}
                className="grid min-w-[560px] grid-cols-[2fr_1.4fr_1fr_100px] items-center gap-4 border-b border-accent/8 px-5.5 py-3.5 text-[14.5px]"
              >
                <span className="font-medium text-accent">{name}</span>
                <span className="whitespace-nowrap font-mono text-xs text-foreground/50">
                  {pageMeta[name].url}
                </span>
                <button
                  onClick={() => onToggle(name)}
                  className="justify-self-start whitespace-nowrap rounded-full border px-3.5 py-1 text-[12.5px]"
                  style={{
                    borderColor: pub ? "rgba(62,142,90,.35)" : "rgba(196,132,28,.35)",
                    background: pub ? "rgba(62,142,90,.10)" : "rgba(196,132,28,.10)",
                    color: pub ? "#2F6B45" : "#8A5B12",
                  }}
                >
                  {status}
                </button>
                <button
                  onClick={() => onEdit(name)}
                  className="justify-self-end rounded-full border border-accent/20 px-3.5 py-1.5 text-[13px] text-accent hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]/7"
                >
                  Editar
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
