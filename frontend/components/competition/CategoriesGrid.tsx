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
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-black mb-4">
            Competition Categories
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Choose your category and share your unique perspective on Sri Lanka
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-gray-100 rounded-md p-6 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-md mx-auto mb-4">
                <category.icon className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-lg font-medium text-black">
                {category.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 mb-4">
            Submit one story per category maximum
          </p>
          <button className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-all duration-300">
            Explore All Categories
          </button>
        </div>
      </div>
    </section>
  );
};
