import { Suspense } from "react";
import EmailVerificationPage from "@/components/verify-email/emailVerify";

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
  </div>
);

// Metadata for the page
export const metadata = {
  title: "Verify Email - Ceylon Stories",
  description:
    "Verify your email address to complete your account setup for the Ceylon Stories competition.",
  robots: {
    index: false,
    follow: false,
  },
};

// Main page component with Suspense wrapper
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EmailVerificationPage />
    </Suspense>
  );
}
