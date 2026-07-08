import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL, API_TIMEOUT, AUTH_TOKEN_KEY } from "./constants";

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          // Redirect to login
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { token } = response.data;
        localStorage.setItem(AUTH_TOKEN_KEY, token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<ApiResponse> => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<ApiResponse> => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<ApiResponse> => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  refreshToken: async (): Promise<ApiResponse> => {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await apiClient.post("/auth/refresh", { refreshToken });
    return response.data;
  },

  forgotPassword: async (email: string): Promise<ApiResponse> => {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (
    token: string,
    password: string
  ): Promise<ApiResponse> => {
    const response = await apiClient.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  },

  verifyEmail: async (token: string): Promise<ApiResponse> => {
    const response = await apiClient.post("/auth/verify-email", { token });
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getCurrentUser: async (): Promise<ApiResponse> => {
    const response = await apiClient.get("/users/me");
    return response.data;
  },

  updateProfile: async (data: any): Promise<ApiResponse> => {
    const response = await apiClient.put("/users/me", data);
    return response.data;
  },

  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse> => {
    const response = await apiClient.post("/users/me/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  getAddresses: async (): Promise<ApiResponse> => {
    const response = await apiClient.get("/users/me/addresses");
    return response.data;
  },

  addAddress: async (data: any): Promise<ApiResponse> => {
    const response = await apiClient.post("/users/me/addresses", data);
    return response.data;
  },

  updateAddress: async (id: string, data: any): Promise<ApiResponse> => {
    const response = await apiClient.put(`/users/me/addresses/${id}`, data);
    return response.data;
  },

  deleteAddress: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.delete(`/users/me/addresses/${id}`);
    return response.data;
  },

  setDefaultAddress: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.post(
      `/users/me/addresses/${id}/set-default`
    );
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getAll: async (
    page: number = 1,
    limit: number = 20,
    filters?: any
  ): Promise<ApiResponse<PaginatedResponse>> => {
    const response = await apiClient.get("/products", {
      params: { page, limit, ...filters },
    });
    return response.data;
  },

  search: async (
    query: string,
    page: number = 1,
    limit: number = 20
  ): Promise<ApiResponse<PaginatedResponse>> => {
    const response = await apiClient.get("/products/search", {
      params: { q: query, page, limit },
    });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<ApiResponse> => {
    const response = await apiClient.get("/products/categories");
    return response.data;
  },

  getByCategory: async (
    categoryId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<ApiResponse<PaginatedResponse>> => {
    const response = await apiClient.get(
      `/products/category/${categoryId}`,
      {
        params: { page, limit },
      }
    );
    return response.data;
  },

  getPopular: async (limit: number = 10): Promise<ApiResponse> => {
    const response = await apiClient.get("/products/popular", {
      params: { limit },
    });
    return response.data;
  },

  getRecommended: async (limit: number = 10): Promise<ApiResponse> => {
    const response = await apiClient.get("/products/recommended", {
      params: { limit },
    });
    return response.data;
  },
};

// Cart API
export const cartAPI = {
  getCart: async (): Promise<ApiResponse> => {
    const response = await apiClient.get("/cart");
    return response.data;
  },

  addToCart: async (productId: string, quantity: number): Promise<ApiResponse> => {
    const response = await apiClient.post("/cart/items", {
      productId,
      quantity,
    });
    return response.data;
  },

  updateCartItem: async (
    itemId: string,
    quantity: number
  ): Promise<ApiResponse> => {
    const response = await apiClient.put(`/cart/items/${itemId}`, {
      quantity,
    });
    return response.data;
  },

  removeFromCart: async (itemId: string): Promise<ApiResponse> => {
    const response = await apiClient.delete(`/cart/items/${itemId}`);
    return response.data;
  },

  clearCart: async (): Promise<ApiResponse> => {
    const response = await apiClient.delete("/cart");
    return response.data;
  },

  applyCoupon: async (code: string): Promise<ApiResponse> => {
    const response = await apiClient.post("/cart/coupon", { code });
    return response.data;
  },

  removeCoupon: async (): Promise<ApiResponse> => {
    const response = await apiClient.delete("/cart/coupon");
    return response.data;
  },
};

// Orders API
export const ordersAPI = {
  getAll: async (
    page: number = 1,
    limit: number = 20,
    filters?: any
  ): Promise<ApiResponse<PaginatedResponse>> => {
    const response = await apiClient.get("/orders", {
      params: { page, limit, ...filters },
    });
    return response.data;
  },

  create: async (data: any): Promise<ApiResponse> => {
    const response = await apiClient.post("/orders", data);
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  cancel: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.post(`/orders/${id}/cancel`);
    return response.data;
  },

  trackOrder: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.get(`/orders/${id}/tracking`);
    return response.data;
  },

  rateOrder: async (id: string, rating: number, comment?: string): Promise<ApiResponse> => {
    const response = await apiClient.post(`/orders/${id}/rate`, {
      rating,
      comment,
    });
    return response.data;
  },
};

// Reviews API
export const reviewsAPI = {
  getByProduct: async (
    productId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse>> => {
    const response = await apiClient.get(`/reviews/product/${productId}`, {
      params: { page, limit },
    });
    return response.data;
  },

  create: async (productId: string, data: any): Promise<ApiResponse> => {
    const response = await apiClient.post("/reviews", {
      productId,
      ...data,
    });
    return response.data;
  },

  update: async (id: string, data: any): Promise<ApiResponse> => {
    const response = await apiClient.put(`/reviews/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.delete(`/reviews/${id}`);
    return response.data;
  },
};

// Favorites API
export const favoritesAPI = {
  getAll: async (): Promise<ApiResponse> => {
    const response = await apiClient.get("/favorites");
    return response.data;
  },

  add: async (productId: string): Promise<ApiResponse> => {
    const response = await apiClient.post("/favorites", { productId });
    return response.data;
  },

  remove: async (productId: string): Promise<ApiResponse> => {
    const response = await apiClient.delete(`/favorites/${productId}`);
    return response.data;
  },

  isFavorite: async (productId: string): Promise<ApiResponse> => {
    const response = await apiClient.get(`/favorites/${productId}`);
    return response.data;
  },
};

// Payments API
export const paymentsAPI = {
  createPaymentIntent: async (orderId: string): Promise<ApiResponse> => {
    const response = await apiClient.post("/payments/intent", { orderId });
    return response.data;
  },

  confirmPayment: async (
    paymentId: string,
    paymentMethodId: string
  ): Promise<ApiResponse> => {
    const response = await apiClient.post("/payments/confirm", {
      paymentId,
      paymentMethodId,
    });
    return response.data;
  },

  getPaymentStatus: async (paymentId: string): Promise<ApiResponse> => {
    const response = await apiClient.get(`/payments/${paymentId}`);
    return response.data;
  },
};

// Settings API
export const settingsAPI = {
  getSettings: async (): Promise<ApiResponse> => {
    const response = await apiClient.get("/settings");
    return response.data;
  },

  updateSettings: async (data: any): Promise<ApiResponse> => {
    const response = await apiClient.put("/settings", data);
    return response.data;
  },
};

export default apiClient;
