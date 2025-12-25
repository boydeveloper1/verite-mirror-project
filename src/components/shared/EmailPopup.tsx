import { useState, useEffect } from "react";
import { X, Mail, Gift, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const POPUP_SHOWN_KEY = "verite_email_popup_shown";

export const EmailPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const wasShown = sessionStorage.getItem(POPUP_SHOWN_KEY);
    if (wasShown) return;

    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem(POPUP_SHOWN_KEY, "true");
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

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
      setIsVisible(false);
    } catch (error) {
      console.error("Newsletter signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Popup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden border border-border"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent" />
            
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Content */}
            <div className="relative p-8 text-center">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/30">
                <Gift className="w-10 h-10 text-accent-foreground" />
              </div>

              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3 h-3" />
                Exclusive Offer
              </span>

              {/* Heading */}
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-3">
                Join the VERITÉ SCALP Family
              </h2>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Subscribe for exclusive updates, scalp care tips, and be the first to know about new products and special offers!
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 text-base"
                    disabled={isLoading}
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="cta" 
                  className="w-full h-12 text-base font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe Now"
                  )}
                </Button>
              </form>

              {/* Privacy note */}
              <p className="text-xs text-muted-foreground mt-4">
                By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
