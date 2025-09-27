import { CheckCircle, Clock, Calendar, Trophy } from "lucide-react";

// Timeline Section Component
export const TimelineSection = () => {
  const timelinePhases = [
    {
      id: "registration",
      title: "Registration Opens",
      date: "January 2025",
      status: "completed",
      icon: CheckCircle,
    },
    {
      id: "submissions",
      title: "Submissions Open",
      date: "February 2025",
      status: "current",
      icon: Clock,
    },
    {
      id: "deadline",
      title: "Submission Deadline",
      date: "March 31, 2025",
      status: "upcoming",
      icon: Calendar,
    },
    {
      id: "judging",
      title: "Judging Period",
      date: "April 2025",
      status: "upcoming",
      icon: Clock,
    },
    {
      id: "results",
      title: "Winners Announced",
      date: "May 2025",
      status: "upcoming",
      icon: Trophy,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600";
      case "current":
        return "bg-blue-100 text-blue-300";
      case "upcoming":
        return "bg-gray-100 text-gray-400";
      default:
        return "bg-gray-100 text-gray-400";
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-light text-black mb-3 sm:mb-4">
            Competition Timeline
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Important dates and milestones for the competition
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="flex justify-between relative mb-6 sm:mb-8">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200">
              <div className="h-full bg-blue-100 w-1/5"></div>
            </div>

            {timelinePhases.map((phase, index) => (
              <div
                key={phase.id}
                className="flex flex-col items-center max-w-40 lg:max-w-48 relative"
              >
                <div
                  className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center ${getStatusColor(phase.status)} mb-3 sm:mb-4 z-10 border-2 border-white shadow-sm`}
                >
                  <phase.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>

                <div className="bg-white border border-gray-100 rounded-md p-3 sm:p-4 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300 text-center w-full">
                  <div className="text-xs text-blue-300 font-medium mb-1 sm:mb-2">
                    {phase.date}
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-black">
                    {phase.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-3 sm:space-y-4">
          {timelinePhases.map((phase, index) => (
            <div key={phase.id} className="flex gap-3 sm:gap-4 items-start">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${getStatusColor(phase.status)} border-2 border-white shadow-sm`}
                >
                  <phase.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                {index < timelinePhases.length - 1 && (
                  <div className="w-0.5 h-8 sm:h-12 bg-gray-200 mt-2"></div>
                )}
              </div>

              <div className="bg-white border border-gray-100 rounded-md p-3 sm:p-4 flex-1 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300">
                <div className="text-xs text-blue-300 font-medium mb-1">
                  {phase.date}
                </div>
                <h3 className="text-sm sm:text-base font-medium text-black">
                  {phase.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4 sm:p-6 max-w-lg mx-auto">
            <h3 className="text-base sm:text-lg font-medium text-black mb-3 sm:mb-4">
              Time Until Submission Deadline
            </h3>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {[
                { label: "Days", value: "47" },
                { label: "Hours", value: "12" },
                { label: "Minutes", value: "34" },
                { label: "Seconds", value: "56" },
              ].map((unit) => (
                <div key={unit.label} className="text-center">
                  <div className="text-lg sm:text-xl font-medium text-blue-300 mb-1">
                    {unit.value}
                  </div>
                  <div className="text-xs text-gray-500">{unit.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
