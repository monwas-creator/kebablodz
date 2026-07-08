// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: "CUSTOMER" | "ADMIN" | "DRIVER" | "KITCHEN_STAFF";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// Product Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  images?: string[];
  category: Category;
  ingredients?: string[];
  allergens?: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  isAvailable: boolean;
  isPopular: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  value: string;
  priceModifier?: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  user?: User;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

// Cart Types
export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  product: Product;
  quantity: number;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount?: number;
  discountCode?: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

// Order Types
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  deliveryAddress: Address;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PREPARING"
    | "READY"
    | "ON_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  paymentMethod: "CARD" | "CASH" | "APPLE_PAY" | "GOOGLE_PAY";
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount?: number;
  discountCode?: string;
  total: number;
  specialInstructions?: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  driver?: Driver;
  rating?: number;
  reviewComment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderTracking {
  orderId: string;
  status: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

// Payment Types
export interface PaymentIntent {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: "PENDING" | "PROCESSING" | "SUCCEEDED" | "FAILED";
  clientSecret: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: "CARD" | "WALLET";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// Driver Types
export interface Driver {
  id: string;
  userId: string;
  user?: User;
  vehicleInfo?: {
    type: string;
    color: string;
    licensePlate: string;
  };
  status: "ONLINE" | "OFFLINE" | "DELIVERING" | "BREAK";
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  completedDeliveries: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Coupon Types
export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  minOrderValue?: number;
  maxUses?: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type:
    | "ORDER_CONFIRMED"
    | "ORDER_READY"
    | "DRIVER_ASSIGNED"
    | "ORDER_ON_DELIVERY"
    | "ORDER_DELIVERED"
    | "PAYMENT_FAILED"
    | "REVIEW_REMINDER";
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

// Settings Types
export interface AppSettings {
  id: string;
  storeName: string;
  description: string;
  logo: string;
  coverImage: string;
  taxRate: number;
  defaultDeliveryFee: number;
  freeDeliveryThreshold: number;
  minOrderValue: number;
  businessHours?: {
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  }[];
  deliveryAreas?: {
    name: string;
    coordinates: Array<[number, number]>;
    deliveryFee: number;
    minDeliveryTime: number;
    maxDeliveryTime: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// API Response Types
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
  errors?: Record<string, string[]>;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Filter Types
export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  isAvailable?: boolean;
  isPopular?: boolean;
  sortBy?: "name" | "price" | "rating" | "newest";
  order?: "asc" | "desc";
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AddressFormData {
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isDefault?: boolean;
}

export interface CheckoutFormData {
  deliveryAddressId: string;
  paymentMethod: "CARD" | "CASH" | "APPLE_PAY" | "GOOGLE_PAY";
  specialInstructions?: string;
  phoneNumber: string;
}

export interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
}

// State Types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  discountCode?: string;
  isLoading: boolean;
  error: string | null;
}

export interface ProductState {
  products: Product[];
  categories: Category[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  pagination: PaginationMeta;
  isLoading: boolean;
  error: string | null;
}

export interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  pagination: PaginationMeta;
  isLoading: boolean;
  error: string | null;
}

// UI Types
export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  duration?: number;
}

export interface Modal {
  id: string;
  title: string;
  content: React.ReactNode;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "danger";
  }[];
  onClose: () => void;
}

export interface Breadcrumb {
  label: string;
  href?: string;
  current?: boolean;
}
