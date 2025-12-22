import { Stethoscope, FlaskConical, ShieldCheck, Leaf, Droplets, Filter, Award, CheckCircle } from "lucide-react";

interface TrustBadgesProps {
  productHandle?: string;
}

const mistBadges = [
  {
    icon: Stethoscope,
    title: "Dermatologist Recommended",
    subtitle: "Formulated with expert guidance",
  },
  {
    icon: FlaskConical,
    title: "Clinically Tested",
    subtitle: "70% shedding reduction verified",
  },
  {
    icon: ShieldCheck,
    title: "30-Day Money-Back",
    subtitle: "Satisfaction guaranteed",
  },
  {
    icon: Leaf,
    title: "100% Natural",
    subtitle: "No harsh chemicals",
  },
];

const showerFilterBadges = [
  {
    icon: Filter,
    title: "15-Stage Filtration",
    subtitle: "Maximum purification",
  },
  {
    icon: Droplets,
    title: "99% Chlorine Removal",
    subtitle: "Lab tested & verified",
  },
  {
    icon: ShieldCheck,
    title: "30-Day Money-Back",
    subtitle: "Satisfaction guaranteed",
  },
  {
    icon: Award,
    title: "Universal Fit",
    subtitle: "Works with all showers",
  },
];

export const TrustBadges = ({ productHandle }: TrustBadgesProps) => {
  const isShowerHead = productHandle?.includes("shower-filter") || productHandle?.includes("shower-head");
  const badges = isShowerHead ? showerFilterBadges : mistBadges;

  return (
    <div className="grid grid-cols-2 gap-3">
      {badges.map((badge) => (
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
  );
};
