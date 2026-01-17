import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="py-28 md:py-36 bg-gradient-to-b from-secondary/50 via-background to-secondary/30 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 bg-accent/10 text-accent font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full text-xs mb-8">
              <HelpCircle className="w-4 h-4" />
              Got Questions?
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-5">
              Frequently Asked<br />
              <span className="text-accent">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to help you on your hair growth journey
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border/50 rounded-2xl px-6 shadow-soft hover:shadow-medium data-[state=open]:shadow-medium data-[state=open]:border-accent/20 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent py-6 [&[data-state=open]]:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed text-[15px]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-14 p-8 bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl border border-accent/20"
          >
            <MessageCircle className="w-10 h-10 text-accent mx-auto mb-4" />
            <p className="text-foreground font-semibold mb-2">Still have questions?</p>
            <a 
              href="mailto:support@veritescalp.com" 
              className="inline-flex items-center gap-2 text-accent hover:underline font-bold text-lg"
            >
              Contact us at support@veritescalp.com
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
