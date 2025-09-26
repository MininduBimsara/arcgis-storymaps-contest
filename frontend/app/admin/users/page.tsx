// app/admin/users/page.tsx - FIXED VERSION with improved layout
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { userApi, User } from "@/lib/adminApi";
import {
  Search,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  Shield,
  ShieldOff,
  CheckCircle,
  XCircle,
  Users,
  RefreshCw,
  Mail,
  Calendar,
  AlertCircle,
  Filter,
  X,
} from "lucide-react";

interface UsersTableProps {
  users: User[];
  onUserAction: (userId: string, action: string) => void;
  loading?: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onUserAction,
  loading = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  // Click outside handler to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".dropdown-container")) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "banned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "user":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="admin-table-container">
        <div className="animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-6 w-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="admin-table-container">
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No users found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Email Status</th>
              <th>Submissions</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-medium text-sm">
                        {user.firstName
                          ? user.firstName.charAt(0).toUpperCase()
                          : user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {user.firstName
                          ? `${user.firstName} ${user.lastName}`
                          : user.username}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="mr-1 h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`admin-status-badge ${getRoleColor(user.role)}`}
                  >
                    {user.role === "admin" && (
                      <Shield className="mr-1 h-3 w-3" />
                    )}
                    {user.role}
                  </span>
                </td>
                <td>
                  <span
                    className={`admin-status-badge ${getStatusColor(user.status)}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center">
                    {user.emailVerified ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        <span className="text-sm">Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <XCircle className="mr-1 h-4 w-4" />
                        <span className="text-sm">Unverified</span>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <span className="text-sm font-medium text-gray-900">
                    {user.submissionCount || 0}
                  </span>
                </td>
                <td>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <div className="dropdown-container">
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === user._id ? null : user._id
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-md hover:bg-gray-100 transition-colors"
                      aria-label="User actions"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {dropdownOpen === user._id && (
                      <div className="table-dropdown-menu admin-fade-in">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              onUserAction(user._id, "view");
                              setDropdownOpen(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Eye className="mr-3 h-4 w-4" />
                            View Details
                          </button>

                          <button
                            onClick={() => {
                              onUserAction(user._id, "edit");
                              setDropdownOpen(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Edit3 className="mr-3 h-4 w-4" />
                            Edit User
                          </button>

                          <div className="border-t border-gray-100 my-1"></div>

                          {user.status === "active" ? (
                            <button
                              onClick={() => {
                                onUserAction(user._id, "deactivate");
                                setDropdownOpen(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-orange-600 hover:bg-gray-100 w-full text-left"
                            >
                              <ShieldOff className="mr-3 h-4 w-4" />
                              Deactivate User
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                onUserAction(user._id, "activate");
                                setDropdownOpen(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-100 w-full text-left"
                            >
                              <Shield className="mr-3 h-4 w-4" />
                              Activate User
                            </button>
                          )}

                          <button
                            onClick={() => {
                              onUserAction(
                                user._id,
                                user.role === "admin"
                                  ? "make-user"
                                  : "make-admin"
                              );
                              setDropdownOpen(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 w-full text-left"
                          >
                            <Shield className="mr-3 h-4 w-4" />
                            Make {user.role === "admin" ? "User" : "Admin"}
                          </button>

                          <div className="border-t border-gray-100 my-1"></div>

                          <button
                            onClick={() => {
                              onUserAction(user._id, "delete");
                              setDropdownOpen(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                          >
                            <Trash2 className="mr-3 h-4 w-4" />
                            Delete User
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

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
          <div className="admin-search-filters">
            <div>
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute inset-y-0 left-0 pl-3 h-full w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users by name, email, or username..."
                    className="admin-input pl-10 pr-3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                    showFilters || hasActiveFilters
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                      {
                        [
                          roleFilter,
                          statusFilter,
                          emailVerifiedFilter,
                          searchTerm,
                        ].filter(Boolean).length
                      }
                    </span>
                  )}
                </button>

                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  Search
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <X className="mr-1 h-4 w-4" />
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border admin-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      className="admin-select w-full"
                      value={roleFilter}
                      onChange={(e) => {
                        setRoleFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="">All Roles</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="admin-select w-full"
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="banned">Banned</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Status
                    </label>
                    <select
                      className="admin-select w-full"
                      value={emailVerifiedFilter}
                      onChange={(e) => {
                        setEmailVerifiedFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="">All Email Status</option>
                      <option value="true">Verified</option>
                      <option value="false">Unverified</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

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
            <div className="admin-pagination">
              <div className="admin-pagination-info">
                Showing {(currentPage - 1) * limit + 1} to{" "}
                {Math.min(currentPage * limit, totalUsers)} of {totalUsers}{" "}
                users
              </div>
              <div className="admin-pagination-controls">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = Math.max(1, currentPage - 2) + i;
                  if (page > totalPages) return null;

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
