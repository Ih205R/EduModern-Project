import apiClient from './client';
import { Order, ApiResponse } from '../types';

export const ordersApi = {
  async createCheckout(workbookId: string): Promise<{ url: string }> {
    const response = await apiClient.post<ApiResponse<{ url: string }>>(
      '/orders/create-checkout',
      { workbookId }
    );
    return response.data.data;
  },

  async getById(id: string): Promise<Order> {
    const response = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data.data;
  },

  async getDownloadLink(id: string): Promise<{ downloadUrl: string }> {
    const response = await apiClient.get<ApiResponse<{ downloadUrl: string }>>(
      `/orders/${id}/download`
    );
    return response.data.data;
  },
};