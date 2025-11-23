'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-cream py-12 animate-fade-in-up">
      <Container>
        <div className="max-w-2xl mx-auto">
          <Card className="p-12 text-center animate-scale-in">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-dark mb-4">Payment Cancelled</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your payment was not completed
            </p>

            <div className="bg-cream rounded-xl p-6 mb-8">
              <p className="text-gray-600 mb-4">
                It looks like you cancelled the payment process. Don't worry, no charges were made to your account.
              </p>
              <p className="text-gray-600">
                If you experienced any issues during checkout, please contact our support team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/workbooks">
                <Button size="lg">Browse Workbooks</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Support
                </Button>
              </Link>
            </div>

            <div className="mt-8">
              <Link href="/dashboard" className="text-blue hover:text-blue/80 transition-colors">
                ← Back to Dashboard
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
