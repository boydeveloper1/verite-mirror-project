import { useState } from "react";
import { Mail, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const PreFooterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-newsletter-email", {
        body: { email }
      });

      if (error) throw error;

      toast.success("Welcome to the VERITÉ SCALP family!", {
        description: "Check your inbox for exclusive offers."
      });
      setEmail("");
    } catch (error) {
      console.error("Newsletter signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-t from-primary/10 via-accent/5 to-secondary">
      <div className="container mx-auto px-4 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
            <Mail className="w-8 h-8 text-accent" />
          </div>

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3" />
            Join Our Community
          </span>

          {/* Heading */}
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            Subscribe for Exclusive Offers
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Be the first to know about new products, special discounts, and expert scalp care tips. 
            Plus, get <strong className="text-foreground">15% off</strong> your first order!
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-12 text-base bg-background"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              variant="cta" 
              size="lg"
              className="h-12 px-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Privacy note */}
          <p className="text-xs text-muted-foreground mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
