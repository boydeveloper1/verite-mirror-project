import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

interface ProductSearchProps {
  className?: string;
  onClose?: () => void;
}

export const ProductSearch = ({ className = "", onClose }: ProductSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const products = await fetchProducts(10, query);
        setResults(products.slice(0, 5));
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape key
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
      onClose?.();
    }
  }, [onClose]);

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
    onClose?.();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 h-10 w-full bg-background"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => {
              setQuery("");
              setResults([]);
              inputRef.current?.focus();
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          {isLoading ? (
            <div className="p-4 flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : results.length > 0 ? (
            <div>
              {results.map((product) => (
                <Link
                  key={product.node.id}
                  to={`/product/${product.node.handle}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors"
                >
                  {product.node.images.edges[0]?.node && (
                    <img
                      src={product.node.images.edges[0].node.url}
                      alt={product.node.title}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {product.node.title}
                    </p>
                    <p className="text-sm text-accent font-semibold">
                      ${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
              <Link
                to={`/store?search=${encodeURIComponent(query)}`}
                onClick={handleResultClick}
                className="block p-3 text-center text-sm text-accent hover:bg-secondary/50 border-t border-border"
              >
                View all results for "{query}"
              </Link>
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No products found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};
