"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Heart,
  Eye,
  ChevronRight,
  ArrowLeft,
  Share2,
  Bookmark,
  User,
  Calendar,
  Tag,
} from "lucide-react";
import Navigation from "@/components/Home/Navigation";

// Hero Section with Background Image
const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Sri Lanka Tea Plantations"
          className="w-full h-full object-cover"
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
          Discover Sri Lanka through the eyes of travelers, locals, and storytellers. 
          Each story is a window into the soul of Ceylon.
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-sm">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

// Story Card Component
interface Story {
  id: number;
  title: string;
  author: string;
  category: string;
  categoryColor: string;
  gradientOverlay: string;
  location: string;
  readTime: string;
  description: string;
  likes: string;
  views: string;
  image: string;
}

interface StoryCardProps {
  story: Story;
  onReadMore: (story: Story) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onReadMore }) => {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute inset-0 ${story.gradientOverlay}`}></div>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm ${story.categoryColor}`}>
            {story.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{story.location}</span>
          <span>•</span>
          <Clock className="w-4 h-4" />
          <span>{story.readTime}</span>
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2 leading-tight group-hover:text-gray-700 transition-colors">
          {story.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4">By {story.author}</p>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {story.description}
        </p>

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
          <button 
            onClick={() => onReadMore(story)}
            className="text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors flex items-center space-x-1"
          >
            <span>Read More</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

// Full Story Details Component
interface StoryDetailsProps {
  story: Story;
  onBack: () => void;
}

const StoryDetails: React.FC<StoryDetailsProps> = ({ story, onBack }) => {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Story Header */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Story Title and Meta */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white backdrop-blur-sm ${story.categoryColor}`}>
                {story.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4 leading-tight">
              {story.title}
            </h1>
            <div className="flex items-center space-x-6 text-white/90">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>By {story.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{story.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{story.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Story Actions */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>{story.likes} likes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>{story.views} views</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>March 15, 2025</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <Bookmark className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Story Body */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8 font-light">
            {story.description}
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            The journey to {story.location} begins before dawn, when the world is still wrapped in the gentle embrace of night. As I made my way through the winding paths, the anticipation of what lay ahead filled every step with purpose and wonder.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            What strikes you first is not just the visual beauty, but the profound sense of connection to something much larger than yourself. The landscape here tells stories that span generations, each vista a chapter in the grand narrative of Sri Lanka's rich heritage.
          </p>
          
          <h2 className="text-2xl font-medium text-gray-900 mb-4 mt-8">The Experience</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Every moment spent in this extraordinary place reveals new layers of beauty and meaning. The interplay of light and shadow, the whisper of ancient winds, and the timeless rhythm of nature create an atmosphere that is both humbling and inspiring.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Local communities have preserved these traditions for centuries, passing down knowledge and wisdom that connects us to the very soul of this island. Their stories, woven into the fabric of daily life, add depth and authenticity to every encounter.
          </p>
          
          <h2 className="text-2xl font-medium text-gray-900 mb-4 mt-8">Planning Your Visit</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            For those inspired to embark on their own journey, timing and preparation can enhance the experience significantly. The best seasons offer ideal conditions for exploration, while local guides provide invaluable insights that transform a simple visit into a meaningful cultural exchange.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Remember to travel with respect and mindfulness, embracing the opportunity to learn from and contribute to the communities that call these remarkable places home. Your journey becomes part of their ongoing story, just as their story becomes part of yours.
          </p>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 font-medium">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Sri Lanka', 'Travel', 'Culture', 'Heritage', 'Photography', 'Adventure'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Featured Stories Section
interface FeaturedStoriesSectionProps {
  onReadMore: (story: Story) => void;
}

const FeaturedStoriesSection: React.FC<FeaturedStoriesSectionProps> = ({ onReadMore }) => {
  const featuredStories: Story[] = [
    {
      id: 1,
      title: "Sacred Peaks: Journey to Adam's Peak",
      author: "Priya Wijesinghe",
      category: "Cultural Heritage",
      categoryColor: "bg-orange-500",
      gradientOverlay: "bg-gradient-to-br from-orange-400/30 to-amber-500/30",
      location: "Ratnapura, Sabaragamuwa",
      readTime: "7 min read",
      description: "Follow the pilgrimage route to Sri Pada, where legend meets breathtaking sunrise views. Experience the spiritual journey that has drawn travelers for over 1,000 years through misty mountain paths.",
      likes: "324",
      views: "2.1k",
      image: "https://images.unsplash.com/photo-1606478259463-d0784ae85d22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
      description: "Witness the world's largest mammals in their natural habitat off Sri Lanka's southern coast. A photographer's guide to capturing these gentle giants during peak whale watching season.",
      likes: "567",
      views: "3.4k",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
      description: "Explore the UNESCO World Heritage fortress where Dutch colonial architecture meets modern Sri Lankan life. Discover hidden cafes, art galleries, and sunset views from the ramparts.",
      likes: "445",
      views: "2.8k",
      image: "https://images.unsplash.com/photo-1583160247711-2191776b4b25?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
      description: "Journey through emerald tea plantations aboard one of the world's most scenic train routes. Meet tea pickers, taste fresh Ceylon tea, and witness the Nine Arch Bridge marvel.",
      likes: "789",
      views: "4.2k",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
      description: "Climb the Lion Rock fortress and uncover 1,500-year-old frescoes and royal gardens. Explore the engineering marvels of King Kashyapa's ancient capital built atop a 200-meter rock.",
      likes: "612",
      views: "3.7k",
      image: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
      description: "Discover aromatic spice gardens where cinnamon, cardamom, and vanilla grow wild. Learn traditional harvesting methods and create authentic Sri Lankan curry blends with local spice masters.",
      likes: "298",
      views: "1.9k",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Featured Stories
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Discover Sri Lanka through immersive digital journeys that showcase
            the island's natural beauty, rich heritage, and vibrant culture
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredStories.map((story) => (
            <StoryCard key={story.id} story={story} onReadMore={onReadMore} />
          ))}
        </div>

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



// Main Stories Page Component
const StoriesPage = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReadMore = (story) => {
    setSelectedStory(story);
    window.scrollTo(0, 0);
  };

  const handleBackToStories = () => {
    setSelectedStory(null);
    window.scrollTo(0, 0);
  };

  // If a story is selected, show the detailed view
  if (selectedStory) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation isScrolled={true} />
        <StoryDetails story={selectedStory} onBack={handleBackToStories} />
        <Footer />
      </div>
    );
  }

  // Default stories page view
  return (
    <div className="min-h-screen bg-white">
      <Navigation isScrolled={isScrolled} />
      <HeroSection />
      <FeaturedStoriesSection onReadMore={handleReadMore} />
      <Footer />
    </div>
  );
};

export default StoriesPage;