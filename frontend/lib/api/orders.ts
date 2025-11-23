import apiClient from './client';
import { Order, ApiResponse } from '../types';

export const ordersAPI = {
  async createCheckout(workbookId: string): Promise<any> {
    const response = await apiClient.post('/orders/checkout', { workbookId });
    return response.data;
  },

  async getById(id: string): Promise<any> {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  async getOrderBySession(sessionId: string): Promise<any> {
    const response = await apiClient.get(`/orders/session/${sessionId}`);
    return response.data;
  },

  async getMyOrders(params?: { page?: number; limit?: number }): Promise<any> {
    const response = await apiClient.get('/users/orders', { params });
    return response.data;
  },

  async getDownloadLink(orderId: string): Promise<any> {
    const response = await apiClient.get(`/orders/${orderId}/download`);
    return response.data;
  },
};

// For backward compatibility
export const ordersApi = ordersAPI;