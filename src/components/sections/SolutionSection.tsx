import { Leaf, Droplet, Wind, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const ingredients = [
  { icon: Leaf, name: "Aloe Vera", benefit: "Reduces inflammation" },
  { icon: Droplet, name: "Tea Tree Oil", benefit: "Antibacterial protection" },
  { icon: Wind, name: "Peppermint", benefit: "Cooling relief" },
  { icon: Sparkles, name: "Chamomile", benefit: "Soothes sensitivity" },
];

export const SolutionSection = () => {
  return (
    <section id="solution" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Product Visual */}
          <div className="relative animate-fade-in">
            <div className="bg-secondary rounded-3xl p-8 lg:p-12">
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto mb-6 bg-accent/20 rounded-full flex items-center justify-center animate-float">
                    <Leaf className="w-20 h-20 text-accent" />
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground">180ml Spray</p>
                  <p className="text-muted-foreground">Premium Formula</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-card shadow-medium px-5 py-3 rounded-xl animate-fade-in [animation-delay:400ms] opacity-0">
              <p className="text-sm font-semibold text-foreground">✓ Dermatologist Recommended</p>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground px-5 py-3 rounded-xl shadow-lg animate-fade-in [animation-delay:600ms] opacity-0">
              <p className="text-sm font-bold">$40 • Free Shipping</p>
            </div>
          </div>

          {/* Right - Content */}
          <div className="animate-fade-in-up">
            <span className="inline-block text-accent font-semibold uppercase tracking-wider mb-4">
              The Missing Step
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Introducing Scalp Soothing Mist
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              VERITÉ SCALP Soothing Mist is specifically formulated to stop scalp inflammation in its tracks.
            </p>
            <p className="text-muted-foreground mb-10">
              Applied 2x daily, it calms your scalp environment, reduces shedding, and allows dormant follicles to reactivate. It's the foundation every hair care routine is missing.
            </p>

            {/* Ingredients */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {ingredients.map((item, index) => (
                <div 
                  key={index} 
                  className="group flex items-center gap-3 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-all duration-300 hover:shadow-soft animate-fade-in-up"
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="w-11 h-11 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.benefit}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              variant="cta" 
              size="xl" 
              asChild
              className="hover:scale-105 transition-transform duration-300"
            >
              <a href="/store">Start Your Recovery</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
