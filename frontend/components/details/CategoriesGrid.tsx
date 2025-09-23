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
      color: "from-amber-50 to-amber-100",
      iconColor: "text-amber-600",
    },
    {
      id: "adventure",
      icon: Mountain,
      title: "Adventure Tourism",
      color: "from-emerald-50 to-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "wildlife",
      icon: TreePine,
      title: "Wildlife & Nature",
      color: "from-green-50 to-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "local",
      icon: UtensilsCrossed,
      title: "Local Experiences",
      color: "from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: "coastal",
      icon: Waves,
      title: "Coastal Stories",
      color: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "hidden",
      icon: Diamond,
      title: "Hidden Gems",
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
              className="bg-white rounded-xl p-8 shadow-competition hover:shadow-hover transition-all duration-300 border border-gray-100 group cursor-pointer transform hover:scale-105 flex flex-col items-center text-center"
            >
              <div
                className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <category.icon className={`w-10 h-10 ${category.iconColor}`} />
              </div>

              <h3 className="text-xl font-medium text-gray-900">
                {category.title}
              </h3>
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
