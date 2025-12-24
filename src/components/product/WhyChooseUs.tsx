import { Check, X } from "lucide-react";

interface WhyChooseUsProps {
  productType?: "mist" | "shower";
}

export const WhyChooseUs = ({ productType = "mist" }: WhyChooseUsProps) => {
  const mistComparison = [
    { feature: "Dermatologist-Formulated", us: true, others: false },
    { feature: "100% Natural Ingredients", us: true, others: false },
    { feature: "Clinically Tested for Results", us: true, others: false },
    { feature: "Targets Root Cause (Inflammation)", us: true, others: false },
    { feature: "Works Under Wigs & Braids", us: true, others: false },
    { feature: "Non-Greasy Formula", us: true, others: false },
    { feature: "30-Day Money Back Guarantee", us: true, others: false },
    { feature: "5,000+ Happy Customers", us: true, others: false },
    { feature: "Just Marketing Hype", us: false, others: true },
    { feature: "Temporary Results Only", us: false, others: true },
  ];

  const showerComparison = [
    { feature: "15-Stage Filtration System", us: true, others: false },
    { feature: "Removes Chlorine & Heavy Metals", us: true, others: false },
    { feature: "Stops Water-Based Inflammation", us: true, others: false },
    { feature: "Protects Hair Follicles", us: true, others: false },
    { feature: "Universal Easy Installation", us: true, others: false },
    { feature: "High Water Pressure Maintained", us: true, others: false },
    { feature: "30-Day Money Back Guarantee", us: true, others: false },
    { feature: "Premium Build Quality", us: true, others: false },
    { feature: "Low-Quality Materials", us: false, others: true },
    { feature: "Weak Filtration Only", us: false, others: true },
  ];

  const comparison = productType === "shower" ? showerComparison : mistComparison;

  return (
    <section className="my-12">
      <div className="text-center mb-8">
        <span className="inline-block text-accent font-bold uppercase tracking-wider text-xs mb-3">
          The Difference Is Clear
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-3">
          Why Choose VERITÉ SCALP?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how our {productType === "shower" ? "Scalp Purifying Shower Head" : "Scalp Soothing Mist"} compares to other products on the market.
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft">
        {/* Table Header */}
        <div className="grid grid-cols-3 bg-muted/50">
          <div className="p-4 font-semibold text-foreground text-sm md:text-base">Feature</div>
          <div className="p-4 font-semibold text-center text-accent border-l border-border text-sm md:text-base">
            VERITÉ SCALP
          </div>
          <div className="p-4 font-semibold text-center text-muted-foreground border-l border-border text-sm md:text-base">
            Other Brands
          </div>
        </div>

        {/* Table Rows */}
        {comparison.map((item, index) => (
          <div 
            key={index}
            className={`grid grid-cols-3 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"} border-t border-border`}
          >
            <div className="p-4 text-sm text-foreground flex items-center">
              {item.feature}
            </div>
            <div className="p-4 flex items-center justify-center border-l border-border">
              {item.us ? (
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-accent" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-500" />
                </div>
              )}
            </div>
            <div className="p-4 flex items-center justify-center border-l border-border">
              {item.others ? (
                <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <Check className="w-4 h-4 text-red-500" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                  <X className="w-4 h-4 text-muted-foreground/50" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
