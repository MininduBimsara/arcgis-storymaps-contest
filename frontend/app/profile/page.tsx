// app/profile/page.tsx
import dynamic from "next/dynamic";

// Dynamically import the profile component to avoid SSR issues
const ProfilePage = dynamic(() => import("@/components/profile/ProfilePage"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading profile...</p>
      </div>
    </div>
  ),
});

export default function Profile() {
  return <ProfilePage />;
}
