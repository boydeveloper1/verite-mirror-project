import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductByHandle } from "@/lib/shopify";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader2 } from "lucide-react";
import { ProductBreadcrumb } from "@/components/product/ProductBreadcrumb";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductHeroBanner } from "@/components/product/ProductHeroBanner";
import { Link } from "react-router-dom";

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
  options: Array<{
    name: string;
    values: string[];
  }>;
}

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        if (data?.variants?.edges?.[0]) {
          setSelectedVariant(data.variants.edges[0].node);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Product Not Found</h1>
          <Link to="/store" className="text-accent hover:underline">
            Return to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images.edges.map((edge) => ({
    url: edge.node.url,
    altText: edge.node.altText,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <ProductHeroBanner productTitle={product.title} />
      
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        {/* Breadcrumb */}
        <div className="animate-fade-in">
          <ProductBreadcrumb productName={product.title} productHandle={product.handle} />
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-10">
          {/* Image Gallery */}
          <div className="animate-fade-in-up">
            <ProductImageGallery images={images} productTitle={product.title} productHandle={product.handle} />
          </div>

          {/* Product Details */}
          <div className="animate-fade-in-up [animation-delay:150ms] opacity-0">
            <ProductDetails product={product} selectedVariant={selectedVariant} onVariantChange={handleVariantChange} />
          </div>
        </div>

        {/* Product Tabs */}
        <div className="animate-fade-in-up [animation-delay:300ms] opacity-0">
          <ProductTabs productHandle={product.handle} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
