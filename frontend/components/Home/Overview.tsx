// Overview.tsx
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
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-ceylon-orange/10 text-ceylon-orange px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Target className="w-4 h-4" />
            Competition Overview
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
            Share Sri Lanka's Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of storytellers in showcasing the beauty, culture,
            and hidden treasures of Sri Lanka through interactive digital
            narratives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Prize Pool Card with Image */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-ceylon-gold/20 hover:-translate-y-2">
            <div className="relative h-48 bg-gradient-to-br from-ceylon-gold to-ceylon-gold-light">
              <Image
                src="/prizes.jpg"
                alt="Competition prizes"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                <Trophy className="w-6 h-6 text-ceylon-gold" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                LKR 2.5 Million
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Total prize pool distributed across winners
              </p>
              <div className="space-y-2">
                {[
                  { label: "Grand Prize", amount: "LKR 500,000" },
                  { label: "Category Winners", amount: "LKR 200,000 each" },
                  { label: "People's Choice", amount: "LKR 100,000" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-ceylon-gold">
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Card with Image */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-ceylon-orange/20 hover:-translate-y-2">
            <div className="relative h-48 bg-gradient-to-br from-ceylon-orange to-ceylon-orange-light">
              <Image
                src="/categories.jpg"
                alt="Story categories"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                <MapPin className="w-6 h-6 text-ceylon-orange" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                6 Categories
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Diverse storytelling themes for Sri Lankan stories
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Cultural Heritage",
                  "Adventure Tourism",
                  "Wildlife & Nature",
                  "Local Experiences",
                  "Coastal Stories",
                  "Hidden Gems",
                ].map((category, index) => (
                  <div key={index} className="flex items-center gap-2 p-1">
                    <div className="w-2 h-2 bg-ceylon-orange rounded-full flex-shrink-0"></div>
                    <span className="text-xs font-medium text-gray-700 truncate">
                      {category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Card with Image */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-ceylon-green/20 hover:-translate-y-2">
            <div className="relative h-48 bg-gradient-to-br from-ceylon-green to-ceylon-green-light">
              <Image
                src="/timeline.jpg"
                alt="Competition timeline"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                <Calendar className="w-6 h-6 text-ceylon-green" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Timeline
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
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
                          ? "bg-ceylon-green"
                          : item.status === "upcoming"
                            ? "bg-ceylon-orange"
                            : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">
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

        {/* Enhanced Action Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/submissions/create"
              className="group bg-gradient-to-r from-ceylon-orange to-ceylon-orange-light hover:from-ceylon-orange-light hover:to-ceylon-orange text-black px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-ceylon-orange/25 transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Start Your Submission
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/details"
              className="group bg-white border-2 border-gray-200 hover:border-ceylon-orange text-gray-700 hover:text-ceylon-orange px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 hover:shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
