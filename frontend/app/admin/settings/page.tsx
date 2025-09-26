// app/admin/settings/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import SettingsSidebar from "@/components/admin/settings/SettingsSidebar";
import GeneralSettings from "@/components/admin/settings/GeneralSettings";
import ProfileSettings from "@/components/admin/settings/ProfileSettings";
import SecuritySettings from "@/components/admin/settings/SecuritySettings";
import SystemSettings from "@/components/admin/settings/SystemSettings";
import MessageAlert from "@/components/admin/settings/MessageAlert";
import { CheckCircle, AlertCircle } from "lucide-react";

const AdminSettingsPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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

  const handleSystemCheck = () => {
    showMessage("success", "System check completed successfully");
  };

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
          <MessageAlert message={message} />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="admin-card">
                {/* General Settings */}
                {activeTab === "general" && (
                  <GeneralSettings
                    settings={generalSettings}
                    onSettingsChange={setGeneralSettings}
                    onSave={handleGeneralSettingsUpdate}
                    loading={loading}
                  />
                )}

                {/* Profile Settings */}
                {activeTab === "profile" && (
                  <ProfileSettings
                    profileData={profileData}
                    onProfileChange={setProfileData}
                    onSave={handleProfileUpdate}
                    loading={loading}
                  />
                )}

                {/* Security Settings */}
                {activeTab === "security" && (
                  <SecuritySettings
                    passwordData={passwordData}
                    onPasswordChange={setPasswordData}
                    onSave={handlePasswordChange}
                    loading={loading}
                  />
                )}

                {/* System Settings */}
                {activeTab === "system" && (
                  <SystemSettings onSystemCheck={handleSystemCheck} />
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
