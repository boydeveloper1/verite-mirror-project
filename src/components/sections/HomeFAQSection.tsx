import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the shower filter help with skin conditions?",
    answer:
      "Our 15-stage filtration removes chlorine, heavy metals, and hard water minerals that damage your skin barrier and trigger inflammation. By eliminating these irritants at the source, many customers with eczema, psoriasis, and rosacea report significant improvement within 2-4 weeks.",
  },
  {
    question: "Will this work with my shower?",
    answer:
      "Yes! Our shower head features a universal fit that works with virtually all standard shower pipes. Installation takes just 2-5 minutes with no tools required. Simply unscrew your existing shower head and screw on the Verité filter.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5-7 business days within the US. Express shipping (2-3 business days) is also available at checkout. International shipping typically takes 10-14 business days depending on your location.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes! We ship to most countries worldwide with FREE shipping. International delivery times vary by location. You can see the exact delivery estimate at checkout.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day money-back guarantee on all products. If you're not completely satisfied with your results, simply contact us for a full refund. No questions asked.",
  },
  {
    question: "How often do I need to replace the filter?",
    answer:
      "For optimal performance, we recommend replacing the filter cartridge every 3-6 months depending on your water quality and usage. Replacement cartridges are available in our store.",
  },
  {
    question: "Is the shower head safe for sensitive skin?",
    answer:
      "Absolutely! Our shower filter is specifically designed for sensitive skin. By removing chlorine and harsh minerals, it actually helps protect and heal sensitive skin rather than irritate it.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach us via email at support@veritescalp.com or through our Contact page. Our team typically responds within 24 hours on business days. We're here to help with any questions or concerns!",
  },
];

export const HomeFAQSection = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <span className="inline-block bg-accent/10 text-accent font-semibold uppercase tracking-wider px-4 py-2 rounded-full text-sm mb-6">
              Got Questions?
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">Quick answers to help you on your skin health journey</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-2xl px-6 shadow-soft data-[state=open]:shadow-medium transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5 [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12 animate-fade-in-up">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <a
              href="mailto:support@veritescalp.com"
              className="inline-flex items-center gap-2 text-accent hover:underline font-semibold"
            >
              Contact us at support@veritescalp.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
