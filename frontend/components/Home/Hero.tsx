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
        <div className="mb-12">
          <h1 className="mt-20 text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight tracking-tight">
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2 mb-7">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-center w-20 h-20 bg-ceylon-gold/20 backdrop-blur-sm rounded-2xl mx-auto mb-6 border border-ceylon-gold/30">
              <Trophy className="w-10 h-10 text-ceylon-gold" />
            </div>
            <div className="text-4xl font-bold mb-3">₹2.5M</div>
            <div className="text-lg text-white/80 font-medium">
              Total Prize Pool
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-center w-20 h-20 bg-ceylon-orange/20 backdrop-blur-sm rounded-2xl mx-auto mb-6 border border-ceylon-orange/30">
              <MapPin className="w-10 h-10 text-ceylon-orange" />
            </div>
            <div className="text-4xl font-bold mb-3">6</div>
            <div className="text-lg text-white/80 font-medium">
              Story Categories
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-center w-20 h-20 bg-ceylon-green/20 backdrop-blur-sm rounded-2xl mx-auto mb-6 border border-ceylon-green/30">
              <Users className="w-10 h-10 text-ceylon-green" />
            </div>
            <div className="text-4xl font-bold mb-3">2,847</div>
            <div className="text-lg text-white/80 font-medium">
              Stories Submitted
            </div>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex mb-3 flex-col sm:flex-row gap-6 justify-center">
          <button className="group bg-gradient-to-r from-ceylon-orange to-ceylon-orange-light hover:from-ceylon-orange-light hover:to-ceylon-orange text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-ceylon-orange/25 transform hover:scale-105 border border-white/10">
            <span className="flex items-center justify-center gap-2">
              Register Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
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
