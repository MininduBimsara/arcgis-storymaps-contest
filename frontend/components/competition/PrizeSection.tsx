import { Trophy, Award, Heart, Gift } from "lucide-react";

// Prize Section Component
export const PrizeSection = () => {
  const prizes = [
    {
      id: "grand",
      icon: Trophy,
      title: "Grand Prize Winner",
      amount: "LKR 500,000",
      description: "Overall competition winner",
      features: [
        "Cash Prize: LKR 500,000",
        "Tourism Board Partnership",
        "Featured Story Promotion",
        "Professional Recognition Certificate",
      ],
    },
    {
      id: "category",
      icon: Award,
      title: "Category Winners",
      amount: "LKR 200,000",
      description: "Best in each category (6 winners)",
      features: [
        "LKR 200,000 per category winner",
        "Story featured on main platform",
        "Certificate of Excellence",
        "Tourism Board official recognition",
      ],
    },
    {
      id: "peoples",
      icon: Heart,
      title: "People's Choice Award",
      amount: "LKR 100,000",
      description: "Most popular community story",
      features: [
        "LKR 100,000 cash prize",
        "Community favorite badge",
        "Social media feature campaign",
        "Audience engagement recognition",
      ],
    },
    {
      id: "participation",
      icon: Gift,
      title: "Participation Benefits",
      amount: "ArcGIS Licenses",
      description: "All qualifying submissions",
      features: [
        "Free ArcGIS StoryMaps license (1 year)",
        "Digital certificate of participation",
        "Exclusive community membership",
        "Early access to platform features",
      ],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-black mb-4">
            Competition Prizes
          </h2>
          <div className="text-4xl font-medium text-blue-300 mb-4">
            LKR 2.5 Million Total Prize Pool
          </div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Substantial cash prizes and recognition opportunities for Sri Lankan
            storytellers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prizes.map((prize) => (
            <div
              key={prize.id}
              className="bg-white border border-gray-100 rounded-md p-6 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-md">
                  <prize.icon className="w-5 h-5 text-blue-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-black mb-1">
                    {prize.title}
                  </h3>
                  <p className="text-sm text-gray-500">{prize.description}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-2xl font-medium text-black">
                  {prize.amount}
                </div>
              </div>

              <ul className="space-y-2">
                {prize.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <div className="w-1 h-1 bg-blue-100 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 mb-4">
            All prizes sponsored by Sri Lankan Tourism Board and partners
          </p>
          <button className="bg-white text-black border border-blue-100 hover:bg-blue-50 px-6 py-2 rounded-md text-sm font-medium transition-all duration-300">
            View Terms & Conditions
          </button>
        </div>
      </div>
    </section>
  );
};
