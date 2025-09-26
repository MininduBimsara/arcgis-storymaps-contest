// components/admin/users/SearchFilters.tsx
import React from "react";
import { Search, Filter, X } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  roleFilter: string;
  statusFilter: string;
  emailVerifiedFilter: string;
  showFilters: boolean;
  hasActiveFilters: boolean;
  onSearchTermChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onEmailVerifiedFilterChange: (value: string) => void;
  onShowFiltersChange: (show: boolean) => void;
  onSearch: () => void;
  onClearFilters: () => void;
  onPageChange: (page: number) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  roleFilter,
  statusFilter,
  emailVerifiedFilter,
  showFilters,
  hasActiveFilters,
  onSearchTermChange,
  onRoleFilterChange,
  onStatusFilterChange,
  onEmailVerifiedFilterChange,
  onShowFiltersChange,
  onSearch,
  onClearFilters,
  onPageChange,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="admin-search-filters">
      <div>
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute inset-y-0 left-0 pl-3 h-full w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or username..."
              className="admin-input pl-10 pr-3"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

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
                {
                  [
                    roleFilter,
                    statusFilter,
                    emailVerifiedFilter,
                    searchTerm,
                  ].filter(Boolean).length
                }
              </span>
            )}
          </button>

          <button
            onClick={onSearch}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Search
          </button>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <X className="mr-1 h-4 w-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border admin-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                className="admin-select w-full"
                value={roleFilter}
                onChange={(e) => {
                  onRoleFilterChange(e.target.value);
                  onPageChange(1);
                }}
              >
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="banned">Banned</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Status
              </label>
              <select
                className="admin-select w-full"
                value={emailVerifiedFilter}
                onChange={(e) => {
                  onEmailVerifiedFilterChange(e.target.value);
                  onPageChange(1);
                }}
              >
                <option value="">All Email Status</option>
                <option value="true">Verified</option>
                <option value="false">Unverified</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
