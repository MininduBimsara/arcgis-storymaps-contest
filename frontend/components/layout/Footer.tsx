import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="font-medium text-black mb-3 sm:mb-4 text-sm sm:text-base">
              About
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-black mb-3 sm:mb-4 text-sm sm:text-base">
              Stories
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Featured
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Popular
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-black mb-3 sm:mb-4 text-sm sm:text-base">
              Contest
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Rules
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Prizes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Winners
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-black mb-3 sm:mb-4 text-sm sm:text-base">
              Connect
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Social Media
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2025 Ceylon Stories. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
