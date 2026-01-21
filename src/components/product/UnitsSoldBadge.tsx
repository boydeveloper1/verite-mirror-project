import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Eye } from "lucide-react";

interface UnitsSoldBadgeProps {
  productHandle?: string;
}

// Generate consistent base sales count based on product handle
const getBaseSalesCount = (handle: string = "default"): number => {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    hash = ((hash << 7) - hash) + handle.charCodeAt(i);
    hash |= 0;
  }
  // Return a number between 8000 and 15000
  return Math.abs(hash % 7000) + 8000;
};

// Generate consistent base viewers count based on product handle
const getBaseViewersCount = (handle: string = "default"): number => {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    hash = ((hash << 5) - hash) + handle.charCodeAt(i);
    hash |= 0;
  }
  // Return a number between 18 and 28
  return Math.abs(hash % 10) + 18;
};

export const UnitsSoldBadge = ({ productHandle }: UnitsSoldBadgeProps) => {
  const baseSales = useRef(getBaseSalesCount(productHandle));
  const baseViewers = useRef(getBaseViewersCount(productHandle));
  
  const [salesCount, setSalesCount] = useState(baseSales.current);
  const [viewersCount, setViewersCount] = useState(baseViewers.current);

  // Increment sales count periodically
  useEffect(() => {
    const incrementSales = () => {
      const increment = Math.floor(Math.random() * 3) + 1; // 1-3
      setSalesCount(prev => prev + increment);
      
      // Schedule next increment (30-60 seconds)
      const nextDelay = 30000 + Math.random() * 30000;
      setTimeout(incrementSales, nextDelay);
    };

    // Initial delay before first increment (10-20 seconds)
    const initialDelay = 10000 + Math.random() * 10000;
    const timeout = setTimeout(incrementSales, initialDelay);

    return () => clearTimeout(timeout);
  }, []);

  // Fluctuate viewers count in real-time
  useEffect(() => {
    const fluctuateViewers = () => {
      setViewersCount(prev => {
        // Random change between -2 and +3
        const change = Math.floor(Math.random() * 6) - 2;
        const newCount = prev + change;
        // Keep within reasonable bounds (12-35)
        return Math.max(12, Math.min(35, newCount));
      });
    };

    // Fluctuate every 5-10 seconds
    const interval = setInterval(fluctuateViewers, 5000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []);

  const formattedSalesCount = salesCount.toLocaleString();

  return (
    <div className="space-y-2">
      {/* Bottles Sold Counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm font-medium"
      >
        <TrendingUp className="w-4 h-4" />
        <span>{formattedSalesCount}+ bottles sold</span>
      </motion.div>

      {/* People Viewing Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 bg-violet-50 px-3 py-1.5 rounded-full text-sm"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Eye className="w-4 h-4 text-violet-600" />
        </motion.div>
        <span className="text-violet-700">
          <span className="font-bold text-violet-800">{viewersCount}</span> people viewing this right now
        </span>
      </motion.div>
    </div>
  );
};
