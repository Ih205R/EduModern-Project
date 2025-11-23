'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { workbooksApi } from '@/lib/api/workbooks';
import { ordersApi } from '@/lib/api/orders';
import { Workbook } from '@/lib/types';
import { formatPrice, formatDate } from '@/lib/utils/format';
import { useAuth } from '@/lib/context/AuthContext';
import { ShoppingCart, Eye, Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WorkbookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [workbook, setWorkbook] = useState<Workbook | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    loadWorkbook();
  }, [params.slug]);

  async function loadWorkbook() {
    try {
      setLoading(true);
      const data = await workbooksApi.getBySlug(params.slug as string);
      setWorkbook(data);
    } catch (error) {
      console.error('Failed to load workbook:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePurchase() {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      setPurchasing(true);
      const { url } = await ordersApi.createCheckout(workbook!.id);
      window.location.href = url;
    } catch (error) {
      console.error('Purchase failed:', error);
      setPurchasing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!workbook) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading font-extrabold text-2xl text-dark mb-4">
            Workbook not found
          </h1>
          <Link href="/workbooks">
            <Button variant="primary">Browse Workbooks</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <Container>
        {/* Back Button */}
        <Link href="/workbooks" className="inline-flex items-center mb-8 text-dark/70 hover:text-blue transition-colors animate-fade-in-left">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-subheading font-medium">Back to Workbooks</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Cover Image */}
          <div className="lg:col-span-1 animate-fade-in-left">
            <div className="sticky top-24">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-soft-lg bg-white">
                {workbook.coverUrl ? (
                  <Image
                    src={workbook.coverUrl}
                    alt={workbook.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-lavender to-blue/20">
                    <span className="font-heading font-extrabold text-8xl text-dark/20">
                      {workbook.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Purchase Card */}
              <div className="mt-6 bg-white rounded-lg p-6 shadow-soft">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-heading font-extrabold text-3xl text-blue">
                    {formatPrice(workbook.priceCents, workbook.currency)}
                  </span>
                  <span className="font-body text-sm text-dark/60">one-time payment</span>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="w-full group mb-3"
                >
                  {purchasing ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Buy Now
                    </>
                  )}
                </Button>

                <p className="text-xs text-center font-body text-dark/60">
                  Instant download after payment
                </p>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 animate-fade-in-right">
            {/* Title and Meta */}
            <div className="mb-8">
              {workbook.niche && (
                <span className="inline-block px-4 py-2 bg-lavender rounded-full text-sm font-subheading font-medium text-dark mb-4">
                  {workbook.niche}
                </span>
              )}
              <h1 className="font-heading font-extrabold text-heading-xl text-dark mb-4">
                {workbook.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-dark/60 font-body">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>by {workbook.owner?.name || 'Anonymous'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(workbook.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{workbook.viewCount} views</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-8 shadow-soft mb-8">
              <h2 className="font-heading font-extrabold text-heading-sm text-dark mb-4">
                About This Workbook
              </h2>
              <p className="font-body text-body-lg text-dark/80 leading-relaxed whitespace-pre-wrap">
                {workbook.description || 'No description available.'}
              </p>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-lg p-8 shadow-soft mb-8">
              <h2 className="font-heading font-extrabold text-heading-sm text-dark mb-4">
                What's Included
              </h2>
              <ul className="space-y-3 font-body text-body-md text-dark/80">
                <li className="flex items-start">
                  <span className="text-blue mr-3 mt-1">✓</span>
                  <span>High-quality PDF format, ready to print</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue mr-3 mt-1">✓</span>
                  <span>Instant download after purchase</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue mr-3 mt-1">✓</span>
                  <span>Lifetime access - download up to 5 times</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue mr-3 mt-1">✓</span>
                  <span>Expert-created educational content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue mr-3 mt-1">✓</span>
                  <span>Perfect for students, teachers, and self-learners</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue to-blue/80 rounded-lg p-8 text-white">
              <h2 className="font-heading font-extrabold text-2xl mb-3">
                Ready to start learning?
              </h2>
              <p className="font-body text-white/90 mb-6">
                Purchase this workbook now and get instant access to premium educational content.
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={handlePurchase}
                disabled={purchasing}
                className="hover-glow"
              >
                {purchasing ? 'Processing...' : `Buy for ${formatPrice(workbook.priceCents, workbook.currency)}`}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}