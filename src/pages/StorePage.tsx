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
import { ShoppingCart, Loader2, Star, Clock, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/data/blogPosts";

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
  };

  const featuredPosts = blogPosts.slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PageHeroBanner
        title="Skin Care Solutions"
        subtitle="Pure water solutions for eczema, psoriasis, rosacea & sensitive skin"
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
                    {(node.handle?.includes("shower-filter") || node.handle?.includes("shower-head")) && (
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
                      <span className="text-xs uppercase tracking-wider font-semibold text-accent mb-2 block">SKIN CARE</span>
                      <h3 className="font-display text-sm md:text-base font-bold text-primary mb-2 group-hover:text-accent transition-colors">{node.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{node.description || "Soothes irritated skin naturally"}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />)}</div>
                        <span className="text-xs text-muted-foreground">({isShowerHead ? "14,520" : "127"} reviews)</span>
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

      {/* Featured Blog Posts Section */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-accent/10 text-accent font-semibold uppercase tracking-wider px-4 py-2 rounded-full text-sm mb-4">
              Learn More
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Skin Health Insights
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expert tips on managing eczema, psoriasis, and rosacea through water quality
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {featuredPosts.map((post, index) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all text-sm">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link to="/blog">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <PreFooterSubscribe />
      <Footer />
      <EmailPopup />
    </div>
  );
};

export default StorePage;
