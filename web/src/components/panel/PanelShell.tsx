"use client";

import type { ReactNode } from "react";
import type { Lang, Screen } from "./types";
import type { PageName } from "./pageMeta";

type NavItem = { label: string; screen: Screen; page?: PageName; badge?: string };
type NavGroup = { title: string; items: NavItem[] };

export function PanelShell({
  screen,
  crumb,
  lang,
  onLangChange,
  onNavigate,
  onLogout,
  currentPageBadge,
  children,
}: {
  screen: Screen;
  crumb: string;
  lang: Lang;
  onLangChange: (l: Lang) => void;
  onNavigate: (s: Screen, page?: PageName) => void;
  onLogout: () => void;
  currentPageBadge?: string;
  children: ReactNode;
}) {
  const isOnPageEditorNonHome = screen === "pageEditor" && !!currentPageBadge && currentPageBadge !== "Home";
  const isOnHome = screen === "pageEditor" && currentPageBadge === "Home";

  const navGroups: NavGroup[] = [
    {
      title: "Páginas",
      items: [
        { label: "Home", screen: "pageEditor", page: "Home" },
        { label: "Todas las páginas", screen: "pages", badge: isOnPageEditorNonHome ? currentPageBadge : undefined },
      ],
    },
    {
      title: "Contenido",
      items: [
        { label: "Blog", screen: "blogList" },
        { label: "Series de rendimientos", screen: "series" },
      ],
    },
    {
      title: "Configuración",
      items: [
        { label: "Usuarios", screen: "usuarios" },
        { label: "Archivos", screen: "archivos" },
        { label: "Datos globales", screen: "datos" },
      ],
    },
  ];

  const isActive = (item: NavItem) => {
    if (item.screen === "pageEditor") return isOnHome;
    if (item.screen === "pages") return screen === "pages" || isOnPageEditorNonHome;
    if (item.screen === "blogList") return screen === "blogList" || screen === "postEditor";
    return screen === item.screen;
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[236px_1fr]">
      <aside className="flex flex-col border-b border-accent/12 bg-[#F5F2EC] lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-baseline gap-2 px-5.5 py-5.5">
          <span className="font-serif text-xl tracking-[0.14em] text-accent">VITALIS</span>
          <span className="inline-block h-1.25 w-1.25 rounded-full bg-[var(--color-accent-hover)]" />
        </div>
        <nav className="overflow-y-auto pb-5 lg:flex-1">
          {navGroups.map((g) => (
            <div key={g.title} className="mb-5.5">
              <div className="px-5.5 pb-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-foreground/38">
                {g.title}
              </div>
              {g.items.map((it) => {
                const active = isActive(it);
                return (
                  <button
                    key={it.label}
                    onClick={() => onNavigate(it.screen, it.page)}
                    className="flex w-full items-center justify-between gap-2 border-l-2 px-5.5 py-2.5 text-left text-sm"
                    style={{
                      borderLeftColor: active ? "var(--color-accent)" : "transparent",
                      background: active ? "rgba(29,111,184,.10)" : "transparent",
                      color: active ? "var(--color-accent)" : "rgba(15,26,36,.7)",
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {it.label}
                    {it.badge && (
                      <span className="rounded-full bg-[var(--color-accent-hover)] px-2 py-0.5 font-mono text-[10px] text-white">
                        {it.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <button
          onClick={onLogout}
          className="border-t border-accent/12 px-5.5 py-4 text-left text-[13.5px] text-foreground/55"
        >
          Cerrar sesión
        </button>
      </aside>

      <main className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-20 flex h-16 flex-wrap items-center justify-between gap-4 border-b border-accent/12 bg-background/94 px-5 backdrop-blur-md sm:px-9">
          <div className="flex items-center gap-2 text-[13.5px] text-foreground/50">
            <span>Panel</span>
            <span className="opacity-40">/</span>
            <span className="text-foreground">{crumb}</span>
          </div>
          <div className="flex items-center gap-5.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.13em] text-foreground/40">
                Idioma
              </span>
              <div className="flex gap-0.5 rounded-full bg-accent/6 p-0.5">
                {(["ES", "EN", "FR"] as Lang[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => onLangChange(code)}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      background: lang === code ? "var(--color-accent)" : "transparent",
                      color: lang === code ? "#fff" : "rgba(15,26,36,.55)",
                    }}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[13px] font-medium text-white">
                A
              </span>
              <div className="hidden leading-tight sm:block">
                <div className="text-[13px]">admin@vitalis.com.mx</div>
                <div className="text-[11.5px] text-foreground/45">Administrador</div>
              </div>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
