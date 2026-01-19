import { useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCartStore } from "@/stores/cartStore";

export const useAbandonedCartTracker = () => {
  const items = useCartStore((state) => state.items);

  const syncCartToDatabase = useCallback(async () => {
    if (items.length === 0) return;

    let sessionId = localStorage.getItem("cart_session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("cart_session_id", sessionId);
    }

    const email = localStorage.getItem("cart_email");
    const totalValue = items.reduce(
      (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
      0
    );

    try {
      await supabase.from("abandoned_carts").insert(
        {
          session_id: sessionId,
          email: email || null,
          cart_items: items as unknown as Record<string, unknown>[],
          total_value: totalValue,
          currency: items[0]?.price.currencyCode || "USD",
        } as never
      );
    } catch (error) {
      console.error("Failed to sync cart:", error);
    }
  }, [items]);

  // Sync cart on changes (debounced)
  useEffect(() => {
    if (items.length === 0) return;

    const timer = setTimeout(() => {
      syncCartToDatabase();
    }, 2000);

    return () => clearTimeout(timer);
  }, [items, syncCartToDatabase]);

  // Sync cart when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (items.length === 0) return;

      let sessionId = localStorage.getItem("cart_session_id");
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem("cart_session_id", sessionId);
      }

      const email = localStorage.getItem("cart_email");
      const totalValue = items.reduce(
        (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
        0
      );

      // Use sendBeacon for reliable data transmission on page unload
      const data = {
        session_id: sessionId,
        email: email || null,
        cart_items: items,
        total_value: totalValue,
        currency: items[0]?.price.currencyCode || "USD",
      };

      // Store in localStorage as backup
      localStorage.setItem("pending_cart_sync", JSON.stringify(data));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [items]);

  // Sync any pending cart data on page load
  useEffect(() => {
    const pendingSync = localStorage.getItem("pending_cart_sync");
    if (pendingSync) {
      try {
        const data = JSON.parse(pendingSync);
        supabase
          .from("abandoned_carts")
          .insert(data as never)
          .then(() => {
            localStorage.removeItem("pending_cart_sync");
          });
      } catch (error) {
        console.error("Failed to sync pending cart:", error);
        localStorage.removeItem("pending_cart_sync");
      }
    }
  }, []);

  // Mark cart as completed when checkout URL is visited
  const markCheckoutStarted = useCallback(async () => {
    const sessionId = localStorage.getItem("cart_session_id");
    if (!sessionId) return;

    try {
      await supabase
        .from("abandoned_carts")
        .update({ checkout_completed: true })
        .eq("session_id", sessionId);
    } catch (error) {
      console.error("Failed to mark checkout started:", error);
    }
  }, []);

  return { syncCartToDatabase, markCheckoutStarted };
};
