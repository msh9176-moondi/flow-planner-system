import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { BeforeAfterSection } from "@/components/landing/BeforeAfterSection";
import { FlowSection } from "@/components/landing/FlowSection";
import { RewardSection } from "@/components/landing/RewardSection";
import { DataSection } from "@/components/landing/DataSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { ContactForm } from "@/components/landing/ContactForm";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <BeforeAfterSection />
        <FlowSection />
        <RewardSection />
        <DataSection />
        <TrustSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
};

export default Index;
