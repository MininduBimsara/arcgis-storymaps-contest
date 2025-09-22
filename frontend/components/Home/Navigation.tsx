"use client";

import { Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/stories", label: "Stories" },
    { href: "/competitions", label: "Competition" },
    { href: "/contact", label: "Contact" },
  ];

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
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
        <div className="glass-panel px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-sm">
                  DT
                </span>
              </div>
              <span className="text-foreground font-semibold text-lg">
                Desert Tourist
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
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                        isActivePage(item.href)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <button className="glass-button p-2 rounded-lg bg-white/10 hover:bg-white/20 text-foreground/80 hover:text-foreground transition-all duration-300">
                <Search className="w-5 h-5" />
              </button>
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-foreground/70 text-sm">Sign in</span>
                <button className="glass-button p-2 rounded-lg bg-white/10 hover:bg-white/20 text-foreground/80 hover:text-foreground transition-all duration-300">
                  <User className="w-5 h-5" />
                </button>
              </div>
              <button
                className="md:hidden glass-button p-2 rounded-lg bg-white/10 hover:bg-white/20 text-foreground/80 hover:text-foreground transition-all duration-300"
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
            <div className="relative md:hidden mt-2 glass-panel rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-6 animate-slide-down z-20">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`block text-lg font-medium py-3 border-b border-white/10 transition-colors ${
                        isActivePage(item.href)
                          ? "text-primary"
                          : "text-foreground/80 hover:text-primary"
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
                  <button className="flex items-center space-x-2 glass-button px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-foreground/80 hover:text-foreground transition-all duration-300">
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
