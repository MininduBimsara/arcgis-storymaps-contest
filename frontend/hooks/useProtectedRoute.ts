// hooks/useProtectedRoute.ts - UPDATED VERSION
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Hook to protect routes that require authentication
 * Use this in components that should only be accessible to logged-in users
 */
export const useProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return;

    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      router.replace("/auth");
    }
  }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, isLoading };
};

/**
 * Hook to redirect authenticated users away from auth pages
 * Use this on login/register pages
 * ✅ UPDATED: Considers user role for proper redirect
 */
export const useAuthRedirect = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return;

    // If user is authenticated, redirect based on role
    if (isAuthenticated && user) {
      // ✅ FIXED: Redirect admins to admin dashboard, regular users to home
      if (user.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  return { isAuthenticated, isLoading };
};

/**
 * ✅ NEW: Hook specifically for admin-only pages
 * Use this in admin components to ensure only admins can access them
 */
export const useAdminRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return;

    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      router.replace("/auth");
      return;
    }

    // If user is authenticated but not admin, redirect to home
    if (user && user.role !== "admin") {
      router.replace("/");
      return;
    }
  }, [isAuthenticated, isLoading, user, router]);

  return { isAuthenticated, isLoading, isAdmin: user?.role === "admin" };
};
