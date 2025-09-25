"use client";

import React, { useEffect, useState } from "react";
import api, { StoryMetaPublic, ApiResponse } from "@/lib/api";

interface ArcgisStoriesListProps {
  onReadMore?: (story: StoryMetaPublic) => void;
}

const ArcgisStoriesList: React.FC<ArcgisStoriesListProps> = ({
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
        if (mounted) {
          setStories(res.data || []);
        }
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

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-500">Loading stories…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (!stories.length) {
    return (
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-500">No stories yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-black">
            Latest ArcGIS Stories
          </h2>
          <p className="text-gray-500">Auto-enriched from ArcGIS metadata</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s) => (
            <article
              key={s.id}
              className="bg-white border border-gray-100 rounded-md overflow-hidden hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300"
            >
              <a
                href={s.storyUrl}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                  {s.thumbnailUrl ? (
                    <img
                      src={s.thumbnailUrl}
                      alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No thumbnail
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium text-black mb-1 line-clamp-2">
                    {s.title || "Untitled Story"}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    By {s.author || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {s.description || "No description available."}
                  </p>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArcgisStoriesList;
