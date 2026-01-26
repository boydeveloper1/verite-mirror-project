import { Button } from "@/components/ui/button";
import { Check, Sparkles, Shield, Droplets } from "lucide-react";
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
      {/* Rich Gradient Overlay with warm skin tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-brand-emerald/75" />
      
      {/* Subtle radial glow from center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--brand-gold)/0.15)_0%,_transparent_60%)]" />
      
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      {/* Animated Background Elements with skin-friendly warm tones */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-brand-cream/10 rounded-full blur-2xl animate-float [animation-delay:2s]" />
        <div className="absolute top-1/2 right-1/3 w-56 h-56 bg-accent/10 rounded-full blur-2xl animate-float [animation-delay:4s]" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-brand-sage/15 rounded-full blur-xl animate-float [animation-delay:3s]" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-10 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          {/* Badge with enhanced glass-morphism */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-xl border border-primary-foreground/20 rounded-full px-5 py-2.5 mb-6 animate-fade-in shadow-xl">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-semibold text-primary-foreground tracking-wide">Dermatologist Recommended</span>
          </div>

          {/* Headline with gradient accent */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6 tracking-wide animate-fade-in-up">
            Your Water Is<br />
            <span className="bg-gradient-to-r from-brand-gold via-brand-cream to-brand-gold bg-clip-text text-transparent">Damaging</span> Your Skin
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-10 max-w-xl animate-fade-in-up [animation-delay:200ms] opacity-0">
            Chlorine & hard water minerals trigger eczema, psoriasis, rosacea & acne flare-ups. Our 15-stage filtration stops the damage at the source.
          </p>

          {/* CTA Buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up [animation-delay:400ms] opacity-0">
            <Button 
              asChild
              className="h-[58px] px-10 bg-gradient-to-r from-accent to-brand-emerald hover:from-accent/90 hover:to-brand-emerald/90 text-accent-foreground font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--accent)/0.4)] rounded-full relative overflow-hidden group"
            >
              <a href="/store">
                <span className="relative z-10">Stop Skin Inflammation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </a>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="h-[58px] px-12 bg-primary-foreground/5 backdrop-blur-sm border-2 border-primary-foreground/40 text-primary-foreground font-semibold text-base hover:bg-primary-foreground hover:text-primary transition-all duration-300 rounded-full"
            >
              <a href="/about">Learn More</a>
            </Button>
          </div>

          {/* Trust Stats with icons */}
          <div className="flex flex-wrap gap-8 mt-12 animate-fade-in-up [animation-delay:600ms] opacity-0">
            <div className="text-center flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-brand-gold" />
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground">14,000+</p>
              </div>
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider">Happy Customers</p>
            </div>
            <div className="w-px h-14 bg-primary-foreground/20 hidden sm:block self-center" />
            <div className="text-center flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <Check className="w-5 h-5 text-accent" />
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground">100%</p>
              </div>
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider">Recommend Us</p>
            </div>
            <div className="w-px h-14 bg-primary-foreground/20 hidden sm:block self-center" />
            <div className="text-center flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-5 h-5 text-brand-sage" />
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground">99%</p>
              </div>
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider">Chlorine Removed</p>
            </div>
          </div>
        </div>

        {/* Trust Badges - Right Side with enhanced glass-morphism */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 hidden lg:flex flex-col gap-3 animate-fade-in [animation-delay:800ms] opacity-0">
          <div className="bg-card/90 backdrop-blur-xl border-2 border-accent/50 rounded-2xl px-5 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
              <Check className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm font-semibold text-foreground">Soothes Eczema & Psoriasis</span>
          </div>
          <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl px-5 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Droplets className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">15-Stage Filtration</span>
          </div>
          <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl px-5 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-brand-gold" />
            </div>
            <span className="text-sm font-semibold text-foreground">30-Day Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};
