"use client";

import {
  MapPin,
  Eye,
  Heart,
  Clock,
  Maximize2,
  Filter,
  Search,
} from "lucide-react";
import { useState } from "react";

interface StoryPin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  author: string;
  category: string;
  categoryColor: string;
  thumbnail: string;
  views: number;
  likes: number;
  timeAgo: string;
}

const StoryPinMarker = ({
  story,
  isHovered,
  onHover,
  onLeave,
}: {
  story: StoryPin;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => (
  <div
    className="relative cursor-pointer"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    {/* Pin Marker */}
    <div
      className={`w-6 h-6 ${story.categoryColor} rounded-full border-2 border-white shadow-lg hover:scale-125 transition-all duration-300 ${isHovered ? "scale-150 z-50" : ""}`}
    >
      <div className="w-full h-full bg-white rounded-full scale-50 animate-pulse" />
    </div>

    {/* Hover Popup */}
    {isHovered && (
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
        <div className="bg-white rounded-lg shadow-2xl p-4 w-64 border border-gray-200">
          <img
            src={story.thumbnail}
            alt={story.title}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
          <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
            {story.title}
          </h3>
          <p className="text-gray-600 text-xs mb-2">By {story.author}</p>
          <div className="flex items-center justify-between">
            <span
              className={`px-2 py-1 rounded-full text-xs ${story.categoryColor} bg-opacity-20 text-gray-700`}
            >
              {story.category}
            </span>
            <div className="flex items-center space-x-2 text-gray-500 text-xs">
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>{story.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{story.views}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Arrow pointing down */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
          <div className="w-3 h-3 bg-white border-b border-r border-gray-200 transform rotate-45" />
        </div>
      </div>
    )}
  </div>
);

const RecentStoryItem = ({ story }: { story: StoryPin }) => (
  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200 group">
    <img
      src={story.thumbnail}
      alt={story.title}
      className="w-12 h-12 object-cover rounded-lg"
    />
    <div className="flex-1 min-w-0">
      <h4 className="font-medium text-gray-800 text-sm group-hover:text-orange-600 transition-colors duration-200 line-clamp-1">
        {story.title}
      </h4>
      <p className="text-gray-600 text-xs">By {story.author}</p>
      <div className="flex items-center space-x-2 mt-1">
        <span
          className={`px-2 py-0.5 rounded-full text-xs ${story.categoryColor} bg-opacity-20 text-gray-700`}
        >
          {story.category}
        </span>
        <span className="text-gray-500 text-xs flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {story.timeAgo}
        </span>
      </div>
    </div>
  </div>
);

const LiveMapPreview = () => {
  const [hoveredStory, setHoveredStory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Sample story data
  const stories: StoryPin[] = [
    {
      id: "1",
      lat: 7.9553,
      lng: 80.7593,
      title: "Sacred Rituals at Temple of the Tooth",
      author: "Priya Jayawardena",
      category: "Cultural",
      categoryColor: "bg-orange-500",
      thumbnail: "/stories/kandy-temple.jpg",
      views: 1847,
      likes: 234,
      timeAgo: "2 hours ago",
    },
    {
      id: "2",
      lat: 6.8666,
      lng: 81.0557,
      title: "Sunrise Trek to Ella Rock",
      author: "Saman Perera",
      category: "Adventure",
      categoryColor: "bg-emerald-500",
      thumbnail: "/stories/ella-rock.jpg",
      views: 2103,
      likes: 189,
      timeAgo: "5 hours ago",
    },
    {
      id: "3",
      lat: 6.3714,
      lng: 81.531,
      title: "Leopards of Yala National Park",
      author: "David Silva",
      category: "Wildlife",
      categoryColor: "bg-blue-500",
      thumbnail: "/stories/yala-safari.jpg",
      views: 2856,
      likes: 342,
      timeAgo: "1 day ago",
    },
    {
      id: "4",
      lat: 7.4675,
      lng: 80.621,
      title: "Secrets of Ceylon Spice Gardens",
      author: "Kamani Fernando",
      category: "Local",
      categoryColor: "bg-yellow-500",
      thumbnail: "/stories/spice-garden.jpg",
      views: 1523,
      likes: 156,
      timeAgo: "2 days ago",
    },
    {
      id: "5",
      lat: 6.0329,
      lng: 80.2168,
      title: "Colonial Echoes in Galle Fort",
      author: "Marco Rodriguez",
      category: "Cultural",
      categoryColor: "bg-orange-500",
      thumbnail: "/stories/galle-fort.jpg",
      views: 2134,
      likes: 278,
      timeAgo: "3 days ago",
    },
  ];

  const filteredStories =
    activeFilter === "all"
      ? stories
      : stories.filter(
          (story) => story.category.toLowerCase() === activeFilter
        );

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Explore Stories{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              on the Map
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the geographic richness of Sri Lankan stories. Click on any
            location to explore tales from that region.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              {/* Map Controls */}
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Filter:
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {[
                        "all",
                        "cultural",
                        "adventure",
                        "wildlife",
                        "local",
                      ].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveFilter(filter)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                            activeFilter === filter
                              ? "bg-orange-500 text-white"
                              : "bg-white text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors duration-200">
                    <Maximize2 className="w-4 h-4" />
                    <span>Full Screen</span>
                  </button>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="relative h-96 bg-gradient-to-br from-blue-50 to-emerald-50 overflow-hidden">
                {/* Sri Lanka Map Outline (Simplified) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-80">
                    {/* Simplified Sri Lanka outline using CSS */}
                    <div
                      className="absolute inset-0 bg-emerald-100 opacity-60"
                      style={{
                        clipPath:
                          "polygon(25% 10%, 35% 5%, 45% 8%, 55% 15%, 65% 25%, 70% 35%, 75% 45%, 80% 60%, 75% 75%, 65% 85%, 50% 90%, 35% 88%, 25% 80%, 20% 65%, 15% 50%, 18% 35%, 22% 20%)",
                      }}
                    />

                    {/* Story Pins positioned relative to Sri Lanka */}
                    {filteredStories.map((story, index) => (
                      <div
                        key={story.id}
                        className="absolute"
                        style={{
                          left: `${(story.lng - 79.5) * 8 + 50}%`,
                          top: `${(8.5 - story.lat) * 12 + 20}%`,
                        }}
                      >
                        <StoryPinMarker
                          story={story}
                          isHovered={hoveredStory === story.id}
                          onHover={() => setHoveredStory(story.id)}
                          onLeave={() => setHoveredStory(null)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">
                    Categories
                  </h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full" />
                      <span className="text-xs text-gray-600">
                        Cultural Heritage
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                      <span className="text-xs text-gray-600">
                        Adventure Tourism
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-xs text-gray-600">
                        Wildlife & Nature
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span className="text-xs text-gray-600">
                        Local Experiences
                      </span>
                    </div>
                  </div>
                </div>

                {/* Map Stats */}
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {filteredStories.length}
                    </div>
                    <div className="text-xs text-gray-600">Stories Shown</div>
                  </div>
                </div>
              </div>

              {/* Map Footer */}
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {filteredStories.length} of {stories.length} stories
                  </div>
                  <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300">
                    Open Full Map View
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel - Recent Stories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 h-fit">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 text-lg">
                    Recent Stories
                  </h3>
                  <div className="flex items-center space-x-1 text-orange-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium">Live</span>
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search stories..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Recent Stories List */}
              <div className="p-4">
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {stories.slice(0, 8).map((story) => (
                    <RecentStoryItem key={story.id} story={story} />
                  ))}
                </div>

                {/* View All Button */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded-lg text-sm transition-colors duration-200">
                    View All Stories
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
              <h4 className="font-bold text-gray-800 text-lg mb-4">
                Map Statistics
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total Stories:</span>
                  <span className="font-bold text-orange-600">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">
                    Locations Covered:
                  </span>
                  <span className="font-bold text-emerald-600">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">
                    Active Contributors:
                  </span>
                  <span className="font-bold text-blue-600">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">This Month:</span>
                  <span className="font-bold text-amber-600">+89</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Add Your Location to the Map
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Share your unique Sri Lankan story and help others discover hidden
              gems across the island. Every pin on this map represents a real
              experience and adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-orange-600 font-semibold px-6 py-3 rounded-lg transition-all duration-300">
                Start Creating Your Story
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300">
                Learn About ArcGIS StoryMaps
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMapPreview;
