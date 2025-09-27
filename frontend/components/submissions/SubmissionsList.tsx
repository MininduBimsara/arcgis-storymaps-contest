"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Tag,
  ExternalLink,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import apiService, { Submission, PaginatedResponse } from "@/lib/api";

interface SubmissionFilters {
  status?: string;
  category?: string;
  search?: string;
}

const SubmissionsList: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const [filters, setFilters] = useState<SubmissionFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Check for success parameter
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowSuccessMessage(true);
      // Remove success parameter from URL
      window.history.replaceState({}, "", "/submissions");

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
  }, [searchParams]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, isLoading, router]);

  // Load submissions
  useEffect(() => {
    if (isAuthenticated) {
      loadSubmissions();
    }
  }, [isAuthenticated, pagination.page, filters]);

  const loadSubmissions = async () => {
    try {
      setIsLoadingSubmissions(true);

      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };

      const response: PaginatedResponse<Submission[]> =
        await apiService.getMySubmissions(params);

      if (response.success && Array.isArray(response.data)) {
        setSubmissions(response.data);
        if (response.pagination) {
          setPagination((prev) => ({
            ...prev,
            total: response.pagination!.total,
            pages: Math.ceil(response.pagination!.total / pagination.limit),
          }));
        }
      }
    } catch (error) {
      console.error("Failed to load submissions:", error);
    } finally {
      setIsLoadingSubmissions(false);
    }
  };

  const handleDelete = async (submissionId: string) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) {
      return;
    }

    try {
      const response = await apiService.deleteSubmission(submissionId);
      if (response.success) {
        // Remove from local state
        setSubmissions((prev) => prev.filter((s) => s._id !== submissionId));
        // Update pagination
        setPagination((prev) => ({
          ...prev,
          total: prev.total - 1,
        }));
      }
    } catch (error: any) {
      alert(error.error || error.message || "Failed to delete submission");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <Edit className="w-4 h-4 text-gray-500" />;
      case "submitted":
      case "under_review":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case "winner":
        return <CheckCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-50 text-gray-700 border border-gray-200";
      case "submitted":
      case "under_review":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "approved":
        return "bg-green-50 text-green-700 border border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border border-red-200";
      case "winner":
        return "bg-yellow-50 text-yellow-700 border border-yellow-300";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (newFilters: Partial<SubmissionFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-light text-black mb-2">
            Authentication Required
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in to view your submissions.
          </p>
          <button
            onClick={() => router.push("/auth")}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-black mb-3 sm:mb-6">
                My Submissions
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                Manage your StoryMap submissions and track their status
              </p>
            </div>
            <button
              onClick={() => router.push("/submissions/create")}
              className="bg-black hover:bg-gray-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-md font-normal transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              New Submission
            </button>
          </div>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-md text-green-700 flex items-center">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-600 flex-shrink-0" />
            <span className="text-sm sm:text-base">
              Your submission has been created successfully!
            </span>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="ml-auto text-green-600 hover:text-green-800 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-medium text-black">
              Filters
            </h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 sm:gap-2 transition-colors text-sm sm:text-base"
            >
              <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  <input
                    type="text"
                    value={filters.search || ""}
                    onChange={(e) =>
                      handleFilterChange({ search: e.target.value })
                    }
                    placeholder="Search submissions..."
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Status
                </label>
                <select
                  value={filters.status || ""}
                  onChange={(e) =>
                    handleFilterChange({ status: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="winner">Winner</option>
                </select>
              </div>

              <div className="flex items-end sm:col-span-2 lg:col-span-1">
                <button
                  onClick={() => setFilters({})}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submissions List */}
        {isLoadingSubmissions ? (
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-blue-600 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-600">
              Loading your submissions...
            </p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-md border border-blue-200 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-black mb-2 sm:mb-3">
                No submissions yet
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Create your first StoryMap submission to get started in the
                competition.
              </p>
              <button
                onClick={() => router.push("/submissions/create")}
                className="bg-black hover:bg-gray-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-md font-normal transition-colors text-sm sm:text-base"
              >
                Create Your First Submission
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <div
                    key={submission._id}
                    className="p-4 sm:p-6 lg:p-8 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <h3 className="text-lg sm:text-xl font-medium text-black">
                            {submission.title}
                          </h3>
                          <span
                            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(submission.status)}`}
                          >
                            {getStatusIcon(submission.status)}
                            {submission.status.replace("_", " ").toUpperCase()}
                          </span>
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                          {submission.description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>
                              Submitted {formatDate(submission.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{submission.region}</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{submission.category.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 sm:gap-2 sm:ml-6">
                        {submission.storyMapUrl && (
                          <button
                            onClick={() =>
                              window.open(submission.storyMapUrl, "_blank")
                            }
                            className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="View StoryMap"
                          >
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        )}
                        <button
                          onClick={() =>
                            router.push(`/submissions/${submission._id}/edit`)
                          }
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit submission"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(submission._id)}
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete submission"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-1 sm:gap-2 p-4 sm:p-6 border-t border-gray-200">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from(
                    { length: Math.min(5, pagination.pages) },
                    (_, i) => {
                      const page =
                        pagination.page <= 3
                          ? i + 1
                          : pagination.page >= pagination.pages - 2
                            ? pagination.pages - 4 + i
                            : pagination.page - 2 + i;

                      if (page < 1 || page > pagination.pages) return null;

                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md transition-colors ${
                            page === pagination.page
                              ? "bg-black text-white"
                              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                  )}
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubmissionsList;
