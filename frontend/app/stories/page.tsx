"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  Search,
  MapPin,
  Clock,
  Heart,
  Eye,
  ChevronRight,
} from "lucide-react";


const StoryCard = ({ story }) => {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      {/* Story Preview Image */}
      <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
        {/* Background Image */}
        <img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay matching category */}
        <div className={`absolute inset-0 ${story.gradientOverlay}`}></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm ${story.categoryColor}`}
          >
            {story.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{story.location}</span>
          <span>•</span>
          <Clock className="w-4 h-4" />
          <span>{story.readTime}</span>
        </div>

        {/* Story Title */}
        <h3 className="text-lg font-medium text-gray-900 mb-2 leading-tight group-hover:text-gray-700 transition-colors">
          {story.title}
        </h3>

        {/* Author */}
        <p className="text-gray-600 text-sm mb-4">By {story.author}</p>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {story.description}
        </p>

        {/* Footer with engagement metrics and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{story.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{story.views}</span>
            </div>
          </div>
          <button className="text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors flex items-center space-x-1">
            <span>Read More</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

const FeaturedStoriesSection = () => {
  const featuredStories = [
    {
      id: 1,
      title: "Sacred Peaks: Journey to Adam's Peak",
      author: "Priya Wijesinghe",
      category: "Cultural Heritage",
      categoryColor: "bg-orange-500",
      gradientOverlay: "bg-gradient-to-br from-orange-400/30 to-amber-500/30",
      location: "Ratnapura, Sabaragamuwa",
      readTime: "7 min read",
      description:
        "Follow the pilgrimage route to Sri Pada, where legend meets breathtaking sunrise views. Experience the spiritual journey that has drawn travelers for over 1,000 years through misty mountain paths.",
      likes: "324",
      views: "2.1k",
      image:
        "https://images.unsplash.com/photo-1606478259463-d0784ae85d22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "Blue Whale Giants of Mirissa",
      author: "David Fernando",
      category: "Adventure Tourism",
      categoryColor: "bg-green-500",
      gradientOverlay: "bg-gradient-to-br from-blue-400/30 to-teal-500/30",
      location: "Mirissa, Southern Province",
      readTime: "5 min read",
      description:
        "Witness the world's largest mammals in their natural habitat off Sri Lanka's southern coast. A photographer's guide to capturing these gentle giants during peak whale watching season.",
      likes: "567",
      views: "3.4k",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "Galle Fort: Living History",
      author: "Amara Jayawardena",
      category: "Coastal Stories",
      categoryColor: "bg-blue-500",
      gradientOverlay: "bg-gradient-to-br from-blue-500/30 to-indigo-500/30",
      location: "Galle, Southern Province",
      readTime: "6 min read",
      description:
        "Explore the UNESCO World Heritage fortress where Dutch colonial architecture meets modern Sri Lankan life. Discover hidden cafes, art galleries, and sunset views from the ramparts.",
      likes: "445",
      views: "2.8k",
      image:
        "https://images.unsplash.com/photo-1583160247711-2191776b4b25?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      title: "Tea Country Express: Ella to Kandy",
      author: "Michael Silva",
      category: "Hill Country",
      categoryColor: "bg-purple-500",
      gradientOverlay: "bg-gradient-to-br from-emerald-400/30 to-green-500/30",
      location: "Ella, Uva Province",
      readTime: "8 min read",
      description:
        "Journey through emerald tea plantations aboard one of the world's most scenic train routes. Meet tea pickers, taste fresh Ceylon tea, and witness the Nine Arch Bridge marvel.",
      likes: "789",
      views: "4.2k",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 5,
      title: "Sigiriya: Ancient Sky Palace",
      author: "Saman Perera",
      category: "Cultural Heritage",
      categoryColor: "bg-orange-500",
      gradientOverlay: "bg-gradient-to-br from-amber-400/30 to-orange-500/30",
      location: "Sigiriya, Central Province",
      readTime: "6 min read",
      description:
        "Climb the Lion Rock fortress and uncover 1,500-year-old frescoes and royal gardens. Explore the engineering marvels of King Kashyapa's ancient capital built atop a 200-meter rock.",
      likes: "612",
      views: "3.7k",
      image:
        "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 6,
      title: "Spice Island Secrets: Matale Gardens",
      author: "Chamari Rathnayake",
      category: "Hidden Gems",
      categoryColor: "bg-yellow-500",
      gradientOverlay: "bg-gradient-to-br from-yellow-400/30 to-amber-500/30",
      location: "Matale, Central Province",
      readTime: "4 min read",
      description:
        "Discover aromatic spice gardens where cinnamon, cardamom, and vanilla grow wild. Learn traditional harvesting methods and create authentic Sri Lankan curry blends with local spice masters.",
      likes: "298",
      views: "1.9k",
      image:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Featured Stories
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Discover Sri Lanka through immersive digital journeys that showcase
            the island's natural beauty, rich heritage, and vibrant culture
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {/* Section Footer CTAs */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              View All Stories
            </button>
            <button className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Submit Your Story
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Share your Ceylon story and compete for amazing prizes
          </p>
        </div>
      </div>
    </section>
  );
};


const StoryPageHeader = () => {
  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
          Stories
        </h1>
        <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed max-w-2xl mx-auto">
          Discover Sri Lanka through the eyes of travelers, locals, and
          storytellers. Each story is a window into the soul of Ceylon.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Create Your Story
          </button>
          <button className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            Browse Categories
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Stories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Featured
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Popular
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contest</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Rules
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Prizes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Winners
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Social Media
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Ceylon Stories. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const StoriesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <StoryPageHeader />
      <FeaturedStoriesSection />
      <Footer />
    </div>
  );
};

export default StoriesPage;
