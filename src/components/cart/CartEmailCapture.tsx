import { useState, useEffect } from "react";
import { Mail, X, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCartStore } from "@/stores/cartStore";

export const CartEmailCapture = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    // Show modal when first item is added and we haven't captured email yet
    const hasShownCapture = localStorage.getItem("cart_email_captured");
    const storedEmail = localStorage.getItem("cart_email");
    
    if (items.length === 1 && !hasShownCapture && !storedEmail) {
      // Delay to let cart animation complete
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [items.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Get session ID
      let sessionId = localStorage.getItem("cart_session_id");
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem("cart_session_id", sessionId);
      }

      // Save to abandoned_carts table
      const { error } = await supabase
        .from("abandoned_carts")
        .insert({
          session_id: sessionId,
          email: email,
          cart_items: items as unknown as Record<string, unknown>[],
          total_value: items.reduce(
            (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
            0
          ),
          currency: items[0]?.price.currencyCode || "USD",
        } as never);

      if (error && !error.message.includes('duplicate')) throw error;

      localStorage.setItem("cart_email", email);
      localStorage.setItem("cart_email_captured", "true");

      toast.success("Great! We'll save your cart.", {
        description: "Check your email for exclusive offers!",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Cart email capture error:", error);
      // Still save locally even if DB fails
      localStorage.setItem("cart_email", email);
      localStorage.setItem("cart_email_captured", "true");
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("cart_email_captured", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-scale-in">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3"
          onClick={handleSkip}
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
          <ShoppingBag className="w-8 h-8 text-accent" />
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3" />
            Don't Lose Your Cart
          </span>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Save Your Items & Get 10% Off!
          </h3>
          <p className="text-muted-foreground text-sm">
            Enter your email to save your cart and receive exclusive offers. 
            We'll remind you if you forget to complete your order.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11 h-12"
              disabled={isLoading}
              autoFocus
            />
          </div>
          <Button
            type="submit"
            variant="cta"
            className="w-full h-12"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save My Cart & Get 10% Off"}
          </Button>
        </form>

        {/* Skip Link */}
        <button
          onClick={handleSkip}
          className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          No thanks, continue shopping
        </button>

        {/* Privacy Note */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};
