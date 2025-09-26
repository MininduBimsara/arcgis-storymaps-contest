// app/admin/submissions/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { submissionApi, Submission } from "@/lib/adminApi";
import SubmissionsTable from "@/components/admin/submissions/SubmissionsTable";
import SearchFilters from "@/components/admin/submissions/SearchFilters";
import Pagination from "@/components/admin/submissions/Pagination";
import { RefreshCw, AlertCircle } from "lucide-react";

const AdminSubmissionsPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState(
    searchParams?.get("status") || ""
  );
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
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
      loadSubmissions();
    }
  }, [user, authLoading, router, currentPage, statusFilter, categoryFilter]);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {
        page: currentPage,
        limit,
      };

      if (statusFilter) params.status = statusFilter;
      if (categoryFilter) params.category = categoryFilter;

      const response = await submissionApi.getSubmissions(params);

      if (response && response.data) {
        const submissionsData = response.data.submissions || [];
        setSubmissions(submissionsData);
        setTotalSubmissions(response.data.total || 0);
      } else {
        setSubmissions([]);
        setTotalSubmissions(0);
        setError("Unexpected response format from server.");
      }
    } catch (err) {
      console.error("Error loading submissions:", err);
      setError("Failed to load submissions. Please try again.");
      setSubmissions([]);
      setTotalSubmissions(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmissionAction = async (
    submissionId: string,
    action: string
  ) => {
    try {
      switch (action) {
        case "view":
          router.push(`/admin/submissions/${submissionId}`);
          break;
        case "approve":
          await submissionApi.updateSubmissionStatus(submissionId, "approved");
          loadSubmissions();
          break;
        case "reject":
          await submissionApi.updateSubmissionStatus(submissionId, "rejected");
          loadSubmissions();
          break;
        case "make-winner":
          await submissionApi.updateSubmissionStatus(submissionId, "winner");
          loadSubmissions();
          break;
        case "delete":
          if (
            confirm(
              "Are you sure you want to delete this submission? This action cannot be undone."
            )
          ) {
            await submissionApi.deleteSubmission(submissionId);
            loadSubmissions();
          }
          break;
        case "bulk":
          // Handle bulk actions with selected submissions
          break;
      }
    } catch (err) {
      console.error("Error performing submission action:", err);
      setError("Failed to perform action. Please try again.");
      setTimeout(() => setError(null), 5000);
    }
  };

  const clearFilters = () => {
    setStatusFilter("");
    setCategoryFilter("");
    setCurrentPage(1);
    setShowFilters(false);
  };

  const hasActiveFilters = statusFilter || categoryFilter;

  const totalPages = Math.ceil(totalSubmissions / limit);

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
                  Submissions Management
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Review and manage competition submissions ({totalSubmissions}{" "}
                  total)
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={loadSubmissions}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <SearchFilters
            statusFilter={statusFilter}
            categoryFilter={categoryFilter}
            showFilters={showFilters}
            hasActiveFilters={hasActiveFilters}
            onStatusFilterChange={setStatusFilter}
            onCategoryFilterChange={setCategoryFilter}
            onShowFiltersChange={setShowFilters}
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

          {/* Submissions Table */}
          <SubmissionsTable
            submissions={submissions}
            onSubmissionAction={handleSubmissionAction}
            loading={loading}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalSubmissions}
              itemsPerPage={limit}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSubmissionsPage;
