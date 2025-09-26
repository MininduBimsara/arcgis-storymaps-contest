// app/admin/settings/page.tsx - FIXED VERSION with improved layout
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Settings,
  User,
  Shield,
  Bell,
  Database,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";

const AdminSettingsPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Ceylon Stories",
    siteDescription:
      "2025 ArcGIS StoryMaps Competition - Discover Sri Lanka through Stories",
    maxSubmissions: 5,
    enableRegistration: true,
    enableSubmissions: true,
    maintenanceMode: false,
  });

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth");
        return;
      }
      if (user.role !== "admin") {
        router.push("/");
        return;
      }

      // Initialize form data
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        username: user.username || "",
      });
    }
  }, [user, authLoading, router]);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleGeneralSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Here you would call your API to update general settings
      // await adminApi.updateGeneralSettings(generalSettings);
      showMessage("success", "General settings updated successfully");
    } catch (error) {
      console.error("Error updating general settings:", error);
      showMessage("error", "Failed to update general settings");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Here you would call your API to update profile
      // await adminApi.updateProfile(profileData);
      showMessage("success", "Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      showMessage("error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage("error", "New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showMessage("error", "Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      // Here you would call your API to change password
      // await adminApi.changePassword(passwordData);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      showMessage("success", "Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error);
      showMessage("error", "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "general", name: "General", icon: Settings },
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Security", icon: Shield },
    { id: "system", name: "System", icon: Database },
  ];

  if (authLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="h-40 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-container">
        <div className="p-4 sm:p-6 lg:p-8 admin-layout-main">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your admin account and system settings
            </p>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mb-6 rounded-md p-4 ${
                message.type === "success"
                  ? "admin-success-message"
                  : "admin-error-message"
              }`}
            >
              <div className="flex">
                {message.type === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400" />
                )}
                <div className="ml-3">
                  <p
                    className={`text-sm ${
                      message.type === "success"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          activeTab === tab.id
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="admin-card">
                {/* General Settings */}
                {activeTab === "general" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                      General Settings
                    </h3>
                    <form
                      onSubmit={handleGeneralSettingsUpdate}
                      className="space-y-6"
                    >
                      <div className="admin-form-grid">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Site Name
                          </label>
                          <input
                            type="text"
                            className="admin-input"
                            value={generalSettings.siteName}
                            onChange={(e) =>
                              setGeneralSettings((prev) => ({
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
                            value={generalSettings.maxSubmissions}
                            onChange={(e) =>
                              setGeneralSettings((prev) => ({
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
                          value={generalSettings.siteDescription}
                          onChange={(e) =>
                            setGeneralSettings((prev) => ({
                              ...prev,
                              siteDescription: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-md font-medium text-gray-900">
                          System Controls
                        </h4>

                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              checked={generalSettings.enableRegistration}
                              onChange={(e) =>
                                setGeneralSettings((prev) => ({
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
                              checked={generalSettings.enableSubmissions}
                              onChange={(e) =>
                                setGeneralSettings((prev) => ({
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
                              checked={generalSettings.maintenanceMode}
                              onChange={(e) =>
                                setGeneralSettings((prev) => ({
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
                )}

                {/* Profile Settings */}
                {activeTab === "profile" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                      Profile Information
                    </h3>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
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
                              setProfileData((prev) => ({
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
                              setProfileData((prev) => ({
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
                            setProfileData((prev) => ({
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
                            setProfileData((prev) => ({
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
                )}

                {/* Security Settings */}
                {activeTab === "security" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                      Change Password
                    </h3>
                    <form onSubmit={handlePasswordChange} className="space-y-6">
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
                              setPasswordData((prev) => ({
                                ...prev,
                                currentPassword: e.target.value,
                              }))
                            }
                            required
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
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
                              setPasswordData((prev) => ({
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
                            setPasswordData((prev) => ({
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
                )}

                {/* System Settings */}
                {activeTab === "system" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                      System Information
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                          <div>
                            <dt className="font-medium text-gray-700 mb-1">
                              System Version
                            </dt>
                            <dd className="text-gray-900">v1.0.0</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-700 mb-1">
                              Last Updated
                            </dt>
                            <dd className="text-gray-900">
                              {new Date().toLocaleDateString()}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-700 mb-1">
                              Environment
                            </dt>
                            <dd className="text-gray-900">Production</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-700 mb-1">
                              API Version
                            </dt>
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
                            onClick={() =>
                              showMessage(
                                "success",
                                "System check completed successfully"
                              )
                            }
                          >
                            <Database className="mr-2 h-4 w-4" />
                            Run System Check
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
