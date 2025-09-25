"use client";
import React, { useEffect, useState } from "react";
import StoryCard from "./StoryCard";
import api, { StoryMetaPublic, ApiResponse } from "@/lib/api";

interface FeaturedStoriesSectionProps {
  onReadMore: (story: StoryMetaPublic) => void;
}

const FeaturedStoriesSection: React.FC<FeaturedStoriesSectionProps> = ({
  onReadMore,
}) => {
  const [stories, setStories] = useState<StoryMetaPublic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = (await api.getArcgisStories()) as ApiResponse<
          StoryMetaPublic[]
        >;
        if (mounted) setStories(res.data || []);
      } catch (err: any) {
        setError(err?.error || "Failed to load stories");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-black mb-4">
            Featured Stories
          </h2>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Discover Sri Lanka through immersive digital journeys showcasing the
            island's natural beauty, rich heritage, and vibrant culture
          </p>
        </div>

        {loading ? (
          <div className="text-gray-500 mb-12">Loading...</div>
        ) : error ? (
          <div className="text-red-500 mb-12">{error}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} onReadMore={onReadMore} />
            ))}
          </div>
        )}

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
              View All Stories
            </button>
            <button className="bg-white text-black border border-blue-100 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors font-medium">
              Submit Your Story
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Share your Sri Lankan story and compete for amazing prizes
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStoriesSection;
