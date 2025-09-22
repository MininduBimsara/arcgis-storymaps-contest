import {
  UserPlus,
  Map,
  Upload,
  Share2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export const RegistrationProcess = () => {
  const steps = [
    {
      id: 1,
      icon: UserPlus,
      title: "Create Account",
      description: "Sign up with email or social media to get started",
      details: [
        "Quick registration process",
        "Email or social media signup",
        "Verify your account",
        "Complete your profile",
      ],
      action: "Sign Up Now",
      actionType: "primary",
    },
    {
      id: 2,
      icon: Map,
      title: "Build Story Map",
      description: "Use ArcGIS StoryMaps to create your interactive story",
      details: [
        "Access free ArcGIS StoryMaps",
        "Choose from story templates",
        "Add maps and interactive elements",
        "Include photos and videos",
      ],
      action: "Launch StoryMaps",
      actionType: "secondary",
    },
    {
      id: 3,
      icon: Upload,
      title: "Submit Entry",
      description: "Upload your story and provide required details",
      details: [
        "Upload your completed story",
        "Select competition category",
        "Add story description",
        "Review submission guidelines",
      ],
      action: "Submit Story",
      actionType: "secondary",
    },
    {
      id: 4,
      icon: Share2,
      title: "Promote & Win",
      description: "Share with the community and compete for prizes",
      details: [
        "Share on social media",
        "Engage with community",
        "Track your story's performance",
        "Win prizes and recognition",
      ],
      action: "Share Story",
      actionType: "secondary",
    },
  ];

  const requirements = [
    {
      category: "Technical Requirements",
      items: [
        "Mobile-responsive story maps",
        "High-quality images (minimum 1080p)",
        "Minimum 5 interactive map points",
        "2000+ words narrative content",
        "GPS coordinates for all locations",
      ],
    },
    {
      category: "Content Guidelines",
      items: [
        "Original content only",
        "Focus on Sri Lankan locations",
        "Authentic personal experiences",
        "Respectful cultural representation",
        "No commercial promotion",
      ],
    },
    {
      category: "Submission Rules",
      items: [
        "One entry per category per person",
        "Submit by March 31, 2025",
        "Use ArcGIS StoryMaps platform",
        "English or Sinhala/Tamil accepted",
        "Must include contact information",
      ],
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connecting Arrow (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 z-10">
                  <ArrowRight className="w-6 h-6 text-ceylon-orange" />
                </div>
              )}

              <div className="bg-white rounded-xl p-6 shadow-competition hover:shadow-hover transition-all duration-300 border border-gray-100 h-full">
                {/* Step Number & Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-ceylon-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.id}
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-gray-600" />
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm">{step.description}</p>

                <ul className="space-y-2 mb-6">
                  {step.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-gray-500"
                    >
                      <div className="w-1 h-1 bg-ceylon-orange rounded-full flex-shrink-0 mt-2"></div>
                      {detail}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    step.actionType === "primary"
                      ? "bg-ceylon-orange hover:bg-ceylon-orange-light text-white"
                      : "border border-gray-300 text-gray-700 hover:border-ceylon-orange hover:text-ceylon-orange"
                  }`}
                >
                  {step.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Requirements Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-light text-gray-900 text-center mb-12">
            Requirements & Guidelines
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  {req.category}
                </h4>
                <ul className="space-y-2">
                  {req.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-ceylon-orange rounded-full flex-shrink-0 mt-2"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-900 mb-6">
            Helpful Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-ceylon-orange hover:text-ceylon-orange transition-all duration-300">
              <ExternalLink className="w-4 h-4" />
              Download Submission Guide
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-ceylon-orange hover:text-ceylon-orange transition-all duration-300">
              <ExternalLink className="w-4 h-4" />
              ArcGIS StoryMaps Tutorial
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-ceylon-orange hover:text-ceylon-orange transition-all duration-300">
              <ExternalLink className="w-4 h-4" />
              Example Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
