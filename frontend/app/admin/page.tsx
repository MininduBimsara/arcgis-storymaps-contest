// app/admin/page.tsx
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
import StatCard from "@/components/admin/dashboard/StatCard";
import UserStatsSection from "@/components/admin/dashboard/UserStatsSection";
import SubmissionStatsSection from "@/components/admin/dashboard/SubmissionStatsSection";
import CategoryBreakdown from "@/components/admin/dashboard/CategoryBreakdown";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import DashboardSkeleton from "@/components/admin/dashboard/DashboardSkeleton";
import ErrorMessage from "@/components/admin/dashboard/ErrorMessage";
import { RefreshCw } from "lucide-react";

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
    return <DashboardSkeleton />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={loadDashboardData} />;
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

          {/* Dashboard Content */}
          {userStats && submissionStats && (
            <>
              <UserStatsSection
                userStats={userStats}
                onNavigate={router.push}
              />

              <SubmissionStatsSection
                submissionStats={submissionStats}
                onNavigate={router.push}
              />

              {submissionStats.byCategory &&
                submissionStats.byCategory.length > 0 && (
                  <CategoryBreakdown
                    categories={submissionStats.byCategory}
                    totalSubmissions={submissionStats.total}
                  />
                )}

              <QuickActions
                userStats={userStats}
                submissionStats={submissionStats}
                onNavigate={router.push}
              />
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
