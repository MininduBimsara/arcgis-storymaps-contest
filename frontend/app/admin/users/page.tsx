// app/admin/users/page.tsx - FIXED VERSION with proper backend connection
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 p-4">
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-visible">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {user.firstName
                          ? user.firstName.charAt(0).toUpperCase()
                          : user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName
                          ? `${user.firstName} ${user.lastName}`
                          : user.username}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}
                  >
                    {user.role === "admin" && (
                      <Shield className="mr-1 h-3 w-3" />
                    )}
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {user.submissionCount || 0}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === user._id ? null : user._id
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {dropdownOpen === user._id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setDropdownOpen(null)}
                        />

                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
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
                      </>
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

      console.log("Loading users..."); // Debug log

      const params: any = {
        page: currentPage,
        limit,
      };

      if (roleFilter) params.role = roleFilter;
      if (statusFilter) params.status = statusFilter;
      if (emailVerifiedFilter !== "")
        params.emailVerified = emailVerifiedFilter === "true";

      console.log("API params:", params); // Debug log

      let response;
      if (searchTerm.trim()) {
        console.log("Searching users with term:", searchTerm); // Debug log
        response = await userApi.searchUsers({
          q: searchTerm,
          ...params,
        });
      } else {
        console.log("Getting all users"); // Debug log
        response = await userApi.getUsers(params);
      }

      console.log("API response:", response); // Debug log

      if (response && response.success && response.data) {
        setUsers(response.data.users || []);
        setTotalUsers(response.data.total || 0);
        console.log(
          "Users loaded:",
          response.data.users?.length,
          "Total:",
          response.data.total
        );
      } else {
        console.warn("Invalid response structure:", response);
        setUsers([]);
        setTotalUsers(0);
        setError("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Error loading users:", err);

      // Handle different types of errors
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
      console.log("Performing action:", action, "on user:", userId); // Debug log

      switch (action) {
        case "view":
          console.log("View user:", userId);
          break;
        case "edit":
          console.log("Edit user:", userId);
          break;
        case "activate":
          console.log("Activating user:", userId);
          await userApi.activateUser(userId);
          await loadUsers(); // Refresh the list
          break;
        case "deactivate":
          if (confirm("Are you sure you want to deactivate this user?")) {
            console.log("Deactivating user:", userId);
            await userApi.deactivateUser(userId);
            await loadUsers(); // Refresh the list
          }
          break;
        case "make-admin":
          if (confirm("Are you sure you want to make this user an admin?")) {
            console.log("Making user admin:", userId);
            await userApi.changeUserRole(userId, "admin");
            await loadUsers(); // Refresh the list
          }
          break;
        case "make-user":
          if (
            confirm(
              "Are you sure you want to remove admin privileges from this user?"
            )
          ) {
            console.log("Removing admin role from user:", userId);
            await userApi.changeUserRole(userId, "user");
            await loadUsers(); // Refresh the list
          }
          break;
        case "delete":
          if (
            confirm(
              "Are you sure you want to delete this user? This action cannot be undone."
            )
          ) {
            console.log("Deleting user:", userId);
            await userApi.deleteUser(userId);
            await loadUsers(); // Refresh the list
          }
          break;
      }
    } catch (err: any) {
      console.error("Error performing user action:", err);

      // Show specific error messages
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || `Failed to ${action} user. Please try again.`);
      }

      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("");
    setStatusFilter("");
    setEmailVerifiedFilter("");
    setCurrentPage(1);
  };

  // Clear filters when dependencies change
  useEffect(() => {
    if (
      !roleFilter &&
      !statusFilter &&
      !emailVerifiedFilter &&
      currentPage === 1
    ) {
      loadUsers();
    }
  }, [roleFilter, statusFilter, emailVerifiedFilter, currentPage]);

  const totalPages = Math.ceil(totalUsers / limit);

  if (authLoading) {
    return (
      <AdminLayout>
        <div className="p-6">
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
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Users Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage user accounts, roles, and permissions ({totalUsers} total
                users)
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={loadUsers}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute inset-y-0 left-0 pl-3 h-full w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or username..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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

              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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

              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={emailVerifiedFilter}
                onChange={(e) => {
                  setEmailVerifiedFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Email Status</option>
                <option value="true">Verified</option>
                <option value="false">Unverified</option>
              </select>

              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>

              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200"
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
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {(currentPage - 1) * limit + 1} to{" "}
              {Math.min(currentPage * limit, totalUsers)} of {totalUsers} users
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className={`px-3 py-1 text-sm font-medium rounded-md ${
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
                className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
