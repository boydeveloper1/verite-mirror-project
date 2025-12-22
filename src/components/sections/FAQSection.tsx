import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How fast will I see results?",
    answer: "Most customers see reduced shedding in 2-3 weeks and visible baby hairs by week 4-6. Full edge recovery typically takes 8 weeks. Individual results vary based on damage severity.",
  },
  {
    question: "Will this work under wigs and braids?",
    answer: "Yes! This is specifically designed for wig wearers and protective style users. Spray it before your wig goes on in the morning. Midday, if you feel itching, take your wig off, spray again. It creates a protective barrier against friction and irritation.",
  },
  {
    question: "Is it greasy or will it leave buildup?",
    answer: "No. The mist is lightweight and absorbs quickly. It won't make your hair greasy or create product buildup. It's designed to refresh your scalp throughout the day without heaviness.",
  },
  {
    question: "What if I've already lost significant edges?",
    answer: "Damaged follicles can take longer to reactivate, but many women with severe edge loss see recovery starting at week 6-8. Consistency is key—use twice daily for best results. We offer a 30-day guarantee, so you can try risk-free.",
  },
  {
    question: "Can I use this with other products?",
    answer: "Absolutely. Use this as your scalp foundation, then apply other hair products as normal. It actually makes your other products more effective because your scalp is healthy and can absorb nutrients.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-10 max-w-3xl">
        <div className="text-center mb-14 animate-fade-in-up">
          <span className="inline-block text-accent font-semibold uppercase tracking-wider mb-4">FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Quick Answers to Your Questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border-none animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <AccordionTrigger className="bg-secondary hover:bg-secondary/80 px-6 py-5 rounded-xl text-left font-body text-base font-semibold text-foreground hover:no-underline [&[data-state=open]]:rounded-b-none transition-all duration-300">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="bg-card px-6 py-5 rounded-b-xl border border-t-0 border-border text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
