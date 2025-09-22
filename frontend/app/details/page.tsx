import { PrizeSection } from "@/components/competition/PrizeSection";
import { CategoriesGrid } from "@/components/competition/CategoriesGrid";
import { TimelineSection } from "@/components/competition/TimelineSection";
import { RegistrationProcess } from "@/components/competition/RegistrationProcess";
import Link from "next/link";

export const metadata = {
  title: "Competition Details - Ceylon Stories 2025",
  description:
    "Complete details about the 2025 ArcGIS StoryMaps Competition including prizes, categories, timeline, and submission process.",
  keywords:
    "ArcGIS StoryMaps, Sri Lanka competition details, submission process, prizes, timeline",
  openGraph: {
    title: "Competition Details - Ceylon Stories 2025",
    description: "Everything you need to know about the competition",
    url: "https://ceylonstories.com/details",
    type: "website",
  },
};

export default function CompetitionDetails() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link
              href="/competitions"
              className="hover:text-ceylon-orange transition-colors"
            >
              Competitions
            </Link>
            <span>/</span>
            <span className="text-gray-900">Details</span>
          </nav>
        </div>
      </section>

      {/* Page Header */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Competition Details
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Everything you need to know about submitting your Sri Lankan story
            and winning amazing prizes
          </p>
        </div>
      </section>

      {/* Prize Section */}
      <PrizeSection />

      {/* Categories Grid */}
      <CategoriesGrid />

      {/* Timeline */}
      <TimelineSection />

      {/* Registration Process */}
      <RegistrationProcess />

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light text-white mb-6">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of storytellers competing for ₹2.5 Million in prizes.
            Your Sri Lankan adventure could be the next winning story.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-ceylon-orange hover:bg-ceylon-orange-light text-white px-12 py-4 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Register Now
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300">
              View Competition Rules
            </button>
          </div>

          <div className="mt-12 pt-12 border-t border-white/20">
            <p className="text-white/80 text-sm">
              Competition closes March 31, 2025 • Winners announced May 2025
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
