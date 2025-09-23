"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2, Mail, AlertCircle } from "lucide-react";

interface VerificationState {
  status: "loading" | "success" | "error" | "expired" | "invalid";
  message: string;
}

const EmailVerificationPage = () => {
  const [verificationState, setVerificationState] = useState<VerificationState>(
    {
      status: "loading",
      message: "Verifying your email address...",
    }
  );
  const [isResending, setIsResending] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  // API Base URL - adjust this to match your backend
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  // Verify email on component mount
  useEffect(() => {
    if (!token) {
      setVerificationState({
        status: "invalid",
        message: "Invalid verification link. No token provided.",
      });
      return;
    }

    verifyEmail(token);
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify({ token: verificationToken }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setVerificationState({
          status: "success",
          message:
            "Your email has been successfully verified! You can now sign in to your account.",
        });
      } else {
        // Handle different error cases
        if (response.status === 400) {
          setVerificationState({
            status: "expired",
            message:
              "This verification link has expired. Please request a new verification email.",
          });
        } else {
          setVerificationState({
            status: "error",
            message:
              data.error || "Email verification failed. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationState({
        status: "error",
        message:
          "Network error occurred. Please check your connection and try again.",
      });
    }
  };

  const handleResendVerification = async () => {
    // You might want to implement a proper modal for this instead of using prompt
    const email = prompt(
      "Please enter your email address to resend verification:"
    );
    if (!email) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(
          "Verification email sent successfully! Please check your inbox and spam folder."
        );
      } else {
        alert(data.error || "Failed to resend verification email.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleSignIn = () => {
    router.push("/auth");
  };

  const getStatusIcon = () => {
    switch (verificationState.status) {
      case "loading":
        return <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />;
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
    switch (verificationState.status) {
      case "loading":
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Logo/Branding */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Ceylon Stories
            </h2>
            <p className="text-sm text-gray-500">Email Verification</p>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">{getStatusIcon()}</div>

          {/* Title */}
          <h1 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
            {verificationState.status === "loading" && "Verifying Email"}
            {verificationState.status === "success" && "Email Verified!"}
            {verificationState.status === "error" && "Verification Failed"}
            {verificationState.status === "expired" && "Link Expired"}
            {verificationState.status === "invalid" && "Invalid Link"}
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            {verificationState.message}
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            {verificationState.status === "success" && (
              <button
                onClick={handleSignIn}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Sign In to Your Account
              </button>
            )}

            {(verificationState.status === "expired" ||
              verificationState.status === "error") && (
              <button
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Resend Verification Email
                  </>
                )}
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

export default EmailVerificationPage;
