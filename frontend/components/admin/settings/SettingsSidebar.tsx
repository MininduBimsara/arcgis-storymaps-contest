// components/admin/settings/SettingsSidebar.tsx
import React from "react";
import { Settings, User, Shield, Database } from "lucide-react";

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "general", name: "General", icon: Settings },
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Security", icon: Shield },
    { id: "system", name: "System", icon: Database },
  ];

  return (
    <div className="lg:w-64 flex-shrink-0">
      <nav className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon
                className={`mr-3 h-5 w-5 ${
                  activeTab === tab.id ? "text-blue-600" : "text-gray-400"
                }`}
              />
              {tab.name}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SettingsSidebar;
