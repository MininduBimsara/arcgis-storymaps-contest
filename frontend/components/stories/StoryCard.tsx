import React from "react";
import { MapPin, Clock, Heart, Eye, ArrowRight } from "lucide-react";

export interface Story {
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
    <article
      className="bg-white border border-gray-100 rounded-md overflow-hidden hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300 group cursor-pointer"
      onClick={() => onReadMore(story)}
    >
      <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-black rounded-md text-xs font-medium">
            {story.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Location and Read Time */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{story.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{story.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-black mb-2 leading-tight group-hover:text-blue-300 transition-colors">
          {story.title}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-500 mb-3">By {story.author}</p>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {story.description}
        </p>

        {/* Stats and Read More */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{story.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{story.views}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm font-medium text-black group-hover:text-blue-300 transition-colors">
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoryCard;
