// components/admin/dashboard/StatCard.tsx
import React from "react";
import { TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  trend?: number;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  onClick,
}) => {
  return (
    <div
      className={`admin-card transition-all duration-200 ${
        onClick ? "cursor-pointer hover:shadow-md hover:-translate-y-1" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            {value.toLocaleString()}
          </p>
          {trend !== undefined && (
            <div className="flex items-center mt-1 sm:mt-2">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
              <span className="text-xs sm:text-sm text-green-600 font-medium">
                +{trend}% from last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${color}`}>
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
