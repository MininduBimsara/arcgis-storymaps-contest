// ===== ResourcesSection.tsx =====
"use client";
import { Clock, ExternalLink, Award, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ResourcesSection() {
  const resources = [
    {
      title: "Competition Guidelines",
      description:
        "Complete rules, judging criteria, and submission requirements",
      icon: ExternalLink,
      image: "/6.png",
      href: "/details",
      isExternal: false,
    },
    {
      title: "StoryMaps Tutorial",
      description:
        "Step-by-step guide to creating interactive ArcGIS StoryMaps",
      icon: ExternalLink,
      image: "/5.png",
      href: "https://arcg.is/aDqTP",
      isExternal: true,
    },
    {
      title: "Example Stories",
      description: "Inspiring examples from previous competitions and winners",
      icon: Award,
      image: "/2.png",
      href: "/stories",
      isExternal: false,
    },
  ];

  const handleResourceClick = (resource: (typeof resources)[0]) => {
    if (resource.isExternal) {
      window.open(resource.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1 sm:gap-2 bg-blue-50 text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            Getting Started
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-black mb-4 sm:mb-6">
            Everything You Need to Begin
          </h3>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Access comprehensive guides, tutorials, and examples to create your
            winning story
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {resources.map((resource, index) => {
            const ResourceComponent = resource.isExternal ? "button" : Link;
            const componentProps = resource.isExternal
              ? {
                  onClick: () => handleResourceClick(resource),
                  type: "button" as const,
                }
              : { href: resource.href };

            return (
              <ResourceComponent
                key={index}
                {...componentProps}
                className="group bg-white border border-gray-200 hover:border-blue-600 hover:shadow-md rounded-md overflow-hidden text-left transition-all duration-300 block"
              >
                <div className="relative h-24 sm:h-32 bg-blue-50">
                  {/* Real Image */}
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white rounded-md p-1.5 sm:p-2 border border-gray-100">
                    <resource.icon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                </div>
                <div className="p-3 sm:p-5">
                  <h4 className="text-base sm:text-lg font-medium text-black mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {resource.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-2 sm:mb-3">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base font-normal text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </ResourceComponent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
