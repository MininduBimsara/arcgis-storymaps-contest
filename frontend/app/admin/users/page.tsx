// app/admin/users/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { userApi, User } from "@/lib/adminApi";
import UsersTable from "@/components/admin/users/UsersTable";
import SearchFilters from "@/components/admin/users/SearchFilters";
import Pagination from "@/components/admin/users/Pagination";
import { RefreshCw, AlertCircle } from "lucide-react";

const AdminUsersPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [emailVerifiedFilter, setEmailVerifiedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [limit] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth");
        return;
      }
      if (user.role !== "admin") {
        router.push("/");
        return;
      }
      loadUsers();
    }
  }, [
    user,
    authLoading,
    router,
    currentPage,
    roleFilter,
    statusFilter,
    emailVerifiedFilter,
  ]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {
        page: currentPage,
        limit,
      };

      if (roleFilter) params.role = roleFilter;
      if (statusFilter) params.status = statusFilter;
      if (emailVerifiedFilter !== "")
        params.emailVerified = emailVerifiedFilter === "true";

      let response;
      if (searchTerm.trim()) {
        response = await userApi.searchUsers({
          q: searchTerm,
          ...params,
        });
      } else {
        response = await userApi.getUsers(params);
      }

      if (response && response.success && response.data) {
        setUsers(response.data.users || []);
        setTotalUsers(response.data.total || 0);
      } else {
        setUsers([]);
        setTotalUsers(0);
        setError("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Error loading users:", err);

      if (err.response?.status === 401) {
        setError("Unauthorized access. Please login again.");
        router.push("/auth");
      } else if (err.response?.status === 403) {
        setError("Access denied. Admin privileges required.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(
          err.message ||
            "Failed to load users. Please check your connection and try again."
        );
      }

      setUsers([]);
      setTotalUsers(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    loadUsers();
  };

  const handleUserAction = async (userId: string, action: string) => {
    try {
      switch (action) {
        case "view":
          break;
        case "edit":
          break;
        case "activate":
          await userApi.activateUser(userId);
          await loadUsers();
          break;
        case "deactivate":
          if (confirm("Are you sure you want to deactivate this user?")) {
            await userApi.deactivateUser(userId);
            await loadUsers();
          }
          break;
        case "make-admin":
          if (confirm("Are you sure you want to make this user an admin?")) {
            await userApi.changeUserRole(userId, "admin");
            await loadUsers();
          }
          break;
        case "make-user":
          if (
            confirm(
              "Are you sure you want to remove admin privileges from this user?"
            )
          ) {
            await userApi.changeUserRole(userId, "user");
            await loadUsers();
          }
          break;
        case "delete":
          if (
            confirm(
              "Are you sure you want to delete this user? This action cannot be undone."
            )
          ) {
            await userApi.deleteUser(userId);
            await loadUsers();
          }
          break;
      }
    } catch (err: any) {
      console.error("Error performing user action:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || `Failed to ${action} user. Please try again.`);
      }

      setTimeout(() => setError(null), 5000);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("");
    setStatusFilter("");
    setEmailVerifiedFilter("");
    setCurrentPage(1);
    setShowFilters(false);
  };

  const hasActiveFilters =
    roleFilter || statusFilter || emailVerifiedFilter || searchTerm;

  const totalPages = Math.ceil(totalUsers / limit);

  if (authLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="h-40 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-container">
        <div className="p-4 sm:p-6 lg:p-8 admin-layout-main">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Users Management
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage user accounts, roles, and permissions ({totalUsers}{" "}
                  total users)
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={loadUsers}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <SearchFilters
            searchTerm={searchTerm}
            roleFilter={roleFilter}
            statusFilter={statusFilter}
            emailVerifiedFilter={emailVerifiedFilter}
            showFilters={showFilters}
            hasActiveFilters={hasActiveFilters}
            onSearchTermChange={setSearchTerm}
            onRoleFilterChange={setRoleFilter}
            onStatusFilterChange={setStatusFilter}
            onEmailVerifiedFilterChange={setEmailVerifiedFilter}
            onShowFiltersChange={setShowFilters}
            onSearch={handleSearch}
            onClearFilters={clearFilters}
            onPageChange={setCurrentPage}
          />

          {/* Error Message */}
          {error && (
            <div className="admin-error-message">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="mt-2 text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Users Table */}
          <UsersTable
            users={users}
            onUserAction={handleUserAction}
            loading={loading}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalUsers}
              itemsPerPage={limit}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
