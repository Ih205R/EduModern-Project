'use client';

import Link from 'next/link';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CheckoutCancelPage() {
  return (
    <Container className="min-h-screen flex items-center justify-center py-16">
      <Card className="max-w-2xl w-full p-12 text-center animate-fade-in-up">
        <div className="mb-6">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">⚠️</span>
          </div>
          <h1 className="text-4xl font-bold text-dark mb-4">
            Payment Cancelled
          </h1>
          <p className="text-xl text-gray-600">
            Your payment was not processed
          </p>
        </div>

        <div className="bg-cream rounded-lg p-6 mb-8">
          <p className="text-gray-700">
            No charges were made to your account. If you encountered any issues during checkout,
            please try again or contact our support team for assistance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/workbooks">
            <Button className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="w-full sm:w-auto">
              Contact Support
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-blue">
          <div className="space-y-2">
            <h3 className="font-semibold text-dark">Common Issues:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Payment method declined</li>
              <li>• Insufficient funds</li>
              <li>• Expired card information</li>
              <li>• Network connection issues</li>
            </ul>
          </div>
        </div>
      </Card>
    </Container>
  );
}
