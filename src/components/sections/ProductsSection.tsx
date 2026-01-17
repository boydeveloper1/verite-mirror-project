import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, Star, Sparkles } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

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
    <section id="shop" className="py-28 md:py-36 bg-gradient-to-b from-secondary/60 via-background to-secondary/40 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-accent/10 text-accent font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full text-xs mb-8">
            <Sparkles className="w-4 h-4" />
            Our Products
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Complete Scalp<br />
            <span className="text-accent">Care System</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Each product stops inflammation at a different source. Together, they heal your scalp and restore hair growth.
          </p>
        </motion.div>

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
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            {products.map((product) => {
              const { node } = product;
              const firstVariant = node.variants.edges[0]?.node;
              const firstImage = node.images.edges[0]?.node;
              const price = node.priceRange.minVariantPrice;
              const isHovered = hoveredProduct === node.id;

              return (
                <motion.div key={node.id} variants={cardVariants}>
                  <Link
                    to={`/product/${node.handle}`}
                    className="group block bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 hover:-translate-y-3 border border-border/50 hover:border-accent/30"
                    onMouseEnter={() => setHoveredProduct(node.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Image */}
                    <div className="aspect-square bg-gradient-to-br from-secondary to-secondary/50 overflow-hidden relative">
                      {/* Best Seller Badge */}
                      {node.handle?.includes("mist") && (
                        <div className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                          <Star className="w-3 h-3 fill-current" />
                          Best Seller
                        </div>
                      )}
                      {firstImage ? (
                        <img
                          src={firstImage.url}
                          alt={firstImage.altText || node.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category */}
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent mb-3 block">
                        SCALP CARE
                      </span>

                      {/* Product Name */}
                      <h3 className="font-display text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                        {node.title}
                      </h3>

                      {/* Benefit Copy */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {node.description || "Instant inflammation relief in 2-3 weeks"}
                      </p>

                      {/* Star Rating */}
                      {(() => {
                        const isShowerHead = node.handle?.includes("shower-filter") || node.handle?.includes("shower-head");
                        const reviewCount = isShowerHead ? 54 : 127;
                        return (
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground font-medium">({reviewCount})</span>
                          </div>
                        );
                      })()}

                      {/* Price with Discount */}
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-sm text-muted-foreground line-through">
                          ${(parseFloat(price.amount) / 0.7).toFixed(2)}
                        </span>
                        <span className="text-2xl font-bold text-primary">${parseFloat(price.amount).toFixed(2)}</span>
                        <span className="text-[10px] font-bold text-white bg-accent px-2 py-1 rounded-full">-30%</span>
                      </div>

                      {/* View Details Button */}
                      <Button
                        variant="outline"
                        className="w-full h-12 border-2 border-primary/20 text-primary bg-transparent hover:bg-primary hover:text-primary-foreground font-semibold transition-all duration-300 rounded-xl group-hover:border-accent group-hover:text-accent"
                      >
                        View Details
                      </Button>

                      {/* Quick Add to Cart (Hover State) */}
                      {isHovered && (
                        <Button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="w-full h-12 mt-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all animate-fade-in rounded-xl"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};
