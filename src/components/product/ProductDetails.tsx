import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingCart, Truck, CheckCircle2, Package } from "lucide-react";
import { Star } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import { BundleSelector, BundleOption, defaultBundles, showerFilterBundles } from "./BundleSelector";
import { TrustBadges } from "./TrustBadges";
import { PaymentMethods } from "./PaymentMethods";
import { ReplicasWarning } from "./ReplicasWarning";
import { cn } from "@/lib/utils";
import showerHeadSilver from "@/assets/shower-head-silver.jpg";
import showerHeadBlack from "@/assets/shower-head-black.jpg";

interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  options?: Array<{
    name: string;
    values: string[];
  }>;
}

interface ProductDetailsProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  onVariantChange?: (variant: ProductVariant) => void;
}

export const ProductDetails = ({ product, selectedVariant, onVariantChange }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const isShowerHead = product.handle?.includes("shower-filter") || product.handle?.includes("shower-head");
  const basePrice = parseFloat(selectedVariant?.price?.amount || product.priceRange.minVariantPrice.amount);
  const currency = selectedVariant?.price?.currencyCode || product.priceRange.minVariantPrice.currencyCode;

  // Create dynamic bundles based on product price and type
  const createDynamicBundles = (price: number): BundleOption[] => {
    if (isShowerHead) {
      return [
        { quantity: 1, pricePerUnit: price, totalPrice: price, savings: 0, savingsPercent: 0, label: "Single Unit" },
        {
          quantity: 2,
          pricePerUnit: price * 0.95,
          totalPrice: price * 1.9,
          savings: price * 0.1,
          savingsPercent: 5,
          isPopular: true,
          label: "His & Hers",
          badge: `Save $${(price * 0.1).toFixed(0)}`,
        },
        {
          quantity: 3,
          pricePerUnit: price * 0.9,
          totalPrice: price * 2.7,
          savings: price * 0.3,
          savingsPercent: 10,
          isBestValue: true,
          label: "Family Pack",
          badge: `Save $${(price * 0.3).toFixed(0)}`,
        },
      ];
    }
    return [
      { quantity: 1, pricePerUnit: price, totalPrice: price, savings: 0, savingsPercent: 0, label: "Starter" },
      {
        quantity: 2,
        pricePerUnit: price * 0.95,
        totalPrice: price * 1.9,
        savings: price * 0.1,
        savingsPercent: 5,
        isPopular: true,
        label: "Growth Duo",
        badge: `Save $${(price * 0.1).toFixed(0)}`,
      },
      {
        quantity: 3,
        pricePerUnit: price * 0.9,
        totalPrice: price * 2.7,
        savings: price * 0.3,
        savingsPercent: 10,
        isBestValue: true,
        label: "Full Treatment",
        badge: `Save $${(price * 0.3).toFixed(0)}`,
      },
      {
        quantity: 4,
        pricePerUnit: price * 0.85,
        totalPrice: price * 3.4,
        savings: price * 0.6,
        savingsPercent: 15,
        label: "Best for Routine",
        badge: `Save $${(price * 0.6).toFixed(0)}`,
      },
    ];
  };

  const bundles = createDynamicBundles(basePrice);
  const [selectedBundle, setSelectedBundle] = useState<BundleOption>(bundles[0]);

  // Update bundle when price changes
  useEffect(() => {
    const newBundles = createDynamicBundles(basePrice);
    setSelectedBundle(newBundles[0]);
  }, [basePrice]);

  // Get color options for shower head
  const colorOptions = isShowerHead
    ? product.options?.find((opt) => opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour")
    : null;

  const [selectedColor, setSelectedColor] = useState<string>(
    selectedVariant?.selectedOptions?.find(
      (opt) => opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour",
    )?.value ||
      colorOptions?.values?.[0] ||
      "",
  );

  // Handle color change
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const matchingVariant = product.variants.edges.find((edge) =>
      edge.node.selectedOptions?.some(
        (opt) => (opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour") && opt.value === color,
      ),
    );
    if (matchingVariant && onVariantChange) {
      onVariantChange(matchingVariant.node);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    // Calculate discounted price per unit based on bundle
    const discountedPrice = selectedBundle.pricePerUnit;

    // Add items based on bundle quantity
    for (let i = 0; i < selectedBundle.quantity; i++) {
      addItem({
        product: {
          node: {
            ...product,
            options: product.options || [],
          },
        },
        variantId: selectedVariant.id,
        variantTitle: selectedVariant.title,
        price: {
          amount: discountedPrice.toFixed(2),
          currencyCode: currency,
        },
        quantity: quantity,
        selectedOptions: selectedVariant.selectedOptions || [],
      });
    }

    toast.success(`Added ${selectedBundle.quantity}x ${product.title} to cart`, {
      position: "top-center",
    });
  };

  const totalPrice = selectedBundle.totalPrice * quantity;
  const unitLabel = isShowerHead ? "Unit" : "Bottle";

  return (
    <div className="lg:sticky lg:top-8 mt-4 md:mt-0">
      {/* Brand Name */}
      <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-accent mb-1 md:mb-2">
        VERITÉ SCALP
      </p>

      {/* Product Name */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2 md:mb-3">{product.title}</h1>

      {/* Short Description */}
      <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
        {isShowerHead
          ? "Transform your shower into a scalp treatment. Our 15-stage filtration removes harsh chemicals that damage hair follicles and irritate your scalp."
          : "Clinically-formulated mist that calms inflammation, balances scalp pH, and creates the ideal environment for stronger, healthier hair growth."}
      </p>

      {/* Key Benefits */}
      <ul className="space-y-2 mb-4 md:mb-6">
        {isShowerHead ? (
          <>
            <li className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Removes 99% chlorine & heavy metals</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Universal fit – installs in minutes</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Reduces scalp dryness & irritation</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span>6-month filter life (included)</span>
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Soothes itchy, inflamed scalp instantly</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Reduces hair shedding by up to 70%</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Lightweight, non-greasy formula</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Safe for color-treated hair</span>
            </li>
          </>
        )}
      </ul>

      {/* Rating - Dynamic based on product */}
      {(() => {
        const rating = isShowerHead ? "5.0" : "4.9";
        const reviewCount = isShowerHead ? 54 : 127;
        return (
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <button
              onClick={() => {
                const reviewsTab = document.querySelector("[data-reviews-tab]");
                if (reviewsTab) {
                  (reviewsTab as HTMLButtonElement).click();
                  setTimeout(() => {
                    reviewsTab.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 100);
                }
              }}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <span className="text-xs md:text-sm font-semibold">{rating}</span>
              <span className="text-xs md:text-sm text-muted-foreground hover:text-accent transition-colors underline">
                ({reviewCount} Reviews)
              </span>
            </button>
            <span className="text-[10px] md:text-xs font-semibold text-accent flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
              {isShowerHead ? "100% recommend" : "98% recommend"}
            </span>
          </div>
        );
      })()}

      {/* Color Selector for Shower Head */}
      {isShowerHead && colorOptions && colorOptions.values.length > 1 && (
        <div className="mb-4 md:mb-6">
          <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wide text-foreground mb-2 md:mb-3">
            Color: <span className="text-accent">{selectedColor}</span>
          </label>
          <div className="flex gap-3">
            {colorOptions.values.map((color) => {
              const variantImage =
                color.toLowerCase() === "silver" || color.toLowerCase() === "chrome"
                  ? showerHeadSilver
                  : showerHeadBlack;
              return (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-all",
                    selectedColor === color ? "border-accent bg-accent/10" : "border-border hover:border-accent/50",
                  )}
                >
                  <img src={variantImage} alt={`${color} variant`} className="w-16 h-16 object-cover rounded" />
                  <span className="text-sm font-medium">{color}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Box */}
      <div className="p-4 md:p-5 rounded-lg bg-secondary mb-4 md:mb-6">
        <div className="flex items-center gap-2 mb-1.5 md:mb-2">
          <p className="text-[10px] md:text-xs uppercase tracking-wide text-muted-foreground font-semibold">Price</p>
          <span className="text-[10px] md:text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded">30% OFF</span>
        </div>
        <div className="flex items-baseline gap-3 mb-2 md:mb-3">
          <p className="text-3xl md:text-4xl font-bold text-accent">${totalPrice.toFixed(2)}</p>
          <p className="text-lg md:text-xl text-muted-foreground line-through">${(totalPrice / 0.7).toFixed(2)}</p>
          <span className="text-sm md:text-lg font-normal text-muted-foreground">{currency}</span>
        </div>
        <div className="space-y-1.5 md:space-y-2">
          <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-semibold text-accent">
            <Truck className="w-3.5 h-3.5 md:w-4 md:h-4" />
            FREE WORLDWIDE SHIPPING
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-semibold text-accent">
            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            30-DAY MONEY-BACK GUARANTEE
          </div>
        </div>
      </div>

      {/* Replicas Warning */}
      <ReplicasWarning />

      {/* Quantity Selector */}
      <div className="mb-4 md:mb-6">
        <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wide text-foreground mb-2 md:mb-3">
          Quantity
        </label>
        <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} min={1} max={10} />
      </div>

      {/* Bundle Selector */}
      <div className="mb-4 md:mb-6">
        <BundleSelector
          bundles={bundles}
          selectedBundle={selectedBundle}
          onBundleSelect={setSelectedBundle}
          unitLabel={unitLabel}
        />
      </div>

      {/* Add to Cart Button */}
      <Button
        variant="cta"
        size="xl"
        className="w-full h-12 md:h-14 text-sm md:text-base mb-3 md:mb-4"
        onClick={handleAddToCart}
        disabled={!selectedVariant}
      >
        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
        Add to Cart
      </Button>

      {/* Trust Badges */}
      <div className="mb-4 md:mb-6">
        <TrustBadges productHandle={product.handle} />
      </div>

      {/* Payment Methods */}
      <div className="mb-4 md:mb-6">
        <PaymentMethods />
      </div>

      {/* Shipping Info */}
      <div className="p-3 md:p-4 rounded-lg bg-accent/10 border-l-4 border-accent">
        <div className="flex items-start gap-2 md:gap-3">
          <Truck className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs md:text-sm font-semibold text-accent">FREE International Shipping (5-7 days)</p>
            <p className="text-[10px] md:text-xs text-accent/80 mt-0.5 md:mt-1">
              🌍 Ships to 195+ countries | Trackable
            </p>
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-1.5 md:gap-2 mt-3 md:mt-4 text-xs md:text-sm font-semibold text-accent">
        <Package className="w-3.5 h-3.5 md:w-4 md:h-4" />
        <span>✓ In Stock - Ships Next Business Day</span>
      </div>
    </div>
  );
};
