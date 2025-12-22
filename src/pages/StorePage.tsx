import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";
import productsBanner from "@/assets/products-banner.jpg";

const StorePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PageHeroBanner
        title="Products"
        subtitle="Premium scalp care solutions crafted for lasting results"
        breadcrumbs={[{ label: "Products" }]}
        backgroundImage={productsBanner}
      />
      
      {/* Products Grid */}
      <ProductsSection />
      
      <Footer />
    </div>
  );
};

export default StorePage;
