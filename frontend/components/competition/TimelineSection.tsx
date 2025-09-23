import { CheckCircle, Clock, Calendar, Trophy } from "lucide-react";

export const TimelineSection = () => {
  const timelinePhases = [
    {
      id: "registration",
      title: "Registration Open",
      date: "January 2025",
      status: "completed",
      icon: CheckCircle,
      color: "from-green-50 to-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "submissions",
      title: "Submissions Open",
      date: "February 2025",
      status: "current",
      icon: Clock,
      color: "from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: "deadline",
      title: "Submission Deadline",
      date: "March 31, 2025",
      status: "upcoming",
      icon: Calendar,
      color: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "judging",
      title: "Judging Period",
      date: "April 2025",
      status: "upcoming",
      icon: Clock,
      color: "from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "results",
      title: "Winners Announced",
      date: "May 2025",
      status: "upcoming",
      icon: Trophy,
      color: "from-amber-50 to-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  const getPhaseColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-ceylon-green text-white";
      case "current":
        return "bg-ceylon-orange text-white";
      case "upcoming":
        return "bg-gray-300 text-gray-700";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  const getProgressWidth = () => {
    const currentIndex = timelinePhases.findIndex(
      (phase) => phase.status === "current"
    );
    return `${(currentIndex / (timelinePhases.length - 1)) * 100}%`;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Competition Timeline
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track the competition progress and important milestones
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-16 left-0 w-full h-1 bg-gray-200 rounded-full">
              <div
                className="h-full bg-ceylon-orange rounded-full transition-all duration-1000"
                style={{ width: getProgressWidth() }}
              ></div>
            </div>

            {/* Timeline Points */}
            <div className="flex justify-between relative">
              {timelinePhases.map((phase, index) => (
                <div
                  key={phase.id}
                  className="flex flex-col items-center max-w-48"
                >
                  {/* Timeline Point */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${getPhaseColor(phase.status)} shadow-lg mb-6 z-10 relative border-2 border-white`}
                  >
                    <phase.icon className="w-5 h-5" />
                  </div>

                  {/* Phase Card */}
                  <div className="bg-white rounded-xl p-6 shadow-competition hover:shadow-hover transition-all duration-300 text-center group cursor-pointer transform hover:scale-105 w-full">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${phase.color} rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <phase.icon className={`w-8 h-8 ${phase.iconColor}`} />
                    </div>

                    <div className="text-sm font-medium text-ceylon-orange mb-2">
                      {phase.date}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {phase.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-8">
          {timelinePhases.map((phase, index) => (
            <div key={phase.id} className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${getPhaseColor(phase.status)} shadow-lg border-2 border-white`}
                >
                  <phase.icon className="w-4 h-4" />
                </div>
                {index < timelinePhases.length - 1 && (
                  <div className="w-0.5 h-20 bg-gray-200 mt-4"></div>
                )}
              </div>

              <div className="bg-white rounded-xl p-6 shadow-competition flex-1 text-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${phase.color} rounded-full flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}
                >
                  <phase.icon className={`w-6 h-6 ${phase.iconColor}`} />
                </div>

                <div className="text-xs font-medium text-ceylon-orange mb-1">
                  {phase.date}
                </div>
                <h3 className="text-base font-medium text-gray-900">
                  {phase.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown Timer */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-competition max-w-lg mx-auto">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Time Remaining for Submissions
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Days", value: "47" },
                { label: "Hours", value: "12" },
                { label: "Minutes", value: "34" },
                { label: "Seconds", value: "56" },
              ].map((unit) => (
                <div key={unit.label} className="text-center">
                  <div className="text-2xl font-bold text-ceylon-orange mb-1">
                    {unit.value}
                  </div>
                  <div className="text-sm text-gray-600">{unit.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
