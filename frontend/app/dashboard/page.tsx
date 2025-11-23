'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { workbooksAPI } from '@/lib/api/workbooks';
import { ordersAPI } from '@/lib/api/orders';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { formatPrice, formatDate } from '@/lib/utils/format';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    myWorkbooks: 0,
    publishedWorkbooks: 0,
    purchasedWorkbooks: 0,
    totalRevenue: 0,
  });
  const [recentWorkbooks, setRecentWorkbooks] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      loadDashboardData();
    }
  }, [user, authLoading, router]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Load user's workbooks
      const workbooksRes = await workbooksAPI.getMyWorkbooks({ page: 1, limit: 5 });
      setRecentWorkbooks(workbooksRes.data.workbooks);

      // Load user's orders
      const ordersRes = await ordersAPI.getMyOrders({ page: 1, limit: 5 });
      setRecentOrders(ordersRes.data.orders);

      // Calculate stats
      const allWorkbooksRes = await workbooksAPI.getMyWorkbooks({ page: 1, limit: 100 });
      const myWorkbooks = allWorkbooksRes.data.workbooks;

      setStats({
        myWorkbooks: myWorkbooks.length,
        publishedWorkbooks: myWorkbooks.filter((w: any) => w.isPublished).length,
        purchasedWorkbooks: ordersRes.data.pagination.total,
        totalRevenue: myWorkbooks.reduce((sum: number, w: any) => 
          sum + (parseFloat(w.price) * w.purchaseCount), 0
        ),
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your account</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-scale-in">
          <Card className="p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">My Workbooks</p>
                <p className="text-3xl font-bold text-dark">{stats.myWorkbooks}</p>
              </div>
              <div className="w-12 h-12 bg-blue/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Published</p>
                <p className="text-3xl font-bold text-dark">{stats.publishedWorkbooks}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Purchased</p>
                <p className="text-3xl font-bold text-dark">{stats.purchasedWorkbooks}</p>
              </div>
              <div className="w-12 h-12 bg-lavender rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Revenue</p>
                <p className="text-3xl font-bold text-dark">{formatPrice(stats.totalRevenue)}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Workbooks */}
          <div className="animate-fade-in-left">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark">My Workbooks</h2>
              <Link href="/dashboard/workbooks">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentWorkbooks.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-gray-600 mb-4">You haven't created any workbooks yet</p>
                  <Link href="/dashboard/workbooks/new">
                    <Button>Create Your First Workbook</Button>
                  </Link>
                </Card>
              ) : (
                recentWorkbooks.map((workbook) => (
                  <Card key={workbook.id} className="p-4 hover-lift">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-dark mb-1">{workbook.title}</h3>
                        <p className="text-sm text-gray-600">
                          {workbook.isPublished ? (
                            <span className="text-green-600">Published</span>
                          ) : (
                            <span className="text-gray-500">Draft</span>
                          )} · {workbook.purchaseCount} sales
                        </p>
                      </div>
                      <Link href={`/dashboard/workbooks/${workbook.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="animate-fade-in-right">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark">Recent Purchases</h2>
              <Link href="/dashboard/settings">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-gray-600 mb-4">You haven't purchased any workbooks yet</p>
                  <Link href="/workbooks">
                    <Button>Browse Workbooks</Button>
                  </Link>
                </Card>
              ) : (
                recentOrders.map((order) => (
                  <Card key={order.id} className="p-4 hover-lift">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-dark mb-1">{order.workbook.title}</h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.createdAt)} · {formatPrice(order.amount)}
                        </p>
                      </div>
                      <Link href={`/workbooks/${order.workbook.slug}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
