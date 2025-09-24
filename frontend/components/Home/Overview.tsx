// ===== Overview.tsx =====
import Link from "next/link";
import {
  Trophy,
  MapPin,
  Calendar,
  ArrowRight,
  ExternalLink,
  Target,
} from "lucide-react";
import Image from "next/image";

export default function OverviewSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            Competition Overview
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
            Share Sri Lanka's Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of storytellers in showcasing the beauty, culture,
            and hidden treasures of Sri Lanka through interactive digital
            narratives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Prize Pool Card */}
          <div className="group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-600">
            <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100">
              {/* Image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-2 bg-white rounded-md border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <p className="text-xs">Prize Image</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white rounded-md p-2 border border-gray-100">
                <Trophy className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-medium text-black mb-3">
                LKR 2.5 Million
              </h3>
              <p className="text-gray-600 mb-4 text-base">
                Total prize pool distributed across winners
              </p>
              <div className="space-y-3">
                {[
                  { label: "Grand Prize", amount: "LKR 500,000" },
                  { label: "Category Winners", amount: "LKR 200,000 each" },
                  { label: "People's Choice", amount: "LKR 100,000" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <span className="text-sm font-normal text-gray-700">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Card */}
          <div className="group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-600">
            <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100">
              {/* Image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-2 bg-white rounded-md border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <p className="text-xs">Category Image</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white rounded-md p-2 border border-gray-100">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-medium text-black mb-3">
                6 Categories
              </h3>
              <p className="text-gray-600 mb-4 text-base">
                Diverse storytelling themes for Sri Lankan stories
              </p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Cultural Heritage",
                  "Adventure Tourism",
                  "Wildlife & Nature",
                  "Local Experiences",
                  "Coastal Stories",
                  "Hidden Gems",
                ].map((category, index) => (
                  <div key={index} className="flex items-center gap-2 p-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-normal text-gray-700">
                      {category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-600">
            <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100">
              {/* Image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-2 bg-white rounded-md border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <p className="text-xs">Timeline Image</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white rounded-md p-2 border border-gray-100">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-medium text-black mb-3">Timeline</h3>
              <p className="text-gray-600 mb-4 text-base">
                Important competition dates and milestones
              </p>
              <div className="space-y-3">
                {[
                  { phase: "Submissions Open", date: "Now", status: "active" },
                  {
                    phase: "Registration Deadline",
                    date: "March 31, 2025",
                    status: "upcoming",
                  },
                  {
                    phase: "Judging Period",
                    date: "April 2025",
                    status: "future",
                  },
                  {
                    phase: "Results Announced",
                    date: "May 2025",
                    status: "future",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.status === "active"
                          ? "bg-blue-600"
                          : item.status === "upcoming"
                            ? "bg-blue-400"
                            : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-black">
                        {item.phase}
                      </div>
                      <div className="text-xs text-gray-600">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/submissions/create"
              className="group bg-black text-white px-8 py-3 rounded-md text-base font-normal transition-all duration-300 hover:bg-gray-800 inline-flex items-center justify-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              Start Your Submission
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/details"
              className="group bg-white border border-gray-200 hover:border-blue-600 hover:bg-blue-50 text-black px-8 py-3 rounded-md text-base font-normal transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
