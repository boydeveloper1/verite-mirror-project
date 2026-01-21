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
  Heart,
  Award,
  ChevronDown,
  AlertTriangle,
  Beaker,
  Timer,
  BadgeCheck,
  Play,
  X
} from "lucide-react";
import showerHeadImage from "@/assets/shower-head-silver.jpg";
import showerHeadBlack from "@/assets/shower-head-black.jpg";
import logoImg from "@/assets/logo.png";

const stats = [
  { value: "14,520+", label: "5-Star Reviews" },
  { value: "98%", label: "Recommend Us" },
  { value: "70%", label: "Less Shedding" },
  { value: "30", label: "Day Guarantee" },
];

const waterContaminants = [
  { name: "Chlorine", effect: "Strips natural oils, causes dryness", level: "High" },
  { name: "Heavy Metals", effect: "Weakens hair follicles", level: "Medium" },
  { name: "Calcium", effect: "Creates buildup, blocks pores", level: "High" },
  { name: "Magnesium", effect: "Causes brittleness and breakage", level: "Medium" },
  { name: "Rust Particles", effect: "Irritates scalp, causes inflammation", level: "Low" },
];

const problems = [
  {
    icon: Droplets,
    title: "Hard Water Damage",
    description: "85% of US homes have hard water. The minerals coat your hair shaft, making it impossible for moisture to penetrate.",
    stat: "85%",
    statLabel: "of homes affected",
  },
  {
    icon: Zap,
    title: "Chlorine Exposure",
    description: "Every shower exposes your scalp to the same chlorine levels as a swimming pool—damaging your hair's protein structure.",
    stat: "100+",
    statLabel: "chemicals in tap water",
  },
  {
    icon: Heart,
    title: "Chronic Inflammation",
    description: "Contaminants trigger your scalp's immune response, creating inflammation that suffocates hair follicles.",
    stat: "70%",
    statLabel: "of hair loss is preventable",
  },
];

const filtrationStages = [
  { stage: 1, name: "PP Cotton", removes: "Sediment & rust particles" },
  { stage: 2, name: "KDF-55", removes: "Heavy metals & chlorine" },
  { stage: 3, name: "Calcium Sulfite", removes: "Chlorine compounds" },
  { stage: 4, name: "Activated Carbon", removes: "Organic chemicals" },
  { stage: 5, name: "Ceramic Balls", removes: "Bacteria & impurities" },
  { stage: 6, name: "Vitamin C", removes: "Neutralizes remaining chlorine" },
  { stage: 7, name: "Magnetic Energy", removes: "Softens water minerals" },
  { stage: 8, name: "Mineral Stones", removes: "Adds beneficial minerals" },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "15-Stage Advanced Filtration",
    description: "Our proprietary system removes 99% of chlorine, heavy metals, and 100+ harmful contaminants that damage your hair daily.",
    highlight: true,
  },
  {
    icon: Sparkles,
    title: "Vitamin C Infusion Technology",
    description: "Neutralizes chlorine on contact while delivering antioxidants directly to your scalp for healthier, stronger hair growth.",
  },
  {
    icon: Leaf,
    title: "Natural Mineral Enhancement",
    description: "Adds beneficial minerals like tourmaline and germanium back into your water for softer, more manageable hair.",
  },
  {
    icon: Award,
    title: "Dermatologist Recommended",
    description: "Clinically tested and recommended by hair care professionals for those with sensitive scalps and thinning hair.",
  },
];

const timeline = [
  { week: "Week 1-2", title: "Immediate Relief", description: "Scalp itching and irritation begin to subside. Water feels noticeably softer.", icon: Timer },
  { week: "Week 3-4", title: "Reduced Shedding", description: "Significantly less hair in your brush, drain, and on your pillow.", icon: Droplets },
  { week: "Week 5-6", title: "Stronger Strands", description: "Hair feels thicker, looks shinier, and resists breakage better.", icon: ShieldCheck },
  { week: "Week 7-8", title: "Visible Growth", description: "New baby hairs appear. Edges and thin spots start filling in.", icon: Sparkles },
];

const testimonials = [
  {
    quote: "I've spent thousands on hair products over the years. This $60 shower head did more for my hair in 2 weeks than everything else combined.",
    name: "Aisha M.",
    location: "Atlanta, GA",
    result: "70% less shedding in 3 weeks",
    verified: true,
  },
  {
    quote: "My dermatologist couldn't figure out why my scalp was always inflamed. Turns out it was my water. This fixed everything.",
    name: "Jessica T.",
    location: "Phoenix, AZ",
    result: "Scalp inflammation gone",
    verified: true,
  },
  {
    quote: "I was skeptical—how could a shower head help hair loss? But the science makes sense, and my edges are finally growing back.",
    name: "Marcus L.",
    location: "Houston, TX",
    result: "Edge regrowth in 6 weeks",
    verified: true,
  },
  {
    quote: "Moved to a new city with terrible hard water. My hair started breaking off. This shower head saved my hair—literally.",
    name: "Priya S.",
    location: "Las Vegas, NV",
    result: "Stopped breakage completely",
    verified: true,
  },
];

