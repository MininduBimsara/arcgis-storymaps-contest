// ResourcesSection.tsx
import { Clock, ExternalLink, Award, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ResourcesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-ceylon-green/10 text-ceylon-green px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Clock className="w-4 h-4" />
            Getting Started
          </div>
          <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
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
              color: "ceylon-orange",
              image: "/guidelines.jpg",
            },
            {
              title: "StoryMaps Tutorial",
              description:
                "Step-by-step guide to creating interactive ArcGIS StoryMaps",
              icon: ExternalLink,
              color: "ceylon-green",
              image: "/tutorial.jpg",
            },
            {
              title: "Example Stories",
              description:
                "Inspiring examples from previous competitions and winners",
              icon: Award,
              color: "ceylon-gold",
              image: "/examples.jpg",
            },
          ].map((resource, index) => (
            <button
              key={index}
              className={`group bg-white border border-gray-200 hover:border-${resource.color}/30 rounded-xl overflow-hidden text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="relative h-32 bg-gray-200">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <resource.icon className={`w-4 h-4 text-${resource.color}`} />
                </div>
              </div>
              <div className="p-5">
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-ceylon-orange transition-colors duration-300">
                  {resource.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {resource.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-ceylon-orange transition-colors duration-300">
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
