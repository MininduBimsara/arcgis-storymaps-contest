import dynamic from "next/dynamic";

// Dynamically import the submissions list component to avoid SSR issues
const SubmissionsListPage = dynamic(
  () => import("@/components/submissions/SubmissionsList"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    ),
  }
);

export default function SubmissionsPage() {
  return <SubmissionsListPage />;
}
