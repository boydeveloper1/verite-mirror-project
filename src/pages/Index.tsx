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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <TrustSection />
        <MoneyBackGuarantee />
        <ScalpHealthQuiz />
        <HomeFAQSection />
        <HomeContactForm />
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
