import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/shared/SEOHead";
import { 
  Droplets, 
  ShieldCheck, 
  Sparkles, 
  Leaf, 
  Check, 
  ArrowRight, 
  Star,
  Zap,
  AlertTriangle,
  Beaker,
  Timer,
  BadgeCheck,
  ChevronDown,
  Ban,
  TrendingUp,
  Users,
  Award,
  Heart,
  Flame,
  CircleOff,
  Quote
} from "lucide-react";
import showerHeadImage from "@/assets/shower-head-silver.jpg";

// Real price from Shopify
const PRODUCT_PRICE = "$118.00";
const PRODUCT_HANDLE = "verite-scalp-purifying-shower-filter-1";

const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Premium decorative divider with gradient
const SectionDivider = () => (
  <div className="relative h-32 overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div 
        className="w-3 h-3 rounded-full bg-gradient-to-br from-accent to-accent/50 shadow-[0_0_20px_hsl(var(--accent)/0.5)]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  </div>
);

const CTAButton = ({ className = "", variant = "primary" }: { className?: string; variant?: "primary" | "secondary" }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <Button 
      asChild
      className={`h-16 px-12 font-bold text-lg rounded-full group relative overflow-hidden transition-all duration-500 ${
        variant === "primary" 
          ? "bg-gradient-to-r from-accent via-accent to-accent/90 hover:from-accent/90 hover:to-accent text-accent-foreground shadow-[0_10px_40px_-10px_hsl(var(--accent)/0.6)]" 
          : "bg-gradient-to-r from-primary-foreground via-primary-foreground to-primary-foreground/90 hover:from-primary-foreground/90 hover:to-primary-foreground text-primary shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)]"
      } ${className}`}
    >
      <Link to={`/product/${PRODUCT_HANDLE}`}>
        <span className="relative z-10 flex items-center">
          Stop Skin Inflammation — {PRODUCT_PRICE}
          <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
        </span>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      </Link>
    </Button>
  </motion.div>
);

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-card/98 via-card to-card/98 backdrop-blur-2xl border-t border-accent/20 p-4 z-50 shadow-[0_-8px_40px_-8px_rgba(0,0,0,0.2)]"
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/5 flex items-center justify-center border border-accent/20">
            <Heart className="w-7 h-7 text-accent" />
          </div>
          <div>
            <p className="text-base font-bold text-foreground">Verité Purifying Shower Head</p>
            <p className="text-sm text-muted-foreground">Relief for eczema, psoriasis, rosacea & acne</p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Button 
            asChild
            className="flex-1 sm:flex-none h-14 px-10 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-accent-foreground font-bold text-base rounded-full shadow-[0_8px_30px_-8px_hsl(var(--accent)/0.6)]"
          >
            <Link to={`/product/${PRODUCT_HANDLE}`}>
              Get Relief — {PRODUCT_PRICE}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Condition badge component
