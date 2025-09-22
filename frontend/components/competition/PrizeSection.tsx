import { Trophy, Award, Heart, Gift } from "lucide-react";

export const PrizeSection = () => {
  const prizes = [
    {
      id: "grand",
      icon: Trophy,
      title: "Grand Prize",
      amount: "₹500,000",
      description: "Winner across all categories",
      features: [
        "Cash Prize: ₹500,000",
        "Tourism Board Partnership",
        "Featured Story Promotion",
        "Professional Recognition",
      ],
      accent: "border-l-4 border-ceylon-gold",
      bgGradient: "bg-gradient-to-br from-ceylon-gold/5 to-ceylon-gold-light/5",
    },
    {
      id: "category",
      icon: Award,
      title: "Category Winners",
      amount: "₹200,000",
      description: "Each category (6 winners)",
      features: [
        "₹200,000 per category winner",
        "Story featured on platform",
        "Certificate of Excellence",
        "Tourism Board recognition",
      ],
      accent: "border-l-4 border-ceylon-orange",
      bgGradient:
        "bg-gradient-to-br from-ceylon-orange/5 to-ceylon-orange-light/5",
    },
    {
      id: "peoples",
      icon: Heart,
      title: "People's Choice",
      amount: "₹100,000",
      description: "Most popular story",
      features: [
        "₹100,000 cash prize",
        "Community favorite badge",
        "Social media promotion",
        "Audience engagement award",
      ],
      accent: "border-l-4 border-ceylon-green",
      bgGradient:
        "bg-gradient-to-br from-ceylon-green/5 to-ceylon-green-light/5",
    },
    {
      id: "participation",
      icon: Gift,
      title: "Participation Rewards",
      amount: "ArcGIS Licenses",
      description: "All qualified submissions",
      features: [
        "Free ArcGIS StoryMaps license",
        "Digital certificate",
        "Community membership",
        "Early access to new features",
      ],
      accent: "border-l-4 border-gray-300",
      bgGradient: "bg-gradient-to-br from-gray-100/50 to-gray-200/50",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Prize Pool</h2>
          <div className="text-5xl font-bold text-ceylon-gold mb-4">
            ₹2.5 Million Total
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compete for substantial cash prizes and incredible recognition
            opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {prizes.map((prize) => (
            <div
              key={prize.id}
              className={`bg-white rounded-xl p-8 shadow-competition hover:shadow-prize transition-all duration-300 ${prize.accent} ${prize.bgGradient} transform hover:scale-105`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm">
                  <prize.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    {prize.title}
                  </h3>
                  <p className="text-gray-600">{prize.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {prize.amount}
                </div>
              </div>

              <ul className="space-y-2">
                {prize.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 bg-ceylon-orange rounded-full flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            All prizes are sponsored by the Sri Lankan Tourism Board and our
            partners
          </p>
          <button className="bg-ceylon-orange hover:bg-ceylon-orange-light text-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
            View Prize Terms & Conditions
          </button>
        </div>
      </div>
    </section>
  );
};
