import { UserPlus, Map, Upload, Share2, ArrowRight } from "lucide-react";

export const RegistrationProcess = () => {
  const steps = [
    {
      id: 1,
      icon: UserPlus,
      title: "Create Account",
      color: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      icon: Map,
      title: "Build Story Map",
      color: "from-green-50 to-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      icon: Upload,
      title: "Submit Entry",
      color: "from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: 4,
      icon: Share2,
      title: "Promote & Win",
      color: "from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* How to Participate */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            How to Participate
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to submit your Sri Lankan story
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connecting Arrow (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 z-10">
                  <ArrowRight className="w-6 h-6 text-ceylon-orange" />
                </div>
              )}

              <div className="bg-white rounded-xl p-8 shadow-competition hover:shadow-hover transition-all duration-300 border border-gray-100 group cursor-pointer transform hover:scale-105 flex flex-col items-center text-center h-full">
                {/* Step Number */}
                <div className="w-12 h-12 bg-ceylon-orange text-white rounded-full flex items-center justify-center font-bold text-lg mb-6">
                  {step.id}
                </div>

                {/* Icon */}
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className={`w-10 h-10 ${step.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-medium text-gray-900">
                  {step.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