const ConditionBadge = ({ condition, icon: Icon, delay }: { condition: string; icon: React.ElementType; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2"
  >
    <Icon className="w-4 h-4 text-brand-gold" />
    <span className="text-sm font-medium text-primary-foreground">{condition}</span>
  </motion.div>
);

const ShowerHeadLandingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <>
      <SEOHead
        title="Verité Purifying Shower Head - Stop Skin Inflammation at the Source"
        description="Stop eczema, psoriasis, rosacea, and acne flare-ups triggered by shower water. 15-stage filtration removes 99% of chlorine and hard water minerals. Relief starts now. Only $118."
      />
      
      <div className="min-h-screen bg-background overflow-x-hidden">
        <FloatingCTA />
        
        {/* ============================================ */}
        {/* SECTION 1: HERO - IMMERSIVE EXPERIENCE */}
        {/* ============================================ */}
        <motion.section 
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative min-h-screen flex items-center bg-primary overflow-hidden"
        >
          {/* Multi-layer gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,_hsl(var(--brand-gold)/0.2)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_100%,_hsl(var(--accent)/0.15)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_0%_80%,_hsl(var(--destructive)/0.1)_0%,transparent_50%)]" />
          
          {/* Animated mesh gradient overlay */}
          <div className="absolute inset-0 opacity-30">
            <motion.div 
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: "linear-gradient(45deg, transparent 40%, hsl(var(--brand-gold) / 0.1) 50%, transparent 60%)",
              }}
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          {/* Floating orbs with enhanced animation */}
          <motion.div 
            className="absolute top-20 -right-32 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--brand-gold) / 0.15) 0%, transparent 70%)",
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-20 -left-32 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--accent) / 0.12) 0%, transparent 70%)",
            }}
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Subtle particle effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-brand-gold/30 rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 md:px-10 relative z-10 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Alert badge with glow */}
                <motion.div 
                  className="inline-flex items-center gap-2 bg-destructive/20 border border-destructive/40 rounded-full px-6 py-3 mb-10 backdrop-blur-md shadow-[0_0_30px_-5px_hsl(var(--destructive)/0.3)]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <span className="text-sm font-semibold text-primary-foreground tracking-wide">Why Your Skin Never Fully Heals</span>
                </motion.div>
                
                {/* Main headline with gradient text */}
                <motion.h1 
                  className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <span className="text-primary-foreground">Your Shower Is Triggering Your</span>
                  <motion.span 
                    className="block mt-3 bg-gradient-to-r from-brand-gold via-brand-gold to-amber-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    Skin Inflammation
                  </motion.span>
                </motion.h1>
                
                {/* Condition badges */}
                <motion.div 
                  className="flex flex-wrap justify-center gap-3 mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <ConditionBadge condition="Eczema" icon={Heart} delay={0.8} />
                  <ConditionBadge condition="Psoriasis" icon={Flame} delay={0.9} />
                  <ConditionBadge condition="Rosacea" icon={Zap} delay={1.0} />
                  <ConditionBadge condition="Acne" icon={CircleOff} delay={1.1} />
                </motion.div>

                {/* Subheadline */}
                <motion.p 
                  className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed mb-4 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  You've tried the creams. The medications. The $300 dermatologist visits.
                </motion.p>
                <motion.p 
                  className="text-xl md:text-2xl text-primary-foreground font-semibold mb-12 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Yet every shower, your skin flares up again.
                </motion.p>

                {/* Testimonial card with premium styling */}
                <motion.div 
                  className="relative bg-gradient-to-br from-primary-foreground/10 to-primary-foreground/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-primary-foreground/15 mb-12 text-left max-w-2xl mx-auto shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <Quote className="absolute top-6 left-6 w-10 h-10 text-brand-gold/20" />
                  <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed italic pl-8">
                    "I've had eczema for 15 years. Spent thousands on treatments. 
                    My dermatologist never once mentioned my water quality. Turns out, <span className="text-brand-gold font-semibold not-italic">my shower was re-inflaming my skin every single day.</span>"
                  </p>
                  <div className="mt-6 flex items-center gap-4 pl-8">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <div className="h-5 w-px bg-primary-foreground/20" />
                    <span className="text-primary-foreground/70 text-sm font-medium">Rachel M., 42 — After 3 weeks</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <Button 
                    variant="ghost"
                    className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5 p-4 h-auto font-medium text-lg group rounded-full"
                    onClick={scrollToContent}
                  >
                    <span>Discover the hidden cause</span>
                    <ChevronDown className="ml-2 w-6 h-6 animate-bounce" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </motion.section>

        {/* ============================================ */}
        {/* SECTION 2: THE HIDDEN ENEMY REVEAL */}
        {/* ============================================ */}
        <section className="py-24 md:py-32 bg-background relative">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-20">
              <motion.span 
                className="inline-flex items-center gap-2 text-sm font-bold text-destructive uppercase tracking-widest mb-6 bg-destructive/10 px-5 py-2 rounded-full"
              >
                <Flame className="w-4 h-4" />
                The Daily Damage Cycle
              </motion.span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Why Your Skin Condition
                <span className="text-destructive block md:inline"> Keeps Getting Worse</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Every shower with chlorine and hard water strips your skin barrier, triggers inflammation, 
                and undoes everything your treatments are trying to fix.
              </p>
            </AnimatedSection>

            {/* The Inflammation Cycle Visual - Enhanced */}
            <AnimatedSection className="mb-20">
              <div className="relative bg-gradient-to-br from-muted/80 via-muted/50 to-muted/30 rounded-[2rem] p-8 md:p-12 border border-border/50 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--destructive)/0.05)_0%,transparent_50%)] rounded-[2rem]" />
                
                <div className="grid md:grid-cols-2 gap-12 items-center relative">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center border border-destructive/20">
                        <Flame className="w-8 h-8 text-destructive" />
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">The Inflammation Cycle</h3>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      Your shower water contains chlorine and hard water minerals that damage your skin barrier 
                      within seconds of contact. This triggers an inflammatory response that:
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Worsens eczema, psoriasis, rosacea, and acne",
                        "Blocks your medications and creams from absorbing",
                        "Creates a mineral coating that traps irritants",
                        "Keeps your skin in a constant state of inflammation"
                      ].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Ban className="w-4 h-4 text-destructive" />
                          </div>
                          <span className="text-foreground text-lg">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl p-8 border border-border shadow-xl">
                      <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                          <Beaker className="w-5 h-5 text-destructive" />
                        </div>
                        What's Damaging Your Skin
                      </h4>
                      <div className="space-y-4">
                        {[
                          { name: "Chlorine", effect: "Bonds to skin cells within seconds", level: "CRITICAL" },
                          { name: "Calcium & Magnesium", effect: "Creates barrier, blocks products", level: "HIGH" },
                          { name: "Heavy Metals", effect: "Accumulates, causes chronic irritation", level: "MEDIUM" },
                          { name: "pH Imbalance", effect: "Disrupts skin's natural 4.5-5.5 pH", level: "MEDIUM" },
                        ].map((item, index) => (
                          <motion.div
                            key={item.name}
                            className="flex items-center justify-between bg-muted/50 rounded-xl p-4 border border-border hover:border-destructive/30 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div>
                              <p className="font-semibold text-foreground">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.effect}</p>
                            </div>
                            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                              item.level === 'CRITICAL' ? 'bg-destructive/20 text-destructive' : 
                              item.level === 'HIGH' ? 'bg-orange-500/20 text-orange-600' :
                              'bg-yellow-500/20 text-yellow-600'
                            }`}>
                              {item.level}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Condition-Specific Cards - Enhanced */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {[
                {
                  condition: "Eczema",
                  icon: Heart,
                  description: "Hard water weakens skin barrier, increases water loss, makes skin drier and more prone to flare-ups",
                  gradient: "from-rose-500/20 to-rose-500/5",
                  iconColor: "text-rose-500",
                  borderColor: "hover:border-rose-500/30",
                },
                {
                  condition: "Psoriasis",
                  icon: Flame,
                  description: "Chlorine triggers inflammatory response that accelerates skin cell turnover and worsens plaques",
                  gradient: "from-orange-500/20 to-orange-500/5",
                  iconColor: "text-orange-500",
                  borderColor: "hover:border-orange-500/30",
                },
                {
                  condition: "Rosacea",
                  icon: Zap,
                  description: "Hard minerals strip natural oils, chlorine bonds to skin cells causing persistent redness",
                  gradient: "from-red-500/20 to-red-500/5",
                  iconColor: "text-red-500",
                  borderColor: "hover:border-red-500/30",
                },
                {
                  condition: "Acne",
                  icon: CircleOff,
                  description: "Mineral residue clogs pores, disrupts oil balance, chlorine causes chloracne and breakouts",
                  gradient: "from-purple-500/20 to-purple-500/5",
                  iconColor: "text-purple-500",
                  borderColor: "hover:border-purple-500/30",
                },
              ].map((item, index) => (
                <AnimatedSection key={item.condition} delay={index * 0.1}>
                  <motion.div 
                    className={`relative bg-card rounded-2xl p-8 shadow-lg border border-border ${item.borderColor} transition-all duration-300 h-full group`}
                    whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 border border-border`}>
                        <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.condition}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            {/* Stats Cards - Enhanced */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Droplets,
                  title: "85% of US Homes Have Hard Water",
                  description: "That's why so many people with skin conditions struggle despite expensive treatments.",
                  stat: "85%",
                  gradient: "from-blue-500/10 to-blue-500/5",
                },
                {
                  icon: Zap,
                  title: "Chlorine Bonds in Seconds",
                  description: "Every shower exposes your skin to chlorine that bonds within seconds.",
                  stat: "99%",
                  statLabel: "removal",
                  gradient: "from-amber-500/10 to-amber-500/5",
                },
                {
                  icon: TrendingUp,
                  title: "$200-500/Month Wasted",
                  description: "That's what most people spend on treatments that can't work.",
                  stat: "$500",
                  statLabel: "saved",
                  gradient: "from-green-500/10 to-green-500/5",
                },
              ].map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 0.1}>
                  <motion.div 
                    className="relative bg-card rounded-2xl p-8 shadow-lg border border-border overflow-hidden h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                          <item.icon className="w-7 h-7 text-accent" />
                        </div>
                        <div className="text-right">
                          <p className="text-4xl font-bold text-accent">{item.stat}</p>
                          {item.statLabel && <p className="text-sm text-muted-foreground">{item.statLabel}</p>}
                        </div>
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            {/* Mid-page CTA */}
            <AnimatedSection className="text-center mt-20">
              <p className="text-xl md:text-2xl text-foreground font-medium mb-8">
                Ready to stop re-inflaming your skin with every shower?
              </p>
              <CTAButton />
            </AnimatedSection>
          </div>
        </section>

        <SectionDivider />

        {/* ============================================ */}
        {/* SECTION 3: SOCIAL PROOF & CREDIBILITY */}
        {/* ============================================ */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.05)_0%,transparent_70%)]" />
          
          <div className="container mx-auto px-4 md:px-10 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <motion.span 
                className="inline-flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest mb-6 bg-accent/10 px-5 py-2 rounded-full"
              >
                <Star className="w-4 h-4 fill-accent" />
                Real Results
              </motion.span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                "I Can Finally Shower
                <span className="text-accent block md:inline"> Without Dreading It"</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Thousands of people with eczema, psoriasis, rosacea, and acne have found relief.
              </p>
            </AnimatedSection>

            {/* Trust Badges - Enhanced */}
            <AnimatedSection className="mb-16">
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {[
                  { icon: Users, value: "14,520+", label: "5-Star Reviews", color: "text-accent" },
                  { icon: TrendingUp, value: "92%", label: "Reduced Flare-Ups", color: "text-green-500" },
                  { icon: Award, value: "Week 2", label: "First Relief", color: "text-brand-gold" },
                  { icon: ShieldCheck, value: "30-Day", label: "Money Back", color: "text-blue-500" },
                ].map((item, index) => (
                  <motion.div 
                    key={item.label} 
                    className="flex items-center gap-4 bg-card/90 backdrop-blur-sm rounded-2xl px-6 py-5 border border-border/50 shadow-lg"
                    whileHover={{ y: -3, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <span className="font-bold text-foreground text-xl">{item.value}</span>
                      <span className="text-muted-foreground text-sm ml-1.5">{item.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Testimonials Grid - Enhanced */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              {[
                {
                  quote: "I've had eczema for 20 years. Tried everything—steroid creams, immunosuppressants, elimination diets. Nothing gave lasting relief. This shower head stopped my flare-ups within 2 weeks.",
                  name: "Sarah M., 42",
                  location: "Phoenix, AZ",
                  condition: "Eczema sufferer",
                  result: "Flare-ups stopped",
                  gradient: "from-rose-500/10 to-transparent",
                },
                {
                  quote: "My psoriasis was so bad I dreaded showering. The burning, the scaling. Since installing this, my skin stays calm. I've reduced my medication by half.",
                  name: "Michael T., 51",
                  location: "Las Vegas, NV",
                  condition: "Psoriasis sufferer",
                  result: "Reduced meds 50%",
                  gradient: "from-orange-500/10 to-transparent",
                },
                {
                  quote: "My rosacea made me avoid photos for years. Every shower left my face red and burning. Now I can shower and put on makeup right after. No more hiding.",
                  name: "Jennifer L., 38",
                  location: "Austin, TX",
                  condition: "Rosacea sufferer",
                  result: "No more burning",
                  gradient: "from-red-500/10 to-transparent",
                },
                {
                  quote: "Adult acne at 35 was humiliating. Nothing worked. Two weeks with this shower head and my breakouts started clearing. My skin is finally calm.",
                  name: "Amanda K., 35",
                  location: "San Diego, CA",
                  condition: "Adult acne sufferer",
                  result: "Skin clearing",
                  gradient: "from-purple-500/10 to-transparent",
                },
              ].map((testimonial, index) => (
                <AnimatedSection key={testimonial.name} delay={index * 0.1}>
                  <motion.div 
                    className="relative bg-card rounded-2xl p-8 border border-border h-full flex flex-col overflow-hidden shadow-lg"
                    whileHover={{ y: -5 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient}`} />
                    <div className="relative flex-1">
                      <div className="flex gap-1 mb-5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                        ))}
                      </div>
                      <blockquote className="text-foreground text-lg leading-relaxed mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>
                    <div className="relative flex items-center justify-between pt-5 border-t border-border">
                      <div>
                        <p className="font-semibold text-foreground flex items-center gap-2">
                          {testimonial.name}
                          <BadgeCheck className="w-5 h-5 text-accent" />
                        </p>
                        <p className="text-sm text-muted-foreground">{testimonial.location} • {testimonial.condition}</p>
                      </div>
                      <span className="text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full">
                        {testimonial.result}
                      </span>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            {/* Dermatologist Quote - Premium */}
            <AnimatedSection>
              <div className="relative bg-gradient-to-br from-card via-card to-muted/50 rounded-3xl p-10 md:p-14 border border-accent/20 max-w-3xl mx-auto text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 flex items-center justify-center shadow-lg">
                  <Award className="w-10 h-10 text-accent" />
                </div>
                <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8 mt-6">
                  "Chlorine and hard water are major triggers for eczema, psoriasis, rosacea, and acne. 
                  Filtering shower water is one of the most effective interventions I recommend to patients."
                </blockquote>
                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-accent/40 to-transparent mx-auto mb-5" />
                <p className="text-muted-foreground">
                  <span className="font-bold text-foreground text-lg">Dr. Elena Rodriguez, MD</span>
                  <span className="block text-sm mt-1">Board-Certified Dermatologist</span>
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <SectionDivider />

        {/* ============================================ */}
        {/* SECTION 4: THE SOLUTION */}
        {/* ============================================ */}
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-brand-gold/5" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--accent)/0.1)_0%,transparent_60%)]" />
          
          <div className="container mx-auto px-4 md:px-10 relative z-10">
            <AnimatedSection className="text-center mb-20">
              <motion.span 
                className="inline-flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest mb-6 bg-accent/10 px-5 py-2 rounded-full"
              >
                <ShieldCheck className="w-4 h-4" />
                The Solution
              </motion.span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Stop Skin Inflammation
                <span className="text-accent block md:inline"> at the Source</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                You can't heal inflamed skin if you're re-inflaming it every single day. 
                Address the root cause: your shower water.
              </p>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Product Visual - Enhanced */}
              <AnimatedSection className="order-2 lg:order-1">
                <div className="relative">
                  {/* Multi-layer glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-brand-gold/30 rounded-[2rem] blur-3xl scale-110 opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/20 via-transparent to-accent/20 rounded-[2rem] blur-2xl scale-105 opacity-40" />
                  
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={showerHeadImage}
                      alt="Verité Purifying Shower Head"
                      className="w-full max-w-lg mx-auto rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-white/10"
                    />
                  </motion.div>
                  
                  {/* Floating badges */}
                  <motion.div
                    className="absolute -left-4 md:left-4 top-1/4 bg-card/95 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-xl border border-accent/20"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">99% Chlorine</p>
                        <p className="text-xs text-muted-foreground">Removal</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="absolute -right-4 md:right-4 bottom-1/3 bg-card/95 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-xl border border-brand-gold/20"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">pH Balanced</p>
                        <p className="text-xs text-muted-foreground">Water</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </AnimatedSection>

              {/* Benefits - Enhanced */}
              <AnimatedSection className="order-1 lg:order-2">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
                  How the Verité Purifying Shower Head Stops Inflammation
                </h3>
                
                <div className="space-y-5">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Eliminates 99% of Chlorine",
                      description: "Calcium sulfite dechlorination stops chlorine from bonding to your skin cells.",
                      color: "from-green-500/20 to-green-500/5",
                      iconColor: "text-green-500",
                    },
                    {
                      icon: Droplets,
                      title: "Removes Hard Water Minerals",
                      description: "15-stage filtration eliminates calcium and magnesium that block your treatments.",
                      color: "from-blue-500/20 to-blue-500/5",
                      iconColor: "text-blue-500",
                    },
                    {
                      icon: Sparkles,
                      title: "Restores Natural pH Balance",
                      description: "Alkaline ceramic balls restore skin-friendly pH for optimal barrier function.",
                      color: "from-amber-500/20 to-amber-500/5",
                      iconColor: "text-amber-500",
                    },
                    {
                      icon: Leaf,
                      title: "Vitamin C & E Protection",
                      description: "Antioxidant protection to help your skin heal and recover.",
                      color: "from-emerald-500/20 to-emerald-500/5",
                      iconColor: "text-emerald-500",
                    },
                    {
                      icon: Timer,
                      title: "2-Minute Installation",
                      description: "Simply unscrew old shower head and screw on ours. No tools needed.",
                      color: "from-purple-500/20 to-purple-500/5",
                      iconColor: "text-purple-500",
                    },
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      className={`flex items-start gap-5 p-5 rounded-2xl bg-gradient-to-r ${benefit.color} border border-border hover:border-accent/30 transition-all duration-300`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-14 h-14 rounded-xl bg-card shadow-md flex items-center justify-center flex-shrink-0 border border-border">
                        <benefit.icon className={`w-7 h-7 ${benefit.iconColor}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-lg mb-1">{benefit.title}</h4>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 5: TIMELINE */}
        {/* ============================================ */}
        <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--brand-gold)/0.15)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(var(--accent)/0.1)_0%,transparent_50%)]" />
          
          <div className="container mx-auto px-4 md:px-10 relative z-10">
            <AnimatedSection className="text-center mb-20">
              <motion.span 
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold uppercase tracking-widest mb-6 bg-brand-gold/10 px-5 py-2 rounded-full border border-brand-gold/20"
              >
                <Timer className="w-4 h-4" />
                Your Skin Recovery Timeline
              </motion.span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                What Relief Looks Like <span className="text-brand-gold">Over 12 Weeks</span>
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto">
                Your skin barrier needs time to heal. Here's what most customers experience:
              </p>
            </AnimatedSection>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold/50 via-brand-gold/30 to-transparent hidden md:block" />
                
                <div className="space-y-8">
                  {[
                    { week: "Week 1-2", title: "Immediate Relief", description: "No more post-shower burning, itching, redness, or tightness. Your skin feels calm for the first time.", icon: Droplets, color: "from-blue-500/30 to-blue-500/10" },
                    { week: "Week 3-4", title: "Inflammation Subsides", description: "Flare-ups decrease noticeably. Skin barrier enters recovery phase. Products start working better.", icon: ShieldCheck, color: "from-green-500/30 to-green-500/10" },
                    { week: "Week 5-8", title: "Skin Stays Calm Longer", description: "Reduced breakouts and irritation. Visible improvement in texture and tone. Confidence returning.", icon: TrendingUp, color: "from-amber-500/30 to-amber-500/10" },
                    { week: "Week 9-12", title: "Visible Transformation", description: "Significantly fewer flare-ups. Healthier, more resilient skin. Natural glow returns.", icon: Sparkles, color: "from-brand-gold/30 to-brand-gold/10" },
                  ].map((item, index) => (
                    <AnimatedSection key={item.week} delay={index * 0.15}>
                      <motion.div 
                        className="flex gap-8 items-start"
                        whileHover={{ x: 5 }}
                      >
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 relative z-10 border border-primary-foreground/10 shadow-lg`}>
                          <item.icon className="w-10 h-10 text-brand-gold" />
                        </div>
                        <div className="flex-1 bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10 hover:border-brand-gold/30 transition-colors">
                          <span className="inline-block text-sm font-bold text-brand-gold bg-brand-gold/10 px-4 py-1.5 rounded-full mb-3">{item.week}</span>
                          <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">{item.title}</h3>
                          <p className="text-primary-foreground/70 text-lg">{item.description}</p>
                        </div>
                      </motion.div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>

            <AnimatedSection className="text-center mt-20">
              <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8">
                Start your skin healing journey today. Relief or your money back.
              </p>
              <CTAButton variant="secondary" />
            </AnimatedSection>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 6: FAQ */}
        {/* ============================================ */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <motion.span 
                className="inline-flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest mb-6 bg-accent/10 px-5 py-2 rounded-full"
              >
                FAQ
              </motion.span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Questions About Your Skin Condition
              </h2>
            </AnimatedSection>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { q: "Will this really help with my eczema/psoriasis/rosacea/acne?", a: "If your skin condition worsens after showering or you live in a hard water area (85% of US homes), yes. By removing chlorine and hard water minerals that trigger inflammation and damage your skin barrier, your skin can finally begin to heal." },
                { q: "How long before I see improvement?", a: "Most customers notice immediate relief—no more post-shower burning, itching, or redness—within the first week. Visible skin improvement typically begins around week 3-4, with significant transformation by week 8-12." },
                { q: "Will I be able to reduce my medications?", a: "Many customers report reducing their reliance on steroid creams and other medications after their skin stabilizes. However, always consult with your dermatologist before making any changes to your treatment plan." },
                { q: "How does this compare to my monthly treatment costs?", a: "At $118 one-time (plus $30-40 for filter replacements every 3-6 months), this addresses the ROOT CAUSE of your inflammation rather than just treating symptoms. Many customers have significantly reduced their monthly skincare and medical expenses." },
                { q: "Is it easy to install?", a: "Yes! This purifying shower head replaces your existing one completely. Just unscrew your old shower head and screw on the Verité. Takes less than 2 minutes, no tools needed." },
                { q: "What if it doesn't work for me?", a: "We offer a 30-day money-back guarantee. If you don't see improvements in your skin within 30 days, return it for a full refund—no questions asked." },
              ].map((faq, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <motion.div 
                    className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -2 }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-semibold text-foreground text-lg pr-4">{faq.q}</span>
                      <ChevronDown className={`w-6 h-6 text-accent flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`} />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted-foreground text-lg leading-relaxed">{faq.a}</p>
                    </motion.div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 7: FINAL CTA */}
        {/* ============================================ */}
        <section className="py-24 md:py-36 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-gold/20 rounded-full blur-[100px]" />
          </div>
          
          <div className="container mx-auto px-4 md:px-10 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 leading-tight">
                Stop Re-Inflaming Your Skin.
                <span className="block text-brand-gold mt-3">Start Healing Today.</span>
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-4">
                You can't heal inflamed skin if you're damaging it every single day.
              </p>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-12">
                Your skin healing journey starts with what you <span className="font-bold text-brand-gold">STOP</span> putting on it.
              </p>
              
              <motion.div 
                className="bg-gradient-to-br from-primary-foreground/10 to-primary-foreground/5 backdrop-blur-xl rounded-3xl p-10 border border-primary-foreground/15 mb-12 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)]"
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-left">
                    <p className="text-4xl md:text-5xl font-bold text-primary-foreground">{PRODUCT_PRICE}</p>
                    <p className="text-primary-foreground/60 mt-2">Free shipping worldwide • 30-day guarantee</p>
                  </div>
                  <Button 
                    asChild
                    className="h-18 px-14 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-accent-foreground font-bold text-xl rounded-full group shadow-[0_10px_40px_-10px_hsl(var(--accent)/0.6)]"
                  >
                    <Link to={`/product/${PRODUCT_HANDLE}`}>
                      Get Relief Now
                      <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-primary-foreground/70">
                {[
                  "Works for Eczema, Psoriasis, Rosacea & Acne",
                  "30-Day Money Back",
                  "99% Chlorine Removal",
                  "14,520+ Happy Customers",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="bg-brand-charcoal text-primary-foreground py-10">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-primary-foreground/60 mb-6">
              <Link to="/privacy-policy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
              <Link to="/refund-policy" className="hover:text-primary-foreground transition-colors">Refund Policy</Link>
              <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link>
              <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            </div>
            <p className="text-xs text-primary-foreground/40">
              © {new Date().getFullYear()} VERITÉ SCALP. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Bottom padding for floating CTA */}
        <div className="h-28" />
      </div>
    </>
  );
};

export default ShowerHeadLandingPage;
