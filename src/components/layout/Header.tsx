import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/CartDrawer";
import logoImg from "@/assets/logo.png";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { label: "Compare", href: "/compare" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  // Marquee messages for the top bar
  const marqueeMessages = [
    "🌍 FREE WORLDWIDE SHIPPING ON ALL ORDERS",
    "⚡ LIMITED TIME OFFER — 30% OFF TODAY ONLY",
    "✨ DERMATOLOGIST RECOMMENDED SCALP CARE!",
  ];

  return (
    <>
      {/* Animated Marquee Top Bar */}
      <div className="bg-primary text-primary-foreground py-2.5 sticky top-0 z-[60] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...marqueeMessages, ...marqueeMessages].map((msg, idx) => (
            <span key={idx} className="mx-12 text-sm font-semibold tracking-wide inline-block">
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-[40px] z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft py-2" : "bg-background py-3"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={logoImg}
              alt="VERITÉ SCALP"
              className="h-12 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground/80 hover:text-primary font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
            {/* Shop Now Button */}
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <a href="/store">Shop Now</a>
            </Button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <CartDrawer />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full mt-2">
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
