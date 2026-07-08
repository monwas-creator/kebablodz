import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "@/types";
import { authAPI } from "@/lib/api";
import { AUTH_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY, AUTH_USER_KEY } from "@/lib/constants";

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login(email, password);
          
          if (response.success) {
            const { token, refreshToken, user } = response.data;
            
            localStorage.setItem(AUTH_TOKEN_KEY, token);
            localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, refreshToken);
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
            
            set({
              isAuthenticated: true,
              user,
              token,
              error: null,
              isLoading: false,
            });
          } else {
            set({
              error: response.error || "Login failed",
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || "Login failed",
            isLoading: false,
          });
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.register(data);
          
          if (response.success) {
            const { token, refreshToken, user } = response.data;
            
            localStorage.setItem(AUTH_TOKEN_KEY, token);
            localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, refreshToken);
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
            
            set({
              isAuthenticated: true,
              user,
              token,
              error: null,
              isLoading: false,
            });
          } else {
            set({
              error: response.error || "Registration failed",
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || "Registration failed",
            isLoading: false,
          });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authAPI.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          localStorage.removeItem(AUTH_TOKEN_KEY);
          localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
          localStorage.removeItem(AUTH_USER_KEY);
          
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            error: null,
            isLoading: false,
          });
        }
      },

      getCurrentUser: async () => {
        set({ isLoading: true });
        try {
          const response = await authAPI.getCurrentUser();
          
          if (response.success) {
            set({
              user: response.data,
              isAuthenticated: true,
              error: null,
              isLoading: false,
            });
          } else {
            set({
              error: response.error || "Failed to get user",
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || "Failed to get user",
            isLoading: false,
          });
        }
      },

      setUser: (user: User | null) => {
        if (user) {
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        } else {
          localStorage.removeItem(AUTH_USER_KEY);
        }
        set({ user });
      },

      setToken: (token: string | null) => {
        if (token) {
          localStorage.setItem(AUTH_TOKEN_KEY, token);
        } else {
          localStorage.removeItem(AUTH_TOKEN_KEY);
        }
        set({ token });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);
