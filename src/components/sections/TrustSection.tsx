import { Leaf, FlaskConical, Network, Shield } from "lucide-react";

const trustCards = [
  {
    icon: Leaf,
    headline: "We Fix the Root Cause",
    body: "We don't mask problems with more products. We stop scalp inflammation, the real blocker to hair growth.",
    color: "bg-accent/15 text-accent",
  },
  {
    icon: FlaskConical,
    headline: "Dermatologist-Formulated",
    body: "Developed with expert guidance and clinically tested. 70% shedding reduction verified. Real results.",
    color: "bg-primary/15 text-primary",
  },
  {
    icon: Network,
    headline: "Complete Scalp System",
    body: "Each product targets a different scalp issue. Together, they restore full scalp health and unlock growth.",
    color: "bg-brand-gold/20 text-brand-gold",
  },
  {
    icon: Shield,
    headline: "30-Day Money-Back",
    body: "We're confident our products work. If you're not satisfied within 30 days, get a full refund. No questions asked.",
    color: "bg-accent/15 text-accent",
  },
];

export const TrustSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-to-b from-secondary via-background to-secondary/50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
          <span className="inline-block bg-accent/10 text-accent font-semibold uppercase tracking-wider px-4 py-2 rounded-full text-sm mb-6">Why Choose Us</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Why VERITÉ SCALP Stands Apart
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustCards.map((card, index) => (
            <div 
              key={index} 
              className="group bg-card p-8 rounded-2xl shadow-soft hover:shadow-medium hover:-translate-y-2 transition-all duration-500 animate-fade-in-up border border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`mb-6 w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                <card.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-bold text-primary mb-3">{card.headline}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
