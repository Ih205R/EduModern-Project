'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Container } from './Container';
import { Menu, X, User, LogOut, BookOpen } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-grayblue shadow-soft">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue" />
            <span className="font-heading font-extrabold text-heading-sm text-dark">
              EduModern
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/workbooks"
              className="font-subheading font-medium text-dark hover:text-blue transition-colors"
            >
              Browse Workbooks
            </Link>
            <Link
              href="/about"
              className="font-subheading font-medium text-dark hover:text-blue transition-colors"
            >
              About Us
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="font-subheading font-medium text-dark hover:text-blue transition-colors"
                >
                  Dashboard
                </Link>
                <Button variant="outline" size="sm" onClick={() => logout()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-dark" />
            ) : (
              <Menu className="h-6 w-6 text-dark" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 border-t border-grayblue">
            <Link
              href="/workbooks"
              className="block font-subheading font-medium text-dark hover:text-blue"
            >
              Browse Workbooks
            </Link>
            <Link
              href="/about"
              className="block font-subheading font-medium text-dark hover:text-blue"
            >
              About Us
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block font-subheading font-medium text-dark hover:text-blue"
                >
                  Dashboard
                </Link>
                <Button variant="outline" size="sm" onClick={() => logout()} className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button variant="primary" size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        )}
      </Container>
    </header>
  );
}