import React from "react";
import Image from "next/image";
import Link from "next/link";

const StoriesHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        {/* Replace this with your background image */}
        <Image
          src="/cup.png"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="opacity-70"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container - Centered */}
      <div className="pt-1 relative z-10 max-w-7xl mx-auto px-6 w-full flex justify-center">
        <div className="max-w-2xl text-center">
          {/* Main Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="text-sm text-white/90 font-medium tracking-wide uppercase">
                Digital Stories
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight">
                Explore
                <br />
                <span className="font-normal">Sri Lanka</span>
              </h1>

              <p className="text-xl text-white/90 max-w-lg leading-relaxed mx-auto">
                Discover the island's beauty through interactive stories from
                travelers, locals, and cultural explorers
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-medium text-white">150+</div>
                <div className="text-sm text-white/80">Published Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-medium text-white">25k+</div>
                <div className="text-sm text-white/80">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-medium text-white">6</div>
                <div className="text-sm text-white/80">Categories</div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <Link href="/submissions/create">
                <button className="bg-white text-black px-8 py-4 rounded-lg text-base font-medium hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                  Create Your Story
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesHeroSection;
