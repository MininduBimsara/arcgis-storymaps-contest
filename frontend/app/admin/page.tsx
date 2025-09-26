// app/admin/page.tsx - FIXED VERSION with improved layout
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  userApi,
  submissionApi,
  UserStats,
  SubmissionStats,
} from "@/lib/adminApi";
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Trophy,
  TrendingUp,
  Eye,
  FolderOpen,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  trend?: number;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  onClick,
}) => {
  return (
    <div
      className={`admin-card transition-all duration-200 ${
        onClick ? "cursor-pointer hover:shadow-md hover:-translate-y-1" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-gray-900">
            {value.toLocaleString()}
          </p>
          {trend !== undefined && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">
                +{trend}% from last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg flex-shrink-0 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [submissionStats, setSubmissionStats] =
    useState<SubmissionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      loadDashboardData();
    }
  }, [user, authLoading, router]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [userStatsData, submissionStatsData] = await Promise.all([
        userApi.getUserStats(),
        submissionApi.getSubmissionStats(),
      ]);

      setUserStats(userStatsData);
      setSubmissionStats(submissionStatsData);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="admin-stats-grid mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="admin-card">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16 mb-4"></div>
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="admin-container">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="admin-error-message">
              <div className="flex">
                <XCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="mt-2 text-sm text-red-700">{error}</p>
                  <button
                    onClick={loadDashboardData}
                    className="mt-3 flex items-center text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200 transition-colors"
                  >
                    <RefreshCw className="mr-1 h-3 w-3" />
                    Try Again
                  </button>
                </div>
              </div>
            </div>
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
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Overview of your Ceylon Stories competition platform
                </p>
              </div>
              <button
                onClick={loadDashboardData}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          {userStats && submissionStats && (
            <>
              {/* User Stats */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  User Statistics
                </h2>
                <div className="admin-stats-grid">
                  <StatCard
                    title="Total Users"
                    value={userStats.total}
                    icon={Users}
                    color="bg-blue-500"
                    trend={12}
                    onClick={() => router.push("/admin/users")}
                  />
                  <StatCard
                    title="Active Users"
                    value={userStats.active}
                    icon={Eye}
                    color="bg-green-500"
                    trend={8}
                    onClick={() => router.push("/admin/users?status=active")}
                  />
                  <StatCard
                    title="Verified Users"
                    value={userStats.verified}
                    icon={CheckCircle}
                    color="bg-emerald-500"
                    trend={15}
                    onClick={() =>
                      router.push("/admin/users?emailVerified=true")
                    }
                  />
                  <StatCard
                    title="Admin Users"
                    value={userStats.admins}
                    icon={Users}
                    color="bg-purple-500"
                    onClick={() => router.push("/admin/users?role=admin")}
                  />
                </div>
              </div>

              {/* Submission Stats */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Submission Statistics
                </h2>
                <div className="admin-stats-grid">
                  <StatCard
                    title="Total Submissions"
                    value={submissionStats.total}
                    icon={FileText}
                    color="bg-indigo-500"
                    trend={25}
                    onClick={() => router.push("/admin/submissions")}
                  />
                  <StatCard
                    title="Under Review"
                    value={submissionStats.under_review}
                    icon={Clock}
                    color="bg-yellow-500"
                    onClick={() =>
                      router.push("/admin/submissions?status=under_review")
                    }
                  />
                  <StatCard
                    title="Approved"
                    value={submissionStats.approved}
                    icon={CheckCircle}
                    color="bg-green-500"
                    trend={18}
                    onClick={() =>
                      router.push("/admin/submissions?status=approved")
                    }
                  />
                  <StatCard
                    title="Winners"
                    value={submissionStats.winner}
                    icon={Trophy}
                    color="bg-amber-500"
                    onClick={() =>
                      router.push("/admin/submissions?status=winner")
                    }
                  />
                </div>
              </div>

              {/* Submissions by Category */}
              {submissionStats.byCategory &&
                submissionStats.byCategory.length > 0 && (
                  <div className="mb-8">
                    <div className="admin-card">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Submissions by Category
                      </h3>
                      <div className="space-y-4">
                        {submissionStats.byCategory.map((category, index) => {
                          const percentage =
                            submissionStats.total > 0
                              ? (category.count / submissionStats.total) * 100
                              : 0;
                          return (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-900">
                                  {category.category}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {category.count} submissions (
                                  {percentage.toFixed(1)}%)
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                  style={{
                                    width: `${Math.max(percentage, 2)}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

              {/* Quick Actions */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="admin-content-grid">
                  <button
                    onClick={() =>
                      router.push("/admin/submissions?status=under_review")
                    }
                    className="admin-card text-left hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-yellow-100 rounded-lg flex-shrink-0">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4 min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          Review Submissions
                        </h3>
                        <p className="text-sm text-gray-500">
                          {submissionStats.under_review} pending review
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push("/admin/users")}
                    className="admin-card text-left hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4 min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          Manage Users
                        </h3>
                        <p className="text-sm text-gray-500">
                          {userStats.total} total users
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push("/admin/categories")}
                    className="admin-card text-left hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
                        <FolderOpen className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4 min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          Manage Categories
                        </h3>
                        <p className="text-sm text-gray-500">
                          Configure submission categories
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
