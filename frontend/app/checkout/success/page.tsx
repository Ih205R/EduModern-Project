'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ordersAPI } from '@/lib/api/orders';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { formatPrice } from '@/lib/utils/format';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionId) {
      loadOrder();
    } else {
      setError('Invalid session');
      setIsLoading(false);
    }
  }, [sessionId]);

  const loadOrder = async () => {
    try {
      setIsLoading(true);
      const response = await ordersAPI.getOrderBySession(sessionId!);
      setOrder(response.data.order);
    } catch (err) {
      setError('Failed to load order details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-cream py-12 animate-fade-in-up">
        <Container>
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-dark mb-2">Order Not Found</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12 animate-fade-in-up">
      <Container>
        <div className="max-w-2xl mx-auto">
          <Card className="p-12 text-center animate-scale-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-dark mb-4">Payment Successful!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your purchase
            </p>

            <div className="bg-cream rounded-xl p-6 mb-8 text-left">
              <div className="flex items-start gap-4 mb-6">
                {order.workbook.coverImage && (
                  <img
                    src={order.workbook.coverImage}
                    alt={order.workbook.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-dark mb-1">
                    {order.workbook.title}
                  </h3>
                  <p className="text-gray-600">
                    Order #{order.orderNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-dark">
                    {formatPrice(order.amount)}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Status:</strong>{' '}
                  <span className="text-green-600">Completed</span>
                </p>
                <p className="text-sm text-gray-600">
                  A confirmation email has been sent to your email address.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/workbooks/${order.workbook.slug}`}>
                <Button size="lg">View Workbook</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg">
                  Go to Dashboard
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-8">
              You can access your purchased workbooks anytime from your dashboard.
            </p>
          </Card>
        </div>
      </Container>
    </div>
  );
}
