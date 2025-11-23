'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { workbooksAPI } from '@/lib/api/workbooks';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

export default function EditWorkbookPage() {
  const router = useRouter();
  const params = useParams();
  const workbookId = params.id as string;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    grade: '',
    subject: '',
    isPublished: false,
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [currentCover, setCurrentCover] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadWorkbook();
  }, [workbookId]);

  const loadWorkbook = async () => {
    try {
      setIsLoading(true);
      const response = await workbooksAPI.getById(workbookId);
      const workbook = response.data.workbook;

      setFormData({
        title: workbook.title,
        description: workbook.description,
        price: workbook.price.toString(),
        category: workbook.category,
        grade: workbook.grade || '',
        subject: workbook.subject || '',
        isPublished: workbook.isPublished,
      });
      setCurrentCover(workbook.coverImage || '');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load workbook');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      // Update workbook
      await workbooksAPI.update(workbookId, {
        ...formData,
        price: parseFloat(formData.price),
      });

      // Upload cover image if provided
      if (coverFile) {
        const formDataObj = new FormData();
        formDataObj.append('cover', coverFile);
        await workbooksAPI.uploadCover(workbookId, formDataObj);
      }

      setSuccess('Workbook updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update workbook');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handlePublishToggle = async () => {
    try {
      setIsSaving(true);
      await workbooksAPI.update(workbookId, {
        isPublished: !formData.isPublished,
      });
      setFormData({ ...formData, isPublished: !formData.isPublished });
      setSuccess(`Workbook ${!formData.isPublished ? 'published' : 'unpublished'} successfully`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update publish status');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this workbook? This action cannot be undone.')) {
      return;
    }

    try {
      await workbooksAPI.deleteWorkbook(workbookId);
      router.push('/dashboard/workbooks');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete workbook');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12 animate-fade-in-up">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-dark mb-2">Edit Workbook</h1>
              <p className="text-gray-600">Update your workbook details</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={formData.isPublished ? 'outline' : 'primary'}
                onClick={handlePublishToggle}
                disabled={isSaving}
              >
                {formData.isPublished ? 'Unpublish' : 'Publish'}
              </Button>
            </div>
          </div>

          <Card className="p-8 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm animate-fade-in">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 text-green-600 p-4 rounded-lg text-sm animate-fade-in">
                  {success}
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
                  disabled={isSaving}
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
                  rows={4}
                  disabled={isSaving}
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
                    disabled={isSaving}
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
                    disabled={isSaving}
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
                    disabled={isSaving}
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
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cover" className="block text-sm font-medium text-dark mb-2">
                  Cover Image
                </label>
                {currentCover && !coverFile && (
                  <div className="mb-4">
                    <img
                      src={currentCover}
                      alt="Current cover"
                      className="w-full max-w-md h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <input
                  id="cover"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-blue focus:outline-none focus:ring-2 focus:ring-blue transition-all"
                  disabled={isSaving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {coverFile ? 'New image selected' : 'Upload a new image to replace the current one'}
                </p>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/dashboard/workbooks')}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving} className="flex-1">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDelete}
                  disabled={isSaving}
                  className="text-red-600 hover:bg-red-50"
                >
                  Delete
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
}
