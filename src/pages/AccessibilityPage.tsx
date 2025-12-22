import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";

const AccessibilityPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeroBanner title="Accessibility" breadcrumbs={[{ label: "Accessibility" }]} />
      
      <main className="container mx-auto px-4 md:px-10 py-12 md:py-16">
        <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <p className="text-muted-foreground text-lg mb-8">
            VERITÉ SCALP is committed to ensuring digital accessibility for people with disabilities. 
            We are continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>

          <section className="mb-10 animate-fade-in-up">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Our Commitment</h2>
            <p className="text-muted-foreground mb-4">
              We strive to ensure that our website is accessible to people with disabilities. 
              We have invested significant resources to help ensure that our website is made easier to use 
              and more accessible for people with disabilities.
            </p>
          </section>

          <section className="mb-10 animate-fade-in-up [animation-delay:100ms]">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Accessibility Features</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Clear and consistent navigation throughout the website</li>
              <li>Descriptive alt text for all images</li>
              <li>High color contrast for better readability</li>
              <li>Keyboard navigation support</li>
              <li>Responsive design for various screen sizes</li>
              <li>Semantic HTML structure for screen readers</li>
              <li>Focus indicators for interactive elements</li>
              <li>Text resizing capabilities without loss of functionality</li>
            </ul>
          </section>

          <section className="mb-10 animate-fade-in-up [animation-delay:200ms]">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Standards</h2>
            <p className="text-muted-foreground mb-4">
              We are working to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. 
              These guidelines explain how to make web content more accessible for people with disabilities.
            </p>
          </section>

          <section className="mb-10 animate-fade-in-up [animation-delay:300ms]">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Assistive Technologies</h2>
            <p className="text-muted-foreground mb-4">
              Our website is designed to be compatible with the following assistive technologies:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
            </ul>
          </section>

          <section className="mb-10 animate-fade-in-up [animation-delay:400ms]">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Feedback</h2>
            <p className="text-muted-foreground mb-4">
              We welcome your feedback on the accessibility of the VERITÉ SCALP website. 
              If you encounter any accessibility barriers or have suggestions for improvement, please contact us:
            </p>
            <ul className="list-none text-muted-foreground space-y-2">
              <li><strong className="text-foreground">Email:</strong> support@veritescalp.com</li>
              <li><strong className="text-foreground">Subject Line:</strong> Accessibility Feedback</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We try to respond to accessibility feedback within 2 business days.
            </p>
          </section>

          <section className="animate-fade-in-up [animation-delay:500ms]">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Continuous Improvement</h2>
            <p className="text-muted-foreground">
              We view accessibility as an ongoing effort. We regularly review our website and update our 
              practices to ensure that all visitors have the best experience possible. This page was last 
              updated on {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccessibilityPage;
