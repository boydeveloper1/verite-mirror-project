import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
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
  FlaskConical,
  Ban,
  TrendingUp,
  Clock,
  Users,
  Award,
  Heart,
  Flame,
  CircleOff
} from "lucide-react";
import showerHeadImage from "@/assets/shower-head-silver.jpg";
import showerHeadBlack from "@/assets/shower-head-black.jpg";

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

// Premium decorative divider
const SectionDivider = () => (
  <div className="relative h-24 overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-accent/50" />
    </div>
  </div>
);

const CTAButton = ({ className = "", variant = "primary" }: { className?: string; variant?: "primary" | "secondary" }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Button 
      asChild
      className={`h-14 px-10 font-bold text-base rounded-full group relative overflow-hidden ${
        variant === "primary" 
          ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-[0_8px_30px_-8px_hsl(var(--accent)/0.5)]" 
          : "bg-primary-foreground hover:bg-primary-foreground/90 text-primary shadow-[0_8px_30px_-8px_rgba(255,255,255,0.3)]"
      } ${className}`}
    >
      <Link to={`/product/${PRODUCT_HANDLE}`}>
        <span className="relative z-10 flex items-center">
          Stop Skin Inflammation Now — {PRODUCT_PRICE}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
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
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50 p-4 z-50 shadow-[0_-4px_30px_-4px_rgba(0,0,0,0.15)]"
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
            <Heart className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Verité Purifying Shower Head</p>
            <p className="text-xs text-muted-foreground">Relief for eczema, psoriasis, rosacea & acne</p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            asChild
            className="flex-1 sm:flex-none h-12 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full shadow-[0_4px_20px_-4px_hsl(var(--accent)/0.5)]"
          >
            <Link to={`/product/${PRODUCT_HANDLE}`}>
              Get Relief — {PRODUCT_PRICE}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ShowerHeadLandingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <>
      <SEOHead
        title="Verité Purifying Shower Head - Stop Skin Inflammation at the Source"
        description="Stop eczema, psoriasis, rosacea, and acne flare-ups triggered by shower water. 15-stage filtration removes 99% of chlorine and hard water minerals. Relief starts now. Only $118."
      />
      
      <div className="min-h-screen bg-background">
        <FloatingCTA />
        
        {/* ============================================ */}
        {/* SECTION 1: PROBLEM AGITATION - HOOK */}
        {/* ============================================ */}
        <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
          {/* Premium background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-destructive/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--brand-gold)/0.15)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--accent)/0.1)_0%,transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          
          {/* Animated orbs */}
          <motion.div 
            className="absolute top-1/4 -right-20 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="container mx-auto px-4 md:px-10 relative z-10 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div 
                  className="inline-flex items-center gap-2 bg-destructive/20 border border-destructive/30 rounded-full px-5 py-2.5 mb-8 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-primary-foreground">Why Your Skin Never Fully Heals</span>
                </motion.div>
                
                <motion.h1 
                  className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Your Shower Is Triggering Your
                  <motion.span 
                    className="block text-brand-gold mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    Skin Inflammation
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed mb-6 max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  You've tried the creams. The medications. The $300 dermatologist visits.
                </motion.p>
                <motion.p 
                  className="text-xl md:text-2xl text-primary-foreground font-semibold mb-10 max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Yet every shower, your skin flares up. Burning, itching, redness—again and again.
                </motion.p>

                {/* The frustration story - Glass card */}
                <motion.div 
                  className="bg-primary-foreground/5 backdrop-blur-md rounded-3xl p-8 border border-primary-foreground/10 mb-10 text-left max-w-2xl mx-auto shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <p className="text-primary-foreground/90 text-lg leading-relaxed italic">
                    "I've had eczema for 15 years. Spent thousands on treatments that gave temporary relief. 
                    My dermatologist never once mentioned my water quality. Turns out, <span className="text-brand-gold font-semibold not-italic">my shower was re-inflaming my skin every single day.</span>"
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <span className="text-primary-foreground/70 text-sm">— Rachel M., 42, after 3 weeks</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <Button 
                    variant="ghost"
                    className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-transparent p-0 h-auto font-normal text-lg group"
                    onClick={scrollToContent}
                  >
                    <span>Discover the hidden cause</span>
                    <ChevronDown className="ml-2 w-6 h-6 animate-bounce" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 2: THE HIDDEN ENEMY REVEAL */}
        {/* ============================================ */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-destructive uppercase tracking-wider mb-4 block">The Daily Damage Cycle</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Why Your Skin Condition
                <span className="text-destructive"> Keeps Getting Worse</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Every shower with chlorine and hard water strips your skin barrier, triggers inflammation, 
                and undoes everything your treatments are trying to fix.
              </p>
            </AnimatedSection>

            {/* The Inflammation Cycle Visual */}
            <AnimatedSection className="mb-16">
              <div className="bg-muted/50 rounded-3xl p-8 md:p-12 border border-border">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                        <Flame className="w-6 h-6 text-destructive" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground">The Inflammation Cycle</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Your shower water contains chlorine and hard water minerals that damage your skin barrier 
                      within seconds of contact. This triggers an inflammatory response that:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Worsens eczema, psoriasis, rosacea, and acne",
                        "Blocks your medications and creams from absorbing",
                        "Creates a mineral coating that traps irritants",
                        "Keeps your skin in a constant state of inflammation"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Ban className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-gradient-to-br from-destructive/10 to-transparent rounded-2xl p-6 border border-destructive/20">
                      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Beaker className="w-5 h-5 text-destructive" />
                        What's Damaging Your Skin
                      </h4>
                      <div className="space-y-3">
                        {[
                          { name: "Chlorine", effect: "Bonds to skin cells within seconds", level: "HIGH" },
                          { name: "Calcium & Magnesium", effect: "Creates barrier, blocks products", level: "HIGH" },
                          { name: "Heavy Metals", effect: "Accumulates, causes chronic irritation", level: "MED" },
                          { name: "pH Imbalance", effect: "Disrupts skin's natural 4.5-5.5 pH", level: "MED" },
                        ].map((item, index) => (
                          <div
                            key={item.name}
                            className="flex items-center justify-between bg-card rounded-lg p-3 border border-border"
                          >
                            <div>
                              <p className="font-medium text-foreground">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.effect}</p>
                            </div>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded ${
                              item.level === 'HIGH' ? 'bg-destructive/20 text-destructive' : 'bg-yellow-500/20 text-yellow-600'
                            }`}>
                              {item.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Condition-Specific Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                {
                  condition: "Eczema",
                  icon: Heart,
                  description: "Hard water weakens skin barrier, increases water loss, makes skin drier and more prone to flare-ups",
                  color: "text-rose-500",
                  bgColor: "bg-rose-500/10",
                },
                {
                  condition: "Psoriasis",
                  icon: Flame,
                  description: "Chlorine triggers inflammatory response that accelerates skin cell turnover and worsens plaques",
                  color: "text-orange-500",
                  bgColor: "bg-orange-500/10",
                },
                {
                  condition: "Rosacea",
                  icon: Zap,
                  description: "Hard minerals strip natural oils, chlorine bonds to skin cells causing persistent redness and flushing",
                  color: "text-red-500",
                  bgColor: "bg-red-500/10",
                },
                {
                  condition: "Acne",
                  icon: CircleOff,
                  description: "Mineral residue clogs pores, disrupts oil balance, chlorine causes chloracne and breakouts",
                  color: "text-purple-500",
                  bgColor: "bg-purple-500/10",
                },
              ].map((item, index) => (
                <AnimatedSection key={item.condition} delay={index * 0.1}>
                  <div className="bg-card rounded-2xl p-6 shadow-soft border border-border h-full">
                    <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-4`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.condition}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* The Stats */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Droplets,
                  title: "85% of US Homes Have Hard Water",
                  description: "That's why so many people with skin conditions struggle despite expensive treatments. The minerals in your water create a coating that blocks everything.",
                  stat: "85%",
                },
                {
                  icon: Zap,
                  title: "Chlorine Bonds in Seconds",
                  description: "Every shower exposes your skin to chlorine that bonds to skin cells within seconds, causing damage and triggering inflammatory responses.",
                  stat: "99%",
                  statLabel: "removal with our filter",
                },
                {
                  icon: TrendingUp,
                  title: "$200-500/Month Wasted",
                  description: "That's what most people with chronic skin conditions spend on dermatologists and treatments—that can't work because the water keeps re-inflaming your skin.",
                  stat: "$500",
                  statLabel: "monthly spend saved",
                },
              ].map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 0.1}>
                  <div className="bg-card rounded-2xl p-8 shadow-soft border border-border h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
                        <item.icon className="w-7 h-7 text-destructive" />
                      </div>
                      <p className="text-3xl font-bold text-accent">{item.stat}</p>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Mid-page CTA */}
            <AnimatedSection className="text-center mt-16">
              <p className="text-xl text-foreground font-medium mb-6">
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
        <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
          {/* Subtle background texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(var(--accent)/0.05)_0%,transparent_50%)]" />
          
          <div className="container mx-auto px-4 md:px-10 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4 px-4 py-1.5 bg-accent/10 rounded-full">Real Results</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                "I Can Finally Shower
                <span className="text-accent"> Without Dreading It"</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Thousands of people with eczema, psoriasis, rosacea, and acne have found relief.
              </p>
            </AnimatedSection>

            {/* Trust Badges Row - Premium glass style */}
            <AnimatedSection className="mb-12">
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {[
                  { icon: Users, value: "14,520+", label: "5-Star Reviews" },
                  { icon: TrendingUp, value: "92%", label: "Reduced Flare-Ups" },
                  { icon: Award, value: "Week 2", label: "First Relief" },
                  { icon: ShieldCheck, value: "30-Day", label: "Money Back" },
                ].map((item, index) => (
                  <motion.div 
                    key={item.label} 
                    className="flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-2xl px-5 py-4 border border-border/50 shadow-soft"
                    whileHover={{ y: -2, boxShadow: "0 8px 30px -8px rgba(0,0,0,0.1)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <span className="font-bold text-foreground text-lg">{item.value}</span>
                      <span className="text-muted-foreground text-sm ml-1">{item.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
              {[
                {
                  quote: "I've had eczema for 20 years. Tried everything—steroid creams, immunosuppressants, elimination diets. Nothing gave lasting relief. This shower head stopped my flare-ups within 2 weeks. I can't believe my dermatologist never mentioned water quality.",
                  name: "Sarah M., 42",
                  location: "Phoenix, AZ",
                  condition: "Eczema sufferer",
                  result: "Flare-ups stopped in 2 weeks",
                },
                {
                  quote: "My psoriasis was so bad I dreaded showering. The burning, the scaling, the redness after every shower. Since installing this, my skin stays calm. I've reduced my medication by half.",
                  name: "Michael T., 51",
                  location: "Las Vegas, NV",
                  condition: "Psoriasis sufferer",
                  result: "Reduced medication 50%",
                },
                {
                  quote: "My rosacea made me avoid photos for years. Every shower left my face red and burning for hours. Now? I can shower and put on makeup right after. No more hiding.",
                  name: "Jennifer L., 38",
                  location: "Austin, TX",
                  condition: "Rosacea sufferer",
                  result: "No more post-shower burning",
                },
                {
                  quote: "Adult acne at 35 was humiliating. Nothing worked—not the prescriptions, not the expensive skincare. Two weeks with this shower head and my breakouts started clearing. My skin is finally calm.",
                  name: "Amanda K., 35",
                  location: "San Diego, CA",
                  condition: "Adult acne sufferer",
                  result: "Breakouts clearing week 2",
                },
              ].map((testimonial, index) => (
                <AnimatedSection key={testimonial.name} delay={index * 0.1}>
                  <div className="bg-card rounded-2xl p-8 border border-border h-full flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <blockquote className="text-foreground text-lg leading-relaxed mb-6 flex-1">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="font-semibold text-foreground flex items-center gap-2">
                          {testimonial.name}
                          <BadgeCheck className="w-4 h-4 text-accent" />
                        </p>
                        <p className="text-sm text-muted-foreground">{testimonial.location} • {testimonial.condition}</p>
                      </div>
                      <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-full">
                        {testimonial.result}
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Dermatologist Quote - Premium styling */}
            <AnimatedSection>
              <div className="relative bg-gradient-to-br from-card to-muted/50 rounded-3xl p-8 md:p-12 border border-accent/20 max-w-3xl mx-auto text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-6 mt-4">
                  "Chlorine and hard water are major triggers for eczema, psoriasis, rosacea, and acne. 
                  They damage the skin barrier and perpetuate chronic inflammation. Filtering shower water 
                  is one of the most effective interventions I recommend to patients."
                </blockquote>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent mx-auto mb-4" />
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Dr. Elena Rodriguez, MD</span> — Board-Certified Dermatologist
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
          {/* Premium gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-brand-gold/5" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--accent)/0.08)_0%,transparent_60%)]" />
          
          <div className="container mx-auto px-4 md:px-10 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4 px-4 py-1.5 bg-accent/10 rounded-full">The Solution</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Stop Skin Inflammation
                <span className="text-accent"> at the Source</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                You can't heal inflamed skin if you're re-inflaming it every single day. 
                Address the root cause: your shower water.
              </p>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Product Visual - Enhanced */}
              <AnimatedSection className="order-2 lg:order-1">
                <div className="relative">
                  {/* Glow effect behind image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-brand-gold/20 rounded-3xl blur-3xl scale-110 opacity-50" />
                  
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={showerHeadImage}
                      alt="Verité Purifying Shower Head"
                      className="w-full max-w-md mx-auto rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border border-white/10"
                    />
                  </motion.div>
                  
                  {/* Floating feature badges - Enhanced glass effect */}
                  <motion.div
                    className="absolute -left-4 md:left-0 top-1/4 bg-card/90 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)] border border-white/20"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">99% Chlorine Removal</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="absolute -right-4 md:right-0 bottom-1/3 bg-card/90 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)] border border-white/20"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-brand-gold" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">pH Balanced Water</span>
                    </div>
                  </motion.div>
                </div>
              </AnimatedSection>

              {/* Benefits */}
              <AnimatedSection className="order-1 lg:order-2">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                  How the Verité Purifying Shower Head Stops Inflammation
                </h3>
                
                <div className="space-y-5">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Eliminates 99% of Chlorine",
                      description: "Calcium sulfite dechlorination stops chlorine from bonding to your skin cells and triggering inflammatory responses.",
                    },
                    {
                      icon: Droplets,
                      title: "Removes Hard Water Minerals",
                      description: "15-stage filtration eliminates calcium and magnesium that create the mineral barrier blocking your treatments.",
                    },
                    {
                      icon: Sparkles,
                      title: "Restores Natural pH Balance",
                      description: "Alkaline ceramic balls restore your water to skin-friendly pH, supporting your skin's protective barrier.",
                    },
                    {
                      icon: Leaf,
                      title: "Vitamin C & E Antioxidant Protection",
                      description: "Neutralizes free radicals and provides antioxidant protection to help your skin heal and recover.",
                    },
                    {
                      icon: Timer,
                      title: "2-Minute Installation, No Tools",
                      description: "Simply unscrew your old shower head and screw on ours. Universal fit, works with 99% of showers.",
                    },
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border hover:border-accent/30 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 5: TIMELINE - YOUR SKIN RECOVERY */}
        {/* ============================================ */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-4 block">Your Skin Recovery Timeline</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                What Relief Looks Like <span className="text-brand-gold">Over 12 Weeks</span>
              </h2>
              <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
                Your skin barrier needs time to heal. Here's what most customers with eczema, psoriasis, rosacea, and acne experience:
              </p>
            </AnimatedSection>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-foreground/20 hidden md:block" />
                
                <div className="space-y-8">
                  {[
                    { week: "Week 1-2", title: "Immediate Relief", description: "No more post-shower burning, itching, redness, or tightness. Your skin feels calm for the first time. Products absorb properly.", icon: Droplets },
                    { week: "Week 3-4", title: "Inflammation Subsides", description: "Flare-ups decrease noticeably. Skin barrier enters recovery phase. You start reducing frequency of medication/treatments.", icon: ShieldCheck },
                    { week: "Week 5-8", title: "Skin Stays Calm Longer", description: "Reduced breakouts and irritation. Visible improvement in texture and tone. Confidence returning as skin heals.", icon: TrendingUp },
                    { week: "Week 9-12", title: "Visible Transformation", description: "Significantly fewer flare-ups. Healthier, more resilient skin. Natural glow returns. You can finally show your skin.", icon: Sparkles },
                  ].map((item, index) => (
                    <AnimatedSection key={item.week} delay={index * 0.1}>
                      <div className="flex gap-6 items-start">
                        <div className="w-16 h-16 rounded-2xl bg-brand-gold/20 flex items-center justify-center flex-shrink-0 relative z-10">
                          <item.icon className="w-7 h-7 text-brand-gold" />
                        </div>
                        <div className="flex-1 bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/10">
                          <span className="text-sm font-semibold text-brand-gold">{item.week}</span>
                          <h3 className="font-display text-xl font-bold text-primary-foreground mt-1 mb-2">{item.title}</h3>
                          <p className="text-primary-foreground/70">{item.description}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA in timeline section */}
            <AnimatedSection className="text-center mt-16">
              <p className="text-xl text-primary-foreground/80 mb-6">
                Start your skin healing journey today. Relief or your money back.
              </p>
              <CTAButton variant="secondary" />
            </AnimatedSection>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 6: FAQ */}
        {/* ============================================ */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">FAQ</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Questions About Your Skin Condition
              </h2>
            </AnimatedSection>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { q: "Will this really help with my eczema/psoriasis/rosacea/acne?", a: "If your skin condition worsens after showering or you live in a hard water area (85% of US homes), yes. By removing chlorine and hard water minerals that trigger inflammation and damage your skin barrier, your skin can finally begin to heal. Multiple dermatological studies confirm that chlorine and hard water worsen all these conditions." },
                { q: "How long before I see improvement?", a: "Most customers notice immediate relief—no more post-shower burning, itching, or redness—within the first week. Visible skin improvement typically begins around week 3-4, with significant transformation by week 8-12 as your skin barrier fully heals." },
                { q: "Will I be able to reduce my medications?", a: "Many customers report reducing their reliance on steroid creams and other medications after their skin stabilizes. However, always consult with your dermatologist before making any changes to your treatment plan." },
                { q: "How does this compare to the $200-500 I spend monthly on treatments?", a: "At $118 one-time (plus $30-40 for filter replacements every 3-6 months), this addresses the ROOT CAUSE of your inflammation rather than just treating symptoms. Many customers have significantly reduced their monthly skincare and medical expenses." },
                { q: "Is it easy to install?", a: "Yes! This purifying shower head replaces your existing one completely. Just unscrew your old shower head and screw on the Verité. Takes less than 2 minutes, no tools needed. Works with 99% of standard showers." },
                { q: "What if it doesn't work for me?", a: "We offer a 30-day money-back guarantee. If you don't see improvements in your skin within 30 days, return it for a full refund—no questions asked. We're confident because we've seen the results with thousands of customers." },
              ].map((faq, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`} />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.a}</p>
                    </motion.div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 7: FINAL CTA */}
        {/* ============================================ */}
        <section className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 md:px-10 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Stop Re-Inflaming Your Skin.
                <span className="block text-brand-gold mt-2">Start Healing Today.</span>
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-4">
                You can't heal inflamed skin if you're damaging it every single day.
              </p>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Your skin healing journey doesn't start with what you put ON your skin. 
                It starts with what you STOP putting on it.
              </p>
              
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10 mb-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-left">
                    <p className="text-3xl font-bold text-primary-foreground">{PRODUCT_PRICE}</p>
                    <p className="text-sm text-primary-foreground/60">Free shipping worldwide • 30-day guarantee</p>
                  </div>
                  <Button 
                    asChild
                    className="h-16 px-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg rounded-full group"
                  >
                    <Link to={`/product/${PRODUCT_HANDLE}`}>
                      Get Relief Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span>Works for Eczema, Psoriasis, Rosacea & Acne</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span>30-Day Money Back</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span>99% Chlorine Removal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span>14,520+ Happy Customers</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="bg-brand-charcoal text-primary-foreground py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/60 mb-4">
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
        <div className="h-24" />
      </div>
    </>
  );
};

export default ShowerHeadLandingPage;
