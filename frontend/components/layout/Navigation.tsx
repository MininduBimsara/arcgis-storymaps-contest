"use client";

import {
  Search,
  User,
  Menu,
  X,
  LogOut,
  Settings,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface NavigationProps {
  isScrolled?: boolean;
}

const Navigation = ({ isScrolled: propIsScrolled }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  // Use prop if provided, otherwise detect scroll
  const scrollState =
    propIsScrolled !== undefined ? propIsScrolled : isScrolled;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/stories", label: "Stories" },
    { href: "/details", label: "Competition" },
    { href: "/contact", label: "Contact" },
  ];

  // Handle scroll detection for navbar
  useEffect(() => {
    if (propIsScrolled === undefined) {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 100);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [propIsScrolled]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-dropdown")) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserDropdown(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-50 transition-all duration-300">
        <div
          className={`glass-panel px-8 py-4 rounded-2xl backdrop-blur-lg border shadow-lg transition-all duration-300 ${
            scrollState
              ? "bg-white/95 border-gray-200/50"
              : "bg-white/10 border-white/20"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span
                className={`font-semibold text-lg transition-colors duration-300 ${
                  scrollState ? "text-gray-900" : "text-white"
                }`}
              >
                Ceylon Stories
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative font-medium transition-colors duration-300 group ${
                      isActivePage(item.href)
                        ? scrollState
                          ? "text-orange-600"
                          : "text-orange-300"
                        : scrollState
                          ? "text-gray-900 hover:text-orange-600"
                          : "text-white/90 hover:text-orange-300"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                        isActivePage(item.href)
                          ? "w-full bg-orange-500"
                          : "w-0 group-hover:w-full bg-orange-500"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <button
                className={`glass-button p-2 rounded-lg transition-all duration-300 ${
                  scrollState
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                    : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
                }`}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Authentication Section */}
              <div className="hidden md:flex items-center space-x-2">
                {isLoading ? (
                  <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                ) : isAuthenticated && user ? (
                  // Authenticated User Dropdown
                  <div className="relative user-dropdown">
                    <button
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                      className={`flex items-center space-x-2 glass-button p-2 rounded-lg transition-all duration-300 ${
                        scrollState
                          ? "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                          : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
                      }`}
                    >
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.username}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">
                            {getUserInitials(user.username)}
                          </span>
                        </div>
                      )}
                      <span className="text-sm font-medium hidden lg:block">
                        {user.username}
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    {showUserDropdown && (
                      <div
                        className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg z-50 border ${
                          scrollState
                            ? "bg-white border-gray-200"
                            : "bg-white/95 backdrop-blur-lg border-white/20"
                        }`}
                      >
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user.username}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          {user.role === "admin" && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                              Admin
                            </span>
                          )}
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <Link
                            href="/submissions/create"
                            onClick={() => setShowUserDropdown(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <PlusCircle className="w-4 h-4 mr-3" />
                            Submit Story
                          </Link>
                          <Link
                            href="/submissions"
                            onClick={() => setShowUserDropdown(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <User className="w-4 h-4 mr-3" />
                            My Submissions
                          </Link>
                          <Link
                            href="/profile"
                            onClick={() => setShowUserDropdown(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Settings className="w-4 h-4 mr-3" />
                            Profile Settings
                          </Link>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-gray-100">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Not Authenticated - Sign In Button
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-sm transition-colors duration-300 ${
                        scrollState ? "text-gray-600" : "text-white/70"
                      }`}
                    >
                      Sign in
                    </span>
                    <button
                      onClick={() => router.push("/auth")}
                      className={`glass-button p-2 rounded-lg transition-all duration-300 ${
                        scrollState
                          ? "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                          : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
                      }`}
                    >
                      <User className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`md:hidden glass-button p-2 rounded-lg transition-all duration-300 ${
                  scrollState
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                    : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
                }`}
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Mobile Menu Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Content */}
            <div
              className={`relative md:hidden mt-2 glass-panel rounded-2xl backdrop-blur-lg border shadow-lg p-6 animate-slide-down z-20 ${
                scrollState
                  ? "bg-white/95 border-gray-200/50"
                  : "bg-white/10 border-white/20"
              }`}
            >
              {/* Navigation Links */}
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`block text-lg font-medium py-3 border-b transition-colors ${
                        isActivePage(item.href)
                          ? scrollState
                            ? "text-orange-600 border-gray-200"
                            : "text-orange-300 border-white/10"
                          : scrollState
                            ? "text-gray-900 hover:text-orange-600 border-gray-200"
                            : "text-white/90 hover:text-orange-300 border-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile User Section */}
              <div className="mt-6 pt-4 border-t border-white/10">
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                ) : isAuthenticated && user ? (
                  <div className="space-y-3">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {getUserInitials(user.username)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p
                          className={`font-medium ${scrollState ? "text-gray-900" : "text-white"}`}
                        >
                          {user.username}
                        </p>
                        <p
                          className={`text-xs ${scrollState ? "text-gray-500" : "text-white/70"}`}
                        >
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Mobile Menu Actions */}
                    <div className="space-y-2">
                      <Link
                        href="/submissions/create"
                        onClick={closeMobileMenu}
                        className={`flex items-center space-x-3 glass-button px-4 py-2 rounded-lg transition-all duration-300 ${
                          scrollState
                            ? "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                            : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
                        }`}
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span className="text-sm">Submit Story</span>
                      </Link>
                      <Link
                        href="/submissions"
                        onClick={closeMobileMenu}
                        className={`flex items-center space-x-3 glass-button px-4 py-2 rounded-lg transition-all duration-300 ${
                          scrollState
                            ? "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                            : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
                        }`}
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm">My Submissions</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          closeMobileMenu();
                        }}
                        className="flex items-center space-x-3 w-full glass-button px-4 py-2 rounded-lg transition-all duration-300 text-red-600 bg-red-50 hover:bg-red-100"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // Not Authenticated Mobile
                  <button
                    onClick={() => {
                      router.push("/auth");
                      closeMobileMenu();
                    }}
                    className={`flex items-center space-x-2 glass-button px-4 py-2 rounded-lg transition-all duration-300 ${
                      scrollState
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                        : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">Sign in</span>
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navigation;
