import { useState } from "react";
import { Stethoscope, FlaskConical, ShieldCheck, Leaf, Droplets, Filter, Award, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgesProps {
  productHandle?: string;
}

const mistBadges = [
  {
    icon: FlaskConical,
    title: "Clinically Tested",
    subtitle: "70% shedding reduction verified",
    priority: true,
  },
  {
    icon: Leaf,
    title: "100% Natural",
    subtitle: "No harsh chemicals",
    priority: true,
  },
  {
    icon: Stethoscope,
    title: "Dermatologist Recommended",
    subtitle: "Formulated with expert guidance",
    priority: false,
  },
  {
    icon: ShieldCheck,
    title: "Satisfaction Guaranteed",
    subtitle: "30-day money-back",
    priority: false,
  },
];

const showerFilterBadges = [
  {
    icon: Filter,
    title: "15-Stage Filtration",
    subtitle: "Maximum purification",
    priority: true,
  },
  {
    icon: Droplets,
    title: "99% Chlorine Removal",
    subtitle: "Lab tested & verified",
    priority: true,
  },
  {
    icon: Award,
    title: "Universal Fit",
    subtitle: "Works with all showers",
    priority: false,
  },
  {
    icon: ShieldCheck,
    title: "Satisfaction Guaranteed",
    subtitle: "30-day money-back",
    priority: false,
  },
];

export const TrustBadges = ({ productHandle }: TrustBadgesProps) => {
  const [showAll, setShowAll] = useState(false);
  const isShowerHead = productHandle?.includes("shower-filter") || productHandle?.includes("shower-head");
  const allBadges = isShowerHead ? showerFilterBadges : mistBadges;
  
  // On mobile, show only priority badges by default
  const priorityBadges = allBadges.filter(b => b.priority);
  const displayBadges = showAll ? allBadges : priorityBadges;

  return (
    <div className="space-y-3">
      {/* Mobile: Show priority badges only with expand option */}
      <div className="md:hidden">
        <div className="grid grid-cols-2 gap-2">
          {displayBadges.map((badge) => (
            <div
              key={badge.title}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-secondary/50"
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                <badge.icon className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-foreground leading-tight">
                  {badge.title}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center justify-center gap-1 w-full mt-2 py-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>See all certifications</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Desktop: Show all badges */}
      <div className="hidden md:grid grid-cols-2 gap-3">
        {allBadges.map((badge) => (
          <div
            key={badge.title}
            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <badge.icon className="w-4 h-4 text-accent" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground leading-tight">
                {badge.title}
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                {badge.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
