// components/admin/settings/GeneralSettings.tsx
import React from "react";
import { Save, RefreshCw } from "lucide-react";

interface GeneralSettingsProps {
  settings: {
    siteName: string;
    siteDescription: string;
    maxSubmissions: number;
    enableRegistration: boolean;
    enableSubmissions: boolean;
    maintenanceMode: boolean;
  };
  onSettingsChange: (settings: any) => void;
  onSave: (e: React.FormEvent) => void;
  loading: boolean;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  settings,
  onSettingsChange,
  onSave,
  loading,
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        General Settings
      </h3>
      <form onSubmit={onSave} className="space-y-6">
        <div className="admin-form-grid">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name
            </label>
            <input
              type="text"
              className="admin-input"
              value={settings.siteName}
              onChange={(e) =>
                onSettingsChange((prev: any) => ({
                  ...prev,
                  siteName: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Submissions Per User
            </label>
            <input
              type="number"
              min="1"
              max="50"
              className="admin-input"
              value={settings.maxSubmissions}
              onChange={(e) =>
                onSettingsChange((prev: any) => ({
                  ...prev,
                  maxSubmissions: parseInt(e.target.value) || 5,
                }))
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Description
          </label>
          <textarea
            rows={3}
            className="admin-input"
            value={settings.siteDescription}
            onChange={(e) =>
              onSettingsChange((prev: any) => ({
                ...prev,
                siteDescription: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900">System Controls</h4>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={settings.enableRegistration}
                onChange={(e) =>
                  onSettingsChange((prev: any) => ({
                    ...prev,
                    enableRegistration: e.target.checked,
                  }))
                }
              />
              <span className="ml-2 text-sm text-gray-700">
                Enable user registration
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={settings.enableSubmissions}
                onChange={(e) =>
                  onSettingsChange((prev: any) => ({
                    ...prev,
                    enableSubmissions: e.target.checked,
                  }))
                }
              />
              <span className="ml-2 text-sm text-gray-700">
                Enable new submissions
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  onSettingsChange((prev: any) => ({
                    ...prev,
                    maintenanceMode: e.target.checked,
                  }))
                }
              />
              <span className="ml-2 text-sm text-gray-700">
                Maintenance mode (disables public access)
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          disabled={loading}
        >
          {loading ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default GeneralSettings;
