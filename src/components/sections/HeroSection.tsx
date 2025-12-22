import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

export const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[650px] md:min-h-[750px] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-brand-gold/10 rounded-full blur-2xl animate-float [animation-delay:2s]" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-10 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">Clinically Proven Formula</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 tracking-wide animate-fade-in-up">
            Scalp Care Before Hair Care
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-8 max-w-xl animate-fade-in-up [animation-delay:200ms] opacity-0">
            Stop inflammation. Restore scalp health. Unlock natural hair growth with our dermatologist-recommended formulas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up [animation-delay:400ms] opacity-0">
            <Button 
              asChild
              className="h-[54px] px-10 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-glow"
            >
              <a href="/store">Shop Now</a>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="h-[54px] px-10 bg-transparent border-2 border-primary-foreground/80 text-primary-foreground font-semibold text-base hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            >
              <a href="/about">Learn More</a>
            </Button>
          </div>

          {/* Trust Stats */}
          <div className="flex flex-wrap gap-6 mt-10 animate-fade-in-up [animation-delay:600ms] opacity-0">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">5,000+</p>
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider">Happy Customers</p>
            </div>
            <div className="w-px h-12 bg-primary-foreground/30 hidden sm:block" />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">98%</p>
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider">Recommend Us</p>
            </div>
            <div className="w-px h-12 bg-primary-foreground/30 hidden sm:block" />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">70%</p>
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider">Less Shedding</p>
            </div>
          </div>
        </div>

        {/* Trust Badge - Top Right */}
        <div className="absolute top-6 right-6 md:top-8 md:right-10 bg-card/95 backdrop-blur-sm border-2 border-accent rounded-lg px-4 py-3 shadow-lg hidden md:flex items-center gap-2 animate-fade-in [animation-delay:800ms] opacity-0">
          <Check className="h-4 w-4 text-accent" />
          <span className="text-sm font-semibold text-accent">Dermatologist Recommended</span>
        </div>
      </div>
    </section>
  );
};
