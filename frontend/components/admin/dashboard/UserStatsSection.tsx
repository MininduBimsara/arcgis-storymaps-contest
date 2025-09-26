// components/admin/dashboard/UserStatsSection.tsx
import React from "react";
import { UserStats } from "@/lib/adminApi";
import StatCard from "./StatCard";
import { Users, Eye, CheckCircle } from "lucide-react";

interface UserStatsSectionProps {
  userStats: UserStats;
  onNavigate: (path: string) => void;
}

const UserStatsSection: React.FC<UserStatsSectionProps> = ({
  userStats,
  onNavigate,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        User Statistics
      </h2>
      <div className="admin-stats-grid">
        <StatCard
          title="Total Users"
          value={userStats.total}
          icon={Users}
          color="bg-blue-500"
          trend={12}
          onClick={() => onNavigate("/admin/users")}
        />
        <StatCard
          title="Active Users"
          value={userStats.active}
          icon={Eye}
          color="bg-green-500"
          trend={8}
          onClick={() => onNavigate("/admin/users?status=active")}
        />
        <StatCard
          title="Verified Users"
          value={userStats.verified}
          icon={CheckCircle}
          color="bg-emerald-500"
          trend={15}
          onClick={() => onNavigate("/admin/users?emailVerified=true")}
        />
        <StatCard
          title="Admin Users"
          value={userStats.admins}
          icon={Users}
          color="bg-purple-500"
          onClick={() => onNavigate("/admin/users?role=admin")}
        />
      </div>
    </div>
  );
};

export default UserStatsSection;
