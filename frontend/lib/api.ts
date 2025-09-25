// lib/api.ts - FIXED VERSION
import axios, { AxiosInstance, AxiosResponse } from "axios";

// Types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

interface PaginatedResponse<T = any> extends ApiResponse<T> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "banned";
  emailVerified: boolean;
  profileImage?: string;
  phone?: string;
  address?: string;
  city?: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  isActive: boolean;
  submissionCount: number;
  icon?: string;
  color: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface SubmissionData {
  title: string;
  description: string;
  storyMapUrl: string;
  thumbnailUrl?: string;
  previewImages?: string[];
  category: string;
  tags?: string[];
  region: string;
  specificLocation?: string;
  teamMembers?: Array<{
    name: string;
    email: string;
    role: string;
  }>;
  dataSourcesUsed?: Array<{
    name: string;
    url?: string;
    type: string;
  }>;
  copyrightCompliant: boolean;
}

interface Submission {
  _id: string;
  title: string;
  slug: string;
  description: string;
  storyMapUrl: string;
  storyMapId: string;
  thumbnailUrl?: string;
  previewImages: string[];
  category: Category;
  tags: string[];
  region: string;
  specificLocation?: string;
  submittedBy: User;
  teamMembers: Array<{
    name: string;
    email: string;
    role: string;
  }>;
  status: string;
  isPublic: boolean;
  submissionDate?: string;
  dataSourcesUsed: Array<{
    name: string;
    url?: string;
    type: string;
  }>;
  submissionYear: number;
  copyrightCompliant: boolean;
  adminNotes: Array<{
    note: string;
    addedBy: string;
    addedAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;
  private isHandlingAuthError = false; // Prevent multiple redirects

  constructor() {
    this.baseURL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - FIXED TO PREVENT AUTH STATE RESET
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error) => {
        // Normalize axios error → { status, error, data }
        if (error.response) {
          const { status, data } = error.response;

          switch (status) {
            case 401:
              // FIXED: Only redirect for specific auth routes, not during form submissions
              if (typeof window !== "undefined" && !this.isHandlingAuthError) {
                const currentPath = window.location.pathname;

                // Only redirect if:
                // 1. User is on a protected page that requires auth
                // 2. The error is from an auth-specific endpoint (login/register/me)
                // 3. Not during form submissions or data operations
                const protectedPages = ["/profile"];
                const isProtectedPage = protectedPages.some((page) =>
                  currentPath.startsWith(page)
                );

                const isAuthEndpoint = error.config?.url?.includes("/auth/");
                const isCurrentUserCheck =
                  error.config?.url?.includes("/auth/me");

                // Only redirect if it's an auth endpoint failure or protected page
                // Don't redirect during submissions or data operations
                if (
                  (isAuthEndpoint || isCurrentUserCheck || isProtectedPage) &&
                  currentPath !== "/auth" &&
                  currentPath !== "/Auth" &&
                  !currentPath.startsWith("/submissions/create")
                ) {
                  this.isHandlingAuthError = true;

                  setTimeout(() => {
                    this.isHandlingAuthError = false;
                    window.location.href = "/auth";
                  }, 100);
                }
              }
              break;
            case 403:
              console.error("Access forbidden");
              break;
            case 404:
              console.error("Resource not found");
              break;
            case 500:
              console.error("Server error");
              break;
          }

          const normalized = {
            status,
            error:
              (typeof data === "object" && (data.error || data.message)) ||
              error.message ||
              "Request failed",
            data,
          } as any;
          return Promise.reject(normalized);
        }

        return Promise.reject({
          status: 0,
          error: error.message || "Network error",
        });
      }
    );
  }

  // Auth Methods
  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.api.post("/auth/login", credentials);
  }

  async register(
    userData: RegisterData
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.api.post("/auth/register", userData);
  }

  async logout(): Promise<ApiResponse> {
    return this.api.post("/auth/logout");
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return this.api.get("/auth/me");
  }

  async verifyEmail(token: string): Promise<ApiResponse<{ user: User }>> {
    return this.api.post("/auth/verify-email", { token });
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    return this.api.post("/auth/forgot-password", { email });
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse> {
    return this.api.post("/auth/reset-password", { token, password });
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse> {
    return this.api.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
  }

  async resendVerificationEmail(email: string): Promise<ApiResponse> {
    return this.api.post("/auth/resend-verification", { email });
  }

  // User Methods
  async updateProfile(
    userData: Partial<User>
  ): Promise<ApiResponse<{ user: User }>> {
    return this.api.put("/users/profile", userData);
  }

  async getUserProfile(): Promise<ApiResponse<{ user: User }>> {
    return this.api.get("/users/profile");
  }

  // Categories Methods
  async getActiveCategories(): Promise<
    ApiResponse<{ categories: Category[] }>
  > {
    return this.api.get("/categories");
  }

  async getCategoryBySlug(
    slug: string
  ): Promise<ApiResponse<{ category: Category }>> {
    return this.api.get(`/categories/slug/${slug}`);
  }

  async getCategoryStats(
    categoryId: string
  ): Promise<ApiResponse<{ stats: any }>> {
    return this.api.get(`/categories/${categoryId}/stats`);
  }

  // Submissions Methods
  async createSubmission(
    submissionData: SubmissionData
  ): Promise<ApiResponse<{ submission: Submission }>> {
    return this.api.post("/submissions", submissionData);
  }

  async getSubmissions(params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    region?: string;
    submissionYear?: number;
    sortBy?: string;
    order?: "asc" | "desc";
  }): Promise<PaginatedResponse<Submission[]>> {
    return this.api.get("/submissions", { params });
  }

  async getPublicSubmissions(params?: {
    page?: number;
    limit?: number;
    category?: string;
    region?: string;
    submissionYear?: number;
    sortBy?: string;
    order?: "asc" | "desc";
  }): Promise<PaginatedResponse<Submission[]>> {
    return this.api.get("/submissions/public", { params });
  }

  async getSubmissionById(
    id: string
  ): Promise<ApiResponse<{ submission: Submission }>> {
    return this.api.get(`/submissions/${id}`);
  }

  async updateSubmission(
    id: string,
    submissionData: Partial<SubmissionData>
  ): Promise<ApiResponse<{ submission: Submission }>> {
    return this.api.put(`/submissions/${id}`, submissionData);
  }

  async deleteSubmission(id: string): Promise<ApiResponse> {
    return this.api.delete(`/submissions/${id}`);
  }

  async getMySubmissions(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Submission[]>> {
    return this.api.get("/submissions/my-submissions", { params });
  }

  async getSubmissionsByCategory(
    categoryId: string,
    params?: {
      page?: number;
      limit?: number;
    }
  ): Promise<PaginatedResponse<Submission[]>> {
    return this.api.get(`/submissions/category/${categoryId}`, { params });
  }

  async getTopSubmissions(params?: {
    limit?: number;
    category?: string;
  }): Promise<ApiResponse<{ submissions: Submission[] }>> {
    return this.api.get("/submissions/top", { params });
  }

  async searchSubmissions(
    query: string,
    params?: {
      page?: number;
      limit?: number;
      category?: string;
      region?: string;
    }
  ): Promise<PaginatedResponse<Submission[]>> {
    return this.api.get("/submissions/search", {
      params: { q: query, ...params },
    });
  }

  async getStoryMapEmbed(id: string): Promise<
    ApiResponse<{
      storyMapId: string;
      storyMapUrl: string;
      embedUrl: string;
      iframeHtml: string;
      title: string;
      description: string;
    }>
  > {
    return this.api.get(`/submissions/${id}/storymap`);
  }

  // Stories (ArcGIS metadata) Methods
  async getArcgisStories(): Promise<ApiResponse<StoryMetaPublic[]>> {
    return this.api.get("/stories");
  }

  // Admin Methods (if user is admin)
  async getSubmissionStats(): Promise<ApiResponse<{ stats: any }>> {
    return this.api.get("/submissions/stats");
  }

  async updateSubmissionStatus(
    id: string,
    status: string,
    adminNotes?: string
  ): Promise<ApiResponse<{ submission: Submission }>> {
    return this.api.post(`/submissions/${id}/status`, { status, adminNotes });
  }

  async bulkApproveSubmissions(submissionIds: string[]): Promise<ApiResponse> {
    return this.api.post("/submissions/bulk-approve", { submissionIds });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export types for use in components
export type {
  ApiResponse,
  PaginatedResponse,
  User,
  LoginCredentials,
  RegisterData,
  Category,
  Submission,
  SubmissionData,
};

// Shared types for stories metadata
export interface StoryMetaPublic {
  id: string;
  title: string;
  author: string;
  description: string;
  thumbnailUrl: string;
  storyUrl: string;
}
