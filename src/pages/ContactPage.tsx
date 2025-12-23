import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import productBanner from "@/assets/product-banner.jpg";

// Use environment variable for Supabase URL
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://rowoikhsitctahecnrdp.supabase.co";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const endpoint = `${SUPABASE_URL}/functions/v1/send-contact-email`;
    console.log("[ContactPage] Starting submission...");
    console.log("[ContactPage] Endpoint:", endpoint);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      console.log("[ContactPage] Response status:", response.status);

      const responseText = await response.text();
      console.log("[ContactPage] Response text:", responseText);

      let data = {};
      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("[ContactPage] JSON parse error:", parseError);
        }
      }

      if (!response.ok) {
        throw new Error((data as any).error || `HTTP error ${response.status}`);
      }

      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24-48 hours."
      });

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("[ContactPage] Error:", error);
      toast.error("Failed to send message", {
        description: error.message || "Please try again or email us directly at support@veritescalp.com"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PageHeroBanner
        title="Contact Us"
        subtitle="We're here to help you on your hair growth journey"
        breadcrumbs={[{ label: "Contact" }]}
        backgroundImage={productBanner}
      />
      
      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-secondary/30 rounded-2xl p-6 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Email Us</h3>
                <p className="text-primary font-medium">support@veritescalp.com</p>
                <p className="text-sm text-muted-foreground mt-2">We respond within 24-48 hours</p>
              </div>

              <div className="bg-secondary/30 rounded-2xl p-6 animate-fade-in [animation-delay:100ms]">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Call Us</h3>
                <p className="text-primary font-medium">+1 (800) 555-SCALP</p>
                <p className="text-sm text-muted-foreground mt-2">Mon-Fri, 9am-5pm EST</p>
              </div>

              <div className="bg-secondary/30 rounded-2xl p-6 animate-fade-in [animation-delay:200ms]">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
                <p className="text-foreground">Atlanta, Georgia</p>
                <p className="text-sm text-muted-foreground mt-2">Shipping worldwide</p>
              </div>

              <div className="bg-secondary/30 rounded-2xl p-6 animate-fade-in [animation-delay:300ms]">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Business Hours</h3>
                <p className="text-foreground">Monday - Friday</p>
                <p className="text-sm text-muted-foreground">9:00 AM - 5:00 PM EST</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-background rounded-2xl p-6 md:p-10 shadow-soft border border-border/50 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground">Send Us a Message</h2>
                    <p className="text-muted-foreground text-sm">Fill out the form below and we'll get back to you soon</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your hair care concerns, questions about our products, or anything else you'd like to share..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
