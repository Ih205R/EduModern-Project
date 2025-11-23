import apiClient from './client';
import { Workbook, PaginatedResponse, ApiResponse } from '../types';

export const workbooksAPI = {
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    grade?: string;
    subject?: string;
    sortBy?: string;
    order?: string;
  }): Promise<any> {
    const response = await apiClient.get('/workbooks', { params });
    return response.data;
  },

  async getById(id: string): Promise<any> {
    const response = await apiClient.get(`/workbooks/${id}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<any> {
    const response = await apiClient.get(`/workbooks/slug/${slug}`);
    return response.data;
  },

  async getMyWorkbooks(params?: { page?: number; limit?: number }): Promise<any> {
    const response = await apiClient.get('/users/workbooks', { params });
    return response.data;
  },

  async create(data: {
    title: string;
    description: string;
    price: number;
    category: string;
    grade?: string;
    subject?: string;
    content?: any;
  }): Promise<any> {
    const response = await apiClient.post('/workbooks', data);
    return response.data;
  },

  async update(id: string, data: any): Promise<any> {
    const response = await apiClient.put(`/workbooks/${id}`, data);
    return response.data;
  },

  async deleteWorkbook(id: string): Promise<void> {
    await apiClient.delete(`/workbooks/${id}`);
  },

  async uploadCover(id: string, formData: FormData): Promise<any> {
    const response = await apiClient.post(
      `/workbooks/${id}/cover`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  async generateContent(prompt: string, options?: any): Promise<any> {
    const response = await apiClient.post('/workbooks/generate-content', { prompt, options });
    return response.data;
  },
};

// For backward compatibility
export const workbooksApi = workbooksAPI;