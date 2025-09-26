// components/admin/settings/ProfileSettings.tsx
import React from "react";
import { Save, RefreshCw } from "lucide-react";

interface ProfileSettingsProps {
  profileData: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  };
  onProfileChange: (profileData: any) => void;
  onSave: (e: React.FormEvent) => void;
  loading: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  profileData,
  onProfileChange,
  onSave,
  loading,
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Profile Information
      </h3>
      <form onSubmit={onSave} className="space-y-6">
        <div className="admin-form-grid">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              className="admin-input"
              value={profileData.firstName}
              onChange={(e) =>
                onProfileChange((prev: any) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              className="admin-input"
              value={profileData.lastName}
              onChange={(e) =>
                onProfileChange((prev: any) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="admin-input"
            value={profileData.email}
            onChange={(e) =>
              onProfileChange((prev: any) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            className="admin-input"
            value={profileData.username}
            onChange={(e) =>
              onProfileChange((prev: any) => ({
                ...prev,
                username: e.target.value,
              }))
            }
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
            <Save className="mr-2 h-4 w-4" />
          )}
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
