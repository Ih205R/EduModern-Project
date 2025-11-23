import apiClient from './client';
import { Workbook, PaginatedResponse, ApiResponse } from '../types';

export const workbooksApi = {
  async list(params?: {
    page?: number;
    limit?: number;
    search?: string;
    niche?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
  }): Promise<PaginatedResponse<Workbook>> {
    const response = await apiClient.get<PaginatedResponse<Workbook>>('/workbooks', { params });
    return response.data;
  },

  async getById(id: string): Promise<Workbook> {
    const response = await apiClient.get<ApiResponse<Workbook>>(`/workbooks/${id}`);
    return response.data.data;
  },

  async getBySlug(slug: string): Promise<Workbook> {
    const response = await apiClient.get<ApiResponse<Workbook>>(`/workbooks/slug/${slug}`);
    return response.data.data;
  },

  async create(data: {
    title: string;
    niche?: string;
    description?: string;
    priceCents: number;
    currency?: string;
  }): Promise<Workbook> {
    const response = await apiClient.post<ApiResponse<Workbook>>('/workbooks', data);
    return response.data.data;
  },

  async update(id: string, data: Partial<Workbook>): Promise<Workbook> {
    const response = await apiClient.patch<ApiResponse<Workbook>>(`/workbooks/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/workbooks/${id}`);
  },

  async generateContent(id: string, prompt: string, pages?: number): Promise<any> {
    const response = await apiClient.post<ApiResponse<any>>(
      `/workbooks/${id}/generate-content`,
      { prompt, pages }
    );
    return response.data.data;
  },

  async uploadCover(id: string, file: File): Promise<Workbook> {
    const formData = new FormData();
    formData.append('cover', file);

    const response = await apiClient.post<ApiResponse<Workbook>>(
      `/workbooks/${id}/upload-cover`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  async publish(id: string): Promise<Workbook> {
    const response = await apiClient.post<ApiResponse<Workbook>>(`/workbooks/${id}/publish`);
    return response.data.data;
  },

  async unpublish(id: string): Promise<Workbook> {
    const response = await apiClient.post<ApiResponse<Workbook>>(`/workbooks/${id}/unpublish`);
    return response.data.data;
  },
};