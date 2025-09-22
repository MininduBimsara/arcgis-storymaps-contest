import Link from "next/link";
import {
  Calendar,
  Trophy,
  Users,
  MapPin,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Competitions - Ceylon Stories 2025 ArcGIS StoryMaps",
  description:
    "Join the 2025 ArcGIS StoryMaps Competition and share your Sri Lankan story. Win ₹2.5 Million in prizes across 6 categories.",
  keywords:
    "ArcGIS StoryMaps, Sri Lanka competition, story contest, tourism, prizes",
  openGraph: {
    title: "Competitions - Ceylon Stories 2025",
    description: "Share your Sri Lankan story and win ₹2.5 Million in prizes",
    url: "https://ceylonstories.com/competitions",
    type: "website",
  },
};

export default function Competitions() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <Image
            src="/beach.png"
            alt="Sri Lankan cultural heritage and landscapes"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-light mb-6 leading-tight">
              Ceylon Stories
            </h1>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              2025 ArcGIS StoryMaps Competition
            </h2>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-8">
              Share Your Sri Lankan Story & Win Amazing Prizes
            </p>

            {/* Deadline Banner */}
            <div className="inline-flex items-center gap-2 bg-ceylon-orange px-6 py-3 rounded-full text-white font-medium shadow-lg mb-8">
              <Calendar className="w-5 h-5" />
              Registration Deadline: March 31, 2025
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-4">
                <Trophy className="w-8 h-8 text-ceylon-gold" />
              </div>
              <div className="text-3xl font-bold mb-2">₹2.5M</div>
              <div className="text-lg opacity-90">Total Prize Pool</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-4">
                <MapPin className="w-8 h-8 text-ceylon-orange" />
              </div>
              <div className="text-3xl font-bold mb-2">6</div>
              <div className="text-lg opacity-90">Story Categories</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-4">
                <Users className="w-8 h-8 text-ceylon-green" />
              </div>
              <div className="text-3xl font-bold mb-2">2,847</div>
              <div className="text-lg opacity-90">Stories Submitted</div>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-ceylon-orange hover:bg-ceylon-orange-light text-white px-12 py-4 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Register Now
            </button>
            <Link
              href="/details"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 inline-flex items-center gap-2 group"
            >
              View Full Details
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Competition Overview
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of storytellers in showcasing the beauty and
              culture of Sri Lanka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Prize Pool */}
            <div className="bg-gradient-to-br from-ceylon-gold/5 to-ceylon-gold-light/5 rounded-xl p-8 text-center border border-ceylon-gold/20">
              <div className="flex items-center justify-center w-16 h-16 bg-ceylon-gold/20 rounded-full mx-auto mb-6">
                <Trophy className="w-8 h-8 text-ceylon-gold" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                ₹2.5 Million
              </h3>
              <p className="text-gray-600 mb-4">
                Total prize pool across all categories
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Grand Prize: ₹500,000</li>
                <li>• Category Winners: ₹200,000 each</li>
                <li>• People's Choice: ₹100,000</li>
              </ul>
            </div>

            {/* Categories */}
            <div className="bg-gradient-to-br from-ceylon-orange/5 to-ceylon-orange-light/5 rounded-xl p-8 text-center border border-ceylon-orange/20">
              <div className="flex items-center justify-center w-16 h-16 bg-ceylon-orange/20 rounded-full mx-auto mb-6">
                <MapPin className="w-8 h-8 text-ceylon-orange" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                6 Categories
              </h3>
              <p className="text-gray-600 mb-4">
                Diverse story categories to choose from
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cultural Heritage</li>
                <li>• Adventure Tourism</li>
                <li>• Wildlife & Nature</li>
                <li>• Local Experiences</li>
                <li>• Coastal Stories</li>
                <li>• Hidden Gems</li>
              </ul>
            </div>

            {/* Timeline */}
            <div className="bg-gradient-to-br from-ceylon-green/5 to-ceylon-green-light/5 rounded-xl p-8 text-center border border-ceylon-green/20">
              <div className="flex items-center justify-center w-16 h-16 bg-ceylon-green/20 rounded-full mx-auto mb-6">
                <Calendar className="w-8 h-8 text-ceylon-green" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Key Dates
              </h3>
              <p className="text-gray-600 mb-4">
                Important competition milestones
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Submissions: Open Now</li>
                <li>• Deadline: March 31, 2025</li>
                <li>• Judging: April 2025</li>
                <li>• Results: May 2025</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-ceylon-orange hover:bg-ceylon-orange-light text-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
                Start Your Submission
              </button>
              <Link
                href="/details"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:border-ceylon-orange hover:text-ceylon-orange transition-all duration-300 inline-flex items-center gap-2 group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-light text-gray-900 mb-8">
            Getting Started Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-ceylon-orange hover:text-ceylon-orange transition-all duration-300">
              <ExternalLink className="w-4 h-4" />
              Competition Guidelines
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-ceylon-orange hover:text-ceylon-orange transition-all duration-300">
              <ExternalLink className="w-4 h-4" />
              ArcGIS StoryMaps Tutorial
            </button>
            <Link
              href="/details"
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-ceylon-orange hover:text-ceylon-orange transition-all duration-300"
            >
              View Example Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
