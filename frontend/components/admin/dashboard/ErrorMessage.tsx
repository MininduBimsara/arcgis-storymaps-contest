// components/admin/dashboard/ErrorMessage.tsx
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { XCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  return (
    <AdminLayout>
      <div className="admin-container">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="admin-error-message">
            <div className="flex">
              <XCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-2 text-sm text-red-700">{error}</p>
                <button
                  onClick={onRetry}
                  className="mt-3 flex items-center text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200 transition-colors"
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ErrorMessage;
