'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { workbooksAPI } from '@/lib/api/workbooks';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { formatPrice, formatDate } from '@/lib/utils/format';

export default function MyWorkbooksPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [workbooks, setWorkbooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      loadWorkbooks();
    }
  }, [user, authLoading, router]);

  const loadWorkbooks = async () => {
    try {
      setIsLoading(true);
      const response = await workbooksAPI.getMyWorkbooks({ page: 1, limit: 100 });
      setWorkbooks(response.data.workbooks);
    } catch (error) {
      console.error('Failed to load workbooks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this workbook?')) {
      return;
    }

    try {
      await workbooksAPI.deleteWorkbook(id);
      loadWorkbooks();
    } catch (error) {
      console.error('Failed to delete workbook:', error);
      alert('Failed to delete workbook');
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream py-12 animate-fade-in-up">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-dark mb-2">My Workbooks</h1>
            <p className="text-gray-600">Manage your educational content</p>
          </div>
          <Link href="/dashboard/workbooks/new">
            <Button>Create New Workbook</Button>
          </Link>
        </div>

        {workbooks.length === 0 ? (
          <Card className="p-12 text-center animate-scale-in">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-dark mb-2">No workbooks yet</h2>
              <p className="text-gray-600 mb-6">
                Start creating educational content and share it with students worldwide
              </p>
              <Link href="/dashboard/workbooks/new">
                <Button size="lg">Create Your First Workbook</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
            {workbooks.map((workbook) => (
              <Card key={workbook.id} className="overflow-hidden hover-lift">
                {workbook.coverImage && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={workbook.coverImage}
                      alt={workbook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {!workbook.coverImage && (
                  <div className="h-48 bg-gradient-to-br from-blue to-lavender flex items-center justify-center">
                    <svg className="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-dark line-clamp-2 flex-1">
                      {workbook.title}
                    </h3>
                    {workbook.isPublished ? (
                      <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                        Draft
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {workbook.description}
                  </p>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <span>{formatPrice(workbook.price)}</span>
                    <span>{workbook.purchaseCount} sales</span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/dashboard/workbooks/${workbook.id}`} className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(workbook.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    Updated {formatDate(workbook.updatedAt)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
