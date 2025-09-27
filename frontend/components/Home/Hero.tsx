import Link from "next/link";
import { Calendar, Trophy, Users, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-1 md:col-span-1 col-span-full space-y-6 sm:space-y-8">
            {/* Main Hero Content */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black leading-tight">
                Digital Art
                <br />
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  Experience
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 font-light max-w-md leading-relaxed">
                Love of digital art
              </p>
              <p className="text-sm sm:text-base text-gray-500 max-w-lg leading-relaxed">
                Share Your Sri Lankan Story Through Interactive Maps & Win
                Amazing Prizes
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4 sm:py-6">
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
                <div className="text-xs sm:text-sm text-gray-500">Stories</div>
              </div>
            </div>

            {/* Deadline Banner */}
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-blue-50 text-black px-3 sm:px-6 py-2 sm:py-3 rounded-md border border-blue-100">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" />
              <span className="text-xs sm:text-base">
                Registration Deadline: March 31, 2025
              </span>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/submissions/create"
                className="group bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-normal transition-all duration-300 hover:bg-gray-800 inline-flex items-center justify-center"
              >
                <span className="flex items-center gap-1 sm:gap-2">
                  Submit Your Story
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <Link
                href="/details"
                className="group bg-white text-black border border-gray-200 hover:border-blue-100 hover:bg-blue-50 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-normal transition-all duration-300 inline-flex items-center justify-center gap-1 sm:gap-2"
              >
                View Full Details
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Competition Title */}
            <div className="pt-3 sm:pt-4">
              <p className="text-xs sm:text-sm text-gray-400 tracking-wide">
                2025 ARCGIS STORYMAPS COMPETITION
              </p>
            </div>
          </div>

          {/* Right Side - Background Image Placeholder - Hidden on Mobile */}
          <div className="hidden md:block mb-8 sm:mb-12 lg:mb-30 mx-4 sm:mx-8 lg:mx-20 lg:col-span-2 relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] w-full">
            <Image
              src="/tiger.png"
              alt="Sri Lankan cultural heritage and landscapes"
              fill
              className="object-cover rounded-md"
              priority
              quality={90}
            />
          </div>

          {/* You can replace the placeholder above with your actual image like this: */}
        </div>
      </div>
    </section>
  );
}
