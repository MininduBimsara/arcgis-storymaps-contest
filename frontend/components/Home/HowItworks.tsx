import { MapPin, Upload, Trophy, ArrowRight } from "lucide-react";

const StepCard = ({
  step,
  icon: Icon,
  title,
  description,
  isLast = false,
}: {
  step: number;
  icon: React.ElementType;
  title: string;
  description: string;
  isLast?: boolean;
}) => (
  <div className="relative flex flex-col items-center text-center group">
    {/* Step Number */}
    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
      <span className="text-white font-bold text-xl">{step}</span>
    </div>

    {/* Icon */}
    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-orange-100 group-hover:shadow-xl group-hover:border-orange-200 transition-all duration-300">
      <Icon className="w-10 h-10 text-orange-600" />
    </div>

    {/* Content */}
    <div className="space-y-4 max-w-sm">
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>

    {/* Arrow Connector */}
    {!isLast && (
      <div className="hidden lg:block absolute top-8 left-full w-full">
        <div className="flex items-center justify-center h-full">
          <ArrowRight className="w-8 h-8 text-orange-400 animate-pulse" />
        </div>
      </div>
    )}

    {/* Mobile Arrow */}
    {!isLast && (
      <div className="lg:hidden mt-8 mb-8">
        <div className="w-px h-16 bg-gradient-to-b from-orange-400 to-transparent mx-auto" />
      </div>
    )}
  </div>
);

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3Ccircle cx='0' cy='30' r='3'/%3E%3Ccircle cx='60' cy='30' r='3'/%3E%3Ccircle cx='30' cy='0' r='3'/%3E%3Ccircle cx='30' cy='60' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Share Your Ceylon Story in{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your Sri Lankan adventures into compelling digital stories
            that inspire others to explore the pearl of the Indian Ocean
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-16 lg:gap-8 relative">
          <StepCard
            step={1}
            icon={MapPin}
            title="Create"
            description="Build your interactive story map using ArcGIS StoryMaps. Add photos, videos, and rich content to showcase your Sri Lankan adventure with precise geographic context."
          />

          <StepCard
            step={2}
            icon={Upload}
            title="Submit"
            description="Share your completed story through our competition portal. Include details about locations, cultural insights, and personal experiences that make your story unique."
          />

          <StepCard
            step={3}
            icon={Trophy}
            title="Win"
            description="Compete for amazing prizes including cash rewards up to ₹500,000, tourism board partnerships, and the chance to promote Sri Lankan tourism globally."
            isLast={true}
          />
        </div>

        {/* Additional Info */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 max-w-4xl mx-auto border border-orange-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Need Help Getting Started?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Access our comprehensive guide with ArcGIS StoryMaps tutorials,
              storytelling tips, and examples of winning submissions from
              previous competitions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
                View Tutorial
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 font-semibold px-6 py-3 rounded-lg transition-all duration-300">
                Download Guidelines
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-orange-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-amber-200 rounded-full opacity-20 animate-bounce" />
      </div>
    </section>
  );
};

export default HowItWorks;
