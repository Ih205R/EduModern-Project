'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { workbooksApi } from '@/lib/api/workbooks';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';

export default function NewWorkbookPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    price: '',
    category: '',
    gradeLevel: '',
    subject: '',
    language: 'en',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const workbook = await workbooksApi.createWorkbook({
        ...formData,
        price: parseFloat(formData.price),
      });
      router.push(`/dashboard/workbooks/${workbook.id}/edit`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create workbook');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto animate-fade-in-up">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark mb-2">Create New Workbook</h1>
          <p className="text-gray-600">Fill in the details to create your workbook</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <Card className="p-8">
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
                placeholder="Introduction to Mathematics"
                required
              />

              <Textarea
                label="Description *"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="A comprehensive guide to mathematics fundamentals..."
                rows={4}
                required
              />

              <Textarea
                label="Content *"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Enter your workbook content here..."
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
                  placeholder="9.99"
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
                  placeholder="Mathematics"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Grade Level"
                  type="text"
                  name="gradeLevel"
                  value={formData.gradeLevel}
                  onChange={handleChange}
                  placeholder="Grade 6-8"
                />

                <Input
                  label="Subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Algebra"
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
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Workbook'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
