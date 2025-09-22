// components/CompetitionHeader.tsx
import Image from "next/image";
import { Calendar, Trophy, Users, MapPin } from "lucide-react";

export const CompetitionHeader = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/competition-hero.jpg"
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
            Competition 2025
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-8">
            Share Your Sri Lankan Story & Win Amazing Prizes
          </p>

          {/* Deadline Banner */}
          <div className="inline-flex items-center gap-2 bg-ceylon-orange px-6 py-3 rounded-full text-white font-medium shadow-lg">
            <Calendar className="w-5 h-5" />
            Registration Deadline: March 31, 2025
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
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

        {/* Primary CTA */}
        <div className="mt-16">
          <button className="bg-ceylon-orange hover:bg-ceylon-orange-light text-white px-12 py-4 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
};
