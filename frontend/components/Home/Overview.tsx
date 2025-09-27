// components/CompetitionOverview.tsx
"use client";

import { useState } from "react";
import { Trophy, Users, MapPin, Calendar, ArrowRight } from "lucide-react";

const CompetitionOverview = () => {
  const [activeTab, setActiveTab] = useState("categories");

  // Competition data
  const competitionData = {
    title: "Share Sri Lanka's Stories",
    description:
      "Join thousands of storytellers in showcasing the beauty, culture, and hidden treasures of Sri Lanka through interactive digital narratives",
    tagline: "2025 ARCGIS STORYMAPS COMPETITION",

    prizePool: {
      total: "LKR 2.5 Million",
      prizes: [
        { name: "Grand Prize", amount: "LKR 500,000" },
        { name: "Category Winners", amount: "LKR 200,000 each" },
        { name: "People's Choice", amount: "LKR 100,000" },
      ],
    },

    categories: [
      {
        name: "Cultural Heritage",
        description:
          "Showcase Sri Lanka's rich cultural traditions and historical sites",
      },
      {
        name: "Adventure Tourism",
        description:
          "Thrilling experiences and outdoor adventures across the island",
      },
      {
        name: "Wildlife & Nature",
        description:
          "Explore diverse ecosystems and incredible wildlife encounters",
      },
      {
        name: "Local Experiences",
        description: "Authentic local stories and community interactions",
      },
      {
        name: "Coastal Stories",
        description: "Beautiful coastlines and maritime heritage of Sri Lanka",
      },
      {
        name: "Hidden Gems",
        description: "Discover lesser-known treasures and secret locations",
      },
    ],

    timeline: [
      { event: "Submissions Open", date: "Now", status: "active" },
      {
        event: "Registration Deadline",
        date: "March 31, 2025",
        status: "upcoming",
      },
      { event: "Judging Period", date: "April 2025", status: "future" },
      { event: "Results Announced", date: "May 2025", status: "future" },
    ],
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm text-gray-400 tracking-wide mb-3 sm:mb-4">
            {competitionData.tagline}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-black mb-4 sm:mb-6">
            {competitionData.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {competitionData.description}
          </p>
        </div>

        {/* Enhanced Tabs Navigation */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-1 sm:p-2 shadow-sm w-full max-w-md sm:w-auto">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center">
              <button
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-normal text-sm sm:text-base transition-all duration-300 inline-flex items-center justify-center gap-1 sm:gap-2 ${
                  activeTab === "categories"
                    ? "bg-white text-black shadow-md"
                    : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("categories")}
              >
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                Categories
              </button>
              <button
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-normal text-sm sm:text-base transition-all duration-300 inline-flex items-center justify-center gap-1 sm:gap-2 ${
                  activeTab === "prizes"
                    ? "bg-white text-black shadow-md"
                    : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("prizes")}
              >
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                Prizes
              </button>
              <button
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-normal text-sm sm:text-base transition-all duration-300 inline-flex items-center justify-center gap-1 sm:gap-2 ${
                  activeTab === "timeline"
                    ? "bg-white text-black shadow-md"
                    : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("timeline")}
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                Timeline
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white">
          {activeTab === "categories" && (
            <div>
              <h3 className="text-xl sm:text-2xl font-light text-black mb-6 sm:mb-8 text-center">
                Competition Categories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {competitionData.categories.map((category, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg overflow-hidden h-40 sm:h-48 p-4 sm:p-6 cursor-pointer hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="flex flex-col justify-center h-full text-center">
                      <h4 className="text-lg sm:text-xl font-medium text-blue-900 mb-2 sm:mb-3">
                        {category.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 sm:mt-12">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto">
                  <div className="bg-white p-2 sm:p-4 rounded-md border border-gray-100 text-center">
                    <div className="flex items-center justify-center mb-1 sm:mb-2">
                      <Trophy className="w-3 h-3 sm:w-5 sm:h-5 text-blue-300" />
                    </div>
                    <div className="text-lg sm:text-2xl font-medium text-black">
                      2.5M
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Prize Pool
                    </div>
                  </div>

                  <div className="bg-white p-2 sm:p-4 rounded-md border border-gray-100 text-center">
                    <div className="flex items-center justify-center mb-1 sm:mb-2">
                      <MapPin className="w-3 h-3 sm:w-5 sm:h-5 text-blue-300" />
                    </div>
                    <div className="text-lg sm:text-2xl font-medium text-black">
                      6
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Categories
                    </div>
                  </div>

                  <div className="bg-white p-2 sm:p-4 rounded-md border border-gray-100 text-center">
                    <div className="flex items-center justify-center mb-1 sm:mb-2">
                      <Users className="w-3 h-3 sm:w-5 sm:h-5 text-blue-300" />
                    </div>
                    <div className="text-lg sm:text-2xl font-medium text-black">
                      2,847
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Stories
                    </div>
                  </div>
                </div>

                {/* Deadline Banner */}
                <div className="flex justify-center mt-4 sm:mt-6">
                  <div className="inline-flex items-center gap-2 sm:gap-3 bg-blue-50 text-black px-3 sm:px-6 py-2 sm:py-3 rounded-md border border-blue-100">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" />
                    <span className="text-xs sm:text-base">
                      Registration Deadline: March 31, 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "prizes" && (
            <div>
              <h3 className="text-xl sm:text-2xl font-light text-black mb-3 sm:mb-4 text-center">
                Prize Breakdown
              </h3>
              <p className="text-sm sm:text-base text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
                Compete for substantial rewards across multiple categories and
                recognition levels
              </p>

              {/* Grand Prize Highlight */}
              <div className="mb-8 sm:mb-12">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 p-6 sm:p-8 rounded-xl text-center max-w-md mx-auto relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-medium px-2 sm:px-3 py-1 rounded-bl-lg">
                    GRAND PRIZE
                  </div>
                  <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600 mx-auto mb-3 sm:mb-4" />
                  <div className="text-3xl sm:text-4xl font-bold text-yellow-900 mb-2">
                    LKR 500,000
                  </div>
                  <div className="text-base sm:text-lg font-medium text-yellow-800">
                    Overall Winner
                  </div>
                  <p className="text-xs sm:text-sm text-yellow-700 mt-2">
                    Best story across all categories
                  </p>
                </div>
              </div>

              {/* Other Prizes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mb-6 sm:mb-8">
                <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-blue-200 text-center hover:border-blue-300 transition-colors duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
                    LKR 200,000
                  </div>
                  <div className="text-base sm:text-lg font-medium text-blue-800 mb-2">
                    Category Winners
                  </div>
                  <p className="text-xs sm:text-sm text-blue-700">
                    Best story in each of the 6 categories
                  </p>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-green-200 text-center hover:border-green-300 transition-colors duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-900 mb-2">
                    LKR 100,000
                  </div>
                  <div className="text-base sm:text-lg font-medium text-green-800 mb-2">
                    People's Choice
                  </div>
                  <p className="text-xs sm:text-sm text-green-700">
                    Most popular story voted by the community
                  </p>
                </div>
              </div>

              {/* Total Prize Pool */}
              <div className="bg-black text-white p-4 sm:p-6 rounded-xl text-center max-w-lg mx-auto">
                <div className="text-xs sm:text-sm text-gray-300 mb-1">
                  Total Prize Pool
                </div>
                <div className="text-2xl sm:text-3xl font-bold mb-2">
                  LKR 2,500,000
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  Multiple opportunities to win across categories
                </div>
              </div>

              {/* Additional Benefits */}
              <div className="mt-6 sm:mt-8 max-w-3xl mx-auto">
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-black mb-3 text-center text-sm sm:text-base">
                    Additional Benefits
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <div className="text-center">
                      <div className="font-medium text-gray-800">
                        Recognition
                      </div>
                      <div>Featured on official platforms</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-800">
                        Networking
                      </div>
                      <div>Connect with industry professionals</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-800">Portfolio</div>
                      <div>Showcase your storytelling skills</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-light text-black mb-6 sm:mb-8 text-center">
                Competition Timeline
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {competitionData.timeline.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div
                      className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${
                        item.status === "active"
                          ? "bg-green-500"
                          : item.status === "upcoming"
                            ? "bg-blue-300"
                            : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="ml-4 sm:ml-6 flex-1 pb-4 sm:pb-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <h4 className="text-sm sm:text-base font-normal text-black">
                          {item.event}
                        </h4>
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-md text-xs font-normal inline-block w-fit ${
                            item.status === "active"
                              ? "bg-green-50 text-green-700 border border-green-100"
                              : item.status === "upcoming"
                                ? "bg-blue-50 text-blue-700 border border-blue-100"
                                : "bg-gray-50 text-gray-700 border border-gray-100"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 mt-1">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button className="group bg-black text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-normal transition-all duration-300 hover:bg-gray-800 inline-flex items-center justify-center">
              <span className="flex items-center gap-2">
                Start Your Submission
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            <button className="group bg-white text-black border border-gray-200 hover:border-blue-100 hover:bg-blue-50 px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-normal transition-all duration-300 inline-flex items-center justify-center gap-2">
              Learn More
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionOverview;
