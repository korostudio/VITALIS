"use client";

import { useState } from "react";
import { Input, TextArea } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import Link from "next/link";
import { pageContentSchema } from "../pageContentSchema";
import type { FieldDef, GroupDef } from "../pageContentSchema";
import { pageMeta, type PageName, type PageStatus } from "../pageMeta";
import type { Screen } from "../types";

function fieldKey(page: PageName, tab: string, key: string) {
  return `${page}|${tab}|${key}`;
}

function Field({
  field,
  value,
  onChange,
  onNavigateLink,
}: {
  field: FieldDef;
  value: string | boolean;
  onChange: (v: string | boolean) => void;
  onNavigateLink: (screen: Screen) => void;
}) {
  const strValue = typeof value === "string" ? value : "";
  const boolValue = typeof value === "boolean" ? value : Boolean(value);

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="text-[13px] text-foreground/65">
          {field.label}
          {field.req && <span className="text-[#B4483C]"> *</span>}
        </span>
        {field.max && (
          <span className="font-mono text-[10.5px] text-foreground/40">
            {strValue.length} / {field.max}
          </span>
        )}
      </div>

      {field.type === "text" && (
        <Input
          variant="secondary"
          className="w-full"
          value={strValue}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "area" && (
        <TextArea
          variant="secondary"
          className="w-full"
          rows={3}
          value={strValue}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "num" && (
        <div className="flex items-center gap-3">
          <Input
            variant="secondary"
            className="w-[120px]"
            value={strValue}
            onChange={(e) => onChange(e.target.value)}
          />
          {field.unit && <span className="text-[13.5px] font-light text-foreground/50">{field.unit}</span>}
        </div>
      )}

      {field.type === "image" && (
        <div className="flex items-center gap-4 rounded-md border border-accent/16 bg-[#F5F2EC] px-3.5 py-3">
          <div
            className="h-12 w-12 flex-none rounded-sm"
            style={{ background: "repeating-linear-gradient(135deg,#E7EEF6 0 8px,#F3F7FB 8px 16px)" }}
          />
          <div className="min-w-0 flex-1">
            <div className="text-sm text-[var(--color-accent-hover)]">{field.fileName}</div>
            <div className="mt-0.5 font-mono text-[11px] text-foreground/45">{field.fileMeta}</div>
          </div>
          <span className="text-[12.5px] text-foreground/40">Recomendado {field.rec}</span>
          <button className="px-1 text-[17px] text-foreground/40">×</button>
        </div>
      )}

      {field.type === "toggle" && (
        <button
          onClick={() => onChange(!boolValue)}
          className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[13.5px]"
          style={{
            borderColor: boolValue ? "rgba(62,142,90,.4)" : "rgba(11,59,102,.2)",
            background: boolValue ? "rgba(62,142,90,.10)" : "transparent",
            color: boolValue ? "#2F6B45" : "rgba(15,26,36,.5)",
          }}
        >
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: boolValue ? "#3E8E5A" : "rgba(15,26,36,.3)" }}
          />
          {boolValue ? "Visible en el sitio" : "Oculto"}
        </button>
      )}

      {field.type === "link" && field.linkTo && (
        <button
          onClick={() => onNavigateLink(field.linkTo!)}
          className="rounded-md border border-accent/20 bg-background px-4.5 py-2.5 text-sm text-accent hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]/6"
        >
          {field.linkText}
        </button>
      )}

      {field.help && <div className="mt-1.5 text-[12.5px] font-light text-foreground/45">{field.help}</div>}
    </div>
  );
}

