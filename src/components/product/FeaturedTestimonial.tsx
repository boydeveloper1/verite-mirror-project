import { Star, BadgeCheck, Award } from "lucide-react";
import sensitiveSkinImage from "@/assets/testimonials/sensitive-skin.png";

export const FeaturedTestimonial = () => {
  return (
    <section className="py-6 md:py-10 lg:scale-[0.8] lg:origin-top-left">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full">
            <Star className="w-3.5 h-3.5 fill-accent" />
            Real Results
          </span>
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative bg-gradient-to-br from-card via-card to-muted/30 rounded-2xl md:rounded-3xl overflow-hidden border border-accent/20 shadow-lg">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
              <img 
                src={sensitiveSkinImage} 
                alt="Sensitive Skin Relief - Before and After"
                className="w-full h-full object-cover"
              />
              {/* Before/After Labels */}
              <div className="absolute bottom-0 left-0 right-0 flex">
                <div className="flex-1 bg-gradient-to-t from-red-900/80 to-transparent py-2.5 px-4">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Before</span>
                </div>
                <div className="flex-1 bg-gradient-to-t from-emerald-900/80 to-transparent py-2.5 px-4 text-right">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">After</span>
                </div>
              </div>
              {/* Featured Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-brand-gold text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Award className="w-3 h-3" />
                  Featured Result
                </span>
              </div>
              {/* Duration Badge */}
              <div className="absolute top-3 right-3">
                <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  2 Weeks
                </span>
              </div>
            </div>
            
            {/* Content Side */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-widest mb-3">
                Sensitive Skin Relief
              </span>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <blockquote className="text-foreground text-sm md:text-base lg:text-lg leading-relaxed mb-5 font-medium">
                "My skin burned after every shower for 2 years. I was taking cold showers just to avoid the pain. 2 weeks with the Verite shower head and I can shower without burning now. No tightness. No redness."
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div>
                  <p className="font-semibold text-foreground flex items-center gap-2 text-sm md:text-base">
                    Amanda K., 35
                    <BadgeCheck className="w-4 h-4 text-accent" />
                  </p>
                  <p className="text-xs text-muted-foreground">San Diego, CA • Verified Purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
