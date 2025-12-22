import { cn } from "@/lib/utils";
import { Star, Package } from "lucide-react";
import { motion } from "framer-motion";

export interface BundleOption {
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  savings: number;
  savingsPercent: number;
  label?: string;
  badge?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
}

interface BundleSelectorProps {
  bundles: BundleOption[];
  selectedBundle: BundleOption;
  onBundleSelect: (bundle: BundleOption) => void;
  unitLabel?: string;
}

export const createBundles = (basePrice: number, productType: 'mist' | 'showerhead' = 'mist'): BundleOption[] => {
  if (productType === 'showerhead') {
    return [
      { quantity: 1, pricePerUnit: basePrice, totalPrice: basePrice, savings: 0, savingsPercent: 0, label: "Single Unit" },
      { quantity: 2, pricePerUnit: basePrice * 0.95, totalPrice: basePrice * 1.9, savings: basePrice * 0.1, savingsPercent: 5, isPopular: true, label: "His & Hers", badge: `Save $${(basePrice * 0.1).toFixed(0)}` },
      { quantity: 3, pricePerUnit: basePrice * 0.9, totalPrice: basePrice * 2.7, savings: basePrice * 0.3, savingsPercent: 10, isBestValue: true, label: "Family Pack", badge: `Save $${(basePrice * 0.3).toFixed(0)}` },
    ];
  }
  
  return [
    { quantity: 1, pricePerUnit: basePrice, totalPrice: basePrice, savings: 0, savingsPercent: 0, label: "Starter" },
    { quantity: 2, pricePerUnit: basePrice * 0.95, totalPrice: basePrice * 1.9, savings: basePrice * 0.1, savingsPercent: 5, isPopular: true, label: "Growth Duo", badge: `Save $${(basePrice * 0.1).toFixed(0)}` },
    { quantity: 3, pricePerUnit: basePrice * 0.9, totalPrice: basePrice * 2.7, savings: basePrice * 0.3, savingsPercent: 10, isBestValue: true, label: "Full Treatment", badge: `Save $${(basePrice * 0.3).toFixed(0)}` },
    { quantity: 4, pricePerUnit: basePrice * 0.85, totalPrice: basePrice * 3.4, savings: basePrice * 0.6, savingsPercent: 15, label: "Best for Routine", badge: `Save $${(basePrice * 0.6).toFixed(0)}` },
  ];
};

export const defaultBundles: BundleOption[] = createBundles(40, 'mist');
export const showerFilterBundles: BundleOption[] = createBundles(105, 'showerhead');

export const BundleSelector = ({
  bundles = defaultBundles,
  selectedBundle,
  onBundleSelect,
  unitLabel = "Unit",
}: BundleSelectorProps) => {
  return (
    <div className="space-y-2 md:space-y-3">
      <h4 className="text-[10px] md:text-xs font-semibold text-foreground uppercase tracking-wide">
        Save When You Buy in Bulk
      </h4>
      <div className="space-y-2 md:space-y-3">
        {bundles.map((bundle, index) => {
          const isSelected = selectedBundle.quantity === bundle.quantity;
          
          return (
            <motion.button
              key={bundle.quantity}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onBundleSelect(bundle)}
              className={cn(
                "w-full flex items-center justify-between p-3 md:p-4 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden",
                isSelected
                  ? "border-accent bg-gradient-to-r from-accent/10 to-accent/5 shadow-lg shadow-accent/10"
                  : "border-border bg-secondary/30 hover:border-accent/50 hover:bg-secondary/50 hover:shadow-md"
              )}
            >
              {/* Quantity Badge */}
              <div className={cn(
                "absolute -top-1 -left-1 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-br-2xl font-bold text-sm md:text-base transition-all duration-300",
                isSelected 
                  ? "bg-accent text-white" 
                  : "bg-muted text-muted-foreground"
              )}>
                {bundle.quantity}x
              </div>

              <div className="flex items-center gap-2 md:gap-3 ml-10 md:ml-12">
                {/* Radio indicator */}
                <div
                  className={cn(
                    "w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300",
                    isSelected ? "border-accent bg-accent/10" : "border-border"
                  )}
                >
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-accent" 
                    />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                    <span className="text-sm md:text-base font-bold text-foreground">
                      {bundle.label}
                    </span>
                    {bundle.isPopular && (
                      <motion.span 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-0.5 text-[10px] md:text-xs font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full"
                      >
                        <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                        Popular
                      </motion.span>
                    )}
                    {bundle.isBestValue && (
                      <motion.span 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-0.5 text-[10px] md:text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full"
                      >
                        <Package className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        Best Value
                      </motion.span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] md:text-xs text-muted-foreground">
                      {bundle.quantity} {unitLabel}{bundle.quantity > 1 ? "s" : ""}
                    </span>
                    {bundle.quantity > 1 && (
                      <span className="text-[10px] md:text-xs text-accent font-medium">
                        ${bundle.pricePerUnit.toFixed(2)}/each
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={cn(
                  "text-base md:text-lg font-bold transition-colors duration-300",
                  isSelected ? "text-accent" : "text-foreground"
                )}>
                  ${bundle.totalPrice.toFixed(2)}
                </div>
                {bundle.badge && (
                  <motion.span 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block mt-1 text-[10px] md:text-xs font-bold text-white bg-gradient-to-r from-red-500 to-red-600 px-2 py-0.5 rounded-full shadow-sm"
                  >
                    {bundle.badge}
                  </motion.span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
