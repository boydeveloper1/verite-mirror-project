import { Leaf, FlaskConical, Network, Shield } from "lucide-react";
import { motion } from "framer-motion";

const trustCards = [
  {
    icon: Leaf,
    headline: "We Fix the Root Cause",
    body: "We don't mask problems with more products. We stop scalp inflammation, the real blocker to hair growth.",
    gradient: "from-accent/20 to-accent/5",
    iconBg: "bg-accent",
  },
  {
    icon: FlaskConical,
    headline: "Dermatologist-Formulated",
    body: "Developed with expert guidance and clinically tested. 70% shedding reduction verified. Real results.",
    gradient: "from-primary/15 to-primary/5",
    iconBg: "bg-primary",
  },
  {
    icon: Network,
    headline: "Complete Scalp System",
    body: "Each product targets a different scalp issue. Together, they restore full scalp health and unlock growth.",
    gradient: "from-brand-gold/20 to-brand-gold/5",
    iconBg: "bg-brand-gold",
  },
  {
    icon: Shield,
    headline: "30-Day Money-Back",
    body: "We're confident our products work. If you're not satisfied within 30 days, get a full refund. No questions asked.",
    gradient: "from-accent/20 to-accent/5",
    iconBg: "bg-accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const TrustSection = () => {
  return (
    <section id="about" className="py-28 md:py-36 bg-gradient-to-b from-background via-secondary/40 to-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '48px 48px',
      }} />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-accent/10 text-accent font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full text-xs mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
            Why VERITÉ SCALP<br />
            <span className="text-accent">Stands Apart</span>
          </h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {trustCards.map((card, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`group relative bg-gradient-to-br ${card.gradient} p-8 rounded-3xl border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-xl`}
            >
              {/* Card Shine Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className={`relative mb-6 w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <card.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="relative font-display text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                {card.headline}
              </h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
