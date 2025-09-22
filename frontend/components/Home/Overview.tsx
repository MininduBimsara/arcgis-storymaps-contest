import Link from "next/link";
import {
  Trophy,
  MapPin,
  Calendar,
  ArrowRight,
  ExternalLink,
  Target,
} from "lucide-react";

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
          {/* Prize Pool Card */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-ceylon-gold/20 hover:-translate-y-2">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-ceylon-gold to-ceylon-gold-light rounded-2xl mx-auto mb-8 shadow-lg">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              ₹2.5 Million
            </h3>
            <p className="text-gray-600 mb-6 text-center font-medium">
              Total prize pool distributed across all categories and winners
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Grand Prize
                </span>
                <span className="text-sm font-bold text-ceylon-gold">
                  ₹500,000
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Category Winners
                </span>
                <span className="text-sm font-bold text-ceylon-orange">
                  ₹200,000 each
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  People's Choice
                </span>
                <span className="text-sm font-bold text-ceylon-green">
                  ₹100,000
                </span>
              </div>
            </div>
          </div>

          {/* Categories Card */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-ceylon-orange/20 hover:-translate-y-2">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-ceylon-orange to-ceylon-orange-light rounded-2xl mx-auto mb-8 shadow-lg">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              6 Categories
            </h3>
            <p className="text-gray-600 mb-6 text-center font-medium">
              Diverse storytelling categories to showcase every aspect of Sri
              Lanka
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
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-ceylon-orange rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Card */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-ceylon-green/20 hover:-translate-y-2">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-ceylon-green to-ceylon-green-light rounded-2xl mx-auto mb-8 shadow-lg">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Timeline
            </h3>
            <p className="text-gray-600 mb-6 text-center font-medium">
              Important dates and milestones for the competition
            </p>
            <div className="space-y-4">
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
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
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

        {/* Enhanced Action Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-gradient-to-r from-ceylon-orange to-ceylon-orange-light hover:from-ceylon-orange-light hover:to-ceylon-orange text-black px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-ceylon-orange/25 transform hover:scale-105">
              <span className="flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5" />
                Start Your Submission
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
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
