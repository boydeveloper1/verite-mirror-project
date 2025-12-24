import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Mail, MessageSquare } from "lucide-react";

// Use environment variable for Supabase URL
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://rowoikhsitctahecnrdp.supabase.co";

export const HomeContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const endpoint = `${SUPABASE_URL}/functions/v1/send-contact-email`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const responseText = await response.text();
      let data = {};
      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          // Silent parse error
        }
      }

      if (!response.ok) {
        throw new Error((data as any).error || `HTTP error ${response.status}`);
      }

      toast.success("Thank you for reaching out!", {
        description: "We've received your message and will respond within 24-48 hours.",
        position: "top-center",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast.error("Unable to send message", {
        description: "Please try again or email us at support@veritescalp.com",
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-secondary via-muted/20 to-background">
      <div className="container mx-auto px-4 md:px-10">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
            <MessageSquare className="w-4 h-4" />
            GET IN TOUCH
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Have Questions?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            We're here to help. Send us a message and our team will get back to you within 24-48 hours.
          </p>
        </div>

        <div className="max-w-xl mx-auto animate-fade-in-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="home-name" className="block text-xs font-semibold uppercase tracking-wide text-foreground mb-2">
                  Your Name
                </label>
                <Input
                  id="home-name"
                  type="text"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12 bg-background border-border focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="home-email" className="block text-xs font-semibold uppercase tracking-wide text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  id="home-email"
                  type="email"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12 bg-background border-border focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="home-message" className="block text-xs font-semibold uppercase tracking-wide text-foreground mb-2">
                Your Message
              </label>
              <Textarea
                id="home-message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="bg-background border-border focus:border-accent resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="cta"
              size="lg"
              className="w-full h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground mb-2">Or reach us directly at</p>
            <a 
              href="mailto:support@veritescalp.com" 
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              <Mail className="w-4 h-4" />
              support@veritescalp.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
