import { useState, useEffect } from "react";
import { X, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SaleBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem("saleBannerDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Calculate time until midnight UTC (resets daily)
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setUTCHours(24, 0, 0, 0);
      
      const diff = midnight.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return { hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("saleBannerDismissed", "true");
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-accent via-accent/90 to-accent text-accent-foreground py-2 px-4 relative overflow-hidden">
      {/* Animated background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      
      <div className="container mx-auto flex items-center justify-center gap-3 relative">
        <Zap className="w-4 h-4 animate-pulse" />
        
        <span className="text-sm font-semibold tracking-wide hidden sm:inline">
          FLASH SALE: 30% OFF
        </span>
        <span className="text-sm font-semibold tracking-wide sm:hidden">
          30% OFF
        </span>
        
        <div className="flex items-center gap-1 bg-background/20 rounded-md px-2 py-1">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-mono text-sm font-bold">
            {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
          </span>
        </div>
        
        <span className="text-sm font-medium hidden md:inline">
          — Don't miss out!
        </span>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-accent-foreground/80 hover:text-accent-foreground hover:bg-accent-foreground/10"
          onClick={handleDismiss}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
