import { Suspense } from "react";
import PasswordResetPage from "@/components/password-reset/ResetPassword";

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
  </div>
);

// Metadata for the page
export const metadata = {
  title: "Reset Password - Ceylon Stories",
  description: "Reset your password for your Ceylon Stories account.",
  robots: {
    index: false,
    follow: false,
  },
};

// Main page component with Suspense wrapper
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PasswordResetPage />
    </Suspense>
  );
}
