// app/admin/submissions/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { submissionApi, Submission } from "@/lib/adminApi";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Trophy,
  RefreshCw,
  ExternalLink,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface SubmissionsTableProps {
  submissions: Submission[];
  onSubmissionAction: (submissionId: string, action: string) => void;
  loading?: boolean;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions = [], // Default to empty array
  onSubmissionAction,
  loading = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "under_review":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "winner":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "under_review":
        return <Clock className="h-4 w-4" />;
      case "winner":
        return <Trophy className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedSubmissions(submissions?.map((s) => s._id) || []);
    } else {
      setSelectedSubmissions([]);
    }
  };

  const handleSelectSubmission = (submissionId: string) => {
    setSelectedSubmissions((prev) =>
      prev.includes(submissionId)
        ? prev.filter((id) => id !== submissionId)
        : [...prev, submissionId]
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 p-4">
              <div className="flex items-center space-x-4">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Add null check for submissions
  if (!submissions || !Array.isArray(submissions)) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Unable to load submissions
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            There was an issue loading the submissions data. Please refresh the
            page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-visible">
      {/* Bulk Actions */}
      {selectedSubmissions.length > 0 && (
        <div className="bg-blue-50 px-6 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              {selectedSubmissions.length} submissions selected
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => onSubmissionAction("bulk", "approve")}
                className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
              >
                Bulk Approve
              </button>
              <button
                onClick={() => onSubmissionAction("bulk", "reject")}
                className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
              >
                Bulk Reject
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={
                    submissions.length > 0 &&
                    selectedSubmissions.length === submissions.length
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submission
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.map((submission) => (
              <tr key={submission._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={selectedSubmissions.includes(submission._id)}
                    onChange={() => handleSelectSubmission(submission._id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">
                        {submission.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {submission.description}
                      </div>
                      {submission.storyMapUrl && (
                        <a
                          href={submission.storyMapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center mt-2 text-xs text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          View StoryMap
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {typeof submission.submittedBy === "object"
                      ? submission.submittedBy.firstName
                        ? `${submission.submittedBy.firstName} ${submission.submittedBy.lastName}`
                        : submission.submittedBy.username
                      : "Unknown User"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {typeof submission.submittedBy === "object" &&
                      submission.submittedBy.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}
                  >
                    {getStatusIcon(submission.status)}
                    <span className="ml-1 capitalize">
                      {submission.status.replace("_", " ")}
                    </span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {typeof submission.category === "object"
                    ? (submission.category as any)?.name || "Unknown"
                    : submission.category || "Unknown"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === submission._id
                            ? null
                            : submission._id
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 p-1 rounded"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {dropdownOpen === submission._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                          {submission.status === "under_review" && (
                            <>
                              <button
                                onClick={() => {
                                  onSubmissionAction(submission._id, "approve");
                                  setDropdownOpen(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-100 w-full text-left"
                              >
                                <CheckCircle className="mr-3 h-4 w-4" />
                                Approve
                              </button>

                              <button
                                onClick={() => {
                                  onSubmissionAction(submission._id, "reject");
                                  setDropdownOpen(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                              >
                                <XCircle className="mr-3 h-4 w-4" />
                                Reject
                              </button>
                            </>
                          )}

                          {submission.status === "approved" && (
                            <button
                              onClick={() => {
                                onSubmissionAction(
                                  submission._id,
                                  "make-winner"
                                );
                                setDropdownOpen(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-amber-600 hover:bg-gray-100 w-full text-left"
                            >
                              <Trophy className="mr-3 h-4 w-4" />
                              Mark as Winner
                            </button>
                          )}

                          <div className="border-t border-gray-100"></div>

                          <button
                            onClick={() => {
                              onSubmissionAction(submission._id, "delete");
                              setDropdownOpen(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                          >
                            <Trash2 className="mr-3 h-4 w-4" />
                            Delete
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

      {submissions.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No submissions found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

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
        // Ensure submissions is always an array
        const submissionsData = response.data.submissions || [];
        setSubmissions(submissionsData);
        setTotalSubmissions(response.data.total || 0);
      } else {
        // Handle case where response structure is unexpected
        setSubmissions([]);
        setTotalSubmissions(0);
        setError("Unexpected response format from server.");
      }
    } catch (err) {
      console.error("Error loading submissions:", err);
      setError("Failed to load submissions. Please try again.");
      // Ensure submissions is set to empty array on error
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
      alert("Failed to perform action. Please try again.");
    }
  };

  const totalPages = Math.ceil(totalSubmissions / limit);

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Submissions Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Review and manage competition submissions
              </p>
            </div>
            <button
              onClick={loadSubmissions}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-3">
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="winner">Winner</option>
              </select>

              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Categories</option>
                <option value="tourism">Tourism</option>
                <option value="culture">Culture</option>
                <option value="nature">Nature</option>
                <option value="history">History</option>
                <option value="food">Food</option>
              </select>
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
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {(currentPage - 1) * limit + 1} to{" "}
              {Math.min(currentPage * limit, totalSubmissions)} of{" "}
              {totalSubmissions} submissions
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
                const page = i + 1;
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

export default AdminSubmissionsPage;
