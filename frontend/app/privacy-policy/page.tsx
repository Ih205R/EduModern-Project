import { Container } from '@/components/layout/Container';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - EduModern',
  description: 'Learn how EduModern protects and handles your personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue/10 rounded-lg mb-4">
              <Shield className="h-8 w-8 text-blue" />
            </div>
            <h1 className="font-heading font-extrabold text-heading-lg text-dark mb-4">
              Privacy Policy
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
                  Introduction
                </h2>
                <p>
                  EduModern ("we," "our," or "us") is committed to protecting your privacy. This
                  Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you use our platform. Please read this policy carefully.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  1. Information We Collect
                </h2>
                
                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  1.1 Personal Information
                </h3>
                <p className="mb-4">We collect information that you provide directly to us:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and email address (required for account creation)</li>
                  <li>Payment information (processed securely through Stripe)</li>
                  <li>Profile information (optional: bio, avatar)</li>
                  <li>Communication preferences</li>
                </ul>

                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  1.2 Content Information
                </h3>
                <p className="mb-4">Information related to your use of the platform:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Workbooks you create, upload, or purchase</li>
                  <li>Comments, reviews, and ratings</li>
                  <li>Search queries and browsing history on the platform</li>
                </ul>

                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  1.3 Automatically Collected Information
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Access times and pages viewed</li>
                  <li>Referring website addresses</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create and manage your account</li>
                  <li>Process your purchases and deliver digital products</li>
                  <li>Send you order confirmations and updates</li>
                  <li>Provide customer support</li>
                  <li>Improve and personalize your experience</li>
                  <li>Analyze platform usage and trends</li>
                  <li>Detect and prevent fraud and abuse</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              {/* AI and Data Processing */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  3. AI and Data Processing
                </h2>
                <p className="mb-4">
                  When you use our AI-powered content generation features:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your prompts and generated content may be processed by OpenAI</li>
                  <li>We do not share personally identifiable information with AI providers</li>
                  <li>Generated content is stored securely and associated with your account</li>
                  <li>You retain full ownership of all AI-generated content</li>
                </ul>
              </section>

              {/* Data Sharing */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  4. How We Share Your Information
                </h2>
                <p className="mb-4">We may share your information with:</p>
                
                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  4.1 Service Providers
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Stripe:</strong> Payment processing</li>
                  <li><strong>AWS S3:</strong> File storage</li>
                  <li><strong>OpenAI:</strong> AI content generation</li>
                  <li><strong>Email providers:</strong> Transactional emails</li>
                </ul>

                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  4.2 Legal Requirements
                </h3>
                <p>
                  We may disclose your information if required by law, legal process, or
                  governmental request, or to protect our rights, property, or safety.
                </p>

                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  4.3 Business Transfers
                </h3>
                <p>
                  In the event of a merger, acquisition, or sale of assets, your information
                  may be transferred to the acquiring entity.
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  5. Data Security
                </h2>
                <p className="mb-4">We implement security measures to protect your data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Encrypted storage for sensitive information</li>
                  <li>Secure password hashing (bcrypt)</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                  <li>Monitoring for unauthorized access</li>
                </ul>
                <p className="mt-4">
                  However, no method of transmission over the internet is 100% secure. While we
                  strive to protect your data, we cannot guarantee absolute security.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  6. Your Rights (GDPR Compliance)
                </h2>
                <p className="mb-4">If you are in the European Union, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                  <li><strong>Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                  <li><strong>Objection:</strong> Object to certain data processing activities</li>
                  <li><strong>Withdraw Consent:</strong> Opt-out of marketing communications</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, contact us at privacy@edumodern.com
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  7. Cookies and Tracking
                </h2>
                <p className="mb-4">We use cookies and similar technologies for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Authentication and session management</li>
                  <li>Preference storage</li>
                  <li>Analytics and performance monitoring</li>
                  <li>Personalization</li>
                </ul>
                <p className="mt-4">
                  You can control cookies through your browser settings. See our{' '}
                  <a href="/cookie-policy" className="text-blue hover:underline">
                    Cookie Policy
                  </a>{' '}
                  for more information.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  8. Data Retention
                </h2>
                <p>
                  We retain your personal information for as long as necessary to provide our
                  services and comply with legal obligations. When you delete your account, we
                  will delete or anonymize your personal data within 30 days, except where
                  retention is required by law.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  9. Children's Privacy
                </h2>
                <p>
                  Our platform is not intended for children under 13. We do not knowingly collect
                  personal information from children under 13. If you believe we have collected
                  information from a child under 13, please contact us immediately.
                </p>
              </section>

              {/* International Transfers */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  10. International Data Transfers
                </h2>
                <p>
                  Your information may be transferred to and processed in countries other than
                  your country of residence. We ensure appropriate safeguards are in place to
                  protect your data in accordance with this Privacy Policy and applicable laws.
                </p>
              </section>

              {/* Changes to Policy */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  11. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of
                  material changes by posting the new policy on this page and updating the
                  "Last Updated" date. Your continued use of the platform after changes
                  constitutes acceptance of the updated policy.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  12. Contact Us
                </h2>
                <p className="mb-4">
                  For questions about this Privacy Policy or to exercise your rights, contact us:
                </p>
                <div className="bg-cream rounded-lg p-6">
                  <p className="mb-2">
                    <strong>Privacy Team:</strong> privacy@edumodern.com
                  </p>
                  <p className="mb-2">
                    <strong>Data Protection Officer:</strong> dpo@edumodern.com
                  </p>
                  <p className="mb-2">
                    <strong>General Support:</strong> support@edumodern.com
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