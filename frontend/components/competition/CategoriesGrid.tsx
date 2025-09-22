// components/CategoriesGrid.tsx
import {
  Building2,
  Mountain,
  TreePine,
  UtensilsCrossed,
  Waves,
  Diamond,
} from "lucide-react";

export const CategoriesGrid = () => {
  const categories = [
    {
      id: "cultural",
      icon: Building2,
      title: "Cultural Heritage",
      description:
        "Ancient temples, traditional festivals, historical sites, and cultural traditions",
      examples: "Temple complexes, traditional ceremonies, cultural festivals",
      submissions: 487,
      color: "from-amber-50 to-amber-100",
      iconColor: "text-amber-600",
    },
    {
      id: "adventure",
      icon: Mountain,
      title: "Adventure Tourism",
      description:
        "Hiking trails, mountain climbing, extreme sports, and outdoor adventures",
      examples: "Mountain expeditions, rock climbing, white water rafting",
      submissions: 342,
      color: "from-emerald-50 to-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "wildlife",
      icon: TreePine,
      title: "Wildlife & Nature",
      description:
        "National parks, wildlife sanctuaries, nature reserves, and conservation",
      examples: "Elephant gatherings, leopard spotting, bird watching",
      submissions: 523,
      color: "from-green-50 to-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "local",
      icon: UtensilsCrossed,
      title: "Local Experiences",
      description:
        "Local cuisine, traditional crafts, village life, and authentic encounters",
      examples: "Cooking classes, artisan workshops, village stays",
      submissions: 398,
      color: "from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: "coastal",
      icon: Waves,
      title: "Coastal Stories",
      description:
        "Beaches, marine life, fishing communities, and coastal adventures",
      examples: "Whale watching, fishing villages, beach experiences",
      submissions: 445,
      color: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "hidden",
      icon: Diamond,
      title: "Hidden Gems",
      description:
        "Off-the-beaten-path locations, secret spots, and undiscovered treasures",
      examples: "Secret waterfalls, hidden beaches, local secrets",
      submissions: 298,
      color: "from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Competition Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your category and share your unique Sri Lankan story
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl p-6 shadow-competition hover:shadow-hover transition-all duration-300 border border-gray-100 group cursor-pointer transform hover:scale-105"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <category.icon className={`w-8 h-8 ${category.iconColor}`} />
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">
                {category.title}
              </h3>

              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {category.description}
              </p>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Examples:</p>
                <p className="text-sm text-gray-700 italic">
                  {category.examples}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  {category.submissions} stories submitted
                </span>
                <button className="text-ceylon-orange hover:text-ceylon-orange-light text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                  View Examples →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Each participant can submit one story per category
          </p>
          <button className="bg-gray-900 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
            Browse All Categories
          </button>
        </div>
      </div>
    </section>
  );
};
