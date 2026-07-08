import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState, CartItem, Product } from "@/types";
import { cartAPI } from "@/lib/api";
import { TAX_RATE, DEFAULT_DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/lib/constants";

interface CartStore extends CartState {
  addItem: (product: Product, quantity: number, specialInstructions?: string) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
  fetchCart: () => Promise<void>;
  calculateTotals: () => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      tax: 0,
      deliveryFee: DEFAULT_DELIVERY_FEE,
      discount: 0,
      total: 0,
      discountCode: undefined,
      isLoading: false,
      error: null,

      addItem: async (product: Product, quantity: number, specialInstructions?: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartAPI.addToCart(product.id, quantity);
          
          if (response.success) {
            const { items, subtotal, tax, deliveryFee, discount, total, discountCode } = response.data;
            
            set({
              items,
              subtotal,
              tax,
              deliveryFee,
              discount,
              total,
              discountCode,
              isLoading: false,
            });
          } else {
            set({
              error: response.error || "Failed to add item to cart",
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || "Failed to add item to cart",
            isLoading: false,
          });
        }
      },

      removeItem: async (itemId: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartAPI.removeFromCart(itemId);
          
          if (response.success) {
            const { items, subtotal, tax, deliveryFee, discount, total } = response.data;
            
            set({
              items,
              subtotal,
              tax,
              deliveryFee,
              discount,
              total,
              isLoading: false,
            });
          } else {
            set({
              error: response.error || "Failed to remove item from cart",
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || "Failed to remove item from cart",
            isLoading: false,
          });
        }
      },

      updateItem: async (itemId: string, quantity: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartAPI.updateCartItem(itemId, quantity);
          
          if (response.success) {
            const { items, subtotal, tax, deliveryFee, discount, total } = response.data;
            
            set({
              items,
              subtotal,
              tax,
              deliveryFee,
              discount,
              total,
              isLoading: false,
            });
          } else {
            set({
              error: response.error || "Failed to update cart item",
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || "Failed to update cart item",
            isLoading: false,
          });
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartAPI.clearCart();
          
          if (response.success) {
            set({
              items: [],
              subtotal: 0,
              tax: 0,
              deliveryFee: DEFAULT_DELIVERY_FEE,
              discount: 0,
              total: 0,
              discountCode: undefined,
              isLoading: false,
            });
          } else {
            set({
              error: response.error || "Failed to clear cart",
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || "Failed to clear cart",
            isLoading: false,
          });
        }
      },

      applyCoupon: async (code: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartAPI.applyCoupon(code);
          
          if (response.success) {
            const { discount, total, discountCode } = response.data;
            
            set({
              discount,
              total,
              discountCode,
              isLoading: false,
            });
          } else {
            set({
              error: response.error || "Failed to apply coupon",
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || "Failed to apply coupon",
            isLoading: false,
          });
        }
      },

      removeCoupon: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartAPI.removeCoupon();
          
          if (response.success) {
            const { discount, total } = response.data;
            
            set({
              discount,
              total,
              discountCode: undefined,
              isLoading: false,
            });
          } else {
            set({
              error: response.error || "Failed to remove coupon",
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || "Failed to remove coupon",
            isLoading: false,
          });
        }
      },

      fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartAPI.getCart();
          
          if (response.success) {
            const { items, subtotal, tax, deliveryFee, discount, total, discountCode } = response.data;
            
            set({
              items,
              subtotal,
              tax,
              deliveryFee,
              discount,
              total,
              discountCode,
              isLoading: false,
            });
          } else {
            set({
              error: response.error || "Failed to fetch cart",
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || "Failed to fetch cart",
            isLoading: false,
          });
        }
      },

      calculateTotals: () => {
        const { items, discountCode } = get();
        
        const subtotal = items.reduce((total, item) => {
          return total + (item.product.discountPrice || item.product.price) * item.quantity;
        }, 0);
        
        const tax = subtotal * TAX_RATE;
        
        const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DEFAULT_DELIVERY_FEE;
        
        const discount = get().discount || 0;
        
        const total = subtotal + tax + deliveryFee - discount;
        
        set({
          subtotal: Math.round(subtotal * 100) / 100,
          tax: Math.round(tax * 100) / 100,
          deliveryFee,
          total: Math.round(total * 100) / 100,
        });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        subtotal: state.subtotal,
        tax: state.tax,
        deliveryFee: state.deliveryFee,
        discount: state.discount,
        total: state.total,
        discountCode: state.discountCode,
      }),
    }
  )
);
