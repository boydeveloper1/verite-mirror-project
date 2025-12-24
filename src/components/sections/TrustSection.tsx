import { Leaf, FlaskConical, Network, Shield } from "lucide-react";

const trustCards = [
  {
    icon: Leaf,
    headline: "We Fix the Root Cause",
    body: "We don't mask problems with more products. We stop scalp inflammation, the real blocker to hair growth.",
  },
  {
    icon: FlaskConical,
    headline: "Dermatologist-Formulated",
    body: "Developed with expert guidance and clinically tested. 70% shedding reduction verified. Real results.",
  },
  {
    icon: Network,
    headline: "Complete Scalp System",
    body: "Each product targets a different scalp issue. Together, they restore full scalp health and unlock growth.",
  },
  {
    icon: Shield,
    headline: "30-Day Money-Back",
    body: "We're confident our products work. If you're not satisfied within 30 days, get a full refund. No questions asked.",
  },
];

export const TrustSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary">
      <div className="container mx-auto px-4 md:px-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block text-accent font-semibold uppercase tracking-wider mb-4">Why Choose Us</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Why VERITÉ SCALP Stands Apart
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustCards.map((card, index) => (
            <div 
              key={index} 
              className="group bg-card p-8 rounded-xl shadow-soft hover:shadow-medium hover:-translate-y-2 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <card.icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
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
