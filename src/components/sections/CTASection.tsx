import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-gold/10 rounded-full blur-2xl animate-float [animation-delay:3s]" />
      </div>

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-5 py-2 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-primary-foreground">Limited Time Offer</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5 animate-fade-in-up">
            Ready to Regrow Your Edges?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 animate-fade-in-up [animation-delay:200ms] opacity-0">
            Join thousands of women who chose scalp health first.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="h-14 md:h-16 px-10 md:px-14 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up [animation-delay:400ms] opacity-0"
          >
            <a href="/store">Shop Now & Get Free Shipping</a>
          </Button>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-10 text-sm text-primary-foreground/80 animate-fade-in-up [animation-delay:600ms] opacity-0">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-brand-gold" />
              <span>Free Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-brand-gold" />
              <span>30-Day Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-brand-gold" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
