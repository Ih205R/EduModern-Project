import { Container } from '@/components/layout/Container';
import { Scale } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service - EduModern',
  description: 'Terms and conditions for using EduModern platform.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue/10 rounded-lg mb-4">
              <Scale className="h-8 w-8 text-blue" />
            </div>
            <h1 className="font-heading font-extrabold text-heading-lg text-dark mb-4">
              Terms of Service
            </h1>
            <p className="font-body text-body-md text-dark/60">
              Last Updated: November 23, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none animate-fade-in-up animate-delay-100">
            <div className="space-y-8 font-body text-body-md text-dark/80">
              {/* Section 1 */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="mb-4">
                  By accessing and using EduModern ("the Platform"), you accept and agree to be
                  bound by the terms and provision of this agreement. If you do not agree to these
                  Terms of Service, please do not use our platform.
                </p>
                <p>
                  These Terms apply to all users of the Platform, including without limitation
                  users who are browsers, vendors, customers, merchants, and/or contributors of
                  content.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  2. Account Registration
                </h2>
                <p className="mb-4">
                  To access certain features of the Platform, you must register for an account.
                  When you register, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept all responsibility for activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  3. Content and Intellectual Property
                </h2>
                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  3.1 Your Content
                </h3>
                <p className="mb-4">
                  When you create or upload workbooks or other content to the Platform, you retain
                  ownership of your intellectual property rights. However, by uploading content,
                  you grant EduModern a worldwide, non-exclusive, royalty-free license to use,
                  reproduce, modify, and distribute your content solely for the purpose of operating
                  and improving the Platform.
                </p>

                <h3 className="font-heading font-extrabold text-lg text-dark mb-3 mt-6">
                  3.2 Platform Content
                </h3>
                <p>
                  All content provided by EduModern, including but not limited to text, graphics,
                  logos, icons, images, audio clips, and software, is the property of EduModern
                  or its content suppliers and is protected by international copyright laws.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  4. Purchases and Payments
                </h2>
                <p className="mb-4">
                  All purchases made through the Platform are subject to the following terms:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All prices are in Euros (EUR) unless otherwise stated</li>
                  <li>Payment is processed securely through Stripe</li>
                  <li>Digital products are delivered immediately upon successful payment</li>
                  <li>All sales are final unless otherwise stated in our Refund Policy</li>
                  <li>We reserve the right to refuse or cancel any order at any time</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  5. User Conduct
                </h2>
                <p className="mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the Platform for any unlawful purpose</li>
                  <li>Upload content that infringes on intellectual property rights</li>
                  <li>Upload malicious code, viruses, or harmful software</li>
                  <li>Attempt to gain unauthorized access to the Platform</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Use automated systems to access the Platform without permission</li>
                  <li>Resell or redistribute purchased workbooks without authorization</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  6. AI-Generated Content
                </h2>
                <p className="mb-4">
                  EduModern offers AI-powered content generation tools. By using these tools, you
                  acknowledge that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI-generated content should be reviewed and edited before publication</li>
                  <li>You are responsible for ensuring content accuracy and appropriateness</li>
                  <li>EduModern is not liable for errors in AI-generated content</li>
                  <li>All AI-generated content is subject to the same terms as user-created content</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  7. Termination
                </h2>
                <p>
                  We reserve the right to suspend or terminate your account at any time, with or
                  without notice, for conduct that we believe violates these Terms of Service or
                  is harmful to other users, us, or third parties, or for any other reason at our
                  sole discretion.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  8. Disclaimer of Warranties
                </h2>
                <p>
                  THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY
                  KIND, EITHER EXPRESS OR IMPLIED. EDUMODERN DISCLAIMS ALL WARRANTIES, INCLUDING
                  BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, AND NON-INFRINGEMENT.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  9. Limitation of Liability
                </h2>
                <p>
                  IN NO EVENT SHALL EDUMODERN BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS,
                  DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR
                  USE OF OR INABILITY TO ACCESS OR USE THE PLATFORM.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  10. Governing Law
                </h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the
                  European Union and the jurisdiction in which EduModern operates, without regard
                  to its conflict of law provisions.
                </p>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  11. Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of
                  any material changes by posting the new Terms on the Platform and updating the
                  "Last Updated" date. Your continued use of the Platform after such modifications
                  constitutes your acceptance of the updated Terms.
                </p>
              </section>

              {/* Section 12 */}
              <section>
                <h2 className="font-heading font-extrabold text-heading-md text-dark mb-4">
                  12. Contact Information
                </h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-cream rounded-lg p-6">
                  <p className="mb-2">
                    <strong>Email:</strong> legal@edumodern.com
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