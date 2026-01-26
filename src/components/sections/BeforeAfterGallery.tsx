import { useState, useRef } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import eczemaImage from "@/assets/testimonials/eczema-arm.png";
import rosaceaImage from "@/assets/testimonials/rosacea-face.png";
import psoriasisImage from "@/assets/testimonials/psoriasis-elbow.png";
import backAcneImage from "@/assets/testimonials/back-acne.png";
import sensitiveSkinImage from "@/assets/testimonials/sensitive-skin.png";

interface Transformation {
  id: number;
  name: string;
  condition: string;
  duration: string;
  image: string;
}

const transformations: Transformation[] = [
  { id: 1, name: "Rachel T.", condition: "Eczema", duration: "4 weeks", image: eczemaImage },
  { id: 2, name: "David M.", condition: "Rosacea", duration: "6 weeks", image: rosaceaImage },
  { id: 3, name: "Karen S.", condition: "Psoriasis", duration: "8 weeks", image: psoriasisImage },
  { id: 4, name: "James L.", condition: "Back Acne", duration: "3 weeks", image: backAcneImage },
  { id: 5, name: "Amanda K.", condition: "Sensitive Skin", duration: "2 weeks", image: sensitiveSkinImage },
];

const BeforeAfterSlider = ({ transformation }: { transformation: Transformation }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize select-none"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image (Full) */}
      <img
        src={transformation.image}
        alt={`${transformation.name} transformation`}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0.7) brightness(0.9)" }}
      />

      {/* After Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={transformation.image}
          alt={`${transformation.name} after`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(1.1) brightness(1.05)" }}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-primary absolute -left-0.5" />
          <ChevronRight className="w-4 h-4 text-primary absolute -right-0.5" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex pointer-events-none">
        <div 
          className="py-2 px-4 bg-gradient-to-t from-red-900/80 to-transparent"
          style={{ width: `${sliderPosition}%` }}
        >
          <span className="text-white text-xs font-bold uppercase tracking-wider">Before</span>
        </div>
        <div 
          className="py-2 px-4 bg-gradient-to-t from-emerald-900/80 to-transparent text-right flex-1"
        >
          <span className="text-white text-xs font-bold uppercase tracking-wider">After</span>
        </div>
      </div>

      {/* Duration Badge */}
      <div className="absolute top-3 right-3">
        <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          {transformation.duration}
        </span>
      </div>
    </div>
  );
};

export const BeforeAfterGallery = () => {
  const [sectionRef, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % transformations.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-muted/30 via-background to-muted/30"
    >
      <div className="container mx-auto px-4 md:px-10">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-3 h-3" />
            Visual Proof
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Real <span className="text-accent">Transformations</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Drag the slider to see the difference filtered water makes. These are real results from real customers.
          </p>
        </div>

        {/* Main Slider */}
        <div className={`max-w-2xl mx-auto transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <BeforeAfterSlider transformation={transformations[activeIndex]} />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow-lg"
              aria-label="Previous transformation"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow-lg"
              aria-label="Next transformation"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Customer Info */}
          <div className="mt-6 text-center">
            <p className="font-semibold text-foreground text-lg">
              {transformations[activeIndex].name}
            </p>
            <p className="text-accent font-medium">
              {transformations[activeIndex].condition} • {transformations[activeIndex].duration}
            </p>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-3 mt-6">
            {transformations.map((t, index) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(index)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === activeIndex 
                    ? 'border-accent shadow-lg scale-110' 
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={t.image}
                  alt={t.condition}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
