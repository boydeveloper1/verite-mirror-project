import { Droplets, FlaskConical, ShieldCheck, Zap } from "lucide-react";

const trustCards = [
  {
    icon: Droplets,
    headline: "We Filter the Problem",
    body: "We don't mask symptoms. We remove chlorine and hard water minerals that trigger skin inflammation in the first place.",
    color: "bg-accent/15 text-accent",
  },
  {
    icon: FlaskConical,
    headline: "15-Stage Purification",
    body: "Lab-tested to remove 99% of chlorine, heavy metals, and minerals that damage your skin barrier daily.",
    color: "bg-primary/15 text-primary",
  },
  {
    icon: Zap,
    headline: "Results in 2 Weeks",
    body: "Most customers report reduced redness, less dryness, and calmer skin within the first 14 days of use.",
    color: "bg-brand-gold/20 text-brand-gold",
  },
  {
    icon: ShieldCheck,
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
            Why VERITÉ Stands Apart
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
