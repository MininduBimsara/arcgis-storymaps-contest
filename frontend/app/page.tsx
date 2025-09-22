"use client";

import React from "react";
import { Play, ChevronRight, MapPin, Clock, Heart, Eye } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-32 bg-white relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
          Ceylon Stories
        </h1>
        <p className="text-xl text-white/90 mb-8 font-light leading-relaxed max-w-2xl mx-auto">
          Discover the pearl of the Indian Ocean through immersive digital
          storytelling. Share your journey, explore hidden treasures, and
          compete in the 2025 ArcGIS StoryMaps Competition.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            Explore Stories
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-medium">
            Start Creating
          </button>
        </div>
      </div>
    </section>
  );
};

const VideoSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Experience Ceylon Stories
          </h2>
          <p className="text-lg text-gray-600">
            Watch how digital storytelling brings Sri Lanka's beauty to life
          </p>
        </div>
        <div className="relative rounded-2xl overflow-hidden bg-gray-200 aspect-video">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <Play className="w-8 h-8 text-gray-800 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-8">
            Explore vibrant Sri Lanka—golden sun,
            <br />
            emerald hills, stories around every corner.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Join the 2025 ArcGIS StoryMaps Competition and showcase the hidden
            treasures of Ceylon through interactive digital storytelling.
            Discover, create, and share the stories that make Sri Lanka
            extraordinary.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Create Horizons
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Build interactive story maps that showcase the beauty and culture
              of Sri Lanka using cutting-edge ArcGIS technology.
            </p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Live the Story
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Experience authentic narratives from local storytellers,
              travelers, and communities across the island.
            </p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Eye className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Taste Adventure
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Discover hidden gems and off-the-beaten-path destinations that
              showcase Sri Lanka's incredible diversity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const StoriesGrid = () => {
  const stories = [
    {
      title: "Preparing for a Wildfire in Sri Lanka",
      subtitle:
        "Wildfires are unplanned fires that burn in natural areas like forests, grasslands or prairies. These dangerous fires spread quickly and can cause a lot of damage. Here are some resources to help you prepare for wildfires",
      resources: [
        {
          name: "Ready.gov",
          description:
            "A National public service campaign designed to educate and empower people to prepare for, respond to and mitigate emergencies, including natural and man-made disasters.",
          buttonText: "VISIT WEBSITE",
          borderColor: "border-l-emerald-400",
        },
        {
          name: "CalFire action plan",
          description:
            "A guide with information recommended by Cal Fire of what you can do to stay prepared in case you have to evacuate your home. It's best to follow directions given by your local government authority during any emergency.",
          buttonText: "VIEW PLAN",
          borderColor: "border-l-blue-400",
        },
        {
          name: "Ready for wildfire by CalFire",
          description:
            "What to know before, during and after a wildfire. Get prepared for wildfire before it strikes by following Ready. Set. Go!",
          buttonText: "VISIT WEBSITE",
          borderColor: "border-l-yellow-400",
        },
        {
          name: "FAIR Plan Wildfire checklist",
          description:
            "Use this checklist to help determine what parts of a home and the surrounding property may be the most vulnerable during a wildfire.",
          buttonText: "VIEW CHECKLIST",
          borderColor: "border-l-indigo-400",
        },
      ],
    },
    {
      title: "Monsoon Safety Guidelines for Sri Lanka",
      subtitle:
        "Monsoon season brings heavy rainfall and flooding risks across Sri Lanka. These resources will help you prepare for and stay safe during the monsoon months.",
      resources: [
        {
          name: "Department of Meteorology",
          description:
            "Official weather alerts, rainfall predictions, and safety guidelines issued by Sri Lanka's meteorological department.",
          buttonText: "VIEW UPDATES",
          borderColor: "border-l-blue-500",
        },
        {
          name: "Flood Preparedness Plan",
          description:
            "Essential steps to protect your family and property during flood conditions, including evacuation routes and emergency supplies.",
          buttonText: "DOWNLOAD GUIDE",
          borderColor: "border-l-emerald-500",
        },
        {
          name: "Disaster Management Centre",
          description:
            "Real-time updates on weather conditions, emergency shelters, and rescue operations during severe weather events.",
          buttonText: "VISIT PORTAL",
          borderColor: "border-l-orange-500",
        },
        {
          name: "Community Safety Checklist",
          description:
            "A comprehensive checklist to help communities prepare for monsoon season and protect vulnerable areas.",
          buttonText: "GET CHECKLIST",
          borderColor: "border-l-purple-500",
        },
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Featured Stories
          </h2>
          <p className="text-lg text-gray-600">
            Essential guides and resources for Sri Lankan communities
          </p>
        </div>

        <div className="space-y-16">
          {stories.map((story, storyIndex) => (
            <div
              key={storyIndex}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-light text-gray-900 mb-4">
                  {story.title}
                </h2>
                <p className="text-gray-600 leading-relaxed max-w-4xl">
                  {story.subtitle}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {story.resources.map((resource, index) => (
                  <div
                    key={index}
                    className={`border-l-4 ${resource.borderColor} bg-gray-50 p-6 rounded-r-lg`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {resource.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    <button className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                      {resource.buttonText}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-light text-gray-900 mb-8">
          Share Your Story
        </h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
          Join thousands of storytellers showcasing the beauty of Sri Lanka.
          Create your interactive story map and compete for amazing prizes.
        </p>
        <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
          Start Creating
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contest</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Rules
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Prizes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Winners
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Social Media
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Ceylon Stories. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const MagazineStyleWebsite = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <AboutSection />
      <StoriesGrid />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default MagazineStyleWebsite;
