// components/admin/categories/CategoriesTable.tsx
import React, { useEffect, useState } from "react";
import { Category } from "@/lib/adminApi";
import {
  MoreVertical,
  Edit3,
  Trash2,
  FolderOpen,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface CategoriesTableProps {
  categories: Category[];
  onCategoryAction: (categoryId: string, action: string) => void;
  loading?: boolean;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({
  categories,
  onCategoryAction,
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

  if (loading) {
    return (
      <div className="admin-table-container">
        <div className="animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
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
              <th>Category</th>
              <th>Slug</th>
              <th>Submissions</th>
              <th>Order</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FolderOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {category.name}
                      </div>
                      {category.description && (
                        <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {category.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-800">
                    {category.slug}
                  </code>
                </td>
                <td>
                  <span className="text-sm font-medium text-gray-900">
                    {category.submissionCount || 0}
                  </span>
                </td>
                <td>
                  <span className="text-sm text-gray-900">
                    {category.order}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => onCategoryAction(category._id, "toggle")}
                    className={`admin-status-badge transition-colors ${
                      category.isActive
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {category.isActive ? (
                      <>
                        <ToggleRight className="mr-1 h-3 w-3" />
                        Active
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="mr-1 h-3 w-3" />
                        Inactive
                      </>
                    )}
                  </button>
                </td>
                <td>
                  <div className="dropdown-container">
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === category._id ? null : category._id
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {dropdownOpen === category._id && (
                      <div className="table-dropdown-menu admin-fade-in">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              onCategoryAction(category._id, "edit");
                              setDropdownOpen(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Edit3 className="mr-3 h-4 w-4" />
                            Edit Category
                          </button>

                          <button
                            onClick={() => {
                              onCategoryAction(category._id, "toggle");
                              setDropdownOpen(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            {category.isActive ? (
                              <>
                                <ToggleLeft className="mr-3 h-4 w-4" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <ToggleRight className="mr-3 h-4 w-4" />
                                Activate
                              </>
                            )}
                          </button>

                          <div className="border-t border-gray-100 my-1"></div>

                          <button
                            onClick={() => {
                              onCategoryAction(category._id, "delete");
                              setDropdownOpen(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            disabled={(category.submissionCount || 0) > 0}
                          >
                            <Trash2 className="mr-3 h-4 w-4" />
                            Delete
                          </button>

                          {(category.submissionCount || 0) > 0 && (
                            <div className="px-4 py-2 text-xs text-gray-500">
                              Cannot delete: has {category.submissionCount}{" "}
                              submissions
                            </div>
                          )}
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

      {categories.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No categories found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Create your first category to organize submissions.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;
