import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface ProductBreadcrumbProps {
  productName: string;
  productHandle?: string;
}

export const ProductBreadcrumb = ({ productName, productHandle }: ProductBreadcrumbProps) => {
  const isShowerHead = productHandle?.includes("shower-filter") || productHandle?.includes("shower-head");
  const category = isShowerHead ? "Shower Filters" : "Scalp Mists";
  return (
    <nav className="py-4 mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Link 
            to="/" 
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        <li className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5" />
          <Link 
            to="/store" 
            className="hover:text-foreground transition-colors"
          >
            Shop
          </Link>
        </li>
        <li className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5" />
          <span>{category}</span>
        </li>
        <li className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium truncate max-w-[150px] sm:max-w-none">
            {productName}
          </span>
        </li>
      </ol>
    </nav>
  );
};
