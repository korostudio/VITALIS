import type { Metadata } from "next";
import { PanelApp } from "@/components/panel/PanelApp";

export const metadata: Metadata = { title: "Panel · Vitalis" };

export default function PanelPage() {
  return <PanelApp />;
}
