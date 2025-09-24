"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Lock page scroll while on the contact screen
  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/contact.jpg')",
        }}
      >
        {/* Overlay for better readability */}
        <div className=" absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full py-8 px-6 pt-25">
        <div className="w-full max-w-xl">
          {/* Main Container */}
          <div className="bg-white/95 backdrop-blur-sm rounded-md shadow-lg border border-white/20 p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-sm text-blue-300 font-medium tracking-wide uppercase mb-2">
                Get In Touch
              </div>
              <h1 className="text-2xl md:text-3xl font-light text-black mb-3">
                Contact Us
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
                Have questions about the 2025 ArcGIS StoryMaps Competition?
                We're here to help you share your Sri Lankan story.
              </p>
            </div>

            {/* Contact Form */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-black text-sm font-medium mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md bg-white border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-black text-sm font-medium mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md bg-white border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all duration-300"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-black text-sm font-medium mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md bg-white border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all duration-300"
                  placeholder="What can we help you with?"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-black text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 rounded-md bg-white border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100 resize-none transition-all duration-300"
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  Send Message
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="group">
                  <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-100 transition-colors duration-300">
                    <Mail className="w-4 h-4 text-blue-300" />
                  </div>
                  <h3 className="text-black font-medium text-sm mb-1">
                    Email Us
                  </h3>
                  <p className="text-gray-600 text-xs">info@ceylonstories.lk</p>
                </div>

                <div className="group">
                  <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-100 transition-colors duration-300">
                    <Phone className="w-4 h-4 text-blue-300" />
                  </div>
                  <h3 className="text-black font-medium text-sm mb-1">
                    Call Us
                  </h3>
                  <p className="text-gray-600 text-xs">+94 11 123 4567</p>
                </div>

                <div className="group">
                  <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-100 transition-colors duration-300">
                    <MapPin className="w-4 h-4 text-blue-300" />
                  </div>
                  <h3 className="text-black font-medium text-sm mb-1">
                    Visit Us
                  </h3>
                  <p className="text-gray-600 text-xs">Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-4 pt-3 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500 mb-1">
                Support: Monday - Friday, 9:00 AM - 6:00 PM (IST)
              </p>
              <p className="text-xs text-gray-400">Response within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
