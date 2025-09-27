import React from "react";
import { ArrowRight } from "lucide-react";
import { StoryMetaPublic } from "@/lib/api";

export interface Story extends StoryMetaPublic {}

interface StoryCardProps {
  story: StoryMetaPublic;
  onReadMore: (story: StoryMetaPublic) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onReadMore }) => {
  const thumbnail = story.thumbnailUrl || "/place.png";

  return (
    <article
      className="bg-white border border-gray-100 rounded-md overflow-hidden hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300 group cursor-pointer"
      onClick={() => onReadMore(story)}
    >
      <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
        <img
          src={thumbnail}
          alt={story.title || "Untitled Story"}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-medium text-black mb-1 sm:mb-2 leading-tight group-hover:text-blue-300 transition-colors">
          {story.title || "Untitled Story"}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
          By {story.author || "Unknown"}
        </p>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
          {story.description || "No description available."}
        </p>

        <div className="flex items-center justify-end pt-3 sm:pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-black group-hover:text-blue-300 transition-colors">
            <span>Read More</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoryCard;
