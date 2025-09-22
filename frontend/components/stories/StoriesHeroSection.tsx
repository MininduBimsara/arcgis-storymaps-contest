import React from "react";
import Image from "next/image";

const StoriesHeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/beach.png"
          alt="Sri Lanka Tea Plantations"
          className="w-full h-full object-cover"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight">
          Stories
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed max-w-3xl mx-auto">
          Discover Sri Lanka through the eyes of travelers, locals, and
          storytellers. Each story is a window into the soul of Ceylon.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Create Your Story
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-lg hover:bg-white/30 transition-all duration-300 font-medium text-lg">
            Browse Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default StoriesHeroSection;
