import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
  ChevronDown
} from "lucide-react";
import showerHeadImage from "@/assets/shower-head-silver.jpg";
import showerHeadBlack from "@/assets/shower-head-black.jpg";

const stats = [
  { value: "14,520+", label: "5-Star Reviews" },
  { value: "98%", label: "Recommend Us" },
  { value: "70%", label: "Less Shedding" },
  { value: "30", label: "Day Guarantee" },
];

const problems = [
  {
    icon: Droplets,
    title: "Hard Water Damage",
    description: "Chlorine, heavy metals, and mineral buildup strip your hair of natural oils, causing dryness and breakage.",
  },
  {
    icon: Zap,
    title: "Scalp Inflammation",
    description: "Unfiltered water triggers chronic inflammation, blocking hair follicles and stunting growth.",
  },
  {
    icon: Heart,
    title: "Chemical Exposure",
    description: "Tap water contains up to 100+ contaminants that irritate sensitive scalps and weaken hair strands.",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "15-Stage Filtration",
    description: "Advanced multi-layer system removes 99% of chlorine, heavy metals, and harmful contaminants.",
    highlight: true,
  },
  {
    icon: Sparkles,
    title: "Vitamin C Infusion",
    description: "Neutralizes chlorine on contact while nourishing your scalp with antioxidants.",
  },
  {
    icon: Leaf,
    title: "Natural Minerals",
    description: "Adds beneficial minerals back into water for softer, more manageable hair.",
  },
  {
    icon: Award,
    title: "Dermatologist Approved",
    description: "Recommended by hair care professionals for those with sensitive scalps.",
  },
];

const timeline = [
  { week: "Week 1-2", title: "Reduced Irritation", description: "Feel immediate relief from scalp itching and dryness." },
  { week: "Week 3-4", title: "Less Shedding", description: "Notice significantly less hair in your brush and drain." },
  { week: "Week 5-6", title: "Stronger Strands", description: "Hair feels thicker, shinier, and more resilient." },
  { week: "Week 7-8", title: "Visible Growth", description: "See new baby hairs and fuller edges emerging." },
];

const testimonials = [
  {
    quote: "My edges are finally growing back after years of thinning. This shower head changed everything.",
    name: "Aisha M.",
    result: "70% less shedding",
    rating: 5,
  },
  {
    quote: "I was skeptical but the difference in my hair texture after just 2 weeks was undeniable.",
    name: "Jessica T.",
    result: "Softer hair in 14 days",
    rating: 5,
  },
  {
    quote: "No more itchy scalp! I didn't realize how much tap water was affecting my hair health.",
    name: "Marcus L.",
    result: "Zero scalp irritation",
    rating: 5,
  },
];

