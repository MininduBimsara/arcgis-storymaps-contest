// lib/adminApi.ts
import axios, { AxiosResponse, AxiosError } from "axios";

// Define interfaces for type safety
export interface User {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: "user" | "admin";
  status: "active" | "inactive" | "banned";
  emailVerified: boolean;
  submissionCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Submission {
  _id: string;
  title: string;
  description: string;
  storyMapUrl: string;
  submittedBy: string | User;
  category: string;
  status:
    | "draft"
    | "submitted"
    | "under_review"
    | "approved"
    | "rejected"
    | "winner";
  isPublic: boolean;
  teamMembers?: string[];
  tags?: string[];
  dataSources?: string[];
  adminNotes?: string;
  submissionYear: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  submissionCount: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  banned: number;
  verified: number;
  unverified: number;
  admins: number;
  users: number;
}

export interface SubmissionStats {
  total: number;
  draft: number;
  submitted: number;
  under_review: number;
  approved: number;
  rejected: number;
  winner: number;
  byCategory: Array<{
    category: string;
    count: number;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

// Create axios instance for admin API calls
const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
adminApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
adminApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = "/auth";
    }

    if (error.response?.status === 403) {
      // Handle forbidden access
      console.error("Access denied - admin privileges required");
    }

    return Promise.reject(error);
  }
);

// Helper function to handle API responses
const handleApiResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  if (response.data.success) {
    return response.data.data as T;
  }
  throw new Error(response.data.message || "API request failed");
};

// User Management API
export const userApi = {
  // Get all users with filters and pagination
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
    emailVerified?: boolean;
  }) => {
    const response = await adminApi.get<
      ApiResponse<{ users: User[]; page: number; limit: number; total: number }>
    >("/users", {
      params,
    });
    return response.data;
  },

  // Get user statistics
  getUserStats: async (): Promise<UserStats> => {
    const response =
      await adminApi.get<ApiResponse<{ stats: UserStats }>>("/users/stats");
    return response.data.data!.stats;
  },

  // Search users
  searchUsers: async (params: {
    q: string;
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
  }) => {
    const response = await adminApi.get<
      ApiResponse<{ users: User[]; page: number; limit: number; total: number }>
    >("/users/search", {
      params,
    });
    return response.data;
  },

  // Get user by ID
  getUserById: async (userId: string): Promise<User> => {
    const response = await adminApi.get<ApiResponse<{ user: User }>>(
      `/users/${userId}`
    );
    return response.data.data!.user;
  },

  // Update user
  updateUser: async (
    userId: string,
    userData: Partial<User>
  ): Promise<User> => {
    const response = await adminApi.put<ApiResponse<{ user: User }>>(
      `/users/${userId}`,
      userData
    );
    return response.data.data!.user;
  },

  // Activate user
  activateUser: async (userId: string): Promise<User> => {
    const response = await adminApi.post<ApiResponse<{ user: User }>>(
      `/users/${userId}/activate`
    );
    return response.data.data!.user;
  },

  // Deactivate user
  deactivateUser: async (userId: string): Promise<User> => {
    const response = await adminApi.post<ApiResponse<{ user: User }>>(
      `/users/${userId}/deactivate`
    );
    return response.data.data!.user;
  },

  // Change user role
  changeUserRole: async (
    userId: string,
    role: "user" | "admin"
  ): Promise<User> => {
    const response = await adminApi.post<ApiResponse<{ user: User }>>(
      `/users/${userId}/change-role`,
      { role }
    );
    return response.data.data!.user;
  },

  // Delete user
  deleteUser: async (userId: string): Promise<void> => {
    await adminApi.delete(`/users/${userId}`);
  },
};

// Submission Management API
export const submissionApi = {
  // Get all submissions with filters and pagination
  getSubmissions: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  }) => {
    const response = await adminApi.get<
      ApiResponse<{
        submissions: Submission[];
        page: number;
        limit: number;
        total: number;
      }>
    >("/submissions", {
      params,
    });
    return response.data;
  },

  // Get submission statistics
  getSubmissionStats: async (): Promise<SubmissionStats> => {
    const response =
      await adminApi.get<ApiResponse<{ stats: SubmissionStats }>>(
        "/submissions/stats"
      );
    return response.data.data!.stats;
  },

  // Update submission status
  updateSubmissionStatus: async (
    submissionId: string,
    status: string,
    adminNotes?: string
  ): Promise<Submission> => {
    const response = await adminApi.post<
      ApiResponse<{ submission: Submission }>
    >(`/submissions/${submissionId}/status`, {
      status,
      adminNotes,
    });
    return response.data.data!.submission;
  },

  // Bulk approve submissions
  bulkApproveSubmissions: async (submissionIds: string[]): Promise<void> => {
    await adminApi.post("/submissions/bulk-approve", { submissionIds });
  },

  // Delete submission
  deleteSubmission: async (submissionId: string): Promise<void> => {
    await adminApi.delete(`/submissions/${submissionId}`);
  },

  // Get submission by ID
  getSubmissionById: async (submissionId: string): Promise<Submission> => {
    const response = await adminApi.get<
      ApiResponse<{ submission: Submission }>
    >(`/submissions/${submissionId}`);
    return response.data.data!.submission;
  },
};

// Category Management API
export const categoryApi = {
  // Get all categories (including inactive)
  getAllCategories: async (): Promise<Category[]> => {
    const response = await adminApi.get<
      ApiResponse<{ categories: Category[] }>
    >("/categories/admin/all");
    return response.data.data!.categories;
  },

  // Create category
  createCategory: async (categoryData: {
    name: string;
    description: string;
    slug?: string;
    order?: number;
  }): Promise<Category> => {
    const response = await adminApi.post<ApiResponse<{ category: Category }>>(
      "/categories",
      categoryData
    );
    return response.data.data!.category;
  },

  // Update category
  updateCategory: async (
    categoryId: string,
    categoryData: Partial<Category>
  ): Promise<Category> => {
    const response = await adminApi.put<ApiResponse<{ category: Category }>>(
      `/categories/${categoryId}`,
      categoryData
    );
    return response.data.data!.category;
  },

  // Toggle category status
  toggleCategoryStatus: async (categoryId: string): Promise<Category> => {
    const response = await adminApi.post<ApiResponse<{ category: Category }>>(
      `/categories/${categoryId}/toggle`
    );
    return response.data.data!.category;
  },

  // Delete category
  deleteCategory: async (categoryId: string): Promise<void> => {
    await adminApi.delete(`/categories/${categoryId}`);
  },
};

export default adminApi;
