export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  isVerified: boolean;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface Workbook {
  id: string;
  title: string;
  slug: string;
  niche?: string;
  description?: string;
  coverUrl?: string;
  pdfUrl?: string;
  priceCents: number;
  currency: string;
  pages?: any;
  status: 'draft' | 'published' | 'archived';
  viewCount: number;
  ownerId: string;
  owner?: {
    id: string;
    name?: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Order {
  id: string;
  userId: string;
  workbookId: string;
  stripePaymentId?: string;
  stripeSessionId?: string;
  amountCents: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  downloadUrl?: string;
  downloadExpiry?: string;
  downloadCount: number;
  maxDownloads: number;
  workbook?: Workbook;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}