'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { workbooksApi } from '@/lib/api/workbooks';
import { ordersApi } from '@/lib/api/orders';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    workbooks: 0,
    purchases: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        // Fetch user's workbooks
        const workbooksData = await workbooksApi.getUserWorkbooks(1, 100);
        
        // Fetch user's orders
        const ordersData = await ordersApi.getUserOrders(1, 100);

        setStats({
          workbooks: workbooksData.data?.length || 0,
          purchases: ordersData.data?.length || 0,
          revenue: 0, // Calculate from orders if needed
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark mb-2">
            Welcome back, {user.firstName || 'there'}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your EduModern account
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {user.role === 'EDUCATOR' ? 'My Workbooks' : 'Purchased'}
                </p>
                <p className="text-3xl font-bold text-dark">
                  {loading ? '-' : user.role === 'EDUCATOR' ? stats.workbooks : stats.purchases}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue/10 rounded-lg flex items-center justify-center">
                📚
              </div>
            </div>
          </Card>

          <Card className="p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-dark">
                  {loading ? '-' : stats.purchases}
                </p>
              </div>
              <div className="w-12 h-12 bg-lavender/30 rounded-lg flex items-center justify-center">
                🛒
              </div>
            </div>
          </Card>

          <Card className="p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Account Status</p>
                <p className="text-xl font-bold text-green-600">Active</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                ✓
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.role === 'EDUCATOR' && (
              <Card className="p-6 hover-lift cursor-pointer" onClick={() => router.push('/dashboard/workbooks/new')}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">+</span>
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-2">Create Workbook</h3>
                  <p className="text-sm text-gray-600">Start creating a new workbook</p>
                </div>
              </Card>
            )}

            <Card className="p-6 hover-lift cursor-pointer" onClick={() => router.push('/workbooks')}>
              <div className="text-center">
                <div className="w-16 h-16 bg-lavender/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">Browse Workbooks</h3>
                <p className="text-sm text-gray-600">Discover new learning materials</p>
              </div>
            </Card>

            <Card className="p-6 hover-lift cursor-pointer" onClick={() => router.push('/dashboard/settings')}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-blue/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚙️</span>
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">Account Settings</h3>
                <p className="text-sm text-gray-600">Manage your profile and preferences</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        {user.role === 'EDUCATOR' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark">My Workbooks</h2>
              <Link href="/dashboard/workbooks">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            {loading ? (
              <div className="flex justify-center py-12">
                <Spinner />
              </div>
            ) : stats.workbooks === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-600 mb-4">You haven't created any workbooks yet</p>
                <Link href="/dashboard/workbooks/new">
                  <Button>Create Your First Workbook</Button>
                </Link>
              </Card>
            ) : (
              <div className="text-center py-8">
                <Link href="/dashboard/workbooks">
                  <Button>View Your Workbooks</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
