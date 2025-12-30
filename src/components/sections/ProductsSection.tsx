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
    <section id="shop" className="py-20 md:py-28 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 md:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="inline-block text-accent font-semibold uppercase tracking-wider mb-4">Our Products</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-5">
            Complete Scalp Care System
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Each product stops inflammation at a different source. Together, they heal your scalp and restore hair
            growth.
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl shadow-soft">
            <p className="text-muted-foreground text-lg mb-4">No products found</p>
            <p className="text-muted-foreground">
              Create your first product by telling the chat what you want to sell!
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => {
              const { node } = product;
              const firstVariant = node.variants.edges[0]?.node;
              const firstImage = node.images.edges[0]?.node;
              const price = node.priceRange.minVariantPrice;
              const isHovered = hoveredProduct === node.id;

              return (
                <Link
                  key={node.id}
                  to={`/product/${node.handle}`}
                  className="group block bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${products.indexOf(product) * 100}ms` }}
                  onMouseEnter={() => setHoveredProduct(node.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Image */}
                  <div className="aspect-square bg-secondary overflow-hidden relative">
                    {/* Best Seller Badge */}
                    {node.handle?.includes("mist") && (
                      <div className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                        Best Seller
                      </div>
                    )}
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
                  <div className="p-6">
                    {/* Category */}
                    <span className="text-xs uppercase tracking-wider font-semibold text-accent mb-2 block">
                      SCALP CARE
                    </span>

                    {/* Product Name */}
                    <h3 className="font-display text-sm md:text-base font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {node.title}
                    </h3>

                    {/* Benefit Copy */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                      {node.description || "Instant inflammation relief in 2-3 weeks"}
                    </p>

                    {/* Star Rating - Dynamic based on product */}
                    {(() => {
                      const isShowerHead = node.handle?.includes("shower-filter") || node.handle?.includes("shower-head");
                      const rating = isShowerHead ? "5.0" : "4.9";
                      const reviewCount = isShowerHead ? 54 : 127;
                      return (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
                        </div>
                      );
                    })()}

                    {/* Price with Discount */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm text-muted-foreground line-through">
                        ${(parseFloat(price.amount) / 0.7).toFixed(2)}
                      </span>
                      <span className="text-2xl font-semibold text-accent">${parseFloat(price.amount).toFixed(2)}</span>
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">SAVE 30%</span>
                    </div>

                    {/* View Details Button */}
                    <Button
                      variant="outline"
                      className="w-full h-11 border-2 border-accent text-accent bg-secondary hover:bg-accent hover:text-accent-foreground font-semibold transition-all duration-300"
                    >
                      View Details
                    </Button>

                    {/* Quick Add to Cart (Hover State) */}
                    {isHovered && (
                      <Button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-full h-11 mt-3 bg-accent text-accent-foreground font-semibold transition-all animate-fade-in"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    )}
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
