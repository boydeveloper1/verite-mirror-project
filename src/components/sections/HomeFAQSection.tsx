import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Simply browse our products, add items to your cart, and proceed to checkout. We accept all major credit cards, PayPal, and Shop Pay for a seamless checkout experience. You'll receive an order confirmation email immediately after purchase."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, American Express, Discover, PayPal, Shop Pay, Apple Pay, and Google Pay. All transactions are secured with SSL encryption to protect your information."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days within the US. Express shipping (2-3 business days) is also available at checkout. International shipping typically takes 10-14 business days depending on your location."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes! We ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see the exact shipping cost at checkout before completing your order."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day money-back guarantee on all products. If you're not completely satisfied, simply contact us for a full refund. No questions asked. See our full refund policy for details."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive an email with a tracking number and link. You can track your package in real-time from our website or directly through the carrier's website."
  },
  {
    question: "Are your products safe for sensitive scalps?",
    answer: "Yes! All our products are dermatologist-formulated and clinically tested. We use only natural, clean ingredients without harsh chemicals, parabens, or sulfates. They're specifically designed for sensitive scalps."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach us via email at veritescalp@gmail.com or through our Contact page. Our team typically responds within 24 hours on business days. We're here to help with any questions or concerns!"
  }
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
            <p className="text-muted-foreground">
              Quick answers to help you on your hair growth journey
            </p>
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
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
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
