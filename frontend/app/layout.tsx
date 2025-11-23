import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { ToastProvider, ToastViewport } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'EduModern - Premium Educational Workbooks',
  description:
    'Create, share, and discover high-quality educational workbooks. Premium learning materials for modern students and educators.',
  keywords: 'education, workbooks, learning, teaching, study materials',
  authors: [{ name: 'EduModern' }],
  openGraph: {
    title: 'EduModern - Premium Educational Workbooks',
    description: 'Create, share, and discover high-quality educational workbooks.',
    type: 'website',
    url: 'https://edumodern.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <AuthProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <CookieConsent />
            <ToastViewport />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}