// components/CategoriesGrid.tsx
import {
  Building2,
  Mountain,
  TreePine,
  UtensilsCrossed,
  Waves,
  Diamond,
} from "lucide-react";

// Categories Grid Component
export const CategoriesGrid = () => {
  const categories = [
    {
      id: "cultural",
      icon: Building2,
      title: "Cultural Heritage",
    },
    {
      id: "adventure",
      icon: Mountain,
      title: "Adventure Tourism",
    },
    {
      id: "wildlife",
      icon: TreePine,
      title: "Wildlife & Nature",
    },
    {
      id: "local",
      icon: UtensilsCrossed,
      title: "Local Experiences",
    },
    {
      id: "coastal",
      icon: Waves,
      title: "Coastal Stories",
    },
    {
      id: "hidden",
      icon: Diamond,
      title: "Hidden Gems",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-light text-black mb-3 sm:mb-4">
            Competition Categories
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Choose your category and share your unique perspective on Sri Lanka
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-gray-100 rounded-md p-4 sm:p-6 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer text-center"
            >
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-md mx-auto mb-3 sm:mb-4">
                <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-black">
                {category.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            Submit one story per category maximum
          </p>
          <button className="bg-black text-white px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-gray-800 transition-all duration-300">
            Explore All Categories
          </button>
        </div>
      </div>
    </section>
  );
};
