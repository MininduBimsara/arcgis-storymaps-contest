import { UserPlus, Map, Upload, Share2, ArrowRight } from "lucide-react";

// Registration Process Component
export const RegistrationProcess = () => {
  const steps = [
    {
      id: 1,
      icon: UserPlus,
      title: "Create Account",
    },
    {
      id: 2,
      icon: Map,
      title: "Build Story Map",
    },
    {
      id: 3,
      icon: Upload,
      title: "Submit Entry",
    },
    {
      id: 4,
      icon: Share2,
      title: "Promote & Win",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-black mb-4">
            How to Participate
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Simple steps to submit your Sri Lankan story
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-3 z-10">
                  <ArrowRight className="w-5 h-5 text-blue-300" />
                </div>
              )}

              <div className="bg-white border border-gray-100 rounded-md p-6 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer text-center">
                {/* Step Number */}
                <div className="w-8 h-8 bg-blue-100 text-white rounded-full flex items-center justify-center font-medium text-sm mb-4 mx-auto">
                  {step.id}
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-md mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-blue-300" />
                </div>

                {/* Title */}
                <h3 className="text-base font-medium text-black">
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
