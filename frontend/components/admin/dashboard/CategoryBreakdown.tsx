// components/admin/dashboard/CategoryBreakdown.tsx
import React from "react";

interface CategoryData {
  category: string;
  count: number;
}

interface CategoryBreakdownProps {
  categories: CategoryData[];
  totalSubmissions: number;
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  categories,
  totalSubmissions,
}) => {
  return (
    <div className="mb-8">
      <div className="admin-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Submissions by Category
        </h3>
        <div className="space-y-4">
          {categories.map((category, index) => {
            const percentage =
              totalSubmissions > 0
                ? (category.count / totalSubmissions) * 100
                : 0;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {category.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {category.count} submissions ({percentage.toFixed(1)}%)
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
  );
};

export default CategoryBreakdown;
