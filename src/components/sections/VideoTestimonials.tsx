import { useState } from "react";
import { Play, X, Star, BadgeCheck } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    age: 42,
    location: "Austin, TX",
    condition: "Eczema for 15 years",
    quote: "I spent thousands on creams that never worked. Two weeks with this shower head and my skin finally stopped itching.",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    name: "Michael R.",
    age: 38,
    location: "Denver, CO",
    condition: "Psoriasis patches",
    quote: "My dermatologist was shocked at my improvement. The filtered water made more difference than any prescription.",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    name: "Jennifer L.",
    age: 29,
    location: "Miami, FL",
    condition: "Adult acne & rosacea",
    quote: "I never realized my water was the problem. My redness cleared up in just 3 weeks!",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState<typeof testimonials[0] | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-4 py-2 rounded-full mb-4">
            <Play className="w-3 h-3" />
            Real Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Hear From Our <span className="text-accent">Community</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real customers sharing their skin transformation journeys after switching to filtered water.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => setSelectedVideo(testimonial)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={testimonial.thumbnail}
                  alt={`${testimonial.name}'s testimonial`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-7 h-7 text-accent-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
                {/* Condition Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {testimonial.condition}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="font-semibold text-foreground flex items-center gap-1.5 text-sm">
                      {testimonial.name}, {testimonial.age}
                      <BadgeCheck className="w-4 h-4 text-accent" />
                    </p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-primary">
          <VisuallyHidden>
            <DialogTitle>
              {selectedVideo?.name}'s Testimonial Video
            </DialogTitle>
          </VisuallyHidden>
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/90 flex items-center justify-center hover:bg-card transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
          {selectedVideo && (
            <div className="aspect-video">
              <iframe
                src={`${selectedVideo.videoUrl}?autoplay=1`}
                title={`${selectedVideo.name}'s testimonial`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
