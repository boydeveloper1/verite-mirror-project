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
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/50">
      <div className="container mx-auto px-4 md:px-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-wider text-xs mb-4">
              <HelpCircle className="w-4 h-4" />
              Got Questions?
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about ordering, shipping, and our products.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="border border-border rounded-xl px-6 bg-background shadow-soft data-[state=open]:shadow-medium transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