const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ShowerHeadLandingPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };

  return (
    <>
      <SEOHead
        title="Transform Your Hair with Pure Water | Verité Scalp Shower Head"
        description="Discover how the Verité Scalp Purifying Shower Head removes 99% of chlorine and contaminants to stop shedding and restore healthy hair growth."
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center overflow-hidden bg-primary"
        >
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-accent/30" />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--accent)) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, hsl(var(--brand-gold)) 0%, transparent 40%),
                               radial-gradient(circle at 60% 80%, hsl(var(--accent)) 0%, transparent 45%)`
            }} />
          </motion.div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-brand-gold/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 md:px-10 relative z-10 pt-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <span className="text-sm font-medium text-primary-foreground">Best Seller • 14,520+ Reviews</span>
                </div>
                
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
                  Your Water Is
                  <span className="block text-brand-gold">Destroying Your Hair</span>
                </h1>
                
                <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-8 max-w-xl">
                  Hard water contains chlorine, heavy metals, and minerals that cause shedding, breakage, and stunted growth. 
                  <span className="text-primary-foreground font-semibold"> Fix the source, fix your hair.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Button 
                    asChild
                    className="h-14 px-10 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-glow rounded-full group"
                  >
                    <Link to="/product/verite-scalp-purifying-shower-filter-1">
                      Shop Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-14 px-10 bg-transparent border-2 border-primary-foreground/50 text-primary-foreground font-semibold hover:bg-primary-foreground hover:text-primary transition-all duration-300 rounded-full"
                    onClick={scrollToContent}
                  >
                    Learn More
                  </Button>
                </div>

                {/* Trust Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-center"
                    >
                      <p className="text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</p>
                      <p className="text-xs text-primary-foreground/60 uppercase tracking-wider mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right - Product Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative flex justify-center lg:justify-end"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-radial from-accent/30 via-transparent to-transparent blur-3xl scale-150" />
                  
                  <motion.img
                    src={showerHeadImage}
                    alt="Verité Scalp Purifying Shower Head"
                    className="relative z-10 w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl"
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Floating badges */}
                  <motion.div
                    className="absolute -left-4 top-1/4 bg-card/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-border"
                    animate={{ y: [0, -10, 0] }}
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
                    className="absolute -right-4 bottom-1/3 bg-card/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-border"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-brand-gold" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">Vitamin C Infused</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.button
            onClick={scrollToContent}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </section>

        {/* Problem Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">The Hidden Problem</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                What's Really Causing Your Hair Loss?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                You've tried everything—serums, oils, supplements. But if you're still showering in unfiltered water, 
                you're fighting a losing battle.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {problems.map((problem, index) => (
                <AnimatedSection key={problem.title}>
                  <motion.div
                    className="bg-card rounded-2xl p-8 shadow-soft border border-border h-full group"
                    whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <problem.icon className="w-7 h-7 text-destructive" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{problem.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />
          
          <div className="container mx-auto px-4 md:px-10 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection>
                <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">The Solution</span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Purify Your Water,
                  <span className="text-accent"> Transform Your Hair</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  The Verité Scalp Purifying Shower Head uses advanced 15-stage filtration to remove harmful 
                  contaminants while infusing your water with beneficial vitamins and minerals.
                </p>

                <div className="space-y-4 mb-10">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${
                        benefit.highlight ? 'bg-accent/10 border border-accent/20' : 'hover:bg-muted/50'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        benefit.highlight ? 'bg-accent/20' : 'bg-muted'
                      }`}>
                        <benefit.icon className={`w-5 h-5 ${benefit.highlight ? 'text-accent' : 'text-foreground'}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button 
                  asChild
                  className="h-14 px-10 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full group"
                >
                  <Link to="/product/verite-scalp-purifying-shower-filter-1">
                    Get Your Shower Head
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </AnimatedSection>

              <AnimatedSection className="relative">
                <div className="relative">
                  <motion.img
                    src={showerHeadBlack}
                    alt="Verité Shower Head Black"
                    className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                  />
                  
                  {/* Interactive hotspots */}
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent rounded-full cursor-pointer"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-50" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-1/2 right-1/4 w-4 h-4 bg-brand-gold rounded-full cursor-pointer"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-brand-gold rounded-full animate-ping opacity-50" />
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 md:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-4 block">Your Journey</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Results You Can <span className="text-brand-gold">See & Feel</span>
              </h2>
              <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
                Most customers see noticeable improvements within the first month of switching to filtered water.
              </p>
            </AnimatedSection>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-0 left-1/2 -translate-x-px w-0.5 h-full bg-primary-foreground/20 hidden md:block" />
              
              <div className="space-y-12 md:space-y-0">
                {timeline.map((item, index) => (
                  <AnimatedSection key={item.week}>
                    <motion.div
                      className={`md:grid md:grid-cols-2 md:gap-12 items-center ${
                        index % 2 === 0 ? '' : 'md:direction-rtl'
                      }`}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <div className={`${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12 md:col-start-2'}`}>
                        <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-primary-foreground/10">
                          <span className="text-brand-gold font-semibold text-sm uppercase tracking-wider">{item.week}</span>
                          <h3 className="font-display text-xl md:text-2xl font-bold mt-2 mb-3">{item.title}</h3>
                          <p className="text-primary-foreground/70">{item.description}</p>
                        </div>
                      </div>
                      
                      {/* Timeline dot */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-gold rounded-full items-center justify-center" style={{ top: `${(index * 25) + 12.5}%` }}>
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      </div>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-10">
            <AnimatedSection className="text-center mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">Real Results</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Join 14,520+ Happy Customers
              </h2>
            </AnimatedSection>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    className="text-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ 
                      opacity: activeTestimonial === index ? 1 : 0,
                      x: activeTestimonial === index ? 0 : 50,
                      position: activeTestimonial === index ? 'relative' : 'absolute'
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ display: activeTestimonial === index ? 'block' : 'none' }}
                  >
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <blockquote className="text-2xl md:text-3xl font-display text-foreground mb-8 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="space-y-2">
                      <p className="font-semibold text-foreground text-lg">{testimonial.name}</p>
                      <p className="text-accent font-medium">{testimonial.result}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-3 mt-10">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeTestimonial === index 
                        ? 'bg-accent w-8' 
                        : 'bg-muted hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-accent/10 via-background to-brand-gold/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold/20 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 md:px-10 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Ready to Transform Your Hair?
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Join thousands who've discovered the power of pure water. 
                30-day money-back guarantee—risk-free.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  asChild
                  className="h-16 px-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg rounded-full group shadow-glow"
                >
                  <Link to="/product/verite-scalp-purifying-shower-filter-1">
                    Shop Now — $59.99
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span>30-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span>Easy Installation</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ShowerHeadLandingPage;
