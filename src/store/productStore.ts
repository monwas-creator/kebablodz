import { create } from "zustand";
import { ProductState, Product, Category, ProductFilters, PaginationMeta } from "@/types";
import { productsAPI } from "@/lib/api";

interface ProductStore extends ProductState {
  fetchProducts: (page?: number, limit?: number, filters?: ProductFilters) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  fetchByCategory: (categoryId: string, page?: number, limit?: number) => Promise<void>;
  fetchPopular: (limit?: number) => Promise<void>;
  fetchRecommended: (limit?: number) => Promise<void>;
  searchProducts: (query: string, page?: number, limit?: number) => Promise<void>;
  setFilters: (filters: ProductFilters) => void;
  resetFilters: () => void;
  setSelectedProduct: (product: Product | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const defaultFilters: ProductFilters = {
  categoryId: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  search: undefined,
  isAvailable: true,
  isPopular: false,
  sortBy: "newest",
  order: "desc",
};

const defaultPagination: PaginationMeta = {
  total: 0,
  page: 1,
  limit: 20,
  pages: 0,
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  categories: [],
  selectedProduct: null,
  filters: defaultFilters,
  pagination: defaultPagination,
  isLoading: false,
  error: null,

  fetchProducts: async (page = 1, limit = 20, filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productsAPI.getAll(page, limit, filters);

      if (response.success) {
        const { items, total, page: currentPage, limit: currentLimit, pages } = response.data;

        set({
          products: items,
          pagination: {
            total,
            page: currentPage,
            limit: currentLimit,
            pages,
          },
          isLoading: false,
        });
      } else {
        set({
          error: response.error || "Failed to fetch products",
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch products",
        isLoading: false,
      });
    }
  },

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await productsAPI.getCategories();

      if (response.success) {
        set({
          categories: response.data,
          isLoading: false,
        });
      } else {
        set({
          error: response.error || "Failed to fetch categories",
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch categories",
        isLoading: false,
      });
    }
  },

  fetchProductById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productsAPI.getById(id);

      if (response.success) {
        set({
          selectedProduct: response.data,
          isLoading: false,
        });
      } else {
        set({
          error: response.error || "Failed to fetch product",
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch product",
        isLoading: false,
      });
    }
  },

  fetchByCategory: async (categoryId: string, page = 1, limit = 20) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productsAPI.getByCategory(categoryId, page, limit);

      if (response.success) {
        const { items, total, page: currentPage, limit: currentLimit, pages } = response.data;

        set({
          products: items,
          pagination: {
            total,
            page: currentPage,
            limit: currentLimit,
            pages,
          },
          filters: { ...get().filters, categoryId },
          isLoading: false,
        });
      } else {
        set({
          error: response.error || "Failed to fetch products by category",
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch products by category",
        isLoading: false,
      });
    }
  },

  fetchPopular: async (limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productsAPI.getPopular(limit);

      if (response.success) {
        set({
          products: response.data,
          isLoading: false,
        });
      } else {
        set({
          error: response.error || "Failed to fetch popular products",
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch popular products",
        isLoading: false,
      });
    }
  },

  fetchRecommended: async (limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productsAPI.getRecommended(limit);

      if (response.success) {
        set({
          products: response.data,
          isLoading: false,
        });
      } else {
        set({
          error: response.error || "Failed to fetch recommended products",
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch recommended products",
        isLoading: false,
      });
    }
  },

  searchProducts: async (query: string, page = 1, limit = 20) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productsAPI.search(query, page, limit);

      if (response.success) {
        const { items, total, page: currentPage, limit: currentLimit, pages } = response.data;

        set({
          products: items,
          pagination: {
            total,
            page: currentPage,
            limit: currentLimit,
            pages,
          },
          filters: { ...get().filters, search: query },
          isLoading: false,
        });
      } else {
        set({
          error: response.error || "Failed to search products",
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || "Failed to search products",
        isLoading: false,
      });
    }
  },

  setFilters: (filters: ProductFilters) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
  },

  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));
