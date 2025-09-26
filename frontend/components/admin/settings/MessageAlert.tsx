// components/admin/settings/MessageAlert.tsx
import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface MessageAlertProps {
  message: {
    type: "success" | "error";
    text: string;
  } | null;
}

const MessageAlert: React.FC<MessageAlertProps> = ({ message }) => {
  if (!message) return null;

  return (
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
              message.type === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageAlert;
