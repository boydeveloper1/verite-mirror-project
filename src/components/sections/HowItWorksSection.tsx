import timelineImg from "@/assets/timeline-recovery.png";

const stages = [
  {
    week: "Week 1-2",
    title: "Inflammation Reduces",
    description: "Itching stops. Scalp feels calm. Tenderness from braids/wigs relief.",
  },
  {
    week: "Week 2-4",
    title: "Shedding Drops 70%",
    description: "Brush has significantly less hair. Shedding becomes almost unnoticeable.",
  },
  {
    week: "Week 4-6",
    title: "Baby Hairs Appear",
    description: "First visible signs of growth. Baby hairs along edges and hairline.",
  },
  {
    week: "Week 6-8",
    title: "Full Edge Recovery",
    description: "Edges are back. Healthy scalp. Regained confidence. Ready to style freely.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            See Real Results in 8 Weeks
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Realistic timeline. Real before/after. Real women.
          </p>
        </div>

        {/* Timeline Image */}
        <div className="max-w-4xl mx-auto mb-16">
          <img 
            src={timelineImg} 
            alt="8 weeks to edge recovery timeline showing week 0, week 4, and week 8 progress"
            className="w-full rounded-xl shadow-medium"
          />
        </div>

        {/* Timeline Stages */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stages.map((stage, index) => (
            <div 
              key={index}
              className="relative bg-card p-6 rounded-lg shadow-soft"
            >
              {/* Connector Line (hidden on mobile, visible on desktop) */}
              {index < stages.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30" />
              )}

              {/* Week Number */}
              <span className="text-lg font-bold text-accent mb-2 block">
                {stage.week}
              </span>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-primary mb-3">
                {stage.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
