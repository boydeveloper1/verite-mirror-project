import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { BundleOption } from "./BundleSelector";
import { cn } from "@/lib/utils";

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
  variants?: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  options?: Array<{
    name: string;
    values: string[];
  }>;
}

interface StickyAddToCartProps {
  product: Product;
  selectedVariant: ProductVariant | null;
}

export const StickyAddToCart = ({ product, selectedVariant }: StickyAddToCartProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);
  const addItem = useCartStore((state) => state.addItem);

  const threshold = 400;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      // Show when scrolling down AND past threshold
      // Hide when scrolling up OR near top
      if (currentScrollY > threshold && isScrollingDown) {
        setIsVisible(true);
      } else if (!isScrollingDown || currentScrollY < threshold) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const price = parseFloat(selectedVariant.price.amount);
    const currency = selectedVariant.price.currencyCode;

    addItem({
      product: {
        node: {
          ...product,
          description: "",
          variants: product.variants || { edges: [] },
          options: product.options || [],
        },
      },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: {
        amount: price.toFixed(2),
        currencyCode: currency,
      },
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
  };

  const price = parseFloat(selectedVariant?.price?.amount || product.priceRange.minVariantPrice.amount);
  const currency = selectedVariant?.price?.currencyCode || product.priceRange.minVariantPrice.currencyCode;
  const productImage = product.images.edges[0]?.node.url;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.15)]",
        "transition-transform duration-300 ease-out",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Product Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {productImage && (
              <img
                src={productImage}
                alt={product.title}
                className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-lg flex-shrink-0 border border-border"
              />
            )}
            <div className="min-w-0">
              <h3 className="text-sm md:text-base font-semibold text-foreground truncate">
                {product.title}
              </h3>
              <p className="text-base md:text-lg font-bold text-accent">
                ${price.toFixed(2)} <span className="text-xs font-normal text-muted-foreground">{currency}</span>
              </p>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            variant="cta"
            size="lg"
            className="flex-shrink-0 h-11 md:h-12 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base whitespace-nowrap"
            onClick={handleAddToCart}
            disabled={!selectedVariant}
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-1 sm:mr-2 flex-shrink-0" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
