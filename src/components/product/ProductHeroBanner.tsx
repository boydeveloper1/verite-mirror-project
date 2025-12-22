import productBanner from "@/assets/product-banner.jpg";

interface ProductHeroBannerProps {
  productTitle: string;
}

export const ProductHeroBanner = ({ productTitle }: ProductHeroBannerProps) => {
  return (
    <section 
      className="relative min-h-[200px] md:min-h-[280px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${productBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-primary/75" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 py-8 md:py-12">
        <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-white mb-2 animate-fade-in">
          VERITÉ SCALP
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground tracking-wide animate-fade-in-up">
          {productTitle}
        </h1>
      </div>
    </section>
  );
};
