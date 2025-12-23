import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, Star } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const ProductsSection = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log("Fetching products from Shopify...");
        const data = await fetchProducts(12);
        console.log("Products fetched:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: ShopifyProduct) => {
    e.preventDefault();
    e.stopPropagation();

    const firstVariant = product.node.variants.edges[0]?.node;
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
      description: product.node.title,
      position: "top-center",
    });
  };

  return (
    <section id="shop" className="py-20 md:py-32 bg-cream-gradient">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 animate-fade-in-up">
          <span className="inline-block text-accent font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-4 md:mb-6">
            Shop Collection
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 md:mb-6 leading-tight">
            Complete Scalp Care System
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Clinically formulated products that work together to heal your scalp and restore healthy hair growth.
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-accent animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl shadow-medium max-w-xl mx-auto">
            <p className="text-muted-foreground text-lg mb-4">No products found</p>
            <p className="text-muted-foreground">
              Create your first product by telling the chat what you want to sell!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto">
            {products.map((product, index) => {
              const { node } = product;
              const firstVariant = node.variants.edges[0]?.node;
              const firstImage = node.images.edges[0]?.node;
              const price = node.priceRange.minVariantPrice;
              const isHovered = hoveredProduct === node.id;

              return (
                <Link
                  key={node.id}
                  to={`/product/${node.handle}`}
                  className="group block bg-card rounded-2xl md:rounded-3xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-3 animate-fade-in-up border border-border/50"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredProduct(node.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Image Container */}
                  <div className="aspect-[4/3] bg-secondary overflow-hidden relative">
                    {firstImage ? (
                      <img
                        src={firstImage.url}
                        alt={firstImage.altText || node.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Bestseller Badge - Only for Scalp Mist */}
                    {node.handle?.includes("mist") && (
                      <span className="absolute top-4 left-4 text-[10px] md:text-xs font-bold text-white bg-accent px-3 py-1.5 rounded-full uppercase tracking-wider shadow-medium">
                        Bestseller
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {/* Category */}
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold text-accent mb-3 block">
                      Scalp Care
                    </span>

                    {/* Product Name */}
                    <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300 leading-tight">
                      {node.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                      {node.description || "Instant inflammation relief in 2-3 weeks"}
                    </p>

                    {/* Star Rating */}
                    {(() => {
                      const isShowerHead = node.handle?.includes("shower-filter") || node.handle?.includes("shower-head");
                      const rating = isShowerHead ? "5.0" : "4.9";
                      const reviewCount = isShowerHead ? 54 : 127;
                      return (
                        <div className="flex items-center gap-2 mb-5">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-brand-gold text-brand-gold" />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-foreground">{rating}</span>
                          <span className="text-xs md:text-sm text-muted-foreground">({reviewCount} reviews)</span>
                        </div>
                      );
                    })()}

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-sm md:text-base text-muted-foreground line-through">
                        ${(parseFloat(price.amount) / 0.7).toFixed(2)}
                      </span>
                      <span className="text-2xl md:text-3xl font-bold text-accent">
                        ${parseFloat(price.amount).toFixed(2)}
                      </span>
                      <span className="text-[10px] md:text-xs font-bold text-white bg-accent px-2.5 py-1 rounded-full uppercase">
                        Save 30%
                      </span>
                    </div>

                    {/* View Details Button */}
                    <Button
                      variant="outline"
                      className="w-full h-12 md:h-14 border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-foreground font-semibold transition-all duration-300 text-sm md:text-base rounded-xl"
                    >
                      View Details
                    </Button>

                    {/* Quick Add to Cart (Hover State) */}
                    <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'max-h-20 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <Button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-full h-12 md:h-14 bg-accent text-accent-foreground font-semibold text-sm md:text-base rounded-xl"
                      >
                        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
