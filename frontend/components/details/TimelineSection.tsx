import { Calendar, Users, Trophy, Rocket } from "lucide-react";

export const TimelineSection = () => {
  const timelineEvents = [
    {
      date: "January 15, 2025",
      title: "Competition Launch",
      description:
        "Registration opens and submission platform goes live. Start creating your story maps!",
      icon: Rocket,
      status: "completed",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      date: "February - March 2025",
      title: "Submission Period",
      description:
        "Upload your completed story maps and supporting materials. Get feedback from the community.",
      icon: Users,
      status: "active",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      date: "March 31, 2025",
      title: "Submission Deadline",
      description:
        "Final day to submit your entries. All submissions must be completed by 11:59 PM LKT.",
      icon: Calendar,
      status: "upcoming",
      gradient: "from-orange-500 to-red-600",
    },
    {
      date: "May 2025",
      title: "Winners Announced",
      description:
        "Judging complete and winners revealed at the Ceylon Stories Awards ceremony.",
      icon: Trophy,
      status: "upcoming",
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          border: "border-green-300",
          dot: "bg-green-500",
        };
      case "active":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          border: "border-blue-300",
          dot: "bg-blue-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          border: "border-gray-300",
          dot: "bg-gray-400",
        };
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Competition Timeline
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
            Mark your calendar! Here are the key dates and milestones for the
            Ceylon Stories 2025 competition.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 via-cyan-300 to-purple-300"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              const styles = getStatusStyles(event.status);
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:gap-8`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <div
                      className={`w-8 h-8 ${styles.dot} rounded-full border-4 border-white shadow-lg flex items-center justify-center`}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 ml-16 md:ml-0 ${isLeft ? "md:text-right" : "md:text-left"}`}
                  >
                    <div
                      className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${styles.border}`}
                    >
                      {/* Date Badge */}
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 ${styles.bg} ${styles.text} rounded-full text-sm font-semibold mb-4`}
                      >
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Status Indicator */}
                      {event.status === "active" && (
                        <div className="mt-4 flex items-center gap-2 text-blue-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-semibold uppercase tracking-wide">
                            Currently Active
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl shadow-lg">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="font-semibold">
              Submissions are now open! Don't miss the March 31st deadline.
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};
