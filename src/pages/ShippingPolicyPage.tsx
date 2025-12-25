import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";
import { PreFooterSubscribe } from "@/components/shared/PreFooterSubscribe";
import { EmailPopup } from "@/components/shared/EmailPopup";

const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHeroBanner 
          title="Shipping Policy" 
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Shipping Policy" }
          ]}
        />

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-10">
            <div className="max-w-4xl mx-auto">
              
              {/* Introduction */}
              <div className="mb-12 p-6 rounded-xl bg-accent/10 border border-accent/20">
                <p className="text-lg text-foreground font-medium leading-relaxed">
                  At veritescalp.com, we are committed to providing exceptional service and ensuring our customers are completely satisfied. We offer shipping services and aim to process your orders as quickly as possible. Please keep in mind that holidays may affect delivery times. We also provide same-day dispatch for orders.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">1. Shipping</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All orders are processed and shipped within 4-10 business days. Please note that orders are not shipped or delivered on weekends or holidays. During peak times, shipments may experience slight delays, so please allow extra transit days for delivery. If there's a significant delay in your order's shipment, we will inform you via email.
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">2. Incorrect Address Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  It is the customer's responsibility to ensure the shipping address provided is correct. We strive to expedite processing and shipping; however, there is a limited timeframe to correct any address errors. Please contact us immediately if you believe the shipping address is incorrect.
                </p>
              </div>

              {/* Section 3 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">3. Undeliverable Orders</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Orders returned to us as undeliverable due to incorrect shipping information may incur a restocking fee at our discretion.
                </p>
              </div>

              {/* Section 4 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">4. Lost or Stolen Packages</h2>
                <p className="text-muted-foreground leading-relaxed">
                  veritescalp.com is not responsible for lost or stolen packages. If your tracking information shows delivery to your address but you haven't received your package, please reach out to local authorities.
                </p>
              </div>

              {/* Section 5 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">5. Return Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We accept returns within 30 days. Items must be returned unopened and unused.
                </p>
              </div>

              {/* Section 6 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">6. Out of Stock Items</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If an item is out of stock, we will hold your order until all items are available for dispatch.
                </p>
              </div>

              {/* Section 7 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">7. Import Duties and Taxes</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Customers have the option to pre-pay taxes and import duties when ordering from veritescalp.com.
                </p>
              </div>

              {/* Section 8 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">8. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing our site and placing an order, you agree to the terms outlined in this Shipping Policy.
                </p>
              </div>

              {/* Contact */}
              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">9. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  For any questions or comments, please reach out to us at:
                </p>
                <p className="text-foreground">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:support@veritescalp.com" className="text-accent hover:underline font-medium">support@veritescalp.com</a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <PreFooterSubscribe />
      </main>
      <Footer />
      <EmailPopup />
    </div>
  );
};

export default ShippingPolicyPage;
