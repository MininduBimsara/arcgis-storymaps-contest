"use client";

import { PrizeSection } from "@/components/competition/PrizeSection";
import { CategoriesGrid } from "@/components/details/CategoriesGrid";
import { RegistrationProcess } from "@/components/competition/RegistrationProcess";
import { TimelineSection } from "@/components/competition/TimelineSection";

export default function CompetitionDetails() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero.jpg')",
          }}
        >
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
            Competition
            <span className="block text-cyan-300">Details</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about submitting your Sri Lankan story
            and winning amazing prizes through interactive storytelling
          </p>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-300/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
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

      {/* <TimelineSection/> */}

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
