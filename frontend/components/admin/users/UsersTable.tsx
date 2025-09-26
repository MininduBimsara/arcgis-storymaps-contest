// components/admin/users/UsersTable.tsx
import React, { useEffect, useState } from "react";
import { User } from "@/lib/adminApi";
import {
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  Shield,
  ShieldOff,
  CheckCircle,
  XCircle,
  Users,
  Mail,
  Calendar,
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

export default UsersTable;
