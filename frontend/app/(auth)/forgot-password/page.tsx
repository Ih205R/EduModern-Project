'use client';

import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Container from '@/components/layout/Container';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center py-16">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-dark mb-2">Forgot Password</h1>
            <p className="text-gray-600">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {success ? (
            <div className="text-center space-y-6">
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700">
                  Password reset email sent! Please check your inbox and follow the instructions.
                </p>
              </div>
              <Link href="/login">
                <Button className="w-full">Back to Login</Button>
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <Link
                  href="/login"
                  className="text-blue hover:text-blue/80 transition-colors"
                >
                  ← Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
