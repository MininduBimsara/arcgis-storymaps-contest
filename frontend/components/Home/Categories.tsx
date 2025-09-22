import {
  Building2,
  Mountain,
  TreePine,
  Utensils,
  ArrowRight,
  Users,
} from "lucide-react";

const CategoryCard = ({
  icon: Icon,
  title,
  description,
  storyCount,
  image,
  colorTheme,
  gradient,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  storyCount: number;
  image: string;
  colorTheme: string;
  gradient: string;
}) => (
  <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-80 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
      style={{ backgroundImage: `url(${image})` }}
    />

    {/* Gradient Overlay */}
    <div
      className={`absolute inset-0 ${gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}
    />

    {/* Topographic Pattern Overlay */}
    <div className="absolute inset-0 opacity-10">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 0h40v40H0V0zm20 20a20 20 0 1 1 0-40 20 20 0 0 1 0 40zm0-2a18 18 0 1 0 0-36 18 18 0 0 0 0 36z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>

    {/* Content */}
    <div className="relative z-10 h-full flex flex-col justify-between p-6">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div
          className={`w-12 h-12 ${colorTheme} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div className="text-right">
          <div className="text-white/90 text-sm font-medium">
            {storyCount} stories
          </div>
          <div className="flex items-center space-x-1 text-white/80 text-xs">
            <Users className="w-3 h-3" />
            <span>{Math.floor(storyCount * 0.7)} contributors</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-white font-bold text-2xl mb-2 group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed">{description}</p>
        </div>

        <button className="bg-white/20 hover:bg-white hover:text-gray-900 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-transparent inline-flex items-center space-x-2 group/btn">
          <span>Explore Category</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>

    {/* Hover Effect Accent */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  </div>
);

const Categories = () => {
  const categories = [
    {
      icon: Building2,
      title: "Cultural Heritage",
      description:
        "Explore ancient temples, colonial architecture, and traditional ceremonies that showcase Sri Lanka's rich cultural tapestry.",
      storyCount: 127,
      image: "/categories/cultural-heritage.jpg",
      colorTheme: "bg-orange-500",
      gradient: "bg-gradient-to-br from-orange-600/80 to-amber-600/80",
    },
    {
      icon: Mountain,
      title: "Adventure Tourism",
      description:
        "From hiking Adam's Peak to surfing in Arugam Bay, discover thrilling adventures across the island.",
      storyCount: 89,
      image: "/categories/adventure.jpg",
      colorTheme: "bg-emerald-500",
      gradient: "bg-gradient-to-br from-emerald-600/80 to-teal-600/80",
    },
    {
      icon: TreePine,
      title: "Wildlife & Nature",
      description:
        "Encounter leopards in Yala, elephants in Udawalawe, and whales off the southern coast.",
      storyCount: 156,
      image: "/categories/wildlife.jpg",
      colorTheme: "bg-blue-500",
      gradient: "bg-gradient-to-br from-blue-600/80 to-indigo-600/80",
    },
    {
      icon: Utensils,
      title: "Local Experiences",
      description:
        "Savor authentic cuisine, learn traditional crafts, and connect with local communities across Sri Lanka.",
      storyCount: 98,
      image: "/categories/local-experience.jpg",
      colorTheme: "bg-yellow-500",
      gradient: "bg-gradient-to-br from-yellow-600/80 to-orange-600/80",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Cpath d='M30 30c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 10c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM20 20c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm20 0c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Tell Your Story,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Your Way
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from four distinct categories to showcase different aspects
            of Sri Lankan culture, adventure, nature, and local life through
            your unique perspective
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl p-8 border border-orange-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Can't Decide on a Category?
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Many stories beautifully blend multiple categories. Our expert
                judges will ensure your submission is evaluated in the most
                appropriate category, or you can submit to multiple categories
                with different story angles.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-gray-700 text-sm">
                    Multiple category submissions allowed
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-gray-700 text-sm">
                    Cross-category stories encouraged
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-gray-700 text-sm">
                    Expert category guidance available
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Popular Combinations
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                      Cultural
                    </span>
                    <span className="text-gray-400">+</span>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                      Local
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">
                      Adventure
                    </span>
                    <span className="text-gray-400">+</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      Wildlife
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      Nature
                    </span>
                    <span className="text-gray-400">+</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                      Cultural
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center space-x-2">
                <span>Get Category Guidance</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 border-2 border-orange-200 rounded-full opacity-20 animate-spin-slow" />
        <div className="absolute bottom-20 left-10 w-16 h-16 border-2 border-emerald-200 rounded-full opacity-20 animate-pulse" />
      </div>
    </section>
  );
};

export default Categories;
