import { Button } from "@/components/ui/button";
import { Check, Sparkles, Shield, Leaf } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

export const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[700px] md:min-h-[800px] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Gradient Overlay with richer depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-accent/70" />
      
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-brand-gold/15 rounded-full blur-2xl animate-float [animation-delay:2s]" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-primary-foreground/5 rounded-full blur-2xl animate-float [animation-delay:4s]" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-10 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/25 backdrop-blur-md border border-accent/40 rounded-full px-5 py-2.5 mb-6 animate-fade-in shadow-lg">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-semibold text-primary-foreground tracking-wide">Clinically Proven Formula</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6 tracking-wide animate-fade-in-up">
            Scalp Care<br />
            <span className="text-brand-gold">Before</span> Hair Care
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-10 max-w-xl animate-fade-in-up [animation-delay:200ms] opacity-0">
            Stop inflammation. Restore scalp health. Unlock natural hair growth with our dermatologist-recommended formulas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up [animation-delay:400ms] opacity-0">
            <Button 
              asChild
              className="h-[58px] px-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-glow rounded-full"
            >
              <a href="/store">Shop Now</a>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="h-[58px] px-12 bg-transparent border-2 border-primary-foreground/80 text-primary-foreground font-semibold text-base hover:bg-primary-foreground hover:text-primary transition-all duration-300 rounded-full"
            >
              <a href="/about">Learn More</a>
            </Button>
          </div>

          {/* Trust Stats */}
          <div className="flex flex-wrap gap-8 mt-12 animate-fade-in-up [animation-delay:600ms] opacity-0">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">5,000+</p>
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider mt-1">Happy Customers</p>
            </div>
            <div className="w-px h-14 bg-primary-foreground/30 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">98%</p>
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider mt-1">Recommend Us</p>
            </div>
            <div className="w-px h-14 bg-primary-foreground/30 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">70%</p>
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider mt-1">Less Shedding</p>
            </div>
          </div>
        </div>

        {/* Trust Badges - Right Side */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 hidden lg:flex flex-col gap-3 animate-fade-in [animation-delay:800ms] opacity-0">
          <div className="bg-card/95 backdrop-blur-md border-2 border-accent rounded-xl px-5 py-3 shadow-lg flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Check className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm font-semibold text-foreground">Dermatologist Recommended</span>
          </div>
          <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl px-5 py-3 shadow-lg flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">Natural Ingredients</span>
          </div>
          <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl px-5 py-3 shadow-lg flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-brand-gold" />
            </div>
            <span className="text-sm font-semibold text-foreground">30-Day Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};
