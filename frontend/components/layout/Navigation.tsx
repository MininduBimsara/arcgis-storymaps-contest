"use client";

import { Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { usePathname , useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface NavigationProps {
  isScrolled?: boolean;
}

const Navigation = ({ isScrolled: propIsScrolled }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Use prop if provided, otherwise detect scroll
  const scrollState =
    propIsScrolled !== undefined ? propIsScrolled : isScrolled;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/stories", label: "Stories" },
    
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
              <div className="hidden md:flex items-center space-x-2">
                <span
                  className={`text-sm transition-colors duration-300 ${
                    scrollState ? "text-gray-600" : "text-white/70"
                  }`}
                >
                  Sign in
                </span>
                <button
                  onClick={() => router.push("/Auth")}
                  className={`glass-button p-2 rounded-lg transition-all duration-300 ${
                    scrollState
                      ? "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                      : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
                  }`}
                >
                  <User className="w-5 h-5" />
                </button>
              </div>
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

              {/* Mobile Sign In */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-3">
                  <button
                    className={`flex items-center space-x-2 glass-button px-4 py-2 rounded-lg transition-all duration-300 ${
                      scrollState
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                        : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">Sign in</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navigation;
