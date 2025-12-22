import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const firstImage = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    toast.success("Added to cart", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="aspect-square bg-muted overflow-hidden">
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={firstImage.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-sm md:text-base font-semibold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
          {node.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
          {node.description || "Premium scalp care solution"}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground line-through">
              ${(parseFloat(price.amount) / 0.7).toFixed(2)}
            </span>
            <span className="font-display text-xl font-bold text-accent">
              ${parseFloat(price.amount).toFixed(2)}
            </span>
          </div>

          <Button 
            variant="cta" 
            size="sm"
            onClick={handleAddToCart}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
};
