"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import apiService, { User } from "@/lib/api";

const LOCAL_STORAGE_USER_KEY = "auth_user";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const isAuthenticated = !!user;
  const pathname = usePathname();

  // Check authentication status once on app load
  useEffect(() => {
    if (initialized) return;

    const checkAuth = async () => {
      try {
        // Optimistic hydration from localStorage (fallback/UX only)
        if (typeof window !== "undefined") {
          const cached = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY);
          if (cached) {
            try {
              const parsed = JSON.parse(cached) as User;
              setUser(parsed);
            } catch {}
          }
        }

        const response = await apiService.getCurrentUser();
        if (response.success && response.data?.user) {
          setUser(response.data.user);
          if (typeof window !== "undefined") {
            window.localStorage.setItem(
              LOCAL_STORAGE_USER_KEY,
              JSON.stringify(response.data.user)
            );
          }
        } else {
          setUser(null);
          if (typeof window !== "undefined") {
            window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
          }
        }
      } catch (error: any) {
        // Only log auth errors if they're not expected 401s
        if (error?.status !== 401) {
          console.error("Auth check error:", error);
        }
        setUser(null);
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        }
      } finally {
        setIsLoading(false);
        setInitialized(true);
      }
    };

    checkAuth();
  }, [initialized]);

  // Prevent unnecessary auth checks during form submissions
  const isSubmissionPage = pathname?.includes("/submissions/create");

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await apiService.login({ email, password });

      if (response.success && response.data?.user) {
        setUser(response.data.user);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            LOCAL_STORAGE_USER_KEY,
            JSON.stringify(response.data.user)
          );
        }
      } else {
        throw new Error(response.error || "Login failed");
      }
    } catch (error: any) {
      setUser(null);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setIsLoading(true);
      const response = await apiService.register(userData);

      if (response.success && response.data?.user) {
        setUser(response.data.user);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            LOCAL_STORAGE_USER_KEY,
            JSON.stringify(response.data.user)
          );
        }
      } else {
        throw new Error(response.error || "Registration failed");
      }
    } catch (error: any) {
      setUser(null);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await apiService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      const response = await apiService.updateProfile(userData);

      if (response.success && response.data?.user) {
        setUser(response.data.user);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            LOCAL_STORAGE_USER_KEY,
            JSON.stringify(response.data.user)
          );
        }
      } else {
        throw new Error(response.error || "Profile update failed");
      }
    } catch (error) {
      throw error;
    }
  };

  const refreshUser = async () => {
    // Don't refresh user during form submissions to prevent state reset
    if (isSubmissionPage) {
      return;
    }

    try {
      const response = await apiService.getCurrentUser();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            LOCAL_STORAGE_USER_KEY,
            JSON.stringify(response.data.user)
          );
        }
      }
    } catch (error: any) {
      // Only clear user state if it's a legitimate auth error
      if (error?.status === 401) {
        setUser(null);
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        }
      }
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
