import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHeroBanner 
          title="Terms of Service" 
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Terms of Service" }
          ]}
        />

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-10">
            <div className="max-w-4xl mx-auto">
              
              {/* Overview */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Overview</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Welcome to VERITÉ SCALP! The terms "we", "us" and "our" refer to VERITÉ SCALP. VERITÉ SCALP operates this store and website, including all related information, content, features, tools, products and services in order to provide you, the customer, with a curated shopping experience (the "Services"). VERITÉ SCALP is powered by Shopify, which enables us to provide the Services to you.
                  </p>
                  <p>
                    The below terms and conditions, together with any policies referenced herein (these "Terms of Service" or "Terms") describe your rights and responsibilities when you use the Services.
                  </p>
                  <p className="p-4 bg-secondary/50 rounded-lg border-l-4 border-accent">
                    <strong className="text-foreground">Please read these Terms of Service carefully, as they include important information about your legal rights and cover areas such as warranty disclaimers and limitations of liability.</strong>
                  </p>
                  <p>
                    By visiting, interacting with or using our Services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these Terms of Service or Privacy Policy, you should not use or access our Services.
                  </p>
                </div>
              </div>

              {/* Section 1 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Section 1 - Access and Account</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, and you have given us your consent to allow any of your minor dependents to use the Services on devices you own, purchase or manage.
                  </p>
                  <p>
                    To use the Services, including accessing or browsing our online stores or purchasing any of the products or services we offer, you may be asked to provide certain information, such as your email address, billing, payment, and shipping information. You represent and warrant that all the information you provide in our stores is correct, current and complete and that you have all rights necessary to provide this information.
                  </p>
                  <p>
                    You are solely responsible for maintaining the security of your account credentials and for all of your account activity. You may not transfer, sell, assign, or license your account to any other person.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Section 2 - Our Products</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We have made every effort to provide an accurate representation of our products and services in our online stores. However, please note that colors or product appearance may differ from how they may appear on your screen due to the type of device you use to access the store and your device settings and configuration.
                  </p>
                  <p>
                    We do not warrant that the appearance or quality of any products or services purchased by you will meet your expectations or be the same as depicted or rendered in our online stores.
                  </p>
                  <p>
                    All descriptions of products are subject to change at any time without notice at our sole discretion. We reserve the right to discontinue any product at any time and may limit the quantities of any products that we offer to any person, geographic region or jurisdiction, on a case-by-case basis.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Section 3 - Orders</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    When you place an order, you are making an offer to purchase. VERITÉ SCALP reserves the right to accept or decline your order for any reason at its discretion. Your order is not accepted until VERITÉ SCALP confirms acceptance. We must receive and process your payment before your order is accepted. Please review your order carefully before submitting, as VERITÉ SCALP may be unable to accommodate cancellation requests after an order is accepted.
                  </p>
                  <p>
                    Your purchases are subject to return or exchange solely in accordance with our Refund Policy.
                  </p>
                  <p>
                    You represent and warrant that your purchases are for your own personal or household use and not for commercial resale or export.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Section 4 - Prices and Billing</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Prices, discounts and promotions are subject to change without notice. The price charged for a product or service will be the price in effect at the time the order is placed and will be set out in your order confirmation email. Unless otherwise expressly stated, posted prices do not include taxes, shipping, handling, customs or import charges.
                  </p>
                  <p>
                    You agree to provide current, complete and accurate purchase, payment and account information for all purchases made at our stores. You agree to promptly update your account and other information, including your email address, credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Section 5 - Shipping and Delivery</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We are not liable for shipping and delivery delays. All delivery times are estimates only and are not guaranteed. We are not responsible for delays caused by shipping carriers, customs processing, or events outside our control. Once we transfer products to the carrier, title and risk of loss passes to you.
                </p>
              </div>

              {/* Section 6 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Section 6 - Intellectual Property</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Our Services, including but not limited to all trademarks, brands, text, displays, images, graphics, product reviews, video, and audio, and the design, selection, and arrangement thereof, are owned by VERITÉ SCALP, its affiliates or licensors and are protected by U.S. and foreign patent, copyright and other intellectual property laws.
                  </p>
                  <p>
                    These Terms permit you to use the Services for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on the Services without our prior written consent.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Section 7 - Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Services may contain materials and hyperlinks to websites provided or operated by third parties. We are not responsible for examining or evaluating the content or accuracy of any third-party materials or websites you choose to access. If you decide to leave the Services to access these materials or third party sites, you do so at your own risk.
                </p>
              </div>

              {/* Section 8 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Section 8 - Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All personal information we collect through the Services is subject to our Privacy Policy. By using the Services, you acknowledge that you have read these privacy policies.
                </p>
              </div>

              {/* Section 9 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Section 9 - Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed p-4 bg-secondary/50 rounded-lg border-l-4 border-muted-foreground">
                  EXCEPT AS EXPRESSLY STATED BY VERITÉ SCALP, THE SERVICES AND ALL PRODUCTS OFFERED THROUGH THE SERVICES ARE PROVIDED 'AS IS' AND 'AS AVAILABLE' FOR YOUR USE, WITHOUT ANY REPRESENTATION, WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, MERCHANTABLE QUALITY, FITNESS FOR A PARTICULAR PURPOSE, DURABILITY, TITLE, AND NON-INFRINGEMENT.
                </p>
              </div>

              {/* Section 10 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Section 10 - Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed p-4 bg-secondary/50 rounded-lg border-l-4 border-muted-foreground">
                  TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO CASE SHALL VERITÉ SCALP, OUR PARTNERS, DIRECTORS, OFFICERS, EMPLOYEES, AFFILIATES, AGENTS, CONTRACTORS, SERVICE PROVIDERS OR LICENSORS BE LIABLE FOR ANY INJURY, LOSS, CLAIM, OR ANY DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, SPECIAL, OR CONSEQUENTIAL DAMAGES OF ANY KIND.
                </p>
              </div>

              {/* Section 11 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Section 11 - Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify, defend and hold harmless VERITÉ SCALP, and our affiliates, partners, officers, directors, employees, agents, contractors, licensors, and service providers from any losses, damages, liabilities or claims, including reasonable attorneys' fees, payable to any third party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, your violation of any law or the rights of a third party, or your access to and use of the Services.
                </p>
              </div>

              {/* Section 12 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Section 12 - Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Canada and the Province of Ontario.
                </p>
              </div>

              {/* Section 13 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Section 13 - Changes to Terms of Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes. It is your responsibility to check this page periodically for changes.
                </p>
              </div>

              {/* Contact */}
              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Questions about the Terms of Service should be sent to us at{" "}
                  <a href="mailto:support@veritescalp.com" className="text-accent hover:underline font-medium">support@veritescalp.com</a>.
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

export default TermsOfServicePage;
