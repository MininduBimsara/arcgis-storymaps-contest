import { Trophy, Award, Gift, Star } from "lucide-react";

export const PrizeSection = () => {
  const prizes = [
    {
      position: "1st Place",
      amount: "₹1,000,000",
      icon: Trophy,
      gradient: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      textColor: "text-yellow-600",
      description: "Grand Champion Award",
    },
    {
      position: "2nd Place",
      amount: "₹750,000",
      icon: Award,
      gradient: "from-gray-400 to-gray-600",
      bgGradient: "from-gray-50 to-slate-50",
      textColor: "text-gray-600",
      description: "Runner-up Award",
    },
    {
      position: "3rd Place",
      amount: "₹500,000",
      icon: Star,
      gradient: "from-amber-600 to-yellow-700",
      bgGradient: "from-amber-50 to-yellow-50",
      textColor: "text-amber-600",
      description: "Third Place Award",
    },
    {
      position: "Category Winners",
      amount: "₹250,000",
      icon: Gift,
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      textColor: "text-blue-600",
      description: "Each Category",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Amazing Prizes
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
            Win from a total prize pool of ₹2.5 Million! Recognition and rewards
            for the most compelling Sri Lankan stories.
          </p>
        </div>

        {/* Prize Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {prizes.map((prize, index) => {
            const IconComponent = prize.icon;
            return (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${prize.bgGradient} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50`}
              >
                {/* Icon */}
                <div
                  className={`inline-flex p-4 bg-gradient-to-r ${prize.gradient} rounded-xl mb-6 shadow-lg`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className={`text-2xl font-bold ${prize.textColor}`}>
                    {prize.position}
                  </h3>
                  <div className="text-3xl font-black text-gray-900">
                    {prize.amount}
                  </div>
                  <p className="text-gray-600 font-medium">
                    {prize.description}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              <span className="text-blue-800 font-semibold">
                Total Prize Pool: ₹2,500,000
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
