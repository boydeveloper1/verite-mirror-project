import { Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const policyLinks = [
  { label: "Return & Refund Policy", to: "/refund-policy" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms-of-service" },
  { label: "Shipping Policy", to: "/shipping-policy" },
];

const siteLinks = [
  { label: "Products", to: "/store" },
  { label: "Compare Products", to: "/compare" },
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

const blogLinks = [
  { label: "Why Your Hair Growth Serum Isn't Working", to: "/blog/why-your-hair-growth-serum-isnt-working" },
  { label: "Scalp Inflammation: The Hidden Cause", to: "/blog/scalp-inflammation-the-hidden-cause-of-hair-loss" },
  { label: "Complete Guide to Protecting Edges", to: "/blog/complete-guide-to-protecting-your-edges" },
  { label: "8 Mistakes Destroying Your Edges", to: "/blog/8-mistakes-destroying-your-edges" },
];

export const Footer = () => {
  return (
    <footer className="bg-brand-charcoal text-primary-foreground">
      {/* Main Footer */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {/* Left Column - Logo & Brand */}
            <div className="animate-fade-in">
              <img 
                src={logoImg} 
                alt="VERITÉ SCALP" 
                className="h-12 md:h-14 w-auto mb-4 brightness-0 invert transition-transform duration-300 hover:scale-105"
              />
              <p className="text-xs text-primary-foreground/70 mb-5 font-medium tracking-wide">
                Scalp Care Before Hair Care
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-brand-gold transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-brand-gold transition-colors"
                >
                  <TikTokIcon />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-brand-gold transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right Columns - Links Grid in 3 columns */}
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80 mb-2 block">Policies</span>
                {policyLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="block text-[11px] text-primary-foreground/70 hover:text-brand-gold hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80 mb-2 block">Quick Links</span>
                {siteLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="block text-[11px] text-primary-foreground/70 hover:text-brand-gold hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="space-y-3 col-span-2 md:col-span-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80 mb-2 block">From Our Blog</span>
                {blogLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="block text-[11px] text-primary-foreground/70 hover:text-brand-gold hover:underline transition-colors line-clamp-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-primary-foreground/20 my-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-[10px] text-primary-foreground/50 order-3 md:order-1">
              © {new Date().getFullYear()} VERITÉ SCALP. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3 order-1 md:order-2">
              <span className="text-[10px] text-primary-foreground/50 mr-2">Secure payments:</span>
              <div className="flex items-center gap-2">
                <div className="w-9 h-5 bg-primary-foreground/20 rounded flex items-center justify-center">
                  <span className="text-[9px] font-bold text-primary-foreground/80">VISA</span>
                </div>
                <div className="w-9 h-5 bg-primary-foreground/20 rounded flex items-center justify-center">
                  <span className="text-[9px] font-bold text-primary-foreground/80">MC</span>
                </div>
                <div className="w-9 h-5 bg-primary-foreground/20 rounded flex items-center justify-center">
                  <span className="text-[9px] font-bold text-primary-foreground/80">PP</span>
                </div>
              </div>
            </div>

            {/* Additional Links */}
            <div className="flex items-center gap-3 text-[10px] text-primary-foreground/50 order-2 md:order-3">
              <Link to="/sitemap" className="hover:text-brand-gold transition-colors">Sitemap</Link>
              <span>|</span>
              <Link to="/accessibility" className="hover:text-brand-gold transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
