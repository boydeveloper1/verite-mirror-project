import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { CTASection } from "@/components/sections/CTASection";
import { HomeContactForm } from "@/components/sections/HomeContactForm";
import { EducationalPopup } from "@/components/shared/EducationalPopup";
import { MoneyBackGuarantee } from "@/components/product/MoneyBackGuarantee";
import { HomeFAQSection } from "@/components/sections/HomeFAQSection";
import { ScalpHealthQuiz } from "@/components/sections/ScalpHealthQuiz";
import { PreFooterSubscribe } from "@/components/shared/PreFooterSubscribe";
import { EmailPopup } from "@/components/shared/EmailPopup";
import { SectionDivider } from "@/components/shared/SectionDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SectionDivider variant="gradient" />
        <ProductsSection />
        <SectionDivider variant="line" />
        <TrustSection />
        <SectionDivider variant="gradient" />
        <MoneyBackGuarantee />
        <SectionDivider variant="line" />
        <ScalpHealthQuiz />
        <SectionDivider variant="gradient" />
        <HomeFAQSection />
        <SectionDivider variant="line" />
        <HomeContactForm />
        <SectionDivider variant="gradient" />
        <CTASection />
        <PreFooterSubscribe />
      </main>
      <Footer />
      <EducationalPopup />
      <EmailPopup />
    </div>
  );
};

export default Index;
