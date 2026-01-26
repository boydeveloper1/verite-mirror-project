import { Star, BadgeCheck, Award } from "lucide-react";
import sensitiveSkinImage from "@/assets/testimonials/sensitive-skin.png";

export const FeaturedTestimonial = () => {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-4">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">
          <Star className="w-3 h-3 fill-accent" />
          Real Results
        </span>
      </div>

      {/* Featured Testimonial Card */}
      <div className="relative bg-gradient-to-br from-card via-card to-muted/30 rounded-xl overflow-hidden border border-accent/20 shadow-md">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={sensitiveSkinImage} 
            alt="Sensitive Skin Relief - Before and After"
            className="w-full h-full object-cover"
          />
          {/* Before/After Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex">
            <div className="flex-1 bg-gradient-to-t from-red-900/80 to-transparent py-2 px-3">
              <span className="text-white text-[10px] font-bold uppercase tracking-wider">Before</span>
            </div>
            <div className="flex-1 bg-gradient-to-t from-emerald-900/80 to-transparent py-2 px-3 text-right">
              <span className="text-white text-[10px] font-bold uppercase tracking-wider">After</span>
            </div>
          </div>
          {/* Featured Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-brand-gold text-primary text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Award className="w-2.5 h-2.5" />
              Featured
            </span>
          </div>
          {/* Duration Badge */}
          <div className="absolute top-2 right-2">
            <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
              2 Weeks
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <span className="text-[9px] font-bold text-accent uppercase tracking-widest mb-2 block">
            Sensitive Skin Relief
          </span>
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-brand-gold text-brand-gold" />
            ))}
          </div>
          <blockquote className="text-foreground text-xs leading-relaxed mb-3 font-medium">
            "My skin burned after every shower for 2 years. 2 weeks with the Verite shower head and I can shower without burning now. No tightness. No redness."
          </blockquote>
          <div className="flex items-center gap-2 pt-3 border-t border-border">
            <div>
              <p className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                Amanda K., 35
                <BadgeCheck className="w-3 h-3 text-accent" />
              </p>
              <p className="text-[10px] text-muted-foreground">San Diego, CA • Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
