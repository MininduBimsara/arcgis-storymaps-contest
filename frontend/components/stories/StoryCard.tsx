import React from "react";
import { MapPin, Clock, Heart, Eye, ChevronRight } from "lucide-react";

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
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute inset-0 ${story.gradientOverlay}`}></div>
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm ${story.categoryColor}`}
          >
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

export default StoryCard;
