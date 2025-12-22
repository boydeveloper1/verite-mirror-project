import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const QuantitySelector = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) => {
  const decrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      <button
        onClick={decrease}
        disabled={quantity <= min}
        className="w-10 h-10 flex items-center justify-center rounded-l border border-border bg-background hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <div className="w-14 h-10 flex items-center justify-center border-y border-border bg-background text-sm font-medium">
        {quantity}
      </div>
      <button
        onClick={increase}
        disabled={quantity >= max}
        className="w-10 h-10 flex items-center justify-center rounded-r border border-border bg-background hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
