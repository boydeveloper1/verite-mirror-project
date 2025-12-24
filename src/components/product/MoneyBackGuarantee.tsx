import { Shield, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MoneyBackGuaranteeProps {
  variant?: "full" | "compact";
  showClaimButton?: boolean;
}

export const MoneyBackGuarantee = ({ variant = "full", showClaimButton = true }: MoneyBackGuaranteeProps) => {
  if (variant === "compact") {
    return (
      <div className="my-6 p-5 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
              <Shield className="w-7 h-7 text-accent" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-foreground mb-1">30-Day Money Back Guarantee</h3>
            <p className="text-sm text-muted-foreground">
              Not satisfied? Get a full refund within 30 days. No questions asked.
            </p>
          </div>
          {showClaimButton && (
            <Button asChild variant="outline" size="sm" className="flex-shrink-0 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link to="/refund-policy">
                Learn More
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-accent/5 to-background">
      <div className="container mx-auto px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/10 via-accent/5 to-background border border-accent/20 p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/30">
                  <Shield className="w-12 h-12 md:w-16 md:h-16 text-accent-foreground" />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block text-accent font-bold uppercase tracking-wider text-xs mb-3">
                  Risk-Free Purchase
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                  30-Day Money Back Guarantee
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  We're so confident in our products that we offer a <strong className="text-foreground">100% satisfaction guarantee</strong>. 
                  If you don't see results within 30 days, we'll give you a full refund. No questions asked.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                  {[
                    "Full Refund Within 30 Days",
                    "No Questions Asked",
                    "Easy Return Process"
                  ].map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5 text-sm text-foreground font-medium">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      {item}
                    </span>
                  ))}
                </div>
                
                {showClaimButton && (
                  <Button asChild variant="cta" size="xl" className="text-lg">
                    <Link to="/store">
                      Shop Risk-Free Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
