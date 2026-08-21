"use client";

import { Input, TextArea } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { blogCategories } from "../blogPosts";
import type { BlogPost } from "../blogPosts";

function TextField({
  label,
  value,
  onChange,
  help,
  max,
  area,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: string;
  max?: number;
  area?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="text-[13px] text-foreground/65">{label}</span>
        {max && (
          <span className="font-mono text-[10.5px] text-foreground/40">
            {value.length} / {max}
          </span>
        )}
      </div>
      {area ? (
        <TextArea
          variant="secondary"
          className="w-full"
          rows={rows ?? 3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <Input variant="secondary" className="w-full" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      {help && <div className="mt-1.5 text-[12.5px] font-light text-foreground/45">{help}</div>}
    </div>
  );
}

export function PostEditorScreen({
  post,
  savedNote,
  onBack,
  onChange,
  onToggleStatus,
  onToggleDestacado,
  onPickCategory,
  onSave,
}: {
  post: BlogPost;
  savedNote: string;
  onBack: () => void;
  onChange: (patch: Partial<BlogPost>) => void;
  onToggleStatus: () => void;
  onToggleDestacado: () => void;
  onPickCategory: (cat: string) => void;
  onSave: () => void;
}) {
  const dot = post.estado === "Publicada" ? "#3E8E5A" : "#C4841C";

  return (
    <div className="max-w-[1080px] px-5 pt-9 pb-11 sm:px-9">
      <div className="mb-7.5 flex flex-wrap items-start justify-between gap-7">
        <div>
          <button onClick={onBack} className="mb-3 text-[13px] text-foreground/50">
            ← Blog
          </button>
          <h1 className="mb-2.5 font-serif text-[32px] font-light text-accent">
            {post.titulo || "Nueva publicación"}
          </h1>
          <div className="flex items-center gap-3 text-[12.5px] text-foreground/50">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.75 w-1.75 rounded-full" style={{ background: dot }} />
              {post.estado}
            </span>
            <span className="opacity-40">·</span>
            <span className="font-mono">{post.slug}</span>
            {savedNote && (
              <>
                <span className="opacity-40">·</span>
                <span>{savedNote}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href={routes.blog + "/articulo"}
            className="rounded-full border border-accent/20 px-4.5 py-2.5 text-[13.5px] hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]/7"
          >
            Vista previa
          </Link>
          <button
            onClick={onToggleStatus}
            className="rounded-full border border-accent/20 px-4.5 py-2.5 text-[13.5px] text-accent hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]/7"
          >
            {post.estado === "Publicada" ? "Pasar a borrador" : "Publicar"}
          </button>
          <button onClick={onSave} className={buttonVariants({ size: "md" }) + " !rounded-full"}>
            Guardar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8.5 lg:grid-cols-[1.6fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <TextField label="Título" value={post.titulo} onChange={(v) => onChange({ titulo: v })} max={80} />
          <TextField
            label="URL"
            value={post.slug}
            onChange={(v) => onChange({ slug: v })}
            help="Se genera del título. Puedes ajustarla antes de publicar."
          />
          <TextField
            label="Extracto"
            value={post.extracto}
            onChange={(v) => onChange({ extracto: v })}
            area
            rows={3}
            max={180}
            help="Se muestra en la tarjeta del listado y en buscadores."
          />
          <TextField
            label="Cuerpo"
            value={post.cuerpo}
            onChange={(v) => onChange({ cuerpo: v })}
            area
            rows={14}
            help="Un párrafo por línea. Los subtítulos se marcan con ##."
          />
          <TextField label="Autor" value={post.autor} onChange={(v) => onChange({ autor: v })} />
          <TextField
            label="Tiempo de lectura"
            value={post.lectura}
            onChange={(v) => onChange({ lectura: v })}
            help="Se calcula automáticamente si lo dejas vacío."
          />
        </div>

        <div className="flex flex-col gap-5 lg:sticky lg:top-22">
          <div className="rounded-md border border-accent/15 bg-[#F5F2EC] px-6 py-5.5">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/45">
              Publicación
            </div>
            <div className="flex flex-col gap-4.5">
              <div>
                <div className="mb-2.25 text-[12.5px] text-foreground/60">Categoría</div>
                <div className="flex flex-wrap gap-1.5">
                  {blogCategories.map((c) => {
                    const active = post.cat === c;
                    return (
                      <button
                        key={c}
                        onClick={() => onPickCategory(c)}
                        className="rounded-full border px-3.5 py-1.5 text-[12.5px]"
                        style={{
                          borderColor: active ? "var(--color-accent)" : "rgba(11,59,102,.2)",
                          background: active ? "var(--color-accent)" : "transparent",
                          color: active ? "#fff" : "rgba(15,26,36,.6)",
                        }}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="mb-2.25 text-[12.5px] text-foreground/60">Destacado en la portada del blog</div>
                <button
                  onClick={onToggleDestacado}
                  className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[13.5px]"
                  style={{
                    borderColor: post.destacado ? "rgba(62,142,90,.4)" : "rgba(11,59,102,.2)",
                    background: post.destacado ? "rgba(62,142,90,.10)" : "transparent",
                    color: post.destacado ? "#2F6B45" : "rgba(15,26,36,.5)",
                  }}
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: post.destacado ? "#3E8E5A" : "rgba(15,26,36,.3)" }}
                  />
                  {post.destacado ? "Destacado" : "No destacado"}
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-accent/15 bg-background px-6 py-5.5">
            <div className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/45">
              Imagen principal
            </div>
            <div
              className="mb-3 flex h-26 items-end rounded p-2.5"
              style={{ background: "repeating-linear-gradient(135deg,#E7EEF6 0 10px,#F3F7FB 10px 20px)" }}
            >
              <span className="font-mono text-[9.5px] text-[var(--color-accent-hover)]/70">article-cover.jpg</span>
            </div>
            <div className="font-mono text-[11px] text-foreground/42">2000×1000 · 640 KB</div>
            <div className="mt-2 text-xs font-light text-foreground/45">Recomendado 2000×1000 px</div>
          </div>
        </div>
      </div>
    </div>
  );
}
