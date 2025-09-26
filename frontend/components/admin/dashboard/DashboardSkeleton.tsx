// components/admin/dashboard/DashboardSkeleton.tsx
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const DashboardSkeleton: React.FC = () => {
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
};

export default DashboardSkeleton;
