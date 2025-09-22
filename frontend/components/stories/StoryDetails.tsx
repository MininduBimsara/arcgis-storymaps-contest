import React from "react";
import {
  ArrowLeft,
  Share2,
  Bookmark,
  User,
  Calendar,
  Tag,
  MapPin,
  Clock,
  Heart,
  Eye,
} from "lucide-react";
import { Story } from "./StoryCard";

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
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium text-white backdrop-blur-sm ${story.categoryColor}`}
              >
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
            The journey to {story.location} begins before dawn, when the world
            is still wrapped in the gentle embrace of night. As I made my way
            through the winding paths, the anticipation of what lay ahead filled
            every step with purpose and wonder.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            What strikes you first is not just the visual beauty, but the
            profound sense of connection to something much larger than yourself.
            The landscape here tells stories that span generations, each vista a
            chapter in the grand narrative of Sri Lanka's rich heritage.
          </p>

          <h2 className="text-2xl font-medium text-gray-900 mb-4 mt-8">
            The Experience
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Every moment spent in this extraordinary place reveals new layers of
            beauty and meaning. The interplay of light and shadow, the whisper
            of ancient winds, and the timeless rhythm of nature create an
            atmosphere that is both humbling and inspiring.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Local communities have preserved these traditions for centuries,
            passing down knowledge and wisdom that connects us to the very soul
            of this island. Their stories, woven into the fabric of daily life,
            add depth and authenticity to every encounter.
          </p>

          <h2 className="text-2xl font-medium text-gray-900 mb-4 mt-8">
            Planning Your Visit
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            For those inspired to embark on their own journey, timing and
            preparation can enhance the experience significantly. The best
            seasons offer ideal conditions for exploration, while local guides
            provide invaluable insights that transform a simple visit into a
            meaningful cultural exchange.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Remember to travel with respect and mindfulness, embracing the
            opportunity to learn from and contribute to the communities that
            call these remarkable places home. Your journey becomes part of
            their ongoing story, just as their story becomes part of yours.
          </p>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 font-medium">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Sri Lanka",
              "Travel",
              "Culture",
              "Heritage",
              "Photography",
              "Adventure",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
