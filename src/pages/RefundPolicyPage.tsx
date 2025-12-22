import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHeroBanner 
          title="Return & Refund Policy" 
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Return & Refund Policy" }
          ]}
        />

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-10">
            <div className="max-w-4xl mx-auto">
              
              {/* Introduction */}
              <div className="mb-12 p-6 rounded-xl bg-accent/10 border border-accent/20">
                <p className="text-lg text-foreground font-medium leading-relaxed">
                  We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
                </p>
              </div>

              {/* Eligibility */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Eligibility for Returns</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
                  </p>
                  <p>
                    To start a return, you can contact us at{" "}
                    <a href="mailto:support@veritescalp.com" className="text-accent hover:underline font-medium">support@veritescalp.com</a>
                  </p>
                  <p>
                    If your return is accepted, we'll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
                  </p>
                  <p>
                    You can always contact us for any return question at{" "}
                    <a href="mailto:support@veritescalp.com" className="text-accent hover:underline font-medium">support@veritescalp.com</a>
                  </p>
                </div>
              </div>

              {/* Damages and Issues */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Damages and Issues</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
                </p>
              </div>

              {/* Exceptions */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Exceptions / Non-Returnable Items</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.
                  </p>
                  <p className="p-4 bg-secondary/50 rounded-lg border-l-4 border-muted-foreground">
                    <strong className="text-foreground">Please note:</strong> Unfortunately, we cannot accept returns on sale items or gift cards.
                  </p>
                </div>
              </div>

              {/* Exchanges */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Exchanges</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
                </p>
              </div>

              {/* EU Cooling Off Period */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">European Union 14 Day Cooling Off Period</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
                </p>
              </div>

              {/* Refunds */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Refunds</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
                  </p>
                  <p>
                    If more than 15 business days have passed since we've approved your return, please contact us at{" "}
                    <a href="mailto:support@veritescalp.com" className="text-accent hover:underline font-medium">support@veritescalp.com</a>
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Need Help?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about our return and refund policy, please don't hesitate to reach out to us at{" "}
                  <a href="mailto:support@veritescalp.com" className="text-accent hover:underline font-medium">support@veritescalp.com</a>. We're here to help!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicyPage;
