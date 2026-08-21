"use client";

import Link from "next/link";
import { Button, Drawer, Popover } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { routes } from "@/lib/routes";

const actuariaLinks = [
  {
    href: routes.pasivosLaborales,
    title: "Pasivos laborales",
    description: "NIF D-3, IFRS, US GAAP y German GAAP",
  },
  {
    href: routes.planesDePensiones,
    title: "Planes de pensiones privados",
    description: "Diseño, implementación y administración",
  },
];

const navLinks = [
  { href: routes.nosotros, label: "Nosotros" },
  { href: routes.inversiones, label: "Inversiones" },
];

const trailingLinks = [
  { href: routes.tecnologia, label: "Tecnología" },
  { href: routes.blog, label: "Blog" },
  { href: routes.usuarios, label: "Usuarios" },
];

function HamburgerIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
      <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-accent/12 bg-background/92 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between gap-10 px-5 sm:px-10">
        <Link href={routes.home} className="flex items-baseline gap-2">
          <span className="font-serif text-[27px] tracking-[0.14em] text-accent">VITALIS</span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-hover)]" />
        </Link>

        <nav className="hidden h-full items-center gap-[30px] text-[14.5px] lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}

          <Popover>
            <Button variant="ghost" className="h-auto rounded-none p-0 text-[14.5px] font-normal text-foreground hover:bg-transparent">
              Actuaría
            </Button>
            <Popover.Content className="mt-2 min-w-[290px] p-2">
              <Popover.Dialog className="flex flex-col gap-1">
                {actuariaLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-md p-3 hover:bg-accent/8"
                  >
                    <span className="block font-medium text-accent">{item.title}</span>
                    <span className="mt-0.5 block text-[12.5px] font-light text-foreground/55">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </Popover.Dialog>
            </Popover.Content>
          </Popover>

          {trailingLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={routes.enConstruccion}
          className={buttonVariants({ size: "md" }) + " hidden !rounded-full lg:inline-flex"}
        >
          Agendar diagnóstico
        </Link>

        <Drawer>
          <Button isIconOnly variant="ghost" aria-label="Abrir menú" className="lg:hidden">
            <HamburgerIcon />
          </Button>
          <Drawer.Backdrop>
            <Drawer.Content placement="right" className="w-[300px]">
              <Drawer.Dialog>
                <Drawer.Header className="flex items-center justify-between">
                  <span className="font-serif text-xl tracking-[0.14em] text-accent">VITALIS</span>
                  <Drawer.CloseTrigger />
                </Drawer.Header>
                <Drawer.Body className="flex flex-col gap-1 text-[15px]">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="border-b border-accent/8 py-3"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-b border-accent/8 py-3">
                    <span className="mb-2 block font-medium text-accent">Actuaría</span>
                    <div className="flex flex-col gap-3 pl-3">
                      {actuariaLinks.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <span className="block">{item.title}</span>
                          <span className="block text-[12.5px] font-light text-foreground/55">
                            {item.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  {trailingLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="border-b border-accent/8 py-3"
                    >
                      {link.label}
                    </Link>
                  ))}
                </Drawer.Body>
                <Drawer.Footer>
                  <Link
                    href={routes.enConstruccion}
                    className={buttonVariants({ fullWidth: true }) + " !rounded-full"}
                  >
                    Agendar diagnóstico
                  </Link>
                </Drawer.Footer>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </header>
  );
}
