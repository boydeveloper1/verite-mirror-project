import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { CTASection } from "@/components/sections/CTASection";
import { HomeContactForm } from "@/components/sections/HomeContactForm";
import { EducationalPopup } from "@/components/shared/EducationalPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <TrustSection />
        <HomeContactForm />
        <CTASection />
      </main>
      <Footer />
      <EducationalPopup />
    </div>
  );
};

export default Index;
