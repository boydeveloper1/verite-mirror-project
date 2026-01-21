import { Flame, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface LowStockIndicatorProps {
  productHandle?: string;
}

// Generate consistent "stock" number based on product handle
const getStockCount = (handle: string = "default"): number => {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    hash = ((hash << 5) - hash) + handle.charCodeAt(i);
    hash |= 0;
  }
  // Return a number between 3 and 12
  return Math.abs(hash % 10) + 3;
};

// Generate consistent "viewers" count
const getViewersCount = (handle: string = "default"): number => {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    hash = ((hash << 3) + hash) + handle.charCodeAt(i);
    hash |= 0;
  }
  // Return a number between 8 and 24
  return Math.abs(hash % 17) + 8;
};

export const LowStockIndicator = ({ productHandle }: LowStockIndicatorProps) => {
  const stockCount = getStockCount(productHandle);
  const viewersCount = getViewersCount(productHandle);

  return (
    <div className="space-y-2">
      {/* Low Stock Warning */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-sm"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Flame className="w-4 h-4 text-orange-500" />
        </motion.div>
        <span className="font-medium text-orange-600">
          Only {stockCount} left in stock
        </span>
        <span className="text-muted-foreground">— Order soon!</span>
      </motion.div>

      {/* People Viewing */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Eye className="w-4 h-4" />
        </motion.div>
        <span>
          <span className="font-medium text-foreground">{viewersCount} people</span>
          {" "}viewing this right now
        </span>
      </motion.div>
    </div>
  );
};
