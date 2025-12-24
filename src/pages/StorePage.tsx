import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";
import { PreFooterSubscribe } from "@/components/shared/PreFooterSubscribe";
import { EmailPopup } from "@/components/shared/EmailPopup";
import productsBanner from "@/assets/products-banner.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, Star } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const StorePage = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(12);
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
    toast.success("Added to cart", { description: product.node.title, position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PageHeroBanner
        title="Products"
        subtitle="Premium scalp care solutions crafted for lasting results"
        breadcrumbs={[{ label: "Products" }]}
        backgroundImage={productsBanner}
      />
      
      {/* Products Grid - 2 Columns */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-10">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl shadow-soft">
              <p className="text-muted-foreground text-lg mb-4">No products found</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {products.map((product) => {
                const { node } = product;
                const firstImage = node.images.edges[0]?.node;
                const price = node.priceRange.minVariantPrice;
                const isHovered = hoveredProduct === node.id;
                const isShowerHead = node.handle?.includes("shower-filter") || node.handle?.includes("shower-head");

                return (
                  <Link
                    key={node.id}
                    to={`/product/${node.handle}`}
                    className="group block bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2"
                    onMouseEnter={() => setHoveredProduct(node.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="aspect-square bg-secondary overflow-hidden relative">
                      {node.handle?.includes("mist") && (
                        <div className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                          Best Seller
                        </div>
                      )}
                      {firstImage ? (
                        <img src={firstImage.url} alt={firstImage.altText || node.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs uppercase tracking-wider font-semibold text-accent mb-2 block">SCALP CARE</span>
                      <h3 className="font-display text-sm md:text-base font-bold text-primary mb-2 group-hover:text-accent transition-colors">{node.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{node.description || "Instant inflammation relief"}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />)}</div>
                        <span className="text-xs text-muted-foreground">({isShowerHead ? 54 : 127} reviews)</span>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm text-muted-foreground line-through">${(parseFloat(price.amount) / 0.7).toFixed(2)}</span>
                        <span className="text-2xl font-semibold text-accent">${parseFloat(price.amount).toFixed(2)}</span>
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">SAVE 30%</span>
                      </div>
                      <Button variant="outline" className="w-full h-11 border-2 border-accent text-accent bg-secondary hover:bg-accent hover:text-accent-foreground font-semibold">View Details</Button>
                      {isHovered && (
                        <Button onClick={(e) => handleAddToCart(e, product)} className="w-full h-11 mt-3 bg-accent text-accent-foreground font-semibold animate-fade-in">
                          <ShoppingCart className="w-4 h-4 mr-2" />Add to Cart
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
      
      <PreFooterSubscribe />
      <Footer />
      <EmailPopup />
    </div>
  );
};

export default StorePage;
