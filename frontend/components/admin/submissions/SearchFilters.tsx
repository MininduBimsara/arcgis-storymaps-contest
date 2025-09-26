// components/admin/submissions/SearchFilters.tsx
import React from "react";
import { Filter, X } from "lucide-react";

interface SearchFiltersProps {
  statusFilter: string;
  categoryFilter: string;
  showFilters: boolean;
  hasActiveFilters: boolean;
  onStatusFilterChange: (value: string) => void;
  onCategoryFilterChange: (value: string) => void;
  onShowFiltersChange: (show: boolean) => void;
  onClearFilters: () => void;
  onPageChange: (page: number) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  statusFilter,
  categoryFilter,
  showFilters,
  hasActiveFilters,
  onStatusFilterChange,
  onCategoryFilterChange,
  onShowFiltersChange,
  onClearFilters,
  onPageChange,
}) => {
  return (
    <div className="admin-search-filters">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onShowFiltersChange(!showFilters)}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
              showFilters || hasActiveFilters
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                {[statusFilter, categoryFilter].filter(Boolean).length}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <X className="mr-1 h-4 w-4" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border admin-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="admin-select w-full"
                value={statusFilter}
                onChange={(e) => {
                  onStatusFilterChange(e.target.value);
                  onPageChange(1);
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="admin-select w-full"
                value={categoryFilter}
                onChange={(e) => {
                  onCategoryFilterChange(e.target.value);
                  onPageChange(1);
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
      )}
    </div>
  );
};

export default SearchFilters;
