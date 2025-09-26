// components/admin/settings/SystemSettings.tsx
import React from "react";
import { Database } from "lucide-react";

interface SystemSettingsProps {
  onSystemCheck: () => void;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({ onSystemCheck }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        System Information
      </h3>
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="font-medium text-gray-700 mb-1">System Version</dt>
              <dd className="text-gray-900">v1.0.0</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700 mb-1">Last Updated</dt>
              <dd className="text-gray-900">
                {new Date().toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700 mb-1">Environment</dt>
              <dd className="text-gray-900">Production</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700 mb-1">API Version</dt>
              <dd className="text-gray-900">v1</dd>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Service Status
            </h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-900">
                  Database Connected
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-900">
                  Email Service Active
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-900">
                  File Storage Available
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              type="button"
              className="flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
              onClick={onSystemCheck}
            >
              <Database className="mr-2 h-4 w-4" />
              Run System Check
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
