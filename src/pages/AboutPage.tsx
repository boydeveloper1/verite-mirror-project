import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";
import { Heart, Leaf, Shield, Sparkles, Users, Award, Star, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHeroBanner 
          title="About VERITÉ SCALP" 
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About Us" }
          ]}
        />

        {/* Hero Mission Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/50 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(27,127,77,0.1),transparent_50%)]" />
          <div className="container mx-auto px-4 md:px-10 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
                <Sparkles className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 animate-fade-in-up">
                Scalp Care <span className="text-accent">Before</span> Hair Care
              </h2>
              <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-6 animate-fade-in-up [animation-delay:100ms]">
                At VERITÉ SCALP, we believe that true hair health starts at the root—<em>literally</em>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-fade-in-up [animation-delay:200ms]">
                We're not just another hair growth brand making empty promises. We're a science-backed scalp care 
                company dedicated to one mission: <strong className="text-foreground">stopping inflammation so your hair can grow naturally</strong>. 
                Because when your scalp is healthy, your hair follows.
              </p>
            </div>
          </div>
        </section>

        {/* Product Range Section */}
        <section className="py-16 md:py-20 bg-accent/5">
          <div className="container mx-auto px-4 md:px-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block text-accent font-bold uppercase tracking-wider mb-4">Our Products</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                  A Complete Scalp Care Line
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  We've developed a variety of products specifically formulated to reduce inflammation and restore scalp health.
                </p>
              </div>
              
              <div className="bg-background rounded-2xl p-8 md:p-12 shadow-soft border border-border/50">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                      <Star className="w-16 h-16 text-accent" />
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4">
                      <Zap className="w-3 h-3" />
                      Best Seller
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-3">
                      Verité Scalp Soothing Mist
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Our flagship product that started it all. The Soothing Mist calms inflammation in 2-3 weeks, 
                      allowing dormant follicles to reactivate. With a 4.9-star rating from 127 verified customers, 
                      it's the foundation of every successful scalp recovery journey.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      <span className="inline-flex items-center gap-1.5 text-sm text-accent font-medium">
                        <CheckCircle className="w-4 h-4" /> Dermatologist-Formulated
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-accent font-medium">
                        <CheckCircle className="w-4 h-4" /> 100% Natural
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-accent font-medium">
                        <CheckCircle className="w-4 h-4" /> Clinically Tested
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-muted-foreground mt-8">
                Explore our full range of anti-inflammatory scalp treatments, each designed to work together 
                for maximum results.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
                  <Heart className="w-4 h-4" />
                  Our Story
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                  Born From Personal Experience
                </h2>
              </div>
              
              <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                <p className="text-xl text-foreground font-medium">
                  VERITÉ SCALP was founded by women who understood the frustration firsthand.
                </p>
                <p>
                  After years of protective styling—braids, wigs, extensions—we watched our edges thin and disappear. 
                  We tried every growth serum, every miracle oil, every trending product. <strong className="text-foreground">Nothing worked.</strong>
                </p>
                <div className="p-6 rounded-xl bg-secondary/50 border-l-4 border-accent">
                  <p className="text-foreground font-medium italic">
                    "Then we discovered the truth that changed everything: our scalps were inflamed. All those 
                    products we were layering on? They couldn't penetrate because our scalps were too damaged 
                    to absorb them. We weren't addressing the root cause."
                  </p>
                </div>
                <p>
                  Working with dermatologists and trichologists, we developed a formula that does one thing 
                  exceptionally well: <strong className="text-foreground">calm scalp inflammation</strong>. Once we stopped the inflammation, our hair 
                  started growing back naturally. No gimmicks. No false promises. Just science.
                </p>
                <p className="text-xl font-semibold text-primary bg-accent/10 p-6 rounded-xl text-center">
                  Today, VERITÉ SCALP has helped over <span className="text-accent">5,000+ women</span> reclaim their edges and restore their confidence. 
                  Our clinically-tested, dermatologist-recommended formula is trusted by women worldwide who 
                  refuse to give up on their hair.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-10">
            <div className="text-center mb-14">
              <span className="inline-block text-accent font-bold uppercase tracking-wider mb-4">Our Values</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                What We Stand For
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Leaf,
                  title: "100% Natural Ingredients",
                  description: "We use only clean, natural ingredients that are safe for sensitive scalps. No harsh chemicals, no parabens, no sulfates—ever."
                },
                {
                  icon: Shield,
                  title: "Clinically Tested",
                  description: "Every product is dermatologist-formulated and clinically tested. We don't guess—we prove our products work."
                },
                {
                  icon: Heart,
                  title: "Made With Love",
                  description: "We understand the emotional journey of hair loss because we've lived it. Every bottle is made with genuine care and understanding."
                },
                {
                  icon: Sparkles,
                  title: "Science-Backed",
                  description: "Our formulations are based on the latest research in scalp health and trichology—not trends, not marketing hype, just real science."
                },
                {
                  icon: Users,
                  title: "Community First",
                  description: "We're building a community of women who support each other on their hair journey. You're never alone in this."
                },
                {
                  icon: Award,
                  title: "Results Guaranteed",
                  description: "We stand behind our products with a 30-day money-back guarantee. If it doesn't work for you, we'll give you your money back."
                }
              ].map((value, index) => (
                <div 
                  key={value.title}
                  className="group p-8 rounded-2xl bg-background border border-border hover:shadow-medium transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="container mx-auto px-4 md:px-10 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center max-w-4xl mx-auto">
              {[
                { number: "5,000+", label: "Happy Customers" },
                { number: "98%", label: "Recommend Us" },
                { number: "70%", label: "Less Shedding" },
                { number: "30", label: "Day Guarantee" }
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-accent">{stat.number}</p>
                  <p className="text-sm md:text-base text-primary-foreground/70 uppercase tracking-wider font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-6">
                <Zap className="w-4 h-4" />
                Start Your Journey
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
                Ready to Start Your Scalp Recovery Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Join over 5,000 women who have transformed their scalp health and regrown their edges with VERITÉ SCALP. 
                Your hair deserves a healthy foundation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  variant="cta"
                  size="xl"
                  className="text-lg"
                >
                  <Link to="/store">Shop Now</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  size="xl"
                  className="text-lg border-2"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
