import { Button } from "@/components/ui/button";
import { Check, Sparkles, Shield, Leaf, Star, ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Multi-layer Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-accent/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      
      {/* Animated Mesh Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-brand-gold/20 rounded-full blur-[80px]"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-primary-foreground/10 rounded-full blur-[60px]"
          animate={{ 
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-10 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-3 mb-8 shadow-2xl"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
              ))}
            </div>
            <span className="text-sm font-semibold text-primary-foreground">Trusted by 5,000+ Women</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground leading-[1.05] mb-8 tracking-tight"
          >
            Scalp Care<br />
            <span className="relative">
              <span className="text-brand-gold">Before</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <motion.path 
                  d="M2 8C50 2 150 2 198 8"
                  stroke="hsl(var(--brand-gold))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </svg>
            </span> Hair Care
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed mb-12 max-w-xl font-light"
          >
            Stop inflammation. Restore scalp health. Unlock natural hair growth with our dermatologist-recommended formulas.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <Button 
              asChild
              className="h-16 px-10 bg-white text-primary hover:bg-white/90 font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-full group"
            >
              <a href="/store" className="flex items-center gap-2">
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="h-16 px-10 bg-transparent border-2 border-white/40 text-primary-foreground font-semibold text-base hover:bg-white/10 hover:border-white/60 transition-all duration-300 rounded-full backdrop-blur-sm"
            >
              <a href="/about">Learn Our Story</a>
            </Button>
          </motion.div>

          {/* Trust Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-10 md:gap-14"
          >
            {[
              { value: "5,000+", label: "Happy Customers" },
              { value: "98%", label: "Recommend Us" },
              { value: "70%", label: "Less Shedding" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight">{stat.value}</p>
                <p className="text-xs text-primary-foreground/60 uppercase tracking-[0.2em] mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Trust Badges - Right Side */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute top-1/2 -translate-y-1/2 right-10 hidden xl:flex flex-col gap-4"
        >
          {[
            { icon: Check, label: "Dermatologist Recommended", color: "bg-accent/20 text-accent" },
            { icon: Leaf, label: "100% Natural Ingredients", color: "bg-brand-gold/20 text-brand-gold" },
            { icon: Shield, label: "30-Day Money Back", color: "bg-white/20 text-white" },
          ].map((badge, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 shadow-xl flex items-center gap-4 hover:bg-white/15 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${badge.color} flex items-center justify-center`}>
                <badge.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold text-primary-foreground">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
