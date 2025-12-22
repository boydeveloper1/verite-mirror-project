import { Flame, Droplets, XCircle } from "lucide-react";

const problems = [
  {
    icon: Flame,
    title: "Inflammation Blocks Everything",
    description: "Tight braids, wigs, stress, and buildup trigger scalp inflammation. When inflamed, your scalp can't absorb nutrients or support growth.",
  },
  {
    icon: Droplets,
    title: "Your Follicles Shut Down",
    description: "Inflammation puts hair in 'survival mode.' Instead of growing, your hair sheds, breaks, and thins. This is a biological response.",
  },
  {
    icon: XCircle,
    title: "Nothing Topical Works",
    description: "You can apply expensive growth serums and oils all day. Without fixing inflammation, they're wasted money. They can't penetrate a stressed scalp.",
  },
];

export const ProblemSection = () => {
  return (
    <section className="py-20 md:py-28 bg-cream-gradient">
      <div className="container mx-auto px-4 md:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20 animate-fade-in-up">
          <span className="inline-block text-accent font-semibold uppercase tracking-wider mb-4">The Root Cause</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Why Your Growth Products Failed
          </h2>
          <p className="text-lg text-muted-foreground">
            It's not your fault. It's not the products either. It's your scalp.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2 border border-border/50 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                <problem.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                {problem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
