// components/admin/dashboard/SubmissionStatsSection.tsx
import React from "react";
import { SubmissionStats } from "@/lib/adminApi";
import StatCard from "./StatCard";
import { FileText, Clock, CheckCircle, Trophy } from "lucide-react";

interface SubmissionStatsSectionProps {
  submissionStats: SubmissionStats;
  onNavigate: (path: string) => void;
}

const SubmissionStatsSection: React.FC<SubmissionStatsSectionProps> = ({
  submissionStats,
  onNavigate,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Submission Statistics
      </h2>
      <div className="admin-stats-grid">
        <StatCard
          title="Total Submissions"
          value={submissionStats.total}
          icon={FileText}
          color="bg-indigo-500"
          trend={25}
          onClick={() => onNavigate("/admin/submissions")}
        />
        <StatCard
          title="Under Review"
          value={submissionStats.under_review}
          icon={Clock}
          color="bg-yellow-500"
          onClick={() => onNavigate("/admin/submissions?status=under_review")}
        />
        <StatCard
          title="Approved"
          value={submissionStats.approved}
          icon={CheckCircle}
          color="bg-green-500"
          trend={18}
          onClick={() => onNavigate("/admin/submissions?status=approved")}
        />
        <StatCard
          title="Winners"
          value={submissionStats.winner}
          icon={Trophy}
          color="bg-amber-500"
          onClick={() => onNavigate("/admin/submissions?status=winner")}
        />
      </div>
    </div>
  );
};

export default SubmissionStatsSection;
