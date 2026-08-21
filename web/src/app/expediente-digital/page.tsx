import type { Metadata } from "next";
import { ExpedienteDigital } from "@/components/expediente/ExpedienteDigital";

export const metadata: Metadata = { title: "Expediente digital · Vitalis" };

export default function ExpedienteDigitalPage() {
  return <ExpedienteDigital />;
}
