"use client";

const usuariosRows = [
  { ini: "AL", correo: "a.lozano@vitalis.com.mx", rol: "Administrador", acceso: "hoy, 09:14" },
  { ini: "MC", correo: "m.cervantes@vitalis.com.mx", rol: "Editor", acceso: "ayer, 17:40" },
  { ini: "JP", correo: "j.padilla@vitalis.com.mx", rol: "Solo lectura", acceso: "02 ago 2026" },
];

const roles = [
  { rol: "Administrador", puede: "Todo, incluyendo publicar páginas y editar datos globales." },
  { rol: "Editor", puede: "Edita el contenido de cualquier página y publica. No administra usuarios ni datos globales." },
  { rol: "Solo lectura", puede: "Consulta el contenido y las solicitudes recibidas. No guarda cambios." },
];

export function UsersScreen() {
  return (
    <div className="max-w-[1080px] px-5 py-11 sm:px-9">
      <h1 className="mb-2 font-serif text-[34px] font-light text-accent sm:text-[40px]">Usuarios</h1>
      <p className="mb-8 max-w-[620px] text-[15px] font-light text-foreground/55">
        Quién puede entrar al panel y qué puede hacer. El rol se cambia desde aquí y aplica al instante.
      </p>

      <div className="overflow-hidden rounded-md border border-accent/14 bg-background">
        <div className="overflow-x-auto">
          <div className="grid min-w-[600px] grid-cols-[1.5fr_1.1fr_1fr_0.9fr] gap-4 border-b border-accent/12 bg-[#F5F2EC] px-5.5 py-3.5 font-mono text-[9.5px] uppercase tracking-[0.13em] text-foreground/45">
            <span>Usuario</span>
            <span>Rol</span>
            <span>Último acceso</span>
            <span />
          </div>
          {usuariosRows.map((u) => (
            <div
              key={u.correo}
              className="grid min-w-[600px] grid-cols-[1.5fr_1.1fr_1fr_0.9fr] items-center gap-4 border-b border-accent/8 px-5.5 py-3.5 text-[14.5px]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-7.5 w-7.5 flex-none items-center justify-center rounded-full bg-accent/10 text-[12.5px] font-medium text-accent">
                  {u.ini}
                </span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">{u.correo}</span>
              </div>
              <span className="inline-flex w-fit self-start rounded-full border border-accent/20 px-3.5 py-1 text-[12.5px] text-accent">
                {u.rol}
              </span>
              <span className="font-mono text-xs text-foreground/45">{u.acceso}</span>
              <button className="justify-self-end rounded-full border border-accent/18 px-3.5 py-1.5 text-[13px] text-accent hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]/7">
                Editar
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {roles.map((r) => (
          <div key={r.rol} className="rounded-md border border-accent/14 bg-[#F5F2EC] px-6.5 py-6">
            <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.13em] text-[var(--color-accent-hover)]">
              {r.rol}
            </div>
            <p className="m-0 text-sm font-light leading-relaxed text-foreground/65">{r.puede}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
