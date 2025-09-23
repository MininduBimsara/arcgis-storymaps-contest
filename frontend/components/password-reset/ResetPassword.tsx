// components/password-reset/ResetPassword.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Eye,
  EyeOff,
  Lock,
  AlertCircle,
} from "lucide-react";
import apiService from "@/lib/api";

interface ResetState {
  status: "loading" | "ready" | "success" | "error" | "expired" | "invalid";
  message: string;
}

const PasswordResetPage = () => {
  const [resetState, setResetState] = useState<ResetState>({
    status: "loading",
    message: "Validating reset token...",
  });

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  // Validate token on component mount
  useEffect(() => {
    if (!token) {
      setResetState({
        status: "invalid",
        message: "Invalid reset link. No token provided.",
      });
      return;
    }

    // Token is present, ready for password reset
    setResetState({
      status: "ready",
      message: "Enter your new password below.",
    });
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    // Validate passwords
    if (formData.password.length < 8) {
      setResetState({
        status: "error",
        message: "Password must be at least 8 characters long.",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setResetState({
        status: "error",
        message: "Passwords do not match.",
      });
      return;
    }

    setIsSubmitting(true);
    setResetState({
      status: "loading",
      message: "Resetting your password...",
    });

    try {
      const response = await apiService.resetPassword(token, formData.password);

      if (response.success) {
        setResetState({
          status: "success",
          message:
            "Your password has been successfully reset! You can now sign in with your new password.",
        });
      } else {
        setResetState({
          status: "error",
          message: response.error || "Password reset failed. Please try again.",
        });
      }
    } catch (error: any) {
      console.error("Password reset error:", error);

      if (error.response?.status === 400) {
        setResetState({
          status: "expired",
          message:
            "This reset link has expired or is invalid. Please request a new password reset email.",
        });
      } else {
        setResetState({
          status: "error",
          message:
            error.error ||
            error.message ||
            "Network error occurred. Please check your connection and try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/auth");
  };

  const handleSignIn = () => {
    router.push("/auth");
  };

  const getStatusIcon = () => {
    switch (resetState.status) {
      case "loading":
        return <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />;
      case "ready":
        return <Lock className="w-16 h-16 text-blue-500" />;
      case "success":
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case "error":
      case "expired":
      case "invalid":
        return <XCircle className="w-16 h-16 text-red-500" />;
      default:
        return <AlertCircle className="w-16 h-16 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (resetState.status) {
      case "loading":
        return "text-blue-600";
      case "ready":
        return "text-blue-600";
      case "success":
        return "text-green-600";
      case "error":
      case "expired":
      case "invalid":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  const getStatusTitle = () => {
    switch (resetState.status) {
      case "loading":
        return "Processing...";
      case "ready":
        return "Reset Your Password";
      case "success":
        return "Password Reset!";
      case "error":
        return "Reset Failed";
      case "expired":
        return "Link Expired";
      case "invalid":
        return "Invalid Link";
      default:
        return "Password Reset";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo/Branding */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Ceylon Stories
            </h2>
            <p className="text-sm text-gray-500">Password Reset</p>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">{getStatusIcon()}</div>

          {/* Title */}
          <h1
            className={`text-2xl font-bold mb-4 text-center ${getStatusColor()}`}
          >
            {getStatusTitle()}
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-8 leading-relaxed text-center">
            {resetState.message}
          </p>

          {/* Password Reset Form - Only show when ready */}
          {resetState.status === "ready" && (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              {/* New Password Field */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                <p className="font-medium mb-2">Password Requirements:</p>
                <ul className="space-y-1">
                  <li
                    className={`flex items-center gap-2 ${formData.password.length >= 8 ? "text-green-600" : "text-gray-500"}`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${formData.password.length >= 8 ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    At least 8 characters long
                  </li>
                  <li
                    className={`flex items-center gap-2 ${formData.password && formData.confirmPassword && formData.password === formData.confirmPassword ? "text-green-600" : "text-gray-500"}`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${formData.password && formData.confirmPassword && formData.password === formData.confirmPassword ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    Passwords match
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  formData.password.length < 8 ||
                  formData.password !== formData.confirmPassword
                }
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}

          {/* Action Buttons */}
          {resetState.status !== "ready" && (
            <div className="space-y-4">
              {resetState.status === "success" && (
                <button
                  onClick={handleSignIn}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Sign In with New Password
                </button>
              )}

              {(resetState.status === "expired" ||
                resetState.status === "error") && (
                <button
                  onClick={handleForgotPassword}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Request New Reset Link
                </button>
              )}

              {/* Back to Home */}
              <button
                onClick={() => router.push("/")}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Need help?{" "}
            <button
              onClick={() => router.push("/contact")}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
