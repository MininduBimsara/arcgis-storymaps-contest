// components/admin/dashboard/QuickActions.tsx
import React from "react";
import { UserStats, SubmissionStats } from "@/lib/adminApi";
import { Clock, Users, FolderOpen } from "lucide-react";

interface QuickActionsProps {
  userStats: UserStats;
  submissionStats: SubmissionStats;
  onNavigate: (path: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  userStats,
  submissionStats,
  onNavigate,
}) => {
  const actions = [
    {
      title: "Review Submissions",
      description: `${submissionStats.under_review} pending review`,
      icon: Clock,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
      onClick: () => onNavigate("/admin/submissions?status=under_review"),
    },
    {
      title: "Manage Users",
      description: `${userStats.total} total users`,
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      onClick: () => onNavigate("/admin/users"),
    },
    {
      title: "Manage Categories",
      description: "Configure submission categories",
      icon: FolderOpen,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      onClick: () => onNavigate("/admin/categories"),
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h2>
      <div className="admin-content-grid">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className="admin-card text-left hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center">
                <div
                  className={`p-3 ${action.bgColor} rounded-lg flex-shrink-0`}
                >
                  <Icon className={`h-6 w-6 ${action.iconColor}`} />
                </div>
                <div className="ml-4 min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
