import Link from 'next/link';
import { Container } from './Container';
import { BookOpen, Mail, Twitter, Linkedin, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-grayblue mt-20">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue" />
              <span className="font-heading font-extrabold text-xl text-dark">EduModern</span>
            </Link>
            <p className="font-body text-body-sm text-dark/70 mb-4">
              Premium educational workbooks for modern learners. Create, share, and discover
              high-quality learning materials.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-dark/60 hover:text-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-dark/60 hover:text-blue transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-dark/60 hover:text-blue transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-heading font-extrabold text-dark mb-4">Product</h4>
            <ul className="space-y-2 font-body text-body-sm">
              <li>
                <Link href="/workbooks" className="text-dark/70 hover:text-blue transition-colors">
                  Browse Workbooks
                </Link>
              </li>
              <li>
                <Link href="/dashboard/workbooks/new" className="text-dark/70 hover:text-blue transition-colors">
                  Create Workbook
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-dark/70 hover:text-blue transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-extrabold text-dark mb-4">Company</h4>
            <ul className="space-y-2 font-body text-body-sm">
              <li>
                <Link href="/about" className="text-dark/70 hover:text-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-dark/70 hover:text-blue transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-dark/70 hover:text-blue transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-extrabold text-dark mb-4">Legal</h4>
            <ul className="space-y-2 font-body text-body-sm">
              <li>
                <Link href="/privacy-policy" className="text-dark/70 hover:text-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-dark/70 hover:text-blue transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-dark/70 hover:text-blue transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-dark/70 hover:text-blue transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-grayblue flex flex-col md:flex-row justify-between items-center">
          <p className="font-body text-body-sm text-dark/60">
            © {currentYear} EduModern. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="mailto:support@edumodern.com"
              className="flex items-center space-x-2 text-dark/60 hover:text-blue transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="font-body text-sm">support@edumodern.com</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}