// components/admin/submissions/SubmissionsTable.tsx
import React, { useEffect, useState } from "react";
import { Submission } from "@/lib/adminApi";
import {
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  Trash2,
  ExternalLink,
  Calendar,
  FileText,
} from "lucide-react";

interface SubmissionsTableProps {
  submissions: Submission[];
  onSubmissionAction: (submissionId: string, action: string) => void;
  loading?: boolean;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions = [],
  onSubmissionAction,
  loading = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);

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
      <div className="admin-table-container">
        <div className="animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 p-6">
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

  if (!submissions || !Array.isArray(submissions)) {
    return (
      <div className="admin-table-container">
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
    <div className="admin-table-container">
      {/* Bulk Actions */}
      {selectedSubmissions.length > 0 && (
        <div className="bg-blue-50 px-6 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              {selectedSubmissions.length} submissions selected
            </span>
            <div className="admin-button-group">
              <button
                onClick={() => onSubmissionAction("bulk", "approve")}
                className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
              >
                Bulk Approve
              </button>
              <button
                onClick={() => onSubmissionAction("bulk", "reject")}
                className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
              >
                Bulk Reject
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="w-12">
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
              <th>Submission</th>
              <th>Author</th>
              <th>Status</th>
              <th>Category</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={selectedSubmissions.includes(submission._id)}
                    onChange={() => handleSelectSubmission(submission._id)}
                  />
                </td>
                <td>
                  <div className="flex items-start space-x-3">
                    <div className="flex-1 min-w-0">
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
                          className="inline-flex items-center mt-2 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          View StoryMap
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                <td>
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
                <td>
                  <span
                    className={`admin-status-badge ${getStatusColor(submission.status)}`}
                  >
                    {getStatusIcon(submission.status)}
                    <span className="ml-1 capitalize">
                      {submission.status.replace("_", " ")}
                    </span>
                  </span>
                </td>
                <td>
                  <span className="text-sm text-gray-900">
                    {typeof submission.category === "object"
                      ? (submission.category as any)?.name || "Unknown"
                      : submission.category || "Unknown"}
                  </span>
                </td>
                <td>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <div className="dropdown-container">
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === submission._id
                            ? null
                            : submission._id
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {dropdownOpen === submission._id && (
                      <div className="table-dropdown-menu admin-fade-in">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              onSubmissionAction(submission._id, "view");
                              setDropdownOpen(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Eye className="mr-3 h-4 w-4" />
                            View Details
                          </button>

                          {submission.status === "under_review" && (
                            <>
                              <div className="border-t border-gray-100 my-1"></div>

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
                            <>
                              <div className="border-t border-gray-100 my-1"></div>
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
                            </>
                          )}

                          <div className="border-t border-gray-100 my-1"></div>

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

export default SubmissionsTable;
