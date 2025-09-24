// ===== ResourcesSection.tsx =====
import { Clock, ExternalLink, Award, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ResourcesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            Getting Started
          </div>
          <h3 className="text-3xl md:text-4xl font-light text-black mb-6">
            Everything You Need to Begin
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access comprehensive guides, tutorials, and examples to create your
            winning story
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Competition Guidelines",
              description:
                "Complete rules, judging criteria, and submission requirements",
              icon: ExternalLink,
              image: "/guidelines.jpg",
            },
            {
              title: "StoryMaps Tutorial",
              description:
                "Step-by-step guide to creating interactive ArcGIS StoryMaps",
              icon: ExternalLink,
              image: "/tutorial.jpg",
            },
            {
              title: "Example Stories",
              description:
                "Inspiring examples from previous competitions and winners",
              icon: Award,
              image: "/examples.jpg",
            },
          ].map((resource, index) => (
            <button
              key={index}
              className="group bg-white border border-gray-200 hover:border-blue-600 hover:shadow-md rounded-md overflow-hidden text-left transition-all duration-300"
            >
              <div className="relative h-32 bg-blue-50">
                {/* Image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-12 h-12 mx-auto mb-2 bg-white rounded-md border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <resource.icon className="w-6 h-6" />
                    </div>
                    <p className="text-xs">Resource Image</p>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-white rounded-md p-2 border border-gray-100">
                  <resource.icon className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="p-5">
                <h4 className="text-lg font-medium text-black mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {resource.title}
                </h4>
                <p className="text-base text-gray-600 leading-relaxed mb-3">
                  {resource.description}
                </p>
                <div className="flex items-center gap-2 text-base font-normal text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