function Repeater({
  repeater,
  rows,
  onCellChange,
  onAddRow,
}: {
  repeater: NonNullable<GroupDef["repeater"]>;
  rows: string[][];
  onCellChange: (rowIdx: number, colIdx: number, value: string) => void;
  onAddRow: () => void;
}) {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  return (
    <div className="mt-7">
      <div className="mb-3 flex items-baseline justify-between gap-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/45">
          {repeater.title}
        </span>
        <button onClick={() => setOpen({})} className="text-[12.5px] text-foreground/50">
          Contraer todo
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((row, i) => {
          const isOpen = !!open[i];
          return (
            <div key={i} className="overflow-hidden rounded-md border border-accent/15 bg-background">
              <button
                onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
                className="flex w-full items-center gap-3 bg-[#F5F2EC] px-3.5 py-3 text-left"
              >
                <span className="font-mono text-[13px] text-foreground/35">⠿</span>
                <span className="flex-1 text-[14.5px] text-accent">
                  {String(i + 1).padStart(2, "0")} · {row[0]}
                </span>
                <span className="text-[12.5px] text-foreground/40">···</span>
                <span className="text-xs text-foreground/45">{isOpen ? "▴" : "▾"}</span>
              </button>
              {isOpen && (
                <div className="grid grid-cols-1 gap-4.5 p-4.5 sm:grid-cols-2">
                  {repeater.labels.map((label, j) => (
                    <div key={label}>
                      <div className="mb-1.5 text-[12.5px] text-foreground/60">{label}</div>
                      <Input
                        variant="secondary"
                        className="w-full"
                        value={row[j] ?? ""}
                        onChange={(e) => onCellChange(i, j, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={onAddRow}
        className="mt-3 w-full rounded-md border border-dashed border-accent/28 px-4.5 py-2.5 text-[13.5px] text-accent hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]/5"
      >
        + Agregar elemento
      </button>
    </div>
  );
}

export function PageEditorScreen({
  page,
  tab,
  status,
  savedNote,
  values,
  repeaterRows,
  onTabChange,
  onFieldChange,
  onRepeaterCellChange,
  onAddRepeaterRow,
  onSave,
  onNavigateLink,
}: {
  page: PageName;
  tab: string;
  status: PageStatus;
  savedNote: string;
  values: Record<string, string | boolean>;
  repeaterRows: Record<string, string[][]>;
  onTabChange: (tab: string) => void;
  onFieldChange: (page: PageName, tab: string, key: string, value: string | boolean) => void;
  onRepeaterCellChange: (name: string, rowIdx: number, colIdx: number, value: string) => void;
  onAddRepeaterRow: (name: string, cols: number) => void;
  onSave: () => void;
  onNavigateLink: (screen: Screen) => void;
}) {
  const meta = pageMeta[page];
  const groups = pageContentSchema[page][tab] ?? [];
  const dot = status === "Publicada" ? "#3E8E5A" : "#C4841C";

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-7 px-5 pt-8 sm:px-9">
        <div>
          <h1 className="mb-2.5 font-serif text-[34px] font-light text-accent sm:text-[40px]">{page}</h1>
          <div className="flex flex-wrap items-center gap-3 text-[12.5px] text-foreground/50">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.75 w-1.75 rounded-full" style={{ background: dot }} />
              {status}
            </span>
            <span className="opacity-40">·</span>
            <span className="font-mono">{meta.url}</span>
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
            href={meta.url}
            className="rounded-full border border-accent/20 px-4.5 py-2.5 text-[13.5px] hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]/7"
          >
            Vista previa
          </Link>
          <button onClick={onSave} className={buttonVariants({ size: "md" }) + " !rounded-full"}>
            Guardar
          </button>
        </div>
      </div>

      <div className="mt-6.5 flex gap-6.5 overflow-x-auto border-b border-accent/12 px-5 sm:px-9">
        {meta.tabs.map((t) => (
          <button
            key={t}
            onClick={() => onTabChange(t)}
            className="whitespace-nowrap border-b-2 py-3.5 text-[14.5px]"
            style={{
              borderBottomColor: tab === t ? "var(--color-accent)" : "transparent",
              color: tab === t ? "var(--color-accent)" : "rgba(15,26,36,.55)",
              fontWeight: tab === t ? 500 : 400,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="max-w-[980px] px-5 py-11 sm:px-9">
        {groups.length === 0 && (
          <p className="text-[13.5px] font-light text-foreground/50">Sección sin campos definidos todavía.</p>
        )}
        {groups.map((grp) => (
          <div key={grp.title} className="mb-13">
            <h2 className="mb-1.5 font-serif text-[26px] text-accent">{grp.title}</h2>
            {grp.help && <p className="mb-6.5 max-w-[640px] text-[13.5px] font-light text-foreground/50">{grp.help}</p>}

            {grp.fields.map((field) => {
              const key = fieldKey(page, tab, field.key);
              const value = key in values ? values[key] : field.default;
              return (
                <Field
                  key={field.key}
                  field={field}
                  value={value}
                  onChange={(v) => onFieldChange(page, tab, field.key, v)}
                  onNavigateLink={onNavigateLink}
                />
              );
            })}

            {grp.repeater && (
              <Repeater
                repeater={grp.repeater}
                rows={repeaterRows[grp.repeater.name] ?? grp.repeater.defaultRows}
                onCellChange={(rowIdx, colIdx, v) => onRepeaterCellChange(grp.repeater!.name, rowIdx, colIdx, v)}
                onAddRow={() => onAddRepeaterRow(grp.repeater!.name, grp.repeater!.labels.length)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
