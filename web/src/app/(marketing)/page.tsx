import { Hero } from "@/components/home/Hero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { SavingsCalculator } from "@/components/home/SavingsCalculator";
import { ReturnsChart } from "@/components/home/ReturnsChart";
import { LiabilitiesSection } from "@/components/home/LiabilitiesSection";
import { ClientsStrip } from "@/components/home/ClientsStrip";
import { PresenceSection } from "@/components/home/PresenceSection";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
    <main>
      <Hero />
      <StatsStrip />
      <ServicesGrid />
      <SavingsCalculator />
      <ReturnsChart />
      <LiabilitiesSection />
      <ClientsStrip />
      <PresenceSection />
      <ClosingCta
        title="Hablemos de tu"
        titleItalic="obligación laboral"
        description="Un diagnóstico inicial sin costo con uno de nuestros actuarios certificados."
      />
    </main>
    <Footer />
    </>
  );
}
