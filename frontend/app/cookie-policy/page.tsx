import { Container } from '@/components/layout/Container';
import { Cookie } from 'lucide-react';

export const metadata = {
  title: 'Cookie Policy - EduModern',
  description: 'Learn about how EduModern uses cookies and tracking technologies.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue/10 rounded-lg mb-4">
              <Cookie className="h-8 w-8 text-blue" />
            </div>
            <h1 className="font-heading font-extrabold text-heading-lg text-dark mb-4">
              Cookie Policy
            </h1>
            <p className="font-body text-body-md text-dark/60">
              Last Updated: November 23, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none animate-fade-in-up animate-delay-100">
            <div className="space-y-8 font-body text-body-md text-dark/80">
              {/* Introduction */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  What Are Cookies?
                </h2>
                <p>
                  Cookies are small text files stored on your device when you visit a website.
                  They help us provide you with a better experience by remembering your preferences
                  and understanding how you use our platform.
                </p>
              </section>

              {/* Types of Cookies */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  Types of Cookies We Use
                </h2>

                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  1. Essential Cookies
                </h3>
                <p className="mb-4">
                  These cookies are necessary for the platform to function properly. They enable
                  core functionality such as security, network management, and accessibility.
                </p>
                <div className="bg-cream rounded-lg p-4 mb-4">
                  <p className="mb-2"><strong>Examples:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Authentication tokens</li>
                    <li>Session management</li>
                    <li>Security verification</li>
                  </ul>
                  <p className="mt-3 text-sm"><strong>Duration:</strong> Session or up to 7 days</p>
                </div>

                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  2. Functional Cookies
                </h3>
                <p className="mb-4">
                  These cookies allow us to remember your preferences and provide enhanced features.
                </p>
                <div className="bg-cream rounded-lg p-4 mb-4">
                  <p className="mb-2"><strong>Examples:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Language preferences</li>
                    <li>Display settings</li>
                    <li>Cookie consent choices</li>
                  </ul>
                  <p className="mt-3 text-sm"><strong>Duration:</strong> Up to 1 year</p>
                </div>

                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  3. Analytics Cookies
                </h3>
                <p className="mb-4">
                  These cookies help us understand how visitors interact with our platform by
                  collecting anonymous information about usage patterns.
                </p>
                <div className="bg-cream rounded-lg p-4 mb-4">
                  <p className="mb-2"><strong>Examples:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Page views and navigation paths</li>
                    <li>Time spent on pages</li>
                    <li>Click patterns</li>
                    <li>Error tracking</li>
                  </ul>
                  <p className="mt-3 text-sm"><strong>Duration:</strong> Up to 2 years</p>
                </div>

                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  4. Marketing Cookies
                </h3>
                <p className="mb-4">
                  These cookies track your activity to deliver relevant advertisements and measure
                  campaign effectiveness. We only use these with your explicit consent.
                </p>
                <div className="bg-cream rounded-lg p-4 mb-4">
                  <p className="mb-2"><strong>Examples:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Ad personalization</li>
                    <li>Conversion tracking</li>
                    <li>Retargeting</li>
                  </ul>
                  <p className="mt-3 text-sm"><strong>Duration:</strong> Up to 1 year</p>
                </div>
              </section>

              {/* Third-Party Cookies */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  Third-Party Cookies
                </h2>
                <p className="mb-4">
                  We use services from trusted third parties that may set cookies on your device:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Stripe:</strong> Payment processing and fraud prevention
                  </li>
                  <li>
                    <strong>Google Analytics:</strong> Website analytics and performance monitoring
                  </li>
                  <li>
                    <strong>AWS CloudFront:</strong> Content delivery and performance
                  </li>
                </ul>
              </section>

              {/* Managing Cookies */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  How to Manage Cookies
                </h2>
                
                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  Cookie Consent Banner
                </h3>
                <p className="mb-4">
                  When you first visit EduModern, you'll see a cookie consent banner. You can
                  choose to accept all cookies or decline non-essential ones.
                </p>

                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  Browser Settings
                </h3>
                <p className="mb-4">
                  Most browsers allow you to control cookies through their settings. Here's how:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                  </li>
                  <li>
                    <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies
                  </li>
                </ul>
                <p className="mt-4 text-sm italic">
                  Note: Blocking essential cookies may affect platform functionality.
                </p>
              </section>

              {/* Local Storage */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  Local Storage
                </h2>
                <p className="mb-4">
                  In addition to cookies, we use browser local storage to store:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Authentication tokens (for persistent login)</li>
                  <li>User preferences</li>
                  <li>Cart information</li>
                  <li>Form draft data</li>
                </ul>
                <p className="mt-4">
                  Local storage data is stored only on your device and is not transmitted to
                  our servers unless explicitly required for functionality.
                </p>
              </section>

              {/* Do Not Track */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  Do Not Track Signals
                </h2>
                <p>
                  We respect Do Not Track (DNT) browser signals. When DNT is enabled, we will
                  not set non-essential cookies or tracking technologies. However, essential
                  cookies required for platform functionality will still be used.
                </p>
              </section>

              {/* Updates */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  Changes to This Policy
                </h2>
                <p>
                  We may update this Cookie Policy to reflect changes in technology, legislation,
                  or our practices. We will notify you of significant changes by updating the
                  "Last Updated" date at the top of this page.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  Questions About Cookies?
                </h2>
                <p className="mb-4">
                  If you have questions about our use of cookies, please contact us:
                </p>
                <div className="bg-cream rounded-lg p-6">
                  <p className="mb-2">
                    <strong>Email:</strong> privacy@edumodern.com
                  </p>
                  <p className="mb-2">
                    <strong>Support:</strong> support@edumodern.com
                  </p>
                  <p>
                    <strong>Address:</strong> EduModern HQ, Education District, EU
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}