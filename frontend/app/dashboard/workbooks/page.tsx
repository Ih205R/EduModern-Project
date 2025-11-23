'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { workbooksApi } from '@/lib/api/workbooks';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';

export default function MyWorkbooksPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [workbooks, setWorkbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchWorkbooks = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const data = await workbooksApi.getUserWorkbooks(1, 50);
        setWorkbooks(data.data || []);
      } catch (error) {
        console.error('Failed to fetch workbooks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkbooks();
  }, [user]);

  if (authLoading || !user) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="animate-fade-in-up">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-dark mb-2">My Workbooks</h1>
            <p className="text-gray-600">Manage your educational content</p>
          </div>
          <Link href="/dashboard/workbooks/new">
            <Button>+ Create New</Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : workbooks.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-dark mb-2">No workbooks yet</h2>
              <p className="text-gray-600 mb-6">
                Start creating your first workbook and share your knowledge with students
              </p>
              <Link href="/dashboard/workbooks/new">
                <Button>Create Your First Workbook</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workbooks.map((workbook) => (
              <Card key={workbook.id} className="overflow-hidden hover-lift">
                <div className="aspect-video bg-gradient-to-br from-blue to-lavender flex items-center justify-center text-white text-2xl font-bold">
                  {workbook.title.substring(0, 2).toUpperCase()}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      workbook.status === 'PUBLISHED' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {workbook.status}
                    </span>
                    <span className="text-sm font-bold text-blue">
                      €{workbook.price}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-2 line-clamp-2">
                    {workbook.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {workbook.description}
                  </p>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/workbooks/${workbook.id}/edit`} className="flex-1">
                      <Button variant="outline" className="w-full">Edit</Button>
                    </Link>
                    <Link href={`/workbooks/${workbook.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full">View</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
