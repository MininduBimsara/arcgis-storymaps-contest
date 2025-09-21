import { Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                DT
              </span>
            </div>
            <span className="text-foreground font-semibold text-lg">
              Desert Tourist
            </span>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#explore"
              className="text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              Explore
            </a>
            <a
              href="#destinations"
              className="text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              Destinations
            </a>
            <a
              href="#contact"
              className="text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/80 hover:text-foreground"
            >
              <Search className="w-5 h-5" />
            </Button>
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-foreground/70 text-sm">Sign in</span>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/80 hover:text-foreground"
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
