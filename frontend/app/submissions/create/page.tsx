// app/submissions/create/page.tsx
import dynamic from "next/dynamic";

// Dynamically import the submission form component to avoid SSR issues
const SubmissionPage = dynamic(
  () => import("@/components/submissions/CreateSubmission"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading submission form...</p>
        </div>
      </div>
    ),
  }
);

export default function CreateSubmissionPage() {
  return <SubmissionPage />;
}
