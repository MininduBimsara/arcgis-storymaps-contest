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
  const [authChecked, setAuthChecked] = useState(false);

  const pathname = usePathname();
  const isAuthenticated = !!user;

  // FIXED: Only check auth status on protected pages
  useEffect(() => {
    let isMounted = true;

    // Define public pages that don't need authentication
    const publicPages = [
      "/",
      "/Auth",
      "/auth",
      "/about",
      "/contact",
      "/details",
      "/stories",
      "/verify-email",
      "/reset-password",
    ];

    // Define protected pages that require authentication
    const protectedPages = [
      "/profile",
      "/submissions/create",
      "/submissions/my-submissions",
      // Add other protected routes here
    ];

    const isPublicPage = publicPages.some(
      (page) => pathname === page || pathname.startsWith(page)
    );
    const isProtectedPage = protectedPages.some((page) =>
      pathname.startsWith(page)
    );

    const checkAuthStatus = async () => {
      // If it's a public page, don't check auth but still allow checking if user wants to
      if (isPublicPage && !isProtectedPage) {
        // Try to get user data silently without redirecting on failure
        try {
          const response = await apiService.getCurrentUser();
          if (isMounted && response.success && response.data?.user) {
            setUser(response.data.user);
          }
        } catch (error) {
          // Silently fail for public pages - don't redirect
          if (isMounted) {
            setUser(null);
          }
        }

        if (isMounted) {
          setIsLoading(false);
          setAuthChecked(true);
        }
        return;
      }

      // For protected pages, check auth and redirect if needed
      if (isProtectedPage) {
        // Skip if already checked
        if (authChecked) {
          if (isMounted) {
            setIsLoading(false);
          }
          return;
        }

        try {
          const response = await apiService.getCurrentUser();

          if (isMounted && response.success && response.data?.user) {
            setUser(response.data.user);
          } else if (isMounted) {
            setUser(null);
            // Only redirect to auth for protected pages
            window.location.href = "/Auth";
          }
        } catch (error) {
          if (isMounted) {
            console.log("Auth check failed - redirecting to login");
            setUser(null);
            window.location.href = "/Auth";
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
            setAuthChecked(true);
          }
        }
        return;
      }

      // For other pages, don't check auth at all
      if (isMounted) {
        setIsLoading(false);
        setAuthChecked(true);
      }
    };

    checkAuthStatus();

    return () => {
      isMounted = false;
    };
  }, [pathname, authChecked]); // Add pathname and authChecked as dependencies

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await apiService.login({ email, password });

      if (response.success && response.data?.user) {
        setUser(response.data.user);
        setAuthChecked(true);
      } else {
        throw new Error(response.error || "Login failed");
      }
    } catch (error: any) {
      setUser(null);
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
        setAuthChecked(true);
      } else {
        throw new Error(response.error || "Registration failed");
      }
    } catch (error: any) {
      setUser(null);
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
      setAuthChecked(false); // Reset auth check on logout
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      const response = await apiService.updateProfile(userData);

      if (response.success && response.data?.user) {
        setUser(response.data.user);
      } else {
        throw new Error(response.error || "Profile update failed");
      }
    } catch (error) {
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await apiService.getCurrentUser();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
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
