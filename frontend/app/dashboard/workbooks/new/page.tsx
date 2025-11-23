'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { workbooksAPI } from '@/lib/api/workbooks';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';

export default function NewWorkbookPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    grade: '',
    subject: '',
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Create workbook
      const response = await workbooksAPI.create({
        ...formData,
        price: parseFloat(formData.price),
      });

      const workbookId = response.data.workbook.id;

      // Upload cover image if provided
      if (coverFile) {
        const formData = new FormData();
        formData.append('cover', coverFile);
        await workbooksAPI.uploadCover(workbookId, formData);
      }

      router.push(`/dashboard/workbooks/${workbookId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create workbook');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-12 animate-fade-in-up">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-dark mb-2">Create New Workbook</h1>
            <p className="text-gray-600">Fill in the details for your educational workbook</p>
          </div>

          <Card className="p-8 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm animate-fade-in">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-dark mb-2">
                  Workbook Title *
                </label>
                <Input
                  id="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Introduction to Algebra"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-dark mb-2">
                  Description *
                </label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what students will learn from this workbook..."
                  rows={4}
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-dark mb-2">
                    Category *
                  </label>
                  <Input
                    id="category"
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Mathematics"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-dark mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g., Algebra"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-dark mb-2">
                    Grade Level
                  </label>
                  <Input
                    id="grade"
                    type="text"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    placeholder="e.g., 9-12"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-dark mb-2">
                    Price (€) *
                  </label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="29.99"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cover" className="block text-sm font-medium text-dark mb-2">
                  Cover Image
                </label>
                <input
                  id="cover"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-blue focus:outline-none focus:ring-2 focus:ring-blue transition-all"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 800x600px, JPG or PNG, max 5MB
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? 'Creating...' : 'Create Workbook'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
}