const faqs = [
  {
    q: "How long does the filter last?",
    a: "Each filter lasts 3-6 months depending on your water quality and usage. We recommend replacing every 4 months for optimal results.",
  },
  {
    q: "Is it easy to install?",
    a: "Yes! No tools required. Simply unscrew your existing shower head and screw on the Verité filter. Takes less than 2 minutes.",
  },
  {
    q: "Will this work with my shower setup?",
    a: "Our universal fitting works with 99% of standard shower arms. If it doesn't fit, we'll send you an adapter free of charge.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most customers notice softer water immediately. Hair improvements typically begin within 2-3 weeks of consistent use.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "We offer a 30-day money-back guarantee. If you don't see improvements, return it for a full refund—no questions asked.",
  },
];

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
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border p-4 z-50 md:hidden"
    >
      <Button 
        asChild
        className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base rounded-full"
      >
        <Link to="/product/verite-scalp-purifying-shower-filter-1">
          Get Your Shower Head — $59.99
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </Button>
    </motion.div>
  );
};

const ShowerHeadLandingPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <>
      <SEOHead
        title="The Hidden Cause of Hair Loss (And How to Fix It) | Verité Scalp"
        description="Discover why your hair products aren't working. Learn how tap water contaminants cause shedding, breakage, and inflammation—and the simple solution that's helping thousands regrow their hair."
      />
      
      <div className="min-h-screen bg-background">
        <FloatingCTA />
        
        {/* Minimal Top Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <img src={logoImg} alt="Verité Scalp" className="h-8 brightness-0 invert" />
            <Button 
              asChild
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full hidden sm:flex"
            >
              <Link to="/product/verite-scalp-purifying-shower-filter-1">
                Shop Now
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Section - Problem Focused */}
        <section className="relative min-h-screen flex items-center bg-primary pt-16">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/20" />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="container mx-auto px-4 md:px-10 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left - Compelling Copy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-destructive/20 border border-destructive/30 rounded-full px-4 py-2 mb-6">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-primary-foreground">Warning: Your Water May Be Damaging Your Hair</span>
                </div>
                
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] mb-6">
                  Why Your Hair Products
                  <span className="block text-brand-gold">Aren't Working</span>
                </h1>
                
                <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-6">
                  You've tried the serums. The oils. The supplements. The expensive salon treatments.
                </p>
                <p className="text-lg md:text-xl text-primary-foreground font-semibold mb-8">
                  But every time you shower, you're undoing all that progress with contaminated water.
                </p>

                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/10 mb-8">
                  <p className="text-primary-foreground/90 text-base leading-relaxed">
                    <span className="font-bold text-brand-gold">The truth:</span> Tap water contains chlorine, heavy metals, 
                    and mineral buildup that strip your hair's natural oils, inflame your scalp, and 
                    suffocate your hair follicles—making hair loss <em>worse</em>, not better.
                  </p>
                </div>

                <Button 
                  variant="ghost"
                  className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-transparent p-0 h-auto font-normal"
                  onClick={scrollToContent}
                >
                  <span>Learn how to fix this</span>
                  <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
                </Button>
              </motion.div>

              {/* Right - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-destructive/20 to-transparent rounded-3xl p-8 border border-destructive/20">
                  <h3 className="text-lg font-semibold text-primary-foreground mb-4 flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-destructive" />
                    What's In Your Tap Water
                  </h3>
                  <div className="space-y-3">
                    {waterContaminants.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center justify-between bg-primary-foreground/5 rounded-lg p-3"
                      >
                        <div>
                          <p className="font-medium text-primary-foreground">{item.name}</p>
                          <p className="text-sm text-primary-foreground/60">{item.effect}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          item.level === 'High' ? 'bg-destructive/20 text-destructive' :
                          item.level === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-primary-foreground/10 text-primary-foreground/60'
                        }`}>
                          {item.level}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-primary-foreground/10"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-brand-gold">{stat.value}</p>
                  <p className="text-xs text-primary-foreground/60 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Problem Deep Dive */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-destructive uppercase tracking-wider mb-4 block">The Science</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                How Tap Water Destroys Your Hair
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Understanding the problem is the first step to fixing it. Here's what's really happening 
                every time you step into the shower.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {problems.map((problem, index) => (
                <AnimatedSection key={problem.title} delay={index * 0.1}>
                  <motion.div
                    className="bg-card rounded-2xl p-8 shadow-soft border border-border h-full relative overflow-hidden group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute top-4 right-4 text-right">
                      <p className="text-3xl font-bold text-accent">{problem.stat}</p>
                      <p className="text-xs text-muted-foreground">{problem.statLabel}</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
                      <problem.icon className="w-7 h-7 text-destructive" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{problem.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            {/* Transition to solution */}
            <AnimatedSection className="text-center mt-16">
              <p className="text-xl text-foreground font-medium mb-4">
                But here's the good news...
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Once you remove these contaminants from your water, your scalp can finally heal 
                and your hair can start growing the way it's supposed to.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Solution Introduction */}
        <section className="py-20 md:py-28 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-brand-gold/5" />
          
          <div className="container mx-auto px-4 md:px-10 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection className="order-2 lg:order-1">
                <img
                  src={showerHeadImage}
                  alt="Verité Scalp Purifying Shower Head"
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
                />
              </AnimatedSection>

              <AnimatedSection className="order-1 lg:order-2">
                <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">The Solution</span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Introducing the Verité Scalp
                  <span className="text-accent"> Purifying Shower Head</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  A 15-stage filtration system that removes 99% of harmful contaminants while 
                  infusing your water with vitamins and minerals that <em>support</em> hair growth 
                  instead of destroying it.
                </p>

                <div className="space-y-4 mb-10">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                        benefit.highlight ? 'bg-accent/10 border border-accent/20' : 'hover:bg-muted/50'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        benefit.highlight ? 'bg-accent text-accent-foreground' : 'bg-muted'
                      }`}>
                        <benefit.icon className="w-5 h-5" />
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

        {/* How It Works - Filtration Stages */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-4 block">How It Works</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                15 Stages of <span className="text-brand-gold">Pure Protection</span>
              </h2>
              <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
                Each stage targets specific contaminants, ensuring the water that touches your hair 
                is as pure and beneficial as possible.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtrationStages.map((stage, index) => (
                <AnimatedSection key={stage.stage} delay={index * 0.05}>
                  <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-5 border border-primary-foreground/10 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-sm font-bold text-brand-gold">
                        {stage.stage}
                      </span>
                      <h4 className="font-semibold text-primary-foreground">{stage.name}</h4>
                    </div>
                    <p className="text-sm text-primary-foreground/60">{stage.removes}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="text-center mt-12">
              <p className="text-primary-foreground/70 mb-2">+ 7 more advanced filtration stages</p>
              <p className="text-lg text-primary-foreground font-medium">
                Result: Water that helps your hair thrive, not just survive.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Timeline - What to Expect */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">Your Journey</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                What to Expect Over 8 Weeks
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real results take time, but most customers start noticing improvements within the first few weeks.
              </p>
            </AnimatedSection>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
                
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <AnimatedSection key={item.week} delay={index * 0.1}>
                      <div className="flex gap-6 items-start">
                        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0 relative z-10">
                          <item.icon className="w-7 h-7 text-accent" />
                        </div>
                        <div className="flex-1 bg-card rounded-2xl p-6 border border-border">
                          <span className="text-sm font-semibold text-accent">{item.week}</span>
                          <h3 className="font-display text-xl font-bold text-foreground mt-1 mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof - Testimonials */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">Real Results</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                14,520+ Five-Star Reviews
              </h2>
              <p className="text-lg text-muted-foreground">
                Don't just take our word for it. Here's what real customers are saying.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <AnimatedSection key={testimonial.name} delay={index * 0.1}>
                  <div className="bg-card rounded-2xl p-8 border border-border h-full">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <blockquote className="text-foreground text-lg leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground flex items-center gap-2">
                          {testimonial.name}
                          {testimonial.verified && (
                            <BadgeCheck className="w-4 h-4 text-accent" />
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                      <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {testimonial.result}
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">FAQ</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Common Questions
              </h2>
            </AnimatedSection>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left"
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
                      <p className="px-6 pb-6 text-muted-foreground">{faq.a}</p>
                    </motion.div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 md:px-10 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Stop Fighting Your Water.
                <span className="block text-brand-gold">Start Growing Your Hair.</span>
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Join 14,520+ customers who've discovered what happens when you remove 
                the hidden barrier to healthy hair growth.
              </p>
              
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10 mb-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-left">
                    <p className="text-sm text-primary-foreground/60 uppercase tracking-wider mb-1">Special Offer</p>
                    <p className="text-3xl font-bold text-primary-foreground">$59.99</p>
                    <p className="text-sm text-primary-foreground/60">Free shipping • 30-day guarantee</p>
                  </div>
                  <Button 
                    asChild
                    className="h-16 px-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg rounded-full group"
                  >
                    <Link to="/product/verite-scalp-purifying-shower-filter-1">
                      Get Your Shower Head Now
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
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="bg-brand-charcoal text-primary-foreground py-8">
          <div className="container mx-auto px-4 text-center">
            <img src={logoImg} alt="Verité Scalp" className="h-8 mx-auto mb-4 brightness-0 invert" />
            <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/60 mb-4">
              <Link to="/privacy-policy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
              <Link to="/refund-policy" className="hover:text-primary-foreground transition-colors">Refund Policy</Link>
              <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link>
            </div>
            <p className="text-xs text-primary-foreground/40">
              © {new Date().getFullYear()} VERITÉ SCALP. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Bottom padding for mobile CTA */}
        <div className="h-20 md:hidden" />
      </div>
    </>
  );
};

export default ShowerHeadLandingPage;
