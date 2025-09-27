import React from "react";
import Image from "next/image";
import Link from "next/link";

const StoriesHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <Image
          src="/dancer.png" // Replace with your image path
          alt="Hero Background"
          fill
          className="object-cover"
        />
        {/* Overlay for better text readability */}
      </div>

      {/* Content Container - Centered */}
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-center">
        <div className="max-w-2xl text-center">
          {/* Main Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="text-sm text-gray-600 font-medium tracking-wide uppercase">
                Digital Stories
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-gray-900 leading-tight">
                Explore
                <br />
                <span className="font-normal">Sri Lanka</span>
              </h1>

              <p className="text-xl text-gray-700 max-w-lg leading-relaxed mx-auto">
                Discover the island's beauty through interactive stories from
                travelers, locals, and cultural explorers
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-medium text-gray-900">150+</div>
                <div className="text-sm text-gray-600">Published Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-medium text-gray-900">25k+</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-medium text-gray-900">6</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <Link href="/submissions/create">
                <button className="bg-gray-900 text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors duration-300 shadow-lg">
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
