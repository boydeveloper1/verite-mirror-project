import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHeroBanner 
          title="Privacy Policy" 
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" }
          ]}
        />

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-10">
            <div className="max-w-4xl mx-auto">
              
              {/* Introduction */}
              <div className="mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  VERITÉ SCALP operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the "Services"). VERITÉ SCALP is powered by Shopify, which enables us to provide the Services to you. This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us. If there is a conflict between our Terms of Service and this Privacy Policy, this Privacy Policy controls with respect to the collection, processing, and disclosure of your personal information.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
                </p>
              </div>

              {/* Personal Information We Collect */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Personal Information We Collect or Process</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  When we use the term "personal information," we are referring to information that identifies or can reasonably be linked to you or another person. Personal information does not include information that is collected anonymously or that has been de-identified, so that it cannot identify or be reasonably linked to you. We may collect or process the following categories of personal information, including inferences drawn from this personal information, depending on how you interact with the Services, where you live, and as permitted or required by applicable law:
                </p>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Contact details</strong> including your name, address, billing address, shipping address, phone number, and email address.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Financial information</strong> including credit card, debit card, and financial account numbers, payment card information, financial account information, transaction details, form of payment, payment confirmation and other payment details.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Account information</strong> including your username, password, security questions, preferences and settings.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Transaction information</strong> including the items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel and your past transactions.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Communications with us</strong> including the information you include in communications with us, for example, when sending a customer support inquiry.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Device information</strong> including information about your device, browser, or network connection, your IP address, and other unique identifiers.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Usage information</strong> including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.
                  </li>
                </ul>
              </div>

              {/* Personal Information Sources */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Personal Information Sources</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">We may collect personal information from the following sources:</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="pl-4 border-l-2 border-border">
                    <strong className="text-foreground">Directly from you</strong> including when you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information;
                  </li>
                  <li className="pl-4 border-l-2 border-border">
                    <strong className="text-foreground">Automatically through the Services</strong> including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies;
                  </li>
                  <li className="pl-4 border-l-2 border-border">
                    <strong className="text-foreground">From our service providers</strong> including when we engage them to enable certain technology and when they collect or process your personal information on our behalf;
                  </li>
                  <li className="pl-4 border-l-2 border-border">
                    <strong className="text-foreground">From our partners or other third parties.</strong>
                  </li>
                </ul>
              </div>

              {/* How We Use Your Personal Information */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">How We Use Your Personal Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Depending on how you interact with us or which of the Services you use, we may use personal information for the following purposes:</p>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Provide, Tailor, and Improve the Services.</strong> We use your personal information to provide you with the Services, including to perform our contract with you, to process your payments, to fulfill your orders, to remember your preferences and items you are interested in, to send notifications to you related to your account, to process purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, to facilitate any returns and exchanges, to enable you to post reviews, and to create a customized shopping experience for you, such as recommending products related to your purchases.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Marketing and Advertising.</strong> We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you online advertisements for products or services on the Services or other websites, including based on items you previously have purchased or added to your cart and other activity on the Services.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Security and Fraud Prevention.</strong> We use your personal information to authenticate your account, to provide a secure payment and shopping experience, detect, investigate or take action regarding possible fraudulent, illegal, unsafe, or malicious activity, protect public safety, and to secure our services.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Communicating with You.</strong> We use your personal information to provide you with customer support, to be responsive to you, to provide effective services to you and to maintain our business relationship with you.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Legal Reasons.</strong> We use your personal information to comply with applicable law or respond to valid legal process, including requests from law enforcement or government agencies, to investigate or participate in civil discovery, potential or actual litigation, or other adversarial legal proceedings, and to enforce or investigate potential violations of our terms or policies.
                  </li>
                </ul>
              </div>

              {/* How We Disclose Personal Information */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">How We Disclose Personal Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="pl-4 border-l-2 border-border">With Shopify, vendors and other third parties who perform services on our behalf (e.g. IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).</li>
                  <li className="pl-4 border-l-2 border-border">With business and marketing partners to provide marketing services and advertise to you.</li>
                  <li className="pl-4 border-l-2 border-border">When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations.</li>
                  <li className="pl-4 border-l-2 border-border">With our affiliates or otherwise within our corporate group.</li>
                  <li className="pl-4 border-l-2 border-border">In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations, to enforce any applicable terms of service or policies, and to protect or defend the Services, our rights, and the rights of our users or others.</li>
                </ul>
              </div>

              {/* Third Party Websites */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Third Party Websites and Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Services may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites.
                </p>
              </div>

              {/* Children's Data */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Children's Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Services are not intended to be used by children, and we do not knowingly collect any personal information about children under the age of majority in your jurisdiction. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted.
                </p>
              </div>

              {/* Security and Retention */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Security and Retention of Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee "perfect security." In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide you with Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.
                </p>
              </div>

              {/* Your Rights and Choices */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Your Rights and Choices</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Depending on where you live, you may have some or all of the rights listed below in relation to your personal information:</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Right to Access / Know.</strong> You may have a right to request access to personal information that we hold about you.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Right to Delete.</strong> You may have a right to request that we delete personal information we maintain about you.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Right to Correct.</strong> You may have a right to request that we correct inaccurate personal information we maintain about you.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Right of Portability.</strong> You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Right to Opt out of Sale or Sharing for Targeted Advertising.</strong> Depending on where you reside, you may have a right to opt out of the "sale" or "share" of your personal information or to opt out of the processing of your personal information for purposes considered to be "targeted advertising", as defined in applicable privacy laws.
                  </li>
                  <li className="pl-4 border-l-2 border-accent">
                    <strong className="text-foreground">Managing Communication Preferences.</strong> We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you.
                  </li>
                </ul>
              </div>

              {/* Changes to Privacy Policy */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on this website, update the "Last updated" date and provide notice as required by applicable law.
                </p>
              </div>

              {/* Contact */}
              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please email us at{" "}
                  <a href="mailto:support@veritescalp.com" className="text-accent hover:underline font-medium">support@veritescalp.com</a>{" "}
                  or contact us at 151 Dan Leckie Way, Toronto, ON, M5V 4B2, CA. For the purpose of applicable data protection laws, we are the data controller of your personal information.
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

export default PrivacyPolicyPage;
