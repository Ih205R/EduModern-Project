'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const id = searchParams.get('session_id');
    if (id) {
      setSessionId(id);
    }
  }, [searchParams]);

  return (
    <Container className="min-h-screen flex items-center justify-center py-16">
      <Card className="max-w-2xl w-full p-12 text-center animate-bounce-in">
        <div className="mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">✓</span>
          </div>
          <h1 className="text-4xl font-bold text-dark mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase
          </p>
          {sessionId && (
            <p className="text-sm text-gray-500">
              Session ID: {sessionId}
            </p>
          )}
        </div>

        <div className="bg-cream rounded-lg p-6 mb-8">
          <p className="text-gray-700">
            Your order has been confirmed and you'll receive an email receipt shortly.
            You can now access your purchased workbooks from your dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button className="w-full sm:w-auto">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/workbooks">
            <Button variant="outline" className="w-full sm:w-auto">
              Browse More Workbooks
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-blue">
          <p className="text-sm text-gray-600">
            Need help? <Link href="/contact" className="text-blue hover:text-blue/80">Contact our support team</Link>
          </p>
        </div>
      </Card>
    </Container>
  );
}
