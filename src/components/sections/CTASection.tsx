import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-primary via-primary to-accent/80 relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/15 rounded-full blur-2xl animate-float [animation-delay:3s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary-foreground/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/25 rounded-full px-6 py-2.5 mb-8 animate-fade-in shadow-lg">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-semibold text-primary-foreground tracking-wide">Limited Time Offer</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in-up leading-tight">
            Ready to Regrow<br />
            <span className="text-brand-gold">Your Edges?</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto animate-fade-in-up [animation-delay:200ms] opacity-0">
            Join thousands of women who chose scalp health first and are now seeing real results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up [animation-delay:400ms] opacity-0">
            <Button 
              asChild 
              size="lg" 
              className="h-16 px-14 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-full group"
            >
              <a href="/store" className="flex items-center gap-2">
                Shop Now & Get Free Shipping
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-sm text-primary-foreground/90 animate-fade-in-up [animation-delay:600ms] opacity-0">
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <Check className="w-5 h-5 text-brand-gold" />
              <span className="font-medium">Free Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <Check className="w-5 h-5 text-brand-gold" />
              <span className="font-medium">30-Day Money Back</span>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <Check className="w-5 h-5 text-brand-gold" />
              <span className="font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
