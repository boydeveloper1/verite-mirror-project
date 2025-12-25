import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";
import { PreFooterSubscribe } from "@/components/shared/PreFooterSubscribe";
import { EmailPopup } from "@/components/shared/EmailPopup";
import { Link } from "react-router-dom";

const SitemapPage = () => {
  const sections = [
    {
      title: "Main Pages",
      links: [
        { label: "Home", to: "/" },
        { label: "Products", to: "/store" },
        { label: "About Us", to: "/about" },
        { label: "Contact", to: "/contact" },
        { label: "Blog", to: "/blog" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Verite Scalp Nourishing Scalp Relief Spray", to: "/product/nourishing-scalp-relief-spray" },
        { label: "Verite Scalp Purifying Shower Filter", to: "/product/verite-scalp-purifying-shower-filter-1" },
      ],
    },
    {
      title: "Blog Posts",
      links: [
        { label: "Why Your Hair Growth Serum Isn't Working", to: "/blog/why-hair-growth-serum-not-working" },
        { label: "Scalp Inflammation: The Hidden Cause of Hair Loss", to: "/blog/scalp-inflammation-hidden-cause" },
        { label: "Complete Guide to Protecting Your Edges", to: "/blog/complete-guide-protecting-edges" },
        { label: "8 Mistakes That Are Destroying Your Edges", to: "/blog/8-mistakes-destroying-edges" },
      ],
    },
    {
      title: "Policies",
      links: [
        { label: "Privacy Policy", to: "/privacy-policy" },
        { label: "Terms of Service", to: "/terms-of-service" },
        { label: "Refund Policy", to: "/refund-policy" },
        { label: "Shipping Policy", to: "/shipping-policy" },
      ],
    },
    {
      title: "Other",
      links: [
        { label: "Accessibility", to: "/accessibility" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeroBanner title="Sitemap" breadcrumbs={[{ label: "Sitemap" }]} />
      
      <main className="container mx-auto px-4 md:px-10 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground mb-10">
            Find all pages on the VERITÉ SCALP website below.
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {sections.map((section) => (
              <div key={section.title} className="animate-fade-in-up">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                      >
                        <span className="text-accent">→</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      <PreFooterSubscribe />
      <Footer />
      <EmailPopup />
    </div>
  );
};

export default SitemapPage;
