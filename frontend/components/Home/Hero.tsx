import Link from "next/link";
import { Calendar, Trophy, Users, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero1.jpg"
          alt="Sri Lankan cultural heritage and landscapes"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        {/* Enhanced Horizontal Stats - Made Bigger */}
        <div className="flex flex-wrap justify-center gap-8 mt-8 mb-12">
          <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl px-8 py-5 transform hover:scale-105 transition-all duration-300">
            <Trophy className="w-8 h-8 text-ceylon-gold" />
            <div>
              <div className="text-3xl font-bold">LKR 2.5M</div>
              <div className="text-base text-white/90">Prize Pool</div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl px-8 py-5 transform hover:scale-105 transition-all duration-300">
            <MapPin className="w-8 h-8 text-ceylon-orange" />
            <div>
              <div className="text-3xl font-bold">6</div>
              <div className="text-base text-white/90">Categories</div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl px-8 py-5 transform hover:scale-105 transition-all duration-300">
            <Users className="w-8 h-8 text-ceylon-green" />
            <div>
              <div className="text-3xl font-bold">2,847</div>
              <div className="text-base text-white/90">Stories</div>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight tracking-tight">
            Ceylon Stories
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-8 text-white/90">
            2025 ArcGIS StoryMaps Competition
          </h2>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto mb-10 text-white/80 leading-relaxed">
            Share Your Sri Lankan Story Through Interactive Maps & Win Amazing
            Prizes
          </p>

          {/* Deadline Banner */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-ceylon-orange to-ceylon-orange-light px-8 py-4 rounded-full text-white font-semibold shadow-2xl mb-12 border border-white/20">
            <Calendar className="w-5 h-5" />
            <span>Registration Deadline: March 31, 2025</span>
          </div>
        </div>

        {/* Primary CTAs - Fixed Navigation */}
        <div className="flex mb-3 flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/submissions/create"
            className="group bg-gradient-to-r from-ceylon-orange to-ceylon-orange-light hover:from-ceylon-orange-light hover:to-ceylon-orange text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-ceylon-orange/25 transform hover:scale-105 border border-white/10 inline-flex items-center justify-center"
          >
            <span className="flex items-center justify-center gap-2">
              Submit Your Story
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
          <Link
            href="/details"
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 hover:border-white/50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            View Full Details
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
