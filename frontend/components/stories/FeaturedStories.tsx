import React from "react";
import StoryCard, { Story } from "./StoryCard";

interface FeaturedStoriesSectionProps {
  onReadMore: (story: Story) => void;
}

const FeaturedStoriesSection: React.FC<FeaturedStoriesSectionProps> = ({
  onReadMore,
}) => {
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

export default FeaturedStoriesSection;
