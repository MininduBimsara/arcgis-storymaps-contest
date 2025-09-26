// components/admin/settings/SecuritySettings.tsx
import React, { useState } from "react";
import { Shield, RefreshCw, Eye, EyeOff } from "lucide-react";

interface SecuritySettingsProps {
  passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  onPasswordChange: (passwordData: any) => void;
  onSave: (e: React.FormEvent) => void;
  loading: boolean;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  passwordData,
  onPasswordChange,
  onSave,
  loading,
}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Change Password
      </h3>
      <form onSubmit={onSave} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              className="admin-input pr-10"
              value={passwordData.currentPassword}
              onChange={(e) =>
                onPasswordChange((prev: any) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="admin-input pr-10"
              value={passwordData.newPassword}
              onChange={(e) =>
                onPasswordChange((prev: any) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              required
              minLength={8}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Password must be at least 8 characters long
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            className="admin-input"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              onPasswordChange((prev: any) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            required
          />
        </div>

        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          disabled={loading}
        >
          {loading ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Shield className="mr-2 h-4 w-4" />
          )}
          Change Password
        </button>
      </form>
    </div>
  );
};

export default SecuritySettings;
