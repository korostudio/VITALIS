import { TopBar } from "@/components/site/TopBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <SiteHeader />
      {children}
      <WhatsAppButton />
    </>
  );
}
