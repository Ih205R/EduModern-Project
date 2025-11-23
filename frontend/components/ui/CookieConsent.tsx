'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';
import Link from 'next/link';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-grayblue shadow-soft-lg p-6 animate-slide-up">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-heading font-extrabold text-lg text-dark mb-2">
              🍪 We Value Your Privacy
            </h3>
            <p className="font-body text-body-sm text-dark/80">
              We use cookies to enhance your browsing experience, serve personalized content, and
              analyze our traffic. By clicking "Accept All", you consent to our use of cookies.{' '}
              <Link href="/cookie-policy" className="text-blue hover:underline">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="md" onClick={declineCookies}>
              Decline
            </Button>
            <Button variant="primary" size="md" onClick={acceptCookies}>
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}