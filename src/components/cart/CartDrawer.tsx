import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  X,
  Clock,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const CART_TIMEOUT_SECONDS = 7 * 60; // 7 minutes

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(CART_TIMEOUT_SECONDS);
  const [cartStartTime, setCartStartTime] = useState<number | null>(null);

  const {
    items,
    isLoading,
    checkoutUrl,
    updateQuantity,
    removeItem,
    createCheckout,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Start/reset timer when items are added
  useEffect(() => {
    if (items.length > 0 && !cartStartTime) {
      setCartStartTime(Date.now());
      setTimeRemaining(CART_TIMEOUT_SECONDS);
    } else if (items.length === 0) {
      setCartStartTime(null);
      setTimeRemaining(CART_TIMEOUT_SECONDS);
    }
  }, [items.length, cartStartTime]);

  // Countdown timer
  useEffect(() => {
    if (!cartStartTime || items.length === 0) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - cartStartTime) / 1000);
      const remaining = Math.max(0, CART_TIMEOUT_SECONDS - elapsed);
      setTimeRemaining(remaining);

      if (remaining === 0) {
        clearCart();
        setCartStartTime(null);
        setIsOpen(false);
        toast.error("Cart expired", {
          description:
            "Your reserved items have been released due to inactivity. Add items again to continue shopping.",
          duration: 5000,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cartStartTime, items.length, clearCart]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const handleCheckout = async () => {
    // Open window synchronously to avoid pop-up blocker
    const windowRef = window.open("about:blank", "_blank");
    await createCheckout(windowRef);
    setCartStartTime(null); // Reset timer on checkout
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full pt-6 z-[9999]">
        <SheetHeader className="flex-shrink-0 pb-4 border-b">
          <SheetTitle className="font-display text-2xl">Shopping Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1">Add items to get started</p>
              </div>
            </div>
          ) : (
            <>
              {/* Scrollable items area */}
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-3 bg-secondary/50 rounded-lg">
                      <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.product.node.title}</h4>
                        {item.variantTitle !== "Default Title" && (
                          <p className="text-xs text-muted-foreground mt-1">{item.variantTitle}</p>
                        )}
                        <div className="mt-2">
                          <p className="font-semibold text-accent">${parseFloat(item.price.amount).toFixed(2)} each</p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                              ${(parseFloat(item.price.amount) * item.quantity).toFixed(2)} total
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed checkout section */}
              <div className="flex-shrink-0 space-y-3 pt-4 border-t mt-4">
                {/* Quantity Savings Notice */}
                {items.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 p-2 bg-accent/10 border border-accent/20 rounded-md"
                  >
                    <Sparkles className="h-3 w-3 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-foreground/70 leading-tight">
                      <span className="font-medium text-accent">Bundle savings!</span> Additional discounts may apply at
                      checkout based on your order quantityand bundle selected.
                    </p>
                  </motion.div>
                )}

                {/* Urgency Timer */}
                <AnimatePresence>
                  {items.length > 0 && timeRemaining > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`relative overflow-hidden rounded-md p-2 ${
                        timeRemaining <= 60
                          ? "bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30"
                          : timeRemaining <= 180
                            ? "bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30"
                            : "bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20"
                      }`}
                    >
                      {/* Animated background pulse for urgency */}
                      {timeRemaining <= 120 && (
                        <motion.div
                          className="absolute inset-0 bg-red-500/5"
                          animate={{ opacity: [0, 0.3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}

                      <div className="relative flex items-center gap-2">
                        <div
                          className={`flex items-center justify-center w-7 h-7 rounded-full ${
                            timeRemaining <= 60
                              ? "bg-red-500/20"
                              : timeRemaining <= 180
                                ? "bg-amber-500/20"
                                : "bg-primary/10"
                          }`}
                        >
                          <Clock
                            className={`h-3.5 w-3.5 ${
                              timeRemaining <= 60
                                ? "text-red-500"
                                : timeRemaining <= 180
                                  ? "text-amber-500"
                                  : "text-primary"
                            }`}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`font-mono text-sm font-bold ${
                                timeRemaining <= 60
                                  ? "text-red-500"
                                  : timeRemaining <= 180
                                    ? "text-amber-600"
                                    : "text-foreground"
                              }`}
                            >
                              {formatTime(timeRemaining)}
                            </span>
                            {timeRemaining <= 120 && <AlertTriangle className="h-3 w-3 text-red-500 animate-pulse" />}
                          </div>
                          <p className="text-[10px] text-muted-foreground leading-tight">
                            {timeRemaining <= 60
                              ? "Hurry! Cart expires soon"
                              : timeRemaining <= 180
                                ? "Items in high demand"
                                : "Items reserved for limited time"}
                          </p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-1.5 h-0.5 bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${
                            timeRemaining <= 60 ? "bg-red-500" : timeRemaining <= 180 ? "bg-amber-500" : "bg-primary"
                          }`}
                          initial={{ width: "100%" }}
                          animate={{ width: `${(timeRemaining / CART_TIMEOUT_SECONDS) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between items-center">
                  <span className="text-base font-medium">Subtotal</span>
                  <span className="text-xl font-bold font-display">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Shipping & taxes calculated at checkout</p>

                <Button
                  onClick={handleCheckout}
                  variant="cta"
                  className="w-full"
                  size="xl"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating Checkout...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Checkout
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
