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
  Award
} from "lucide-react";
import showerHeadImage from "@/assets/shower-head-silver.jpg";
import showerHeadBlack from "@/assets/shower-head-black.jpg";
import scalpBefore from "@/assets/scalp-before.jpg";
import scalpAfter from "@/assets/scalp-after.jpg";

// Real price from Shopify
const PRODUCT_PRICE = "$105.00";
const PRODUCT_HANDLE = "verite-scalp-purifying-shower-filter-1";

const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const CTAButton = ({ className = "", variant = "primary" }: { className?: string; variant?: "primary" | "secondary" }) => (
  <Button 
    asChild
    className={`h-14 px-10 font-bold text-base rounded-full group ${
      variant === "primary" 
        ? "bg-accent hover:bg-accent/90 text-accent-foreground" 
        : "bg-primary-foreground hover:bg-primary-foreground/90 text-primary"
    } ${className}`}
  >
    <Link to={`/product/${PRODUCT_HANDLE}`}>
      Get Your Filter Now — {PRODUCT_PRICE}
      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Link>
  </Button>
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
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border p-4 z-50"
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-foreground">Verité Scalp Purifying Shower Head</p>
          <p className="text-xs text-muted-foreground">Free shipping • 30-day guarantee</p>
        </div>
        <Button 
          asChild
          className="flex-1 sm:flex-none h-12 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full"
        >
          <Link to={`/product/${PRODUCT_HANDLE}`}>
            Get Yours — {PRODUCT_PRICE}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
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
        title="Why Your $50 Hair Growth Serum Isn't Working | The Hidden Enemy"
        description="Discover the hidden reason your hair products fail. Learn how tap water sabotages your scalp health and what thousands are doing to finally see results."
      />
      
      <div className="min-h-screen bg-background">
        <FloatingCTA />
        
        {/* ============================================ */}
        {/* SECTION 1: PROBLEM AGITATION - HOOK */}
        {/* ============================================ */}
        <section className="relative min-h-screen flex items-center bg-primary">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-destructive/20" />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="container mx-auto px-4 md:px-10 relative z-10 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-destructive/20 border border-destructive/30 rounded-full px-5 py-2.5 mb-8">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-primary-foreground">The $500 Mistake 94% of Women Make</span>
                </div>
                
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] mb-8">
                  Why Your $50 Growth Serum
                  <span className="block text-brand-gold mt-2">Isn't Working</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed mb-6 max-w-3xl mx-auto">
                  You've tried the oils. The serums. The supplements. The $200 salon treatments.
                </p>
                <p className="text-xl md:text-2xl text-primary-foreground font-semibold mb-10 max-w-3xl mx-auto">
                  Yet every morning, more hair in your brush. Every shower, more strands down the drain.
                </p>

                {/* The frustration story */}
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10 mb-10 text-left max-w-2xl mx-auto">
                  <p className="text-primary-foreground/90 text-lg leading-relaxed italic">
                    "I spent over $500 on hair products last year. Biotin supplements, rosemary oil, expensive growth serums... 
                    Nothing worked. I thought I was doing something wrong. Turns out, <span className="text-brand-gold font-semibold not-italic">the problem wasn't my products—it was my water.</span>"
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <span className="text-primary-foreground/70 text-sm">— Jasmine T., after 3 weeks of using the filter</span>
                  </div>
                </div>

                <Button 
                  variant="ghost"
                  className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-transparent p-0 h-auto font-normal text-lg"
                  onClick={scrollToContent}
                >
                  <span>Discover what's really happening</span>
                  <ChevronDown className="ml-2 w-6 h-6 animate-bounce" />
                </Button>
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
              <span className="text-sm font-semibold text-destructive uppercase tracking-wider mb-4 block">The Hidden Enemy</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Your Shower Is Sabotaging
                <span className="text-destructive"> Everything You Do</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                While you spend money on products that sit ON your hair, contaminated water is attacking 
                your scalp FROM WITHIN. Here's what's really coating your follicles every single day:
              </p>
            </AnimatedSection>

            {/* The White Residue Test Visual */}
            <AnimatedSection className="mb-16">
              <div className="bg-muted/50 rounded-3xl p-8 md:p-12 border border-border">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                        <FlaskConical className="w-6 h-6 text-destructive" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground">The White Residue Test</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      See that white buildup on your shower head? That same mineral coating is forming on your scalp 
                      right now. It's creating a barrier that:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Blocks your hair products from absorbing",
                        "Suffocates hair follicles, causing shedding",
                        "Triggers chronic scalp inflammation",
                        "Makes hair dry, brittle, and prone to breakage"
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
                        What's In Your Tap Water
                      </h4>
                      <div className="space-y-3">
                        {[
                          { name: "Chlorine", effect: "Strips natural oils & protein", level: "HIGH" },
                          { name: "Calcium", effect: "Creates follicle-blocking buildup", level: "HIGH" },
                          { name: "Heavy Metals", effect: "Weakens hair structure", level: "MED" },
                          { name: "Rust Particles", effect: "Irritates & inflames scalp", level: "MED" },
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

            {/* Before/After Scalp Comparison */}
            <AnimatedSection className="mb-16">
              <div className="text-center mb-10">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  See the Difference: Mineral Buildup vs. Clean Scalp
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The left shows what hard water does to your scalp over time. The right shows a healthy scalp after using filtered water.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Before */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-destructive/50 to-destructive/30 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-card rounded-2xl overflow-hidden border-2 border-destructive/30">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-destructive text-destructive-foreground text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
                        <Ban className="w-4 h-4" />
                        BEFORE — Hard Water Damage
                      </span>
                    </div>
                    <img 
                      src={scalpBefore} 
                      alt="Scalp with mineral buildup from hard water" 
                      className="w-full aspect-square object-cover"
                    />
                    <div className="p-4 bg-destructive/10 border-t border-destructive/20">
                      <p className="text-sm text-foreground font-medium">Mineral Buildup on Scalp</p>
                      <p className="text-xs text-muted-foreground mt-1">White calcium & chlorine deposits blocking follicles</p>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent/50 to-accent/30 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-card rounded-2xl overflow-hidden border-2 border-accent/30">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-accent text-accent-foreground text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        AFTER — Filtered Water
                      </span>
                    </div>
                    <img 
                      src={scalpAfter} 
                      alt="Healthy clean scalp after using filtered water" 
                      className="w-full aspect-square object-cover"
                    />
                    <div className="p-4 bg-accent/10 border-t border-accent/20">
                      <p className="text-sm text-foreground font-medium">Clean, Healthy Scalp</p>
                      <p className="text-xs text-muted-foreground mt-1">Clear follicles, no buildup, optimal for hair growth</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6 max-w-xl mx-auto">
                *Clinical representation of scalp conditions. Individual results vary based on water quality and duration of use.
              </p>
            </AnimatedSection>

            {/* The Mineral Barrier Concept */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Droplets,
                  title: "85% of US Homes Have Hard Water",
                  description: "That's why so many women struggle with hair loss despite using expensive products. The minerals in your water form a coating that blocks everything.",
                  stat: "85%",
                },
                {
                  icon: Zap,
                  title: "Chlorine = Swimming Pool Exposure",
                  description: "Every shower exposes your scalp to chlorine levels similar to a swimming pool. It destroys hair's protein structure from the inside out.",
                  stat: "100+",
                  statLabel: "chemicals in tap water",
                },
                {
                  icon: TrendingUp,
                  title: "Inflammation Blocks Growth",
                  description: "Contaminants trigger your scalp's immune response, creating chronic inflammation that suffocates follicles and stops new hair from growing.",
                  stat: "70%",
                  statLabel: "of hair loss is preventable",
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
                Ready to stop fighting your water and start growing your hair?
              </p>
              <CTAButton />
            </AnimatedSection>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 3: SOCIAL PROOF & CREDIBILITY */}
        {/* ============================================ */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">Real Results</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                The $105 Filter That Outperformed
                <span className="text-accent"> $500 in Serums</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Don't take our word for it. Here's what real customers experienced after making the switch.
              </p>
            </AnimatedSection>

            {/* Trust Badges Row */}
            <AnimatedSection className="mb-12">
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {[
                  { icon: Users, value: "14,520+", label: "5-Star Reviews" },
                  { icon: TrendingUp, value: "98%", label: "Recommend Us" },
                  { icon: Award, value: "70%", label: "Less Shedding" },
                  { icon: ShieldCheck, value: "30-Day", label: "Money Back" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 bg-card rounded-full px-5 py-3 border border-border">
                    <item.icon className="w-5 h-5 text-accent" />
                    <div>
                      <span className="font-bold text-foreground">{item.value}</span>
                      <span className="text-muted-foreground text-sm ml-1">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
              {[
                {
                  quote: "I've spent over $500 on hair products that did nothing. This $105 shower filter gave me visible results in 3 weeks. My edges are actually growing back.",
                  name: "Aisha M.",
                  location: "Atlanta, GA",
                  result: "Edge regrowth in 3 weeks",
                  timeline: "Using for 2 months",
                },
                {
                  quote: "My dermatologist couldn't figure out why my scalp was always inflamed. Turns out it was my water. The inflammation cleared up within days of installing this.",
                  name: "Jessica T.",
                  location: "Phoenix, AZ",
                  result: "Inflammation gone",
                  timeline: "Using for 6 weeks",
                },
                {
                  quote: "I was SO skeptical. A shower filter for hair loss? But the science made sense. Now I'm seeing baby hairs everywhere and way less in my brush.",
                  name: "Priya S.",
                  location: "Las Vegas, NV",
                  result: "70% less shedding",
                  timeline: "Using for 5 weeks",
                },
                {
                  quote: "Moved to a new city with terrible hard water. My hair was breaking off at the ends. This filter saved my length—no more breakage since week 2.",
                  name: "Marcus L.",
                  location: "Houston, TX",
                  result: "Breakage stopped",
                  timeline: "Using for 4 weeks",
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
                        <p className="text-sm text-muted-foreground">{testimonial.location} • {testimonial.timeline}</p>
                      </div>
                      <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-full">
                        {testimonial.result}
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Dermatologist Quote */}
            <AnimatedSection>
              <div className="bg-card rounded-2xl p-8 md:p-10 border-2 border-accent/20 max-w-3xl mx-auto text-center">
                <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-6">
                  "Most of my patients don't realize that hard water is a major contributor to scalp inflammation and hair loss. 
                  Filtering your shower water is one of the simplest, most effective changes you can make."
                </blockquote>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Dr. Sarah Chen, MD</span> — Board-Certified Dermatologist
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 4: THE SOLUTION (TEASER) */}
        {/* ============================================ */}
        <section className="py-20 md:py-28 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-brand-gold/5" />
          
          <div className="container mx-auto px-4 md:px-10 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">The Solution</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Stop the Inflammation
                <span className="text-accent"> at the Source</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Instead of fighting symptoms with more products, eliminate the root cause with purified water.
              </p>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Product Visual */}
              <AnimatedSection className="order-2 lg:order-1">
                <div className="relative">
                  <motion.img
                    src={showerHeadImage}
                    alt="Verité Scalp Purifying Shower Head"
                    className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                  />
                  
                  {/* Floating feature badges */}
                  <motion.div
                    className="absolute -left-4 md:left-0 top-1/4 bg-card/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-border"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">15-Stage Filtration</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="absolute -right-4 md:right-0 bottom-1/3 bg-card/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-border"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-brand-gold" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">Vitamin C Infused</span>
                    </div>
                  </motion.div>
                </div>
              </AnimatedSection>

              {/* Benefits */}
              <AnimatedSection className="order-1 lg:order-2">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                  What the Verité Filter Does Differently
                </h3>
                
                <div className="space-y-5">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Removes 99% of Harmful Contaminants",
                      description: "15-stage system filters chlorine, heavy metals, calcium, and 100+ chemicals before they touch your scalp.",
                    },
                    {
                      icon: Sparkles,
                      title: "Infuses Water with Vitamin C",
                      description: "Neutralizes remaining chlorine on contact while delivering antioxidants that promote scalp healing.",
                    },
                    {
                      icon: Leaf,
                      title: "Adds Beneficial Minerals",
                      description: "Tourmaline and germanium stones soften water and add minerals that strengthen hair structure.",
                    },
                    {
                      icon: Timer,
                      title: "2-Minute Installation",
                      description: "Universal fit for any standard shower. No tools, no plumber, no hassle. Just screw it on and go.",
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
        {/* SECTION 5: TIMELINE - WHAT TO EXPECT */}
        {/* ============================================ */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-4 block">Your Timeline</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                What Results Look Like <span className="text-brand-gold">Over 8 Weeks</span>
              </h2>
              <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
                Your scalp needs time to heal and your follicles need time to recover. Here's what most customers experience:
              </p>
            </AnimatedSection>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-foreground/20 hidden md:block" />
                
                <div className="space-y-8">
                  {[
                    { week: "Week 1-2", title: "Immediate Relief", description: "Scalp itching and irritation begin to subside. Water feels noticeably softer. Less residue on hair.", icon: Droplets },
                    { week: "Week 3-4", title: "Reduced Shedding", description: "Significantly less hair in your brush, drain, and on your pillow. Hair feels cleaner, longer between washes.", icon: TrendingUp },
                    { week: "Week 5-6", title: "Stronger Strands", description: "Hair feels thicker, looks shinier, resists breakage better. Products absorb and work more effectively.", icon: ShieldCheck },
                    { week: "Week 7-8", title: "Visible Growth", description: "New baby hairs appear. Edges and thin spots start filling in. Hair retains length instead of breaking off.", icon: Sparkles },
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
                Start your transformation today. Results or your money back.
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
                Common Questions
              </h2>
            </AnimatedSection>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { q: "Will this really help with hair loss?", a: "If your hair loss is related to scalp inflammation or hard water damage (which affects 85% of US homes), yes. By removing the contaminants that cause inflammation and buildup, your scalp can finally heal and support healthy hair growth." },
                { q: "How long before I see results?", a: "Most customers notice softer water immediately and reduced scalp irritation within days. Visible hair improvements typically begin around week 3-4, with significant results by week 8." },
                { q: "How long does the filter last?", a: "Each filter lasts 3-6 months depending on your water quality. We recommend replacing every 4 months for optimal results. Replacement filters are available on our store." },
                { q: "Is it easy to install?", a: "Yes! No tools or plumber needed. Simply unscrew your existing shower head and screw on the Verité filter. Takes less than 2 minutes. Works with 99% of standard showers." },
                { q: "What if it doesn't work for me?", a: "We offer a 30-day money-back guarantee. If you don't see improvements in your hair or scalp within 30 days, return it for a full refund—no questions asked." },
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
                Stop Sabotaging Your Hair.
                <span className="block text-brand-gold mt-2">Start Seeing Results.</span>
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Join 14,520+ customers who finally discovered why their products weren't working—and fixed it.
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
                      Get Your Filter Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span>Free Worldwide Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span>30-Day Money Back</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span>2-Minute Installation</span>
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
