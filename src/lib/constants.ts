// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";
export const API_TIMEOUT = 30000;

// Authentication
export const AUTH_TOKEN_KEY = "auth_token";
export const AUTH_REFRESH_TOKEN_KEY = "refresh_token";
export const AUTH_USER_KEY = "user";

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Tax Rate
export const TAX_RATE = 0.23; // 23% VAT for Poland

// Delivery
export const DEFAULT_DELIVERY_FEE = 9.99;
export const FREE_DELIVERY_THRESHOLD = 100;
export const MIN_ORDER_VALUE = 15;

// Search
export const SEARCH_DEBOUNCE_DELAY = 300;
export const SEARCH_MIN_CHARS = 2;

// Filters
export const PRODUCT_FILTERS = {
  PRICE_MIN: 0,
  PRICE_MAX: 500,
  PRICE_STEP: 10,
};

// Order Statuses
export const ORDER_STATUSES = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PREPARING: "PREPARING",
  READY: "READY",
  ON_DELIVERY: "ON_DELIVERY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export const ORDER_STATUS_LABELS = {
  PENDING: "Oczekujące",
  CONFIRMED: "Potwierdzone",
  PREPARING: "W przygotowaniu",
  READY: "Gotowe do odbioru",
  ON_DELIVERY: "W drodze",
  DELIVERED: "Dostarczone",
  CANCELLED: "Anulowane",
} as const;

export const ORDER_STATUS_COLORS = {
  PENDING: "warning",
  CONFIRMED: "info",
  PREPARING: "info",
  READY: "success",
  ON_DELIVERY: "info",
  DELIVERED: "success",
  CANCELLED: "error",
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: "CARD",
  CASH: "CASH",
  APPLE_PAY: "APPLE_PAY",
  GOOGLE_PAY: "GOOGLE_PAY",
} as const;

export const PAYMENT_METHOD_LABELS = {
  CARD: "Karta kredytowa",
  CASH: "Gotówka",
  APPLE_PAY: "Apple Pay",
  GOOGLE_PAY: "Google Pay",
} as const;

// Payment Status
export const PAYMENT_STATUSES = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;

export const PAYMENT_STATUS_LABELS = {
  PENDING: "Oczekujące",
  PAID: "Opłacone",
  FAILED: "Nieudane",
  REFUNDED: "Zwrócone",
} as const;

// User Roles
export const USER_ROLES = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  DRIVER: "DRIVER",
  KITCHEN_STAFF: "KITCHEN_STAFF",
} as const;

// Driver Status
export const DRIVER_STATUSES = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
  DELIVERING: "DELIVERING",
  BREAK: "BREAK",
} as const;

export const DRIVER_STATUS_LABELS = {
  ONLINE: "Online",
  OFFLINE: "Offline",
  DELIVERING: "W drodze",
  BREAK: "Przerwa",
} as const;

// Rating
export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const RATING_LABELS = {
  1: "Złe",
  2: "Słabe",
  3: "Średnie",
  4: "Dobre",
  5: "Doskonałe",
} as const;

// Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  PHONE_LENGTH: 9,
  POSTAL_CODE_LENGTH: 6,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Błąd połączenia. Sprawdź swoją sieć.",
  UNAUTHORIZED: "Nie jesteś zalogowany. Zaloguj się, aby kontynuować.",
  FORBIDDEN: "Nie masz dostępu do tego zasobu.",
  NOT_FOUND: "Zasób nie znaleziony.",
  SERVER_ERROR: "Błąd serwera. Spróbuj ponownie później.",
  VALIDATION_ERROR: "Sprawdź poprawność danych.",
  UNKNOWN_ERROR: "Nieznany błąd. Spróbuj ponownie.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: "Zalogowano pomyślnie!",
  LOGOUT: "Wylogowano pomyślnie!",
  REGISTER: "Konto zostało utworzone!",
  UPDATE_PROFILE: "Profil został zaktualizowany!",
  ADD_ADDRESS: "Adres został dodany!",
  UPDATE_ADDRESS: "Adres został zaktualizowany!",
  DELETE_ADDRESS: "Adres został usunięty!",
  ADD_TO_CART: "Produkt dodany do koszyka!",
  REMOVE_FROM_CART: "Produkt usunięty z koszyka!",
  CLEAR_CART: "Koszyk został wyczyszczony!",
  CREATE_ORDER: "Zamówienie zostało złożone!",
  CANCEL_ORDER: "Zamówienie zostało anulowane!",
  APPLY_COUPON: "Kupon został zastosowany!",
  COPY_TO_CLIPBOARD: "Skopiowano do schowka!",
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  MENU: "/menu",
  PRODUCTS: "/products",
  PRODUCT_DETAILS: "/products/:id",
  CART: "/cart",
  CHECKOUT: "/checkout",
  ORDER_CONFIRMATION: "/order-confirmation/:id",
  ORDERS: "/orders",
  ORDER_DETAILS: "/orders/:id",
  PROFILE: "/profile",
  ADDRESSES: "/addresses",
  FAVORITES: "/favorites",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_USERS: "/admin/users",
  ADMIN_DRIVERS: "/admin/drivers",
  NOT_FOUND: "/404",
} as const;

// Local Storage Keys
export const LOCAL_STORAGE_KEYS = {
  CART: "cart",
  FAVORITES: "favorites",
  RECENTLY_VIEWED: "recently_viewed",
  THEME: "theme",
  LANGUAGE: "language",
  USER_PREFERENCES: "user_preferences",
} as const;

// Cache Duration (in milliseconds)
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const;

// Notification Duration (in milliseconds)
export const NOTIFICATION_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// Colors
export const COLORS = {
  PRIMARY: "#D82328", // Red
  SECONDARY: "#FFA500", // Orange
  SUCCESS: "#10B981", // Green
  WARNING: "#F59E0B", // Amber
  ERROR: "#EF4444", // Red
  INFO: "#3B82F6", // Blue
  NEUTRAL: "#6B7280", // Gray
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  INSTANT: 0,
  VERY_FAST: 150,
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

// Date Formats
export const DATE_FORMAT = "dd.MM.yyyy";
export const TIME_FORMAT = "HH:mm";
export const DATE_TIME_FORMAT = "dd.MM.yyyy HH:mm";

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: "https://facebook.com",
  INSTAGRAM: "https://instagram.com",
  TWITTER: "https://twitter.com",
  YOUTUBE: "https://youtube.com",
} as const;

// Contact Information
export const CONTACT_INFO = {
  PHONE: "+48 12 345 67 89",
  EMAIL: "info@kebablodz.pl",
  ADDRESS: "ul. Przykładowa 1, 31-999 Kraków",
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_REVIEWS: true,
  ENABLE_WISHLIST: true,
  ENABLE_REFERRAL: false,
  ENABLE_LOYALTY_PROGRAM: false,
  ENABLE_LIVE_TRACKING: true,
  ENABLE_NOTIFICATIONS: true,
} as const;
