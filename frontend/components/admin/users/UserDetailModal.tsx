// components/admin/users/UserDetailModal.tsx
import React from "react";
import { User } from "@/lib/adminApi";
import { X, Mail, Calendar, Shield, CheckCircle, XCircle } from "lucide-react";

interface UserDetailModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-white/80 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-35">
        <div className="relative w-full max-w-2xl mx-auto my-8 transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              User Details
            </h2>
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Profile Section */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-xl">
                    {user.firstName
                      ? user.firstName.charAt(0).toUpperCase()
                      : user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {user.firstName
                      ? `${user.firstName} ${user.lastName}`
                      : user.username}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Mail className="mr-1 h-4 w-4" />
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Basic Information
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-500">Username</span>
                    <p className="text-sm text-gray-900">{user.username}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Email</span>
                    <p className="text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Role</span>
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role === "admin" && (
                        <Shield className="mr-1 h-3 w-3" />
                      )}
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Status
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-500">
                      Account Status
                    </span>
                    <p className="text-sm">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : user.status === "inactive"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">
                      Email Verification
                    </span>
                    <p className="text-sm flex items-center">
                      {user.emailVerified ? (
                        <>
                          <CheckCircle className="mr-1 h-4 w-4 text-green-600" />
                          <span className="text-green-600">Verified</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="mr-1 h-4 w-4 text-red-600" />
                          <span className="text-red-600">Unverified</span>
                        </>
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Submissions</span>
                    <p className="text-sm text-gray-900">
                      {user.submissionCount || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Timeline
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-500">Member Since</span>
                    <p className="text-sm text-gray-900 flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Last Updated</span>
                    <p className="text-sm text-gray-900">
                      {new Date(user.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
