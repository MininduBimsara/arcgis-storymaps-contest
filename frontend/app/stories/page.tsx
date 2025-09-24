"use client";

import React, { useState, useEffect } from "react";
import StoriesHeroSection from "@/components/stories/StoriesHeroSection";
import FeaturedStoriesSection from "@/components/stories/FeaturedStories";
import StoryDetails from "@/components/stories/StoryDetails";
import Footer from "@/components/layout/Footer";
import { Story } from "@/components/stories/StoryCard";

// Main Stories Page Component
const StoriesPage = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleReadMore = (story: Story) => {
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
        <StoryDetails story={selectedStory} onBack={handleBackToStories} />
        <Footer />
      </div>
    );
  }

  // Default stories page view
  return (
    <div className="min-h-screen bg-white">
      <StoriesHeroSection />
      <FeaturedStoriesSection onReadMore={handleReadMore} />
      <Footer />
    </div>
  );
};

export default StoriesPage;
