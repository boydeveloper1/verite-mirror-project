import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "My edges stopped breaking off. They're growing back. I can finally wear my hair pulled back again.",
    name: "Jasmine M.",
    verification: "Verified Purchase • Used for 8 weeks",
    result: "Edge Recovery Complete",
  },
  {
    quote: "After years of trying every growth serum, this actually worked. The inflammation was the real issue all along.",
    name: "Keisha T.",
    verification: "Verified Purchase • Used for 6 weeks",
    result: "70% Less Shedding",
  },
  {
    quote: "I wear wigs every day and this saved my hairline. No more itching, no more tension damage. Life changing.",
    name: "Tamara L.",
    verification: "Verified Purchase • Used for 10 weeks",
    result: "Hairline Restored",
  },
  {
    quote: "The cooling sensation is immediate. Within 2 weeks my scalp felt completely different. Healthy and calm.",
    name: "Nicole R.",
    verification: "Verified Purchase • Used for 4 weeks",
    result: "Scalp Health Improved",
  },
  {
    quote: "I was skeptical but the before/after photos speak for themselves. My edges are fuller than they've been in years.",
    name: "Destiny A.",
    verification: "Verified Purchase • Used for 8 weeks",
    result: "Fuller Edges",
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : 1;
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="py-20 md:py-28 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 md:px-10">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in-up">
          <span className="inline-block text-accent font-semibold uppercase tracking-wider mb-4">Testimonials</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Join 5,000+ Women Regrowing Their Edges
          </h2>
        </div>

        {/* Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Cards Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="w-full lg:w-1/3 flex-shrink-0 px-3"
                >
                  <div className="bg-card p-8 rounded-xl shadow-soft border-l-4 border-accent h-full hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                    {/* Star Rating */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-foreground italic leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </p>

                    {/* Customer Name */}
                    <p className="font-display text-sm font-bold text-accent mb-1">
                      {testimonial.name}
                    </p>

                    {/* Verification */}
                    <p className="text-xs text-muted-foreground mb-4">
                      ✓ {testimonial.verification}
                    </p>

                    {/* Result Badge */}
                    <span className="inline-block text-xs font-semibold text-accent bg-accent/10 px-3 py-1.5 rounded">
                      {testimonial.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden md:flex bg-card shadow-medium"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden md:flex bg-card shadow-medium"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex ? 'bg-accent w-6' : 'bg-accent/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
