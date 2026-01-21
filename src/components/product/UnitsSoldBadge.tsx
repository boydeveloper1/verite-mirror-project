import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface UnitsSoldBadgeProps {
  productHandle?: string;
}

// Generate consistent sales count based on product handle
const getSalesCount = (handle: string = "default"): number => {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    hash = ((hash << 7) - hash) + handle.charCodeAt(i);
    hash |= 0;
  }
  // Return a number between 8000 and 15000
  return Math.abs(hash % 7000) + 8000;
};

export const UnitsSoldBadge = ({ productHandle }: UnitsSoldBadgeProps) => {
  const salesCount = getSalesCount(productHandle);
  const formattedCount = salesCount.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm font-medium"
    >
      <TrendingUp className="w-4 h-4" />
      <span>{formattedCount}+ bottles sold</span>
    </motion.div>
  );
};
