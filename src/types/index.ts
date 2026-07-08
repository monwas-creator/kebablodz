// User & Authentication Types
export type UserRole = "CUSTOMER" | "ADMIN" | "DRIVER" | "KITCHEN_STAFF";

export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: UserRole;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  marketing: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  customerId: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  label: string | null;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  icon: string | null;
  position: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string | null;
  position: number;
  createdAt: Date;
}

export interface ProductOptionValue {
  id: string;
  optionId: string;
  label: string;
  value: string | null;
  priceModifier: number;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductOption {
  id: string;
  productId: string;
  name: string;
  type: string;
  position: number;
  values: ProductOptionValue[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  stock: number;
  isAvailable: boolean;
  position: number;
  images: ProductImage[];
  options: ProductOption[];
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
}

export interface ProductWithDetails extends Product {
  category: Category;
  reviewCount: number;
  averageRating: number;
}

// Order Types
export type OrderStatus = "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "ON_DELIVERY" | "DELIVERED" | "CANCELLED";
export type OrderPaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface OrderItemOption {
  id: string;
  orderItemId: string;
  optionValueId: string;
  label: string;
  priceModifier: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  options: OrderItemOption[];
  notes: string | null;
  createdAt: Date;
  product?: Product;
}

export interface Payment {
  id: string;
  orderId: string;
  method: "CARD" | "CASH" | "APPLE_PAY" | "GOOGLE_PAY";
  gateway: "PRZELEWY24" | "CASH";
  amount: number;
  transactionId: string | null;
  reference: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  addressId: string;
  driverId: string | null;
  subtotal: number;
  taxAmount: number;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: OrderPaymentStatus;
  couponId: string | null;
  customerNotes: string | null;
  internalNotes: string | null;
  items: OrderItem[];
  payment?: Payment;
  customer?: Customer;
  address?: Address;
  createdAt: Date;
  updatedAt: Date;
  deliveredAt: Date | null;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  options: Record<string, string>;
  notes?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  taxAmount: number;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number;
  couponCode?: string;
}

// Coupon Types
export type DiscountType = "FIXED" | "PERCENTAGE";

export interface Coupon {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  minOrder: number;
  maxDiscount: number | null;
  startsAt: Date;
  expiresAt: Date | null;
  isActive: boolean;
  maxUses: number | null;
  usedCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Driver Types
export type DriverStatus = "ONLINE" | "OFFLINE" | "DELIVERING" | "BREAK";

export interface Driver {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  vehicle: string | null;
  status: DriverStatus;
  latitude: number | null;
  longitude: number | null;
  totalDeliveries: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

// Review Types
export interface Review {
  id: string;
  customerId: string;
  productId: string;
  rating: number;
  comment: string | null;
  isPublished: boolean;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
  customer?: Customer;
  product?: Product;
}

// Restaurant Settings
export interface Restaurant {
  id: string;
  name: string;
  phone: string;
  email: string;
  website: string | null;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  openingTime: string;
  closingTime: string;
  minOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  id: string;
  siteName: string;
  siteDescription: string | null;
  enableOnlineOrders: boolean;
  enableDelivery: boolean;
  enablePickup: boolean;
  enableReviews: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Gallery
export interface Gallery {
  id: string;
  title: string;
  image: string;
  position: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter Types
export interface ProductFilter {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: "name" | "price" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface OrderFilter {
  status?: OrderStatus;
  paymentStatus?: OrderPaymentStatus;
  page?: number;
  pageSize?: number;
  startDate?: Date;
  endDate?: Date;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone?: string;
  agreeToTerms: boolean;
}

export interface AddressFormData {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  label?: string;
  isDefault?: boolean;
}

export interface CheckoutFormData {
  addressId: string;
  phone: string;
  email: string;
  customerNotes?: string;
  paymentMethod: "CARD" | "CASH";
  couponCode?: string;
}

// Notification Types
export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

// State Management Types
export interface AppState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

// Utility Types
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
