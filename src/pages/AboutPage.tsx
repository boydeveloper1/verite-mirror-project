import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";
import { PreFooterSubscribe } from "@/components/shared/PreFooterSubscribe";
import { EmailPopup } from "@/components/shared/EmailPopup";
import { Heart, Leaf, Shield, Sparkles, Users, Award, Star, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHeroBanner 
          title="About VERITÉ" 
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
                Pure Water. <span className="text-accent">Healthy Skin.</span>
              </h2>
              <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-6 animate-fade-in-up [animation-delay:100ms]">
                At VERITÉ, we believe that true skin health starts with your water.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-fade-in-up [animation-delay:200ms]">
                We're not just another skincare brand making empty promises. We're a science-backed company 
                dedicated to one mission: <strong className="text-foreground">removing the chlorine and minerals that trigger your skin conditions</strong>. 
                Because when you purify your water, your skin can finally heal.
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
                  A Complete Skin Care Line
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  We've developed products specifically formulated to reduce inflammation and restore skin health by addressing water quality.
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
                      Verité Purifying Shower Head
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Our flagship product with 14,520+ verified 5-star reviews. The 15-stage filtration system 
                      removes 99% of chlorine and hard water minerals that trigger eczema, psoriasis, rosacea, and acne flare-ups. 
                      Most customers report calmer, less irritated skin within 2 weeks.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      <span className="inline-flex items-center gap-1.5 text-sm text-accent font-medium">
                        <CheckCircle className="w-4 h-4" /> 15-Stage Filtration
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-accent font-medium">
                        <CheckCircle className="w-4 h-4" /> Removes Chlorine & Minerals
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-accent font-medium">
                        <CheckCircle className="w-4 h-4" /> Clinically Tested
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-muted-foreground mt-8">
                Explore our full range of anti-inflammatory skin solutions, each designed to work together 
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
                  VERITÉ was founded by people who understood the frustration of chronic skin conditions firsthand.
                </p>
                <p>
                  After years of battling eczema, psoriasis, and sensitive skin, we tried every cream, every prescription, 
                  every trending treatment. Steroid creams provided temporary relief but came with side effects. 
                  Expensive moisturizers barely scratched the surface. <strong className="text-foreground">Nothing provided lasting relief.</strong>
                </p>
                <div className="p-6 rounded-xl bg-secondary/50 border-l-4 border-accent">
                  <p className="text-foreground font-medium italic">
                    "Then we discovered the truth that changed everything: our tap water was the trigger. Every shower 
                    was exposing our skin to chlorine and hard water minerals that stripped our natural barrier and 
                    triggered inflammation. We were fighting a battle we couldn't win."
                  </p>
                </div>
                <p>
                  Working with dermatologists and water quality experts, we developed a 15-stage filtration system 
                  that does one thing exceptionally well: <strong className="text-foreground">remove the irritants before they touch your skin</strong>. 
                  Once we stopped the daily damage, our skin finally had a chance to heal naturally.
                </p>
                <p className="text-xl font-semibold text-primary bg-accent/10 p-6 rounded-xl text-center">
                  Today, VERITÉ has helped over <span className="text-accent">14,000+ customers</span> transform their skin by transforming their water. 
                  Our clinically-tested filtration system is trusted by people with eczema, psoriasis, rosacea, and 
                  sensitive skin worldwide.
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
                    title: "Chemical-Free Filtration",
                    description: "Our 15-stage filtration removes chlorine and hard water minerals without adding any chemicals. Pure, clean water for sensitive skin."
                  },
                  {
                    icon: Shield,
                    title: "Clinically Tested",
                    description: "Every product is dermatologist-approved and clinically tested. We don't guess—we prove our products work."
                  },
                  {
                    icon: Heart,
                    title: "Made With Care",
                    description: "We understand the emotional toll of chronic skin conditions because we've lived it. Every product is made with genuine care."
                  },
                  {
                    icon: Sparkles,
                    title: "Science-Backed",
                    description: "Our filtration technology is based on the latest research in skin health and dermatology—not trends, just real science."
                  },
                  {
                    icon: Users,
                    title: "Community First",
                    description: "We're building a community of people who support each other on their skin health journey. You're never alone in this."
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
                { number: "14,000+", label: "Happy Customers" },
                { number: "98%", label: "Recommend Us" },
                { number: "89%", label: "Clearer Skin" },
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
                Ready to Transform Your Skin?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Join over 14,000 customers who have transformed their skin by changing their water. 
                Relief from eczema, psoriasis, rosacea, and acne starts with pure water.
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
        <PreFooterSubscribe />
      </main>
      <Footer />
      <EmailPopup />
    </div>
  );
};

export default AboutPage;
