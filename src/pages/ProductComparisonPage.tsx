import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";
import { EducationalPopup } from "@/components/shared/EducationalPopup";
import { PreFooterSubscribe } from "@/components/shared/PreFooterSubscribe";
import { EmailPopup } from "@/components/shared/EmailPopup";
import { Button } from "@/components/ui/button";
import { Check, X, Droplets, ShowerHead, Sparkles, Shield, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBg from "@/assets/products-banner.jpg";

const comparisonData = {
  mist: {
    name: "Scalp Soothing Mist",
    tagline: "Topical Relief & Growth Support",
    price: "$40",
    image: "/placeholder.svg",
    handle: "verite-scalp-soothing-mist",
    description: "A targeted spray treatment that calms inflammation, soothes itching, and creates the optimal scalp environment for hair regrowth.",
    bestFor: [
      "Instant itch relief",
      "Edge regrowth",
      "Post-braid recovery",
      "Daily scalp maintenance",
    ],
    features: [
      { name: "Application", value: "Direct to scalp" },
      { name: "Key Ingredients", value: "Tea Tree, Aloe, Peppermint" },
      { name: "Results Timeline", value: "4-8 weeks" },
      { name: "Size", value: "180ml spray bottle" },
      { name: "Usage", value: "Daily or as needed" },
    ],
    benefits: [
      { text: "Stops scalp inflammation", included: true },
      { text: "Soothes itching instantly", included: true },
      { text: "Promotes edge regrowth", included: true },
      { text: "Works under wigs/braids", included: true },
      { text: "No greasy residue", included: true },
      { text: "Removes water impurities", included: false },
      { text: "Filters chlorine/metals", included: false },
    ],
    rating: 4.9,
    reviews: 127,
    badge: "Best Seller",
  },
  showerHead: {
    name: "Scalp Purifying Shower Head",
    tagline: "Water Filtration System",
    price: "$105",
    image: "/placeholder.svg",
    handle: "verite-scalp-purifying-shower-filter-1",
    description: "A 15-stage filtration shower head that removes chlorine, heavy metals, and impurities from your water to protect your scalp at the source.",
    bestFor: [
      "Hard water areas",
      "Preventing buildup",
      "Long-term scalp health",
      "Whole-family protection",
    ],
    features: [
      { name: "Application", value: "Water filtration" },
      { name: "Key Technology", value: "15-stage filtration" },
      { name: "Results Timeline", value: "Immediate" },
      { name: "Installation", value: "Universal fit" },
      { name: "Usage", value: "Every shower" },
    ],
    benefits: [
      { text: "Stops scalp inflammation", included: true },
      { text: "Soothes itching instantly", included: false },
      { text: "Promotes edge regrowth", included: true },
      { text: "Works under wigs/braids", included: false },
      { text: "No greasy residue", included: false },
      { text: "Removes water impurities", included: true },
      { text: "Filters chlorine/metals", included: true },
    ],
    rating: 5.0,
    reviews: 54,
    badge: "Premium Choice",
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function ProductComparisonPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PageHeroBanner
        title="Compare Our Products"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Compare", href: "/compare" },
        ]}
        backgroundImage={heroBg}
      />

      {/* Intro Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Which Product Is Right for You?
            </h2>
            <p className="text-lg text-muted-foreground">
              Both products work together to create the ultimate scalp care routine. 
              The Shower Head treats your water, while the Mist treats your scalp directly. 
              For best results, use both.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Side-by-Side Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mist Product Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Badge */}
              <div className="bg-accent text-accent-foreground text-center py-2 text-sm font-semibold">
                <Star className="inline-block w-4 h-4 mr-1 -mt-0.5" />
                {comparisonData.mist.badge}
              </div>
              
              {/* Icon & Name */}
              <div className="p-8 text-center border-b border-border">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Droplets className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 whitespace-nowrap">
                  {comparisonData.mist.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {comparisonData.mist.tagline}
                </p>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(comparisonData.mist.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {comparisonData.mist.rating} ({comparisonData.mist.reviews} reviews)
                  </span>
                </div>
                <p className="text-3xl font-bold text-accent">{comparisonData.mist.price}</p>
              </div>

              {/* Description */}
              <div className="p-6 border-b border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {comparisonData.mist.description}
                </p>
              </div>

              {/* Best For */}
              <div className="p-6 border-b border-border">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Best For
                </h4>
                <ul className="space-y-2">
                  {comparisonData.mist.bestFor.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div className="p-6 border-b border-border">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  Key Features
                </h4>
                <div className="space-y-2">
                  {comparisonData.mist.features.map((feature, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{feature.name}</span>
                      <span className="font-medium text-foreground">{feature.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-6">
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6">
                  <Link to={`/product/${comparisonData.mist.handle}`}>
                    Shop Scalp Mist
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Shower Head Product Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Badge */}
              <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                <Shield className="inline-block w-4 h-4 mr-1 -mt-0.5" />
                {comparisonData.showerHead.badge}
              </div>
              
              {/* Icon & Name */}
              <div className="p-8 text-center border-b border-border">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShowerHead className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 whitespace-nowrap">
                  {comparisonData.showerHead.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {comparisonData.showerHead.tagline}
                </p>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(comparisonData.showerHead.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {comparisonData.showerHead.rating} ({comparisonData.showerHead.reviews} reviews)
                  </span>
                </div>
                <p className="text-3xl font-bold text-primary">{comparisonData.showerHead.price}</p>
              </div>

              {/* Description */}
              <div className="p-6 border-b border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {comparisonData.showerHead.description}
                </p>
              </div>

              {/* Best For */}
              <div className="p-6 border-b border-border">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Best For
                </h4>
                <ul className="space-y-2">
                  {comparisonData.showerHead.bestFor.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div className="p-6 border-b border-border">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Key Features
                </h4>
                <div className="space-y-2">
                  {comparisonData.showerHead.features.map((feature, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{feature.name}</span>
                      <span className="font-medium text-foreground">{feature.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-6">
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6">
                  <Link to={`/product/${comparisonData.showerHead.handle}`}>
                    Shop Shower Head
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Comparison Table */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Feature Comparison
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See exactly what each product offers at a glance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-card rounded-2xl border border-border overflow-hidden shadow-lg"
          >
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-muted/50">
              <div className="p-4 font-semibold text-foreground">Benefit</div>
              <div className="p-4 font-semibold text-center text-accent border-l border-border">
                <Droplets className="w-5 h-5 mx-auto mb-1" />
                Mist
              </div>
              <div className="p-4 font-semibold text-center text-primary border-l border-border">
                <ShowerHead className="w-5 h-5 mx-auto mb-1" />
                Shower Head
              </div>
            </div>

            {/* Table Rows */}
            {comparisonData.mist.benefits.map((benefit, i) => (
              <div 
                key={i} 
                className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-background" : "bg-muted/20"} border-t border-border`}
              >
                <div className="p-4 text-sm text-foreground">{benefit.text}</div>
                <div className="p-4 text-center border-l border-border">
                  {benefit.included ? (
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                  )}
                </div>
                <div className="p-4 text-center border-l border-border">
                  {comparisonData.showerHead.benefits[i].included ? (
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recommendation Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Our Recommendation
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Use Both */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-6 border-2 border-accent text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Best Results</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use both products together for complete scalp care from water to follicle.
                </p>
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/products">Shop Both</Link>
                </Button>
              </motion.div>

              {/* Start with Mist */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card rounded-2xl p-6 border border-border text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Droplets className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Quick Relief</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start with the Mist if you need immediate itch relief and targeted treatment.
                </p>
                <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Link to={`/product/${comparisonData.mist.handle}`}>Get the Mist</Link>
                </Button>
              </motion.div>

              {/* Start with Shower Head */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card rounded-2xl p-6 border border-border text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShowerHead className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Prevention First</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start with the Shower Head to protect your scalp from water impurities at the source.
                </p>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to={`/product/${comparisonData.showerHead.handle}`}>Get the Filter</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still Not Sure?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Take our quick quiz to find the perfect product for your scalp needs, 
              or contact our team for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                <Link to="/contact">Get Personalized Help</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link to={`/product/${comparisonData.mist.handle}`}>Shop Best Seller</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <PreFooterSubscribe />
      <Footer />
      <EducationalPopup />
      <EmailPopup />
    </div>
  );
}
