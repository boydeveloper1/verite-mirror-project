import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductSearch } from "@/components/search/ProductSearch";
import logoImg from "@/assets/logo.png";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on a product page
  const isProductPage = location.pathname.startsWith("/product/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  // Dynamic styling based on page type
  const headerBg = isProductPage
    ? isScrolled 
      ? "bg-primary/95 backdrop-blur-md shadow-soft" 
      : "bg-primary"
    : isScrolled 
      ? "bg-background/95 backdrop-blur-md shadow-soft" 
      : "bg-background";
  
  const textColor = isProductPage ? "text-white" : "text-foreground/80";
  const textHoverColor = isProductPage ? "hover:text-white/80" : "hover:text-primary";
  const logoFilter = isProductPage ? "brightness-0 invert" : "";

  return (
    <>
      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${headerBg} ${isScrolled ? "py-2" : "py-3"}`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={logoImg}
              alt="VERITÉ SCALP"
              className={`h-12 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105 ${logoFilter}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${textColor} ${textHoverColor} font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 ${isProductPage ? "after:bg-white/70" : "after:bg-accent"} hover:after:w-full after:transition-all`}
              >
                {link.label}
              </a>
            ))}
            {/* Shop Now Button - Amber/Gold on product pages */}
            <Button
              asChild
              className={isProductPage 
                ? "bg-amber-500 hover:bg-amber-400 text-primary font-semibold px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                : "bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              }
            >
              <a href="/store">Shop Now</a>
            </Button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <div className="hidden lg:block">
              {isSearchOpen ? (
                <div className="w-64">
                  <ProductSearch onClose={() => setIsSearchOpen(false)} />
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsSearchOpen(true)}
                  className={isProductPage ? "text-white hover:bg-white/10" : ""}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>
            
            <CartDrawer variant={isProductPage ? "light" : "default"} />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${isProductPage ? "text-white hover:bg-white/10" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden ${isProductPage ? "bg-primary" : "bg-background"} border-t ${isProductPage ? "border-white/20" : "border-border"} animate-fade-in`}>
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {/* Mobile Search */}
              <ProductSearch className="mb-2" onClose={() => setIsMobileMenuOpen(false)} />
              
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`${textColor} ${textHoverColor} font-medium py-2 transition-colors animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button 
                asChild 
                className={isProductPage 
                  ? "bg-amber-500 hover:bg-amber-400 text-primary font-semibold w-full mt-2"
                  : "bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full mt-2"
                }
              >
                <a href="/store" onClick={() => setIsMobileMenuOpen(false)}>
                  Shop Now
                </a>
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
