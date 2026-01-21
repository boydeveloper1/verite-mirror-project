import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface LowStockIndicatorProps {
  productHandle?: string;
}

// Generate consistent stock count based on product handle
const getStockCount = (handle: string = "default"): number => {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    hash = ((hash << 5) - hash) + handle.charCodeAt(i);
    hash |= 0;
  }
  // Return a number between 3 and 12
  return Math.abs(hash % 10) + 3;
};

export const LowStockIndicator = ({ productHandle }: LowStockIndicatorProps) => {
  const stockCount = getStockCount(productHandle);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 text-sm"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Flame className="w-4 h-4 text-orange-500" />
      </motion.div>
      <span className="font-medium text-orange-600">
        Only {stockCount} left in stock
      </span>
      <span className="text-muted-foreground">— Order soon!</span>
    </motion.div>
  );
};
