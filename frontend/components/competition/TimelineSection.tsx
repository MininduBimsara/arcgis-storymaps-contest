import { CheckCircle, Clock, Calendar, Trophy } from "lucide-react";

export const TimelineSection = () => {
  const timelinePhases = [
    {
      id: "registration",
      title: "Registration Open",
      date: "January 2025",
      description: "Competition launches, registration begins",
      status: "completed",
      icon: CheckCircle,
      details: [
        "Competition officially launched",
        "Registration portal opened",
        "Guidelines published",
        "Community platform activated",
      ],
    },
    {
      id: "submissions",
      title: "Submissions Open",
      date: "February 2025",
      description: "Story creation and submission period",
      status: "current",
      icon: Clock,
      details: [
        "Create ArcGIS StoryMaps",
        "Upload story content",
        "Add interactive elements",
        "Submit for review",
      ],
    },
    {
      id: "deadline",
      title: "Submission Deadline",
      date: "March 31, 2025",
      description: "Final submissions must be completed",
      status: "upcoming",
      icon: Calendar,
      details: [
        "All submissions finalized",
        "No new entries accepted",
        "Technical review begins",
        "Community voting opens",
      ],
    },
    {
      id: "judging",
      title: "Judging Period",
      date: "April 2025",
      description: "Expert panel review and community voting",
      status: "upcoming",
      icon: Clock,
      details: [
        "Expert panel evaluation",
        "Community voting period",
        "Technical assessment",
        "Final scoring compilation",
      ],
    },
    {
      id: "results",
      title: "Winners Announced",
      date: "May 2025",
      description: "Results announcement and awards ceremony",
      status: "upcoming",
      icon: Trophy,
      details: [
        "Winners announcement",
        "Awards ceremony",
        "Prize distribution",
        "Success stories featured",
      ],
    },
  ];

  const getPhaseColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-ceylon-green text-white";
      case "current":
        return "bg-ceylon-orange text-white";
      case "upcoming":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-200 text-gray-600";
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
            <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 rounded-full">
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
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${getPhaseColor(phase.status)} shadow-lg mb-4 z-10 relative`}
                  >
                    <phase.icon className="w-5 h-5" />
                  </div>

                  {/* Phase Card */}
                  <div className="bg-white rounded-lg p-6 shadow-competition hover:shadow-hover transition-all duration-300 text-center">
                    <div className="text-sm font-medium text-ceylon-orange mb-2">
                      {phase.date}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {phase.description}
                    </p>

                    {phase.status === "current" && (
                      <div className="text-xs text-ceylon-orange font-medium">
                        Current Phase
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6">
          {timelinePhases.map((phase, index) => (
            <div key={phase.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${getPhaseColor(phase.status)} shadow-lg`}
                >
                  <phase.icon className="w-4 h-4" />
                </div>
                {index < timelinePhases.length - 1 && (
                  <div className="w-0.5 h-16 bg-gray-200 mt-4"></div>
                )}
              </div>

              <div className="bg-white rounded-lg p-6 shadow-competition flex-1">
                <div className="text-sm font-medium text-ceylon-orange mb-1">
                  {phase.date}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {phase.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {phase.description}
                </p>

                <ul className="space-y-1">
                  {phase.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs text-gray-500"
                    >
                      <div className="w-1 h-1 bg-ceylon-orange rounded-full flex-shrink-0"></div>
                      {detail}
                    </li>
                  ))}
                </ul>

                {phase.status === "current" && (
                  <div className="text-xs text-ceylon-orange font-medium mt-3">
                    Current Phase
                  </div>
                )}
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
