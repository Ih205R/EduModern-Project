'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { workbooksApi } from '@/lib/api/workbooks';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';

export default function EditWorkbookPage() {
  const router = useRouter();
  const params = useParams();
  const workbookId = params.id as string;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    price: '',
    category: '',
    gradeLevel: '',
    subject: '',
    language: 'en',
    status: 'DRAFT',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchWorkbook = async () => {
      try {
        setLoading(true);
        const workbook = await workbooksApi.getWorkbookById(workbookId);
        setFormData({
          title: workbook.title,
          description: workbook.description,
          content: workbook.content,
          price: workbook.price.toString(),
          category: workbook.category || '',
          gradeLevel: workbook.gradeLevel || '',
          subject: workbook.subject || '',
          language: workbook.language || 'en',
          status: workbook.status,
        });
      } catch (err: any) {
        setError('Failed to load workbook');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkbook();
  }, [workbookId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    try {
      await workbooksApi.updateWorkbook(workbookId, {
        ...formData,
        price: parseFloat(formData.price),
      });
      setMessage('Workbook updated successfully');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update workbook');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setSaving(true);
      await workbooksApi.publishWorkbook(workbookId);
      setMessage('Workbook published successfully');
      setFormData({ ...formData, status: 'PUBLISHED' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to publish workbook');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this workbook? This action cannot be undone.')) {
      return;
    }

    try {
      setSaving(true);
      await workbooksApi.deleteWorkbook(workbookId);
      router.push('/dashboard/workbooks');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete workbook');
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto animate-fade-in-up">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-dark mb-2">Edit Workbook</h1>
            <p className="text-gray-600">Update your workbook details</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              formData.status === 'PUBLISHED'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {formData.status}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {message}
          </div>
        )}

        <Card className="p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-dark">Basic Information</h2>
              
              <Input
                label="Title *"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <Textarea
                label="Description *"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />

              <Textarea
                label="Content *"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={10}
                required
              />
            </div>

            {/* Metadata */}
            <div className="space-y-4 pt-6 border-t">
              <h2 className="text-xl font-bold text-dark">Metadata</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Price (EUR) *"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                />

                <Input
                  label="Category"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Grade Level"
                  type="text"
                  name="gradeLevel"
                  value={formData.gradeLevel}
                  onChange={handleChange}
                />

                <Input
                  label="Subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-blue focus:outline-none focus:ring-2 focus:ring-blue transition-all"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              
              {formData.status === 'DRAFT' && (
                <Button
                  type="button"
                  onClick={handlePublish}
                  disabled={saving}
                  variant="outline"
                >
                  Publish
                </Button>
              )}
              
              <Button
                type="button"
                onClick={() => router.back()}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        {/* Danger Zone */}
        <Card className="p-8 border-2 border-red-200">
          <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
          <p className="text-gray-600 mb-4">
            Once you delete this workbook, there is no going back. Please be certain.
          </p>
          <Button
            onClick={handleDelete}
            disabled={saving}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete Workbook
          </Button>
        </Card>
      </div>
    </Container>
  );
}
