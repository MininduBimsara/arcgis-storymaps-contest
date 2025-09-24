"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, MapPin, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Stories", href: "/stories" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <MapPin className="h-5 w-5 text-black" />
              </div>
              <span className="text-xl font-medium text-black">
                Ceylon Stories
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-normal transition-colors ${
                  pathname === item.href
                    ? "text-black border-b-2 border-blue-100 pb-1"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-10 w-20 bg-gray-100 rounded-md"></div>
              </div>
            ) : isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 text-black hover:text-gray-600 transition-colors p-2 rounded-md hover:bg-gray-50"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                    <User className="w-4 h-4 text-black" />
                  </div>
                  <span className="font-normal">{user.username}</span>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-sm border border-gray-100 py-1 z-50">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-base text-black hover:bg-gray-50"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Profile Settings
                    </Link>
                    <Link
                      href="/submissions"
                      className="flex items-center px-4 py-2 text-base text-black hover:bg-gray-50"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      My Submissions
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-base text-red-600 hover:bg-gray-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth"
                  className="text-black hover:text-gray-600 font-normal transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth"
                  className="bg-white text-black px-4 py-2 rounded-md border border-blue-100 hover:bg-blue-50 transition-all duration-200 font-normal"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black hover:text-gray-600 transition-colors p-2"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-100">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-normal transition-colors ${
                    pathname === item.href
                      ? "text-black bg-blue-50"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <hr className="my-3 border-gray-100" />

              {isLoading ? (
                <div className="px-3 py-2">
                  <div className="animate-pulse h-6 w-24 bg-gray-100 rounded-md"></div>
                </div>
              ) : isAuthenticated && user ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Signed in as {user.username}
                  </div>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-normal text-black hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <Link
                    href="/submissions"
                    className="block px-3 py-2 rounded-md text-base font-normal text-black hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Submissions
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-normal text-red-600 hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    href="/auth"
                    className="block px-3 py-2 rounded-md text-base font-normal text-black hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth"
                    className="block px-3 py-2 rounded-md text-base font-normal bg-white text-black border border-blue-100 hover:bg-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(isProfileDropdownOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileDropdownOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navigation;
