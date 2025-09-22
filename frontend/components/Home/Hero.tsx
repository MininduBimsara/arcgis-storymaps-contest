import { Button } from "@/components/ui/Button";

const beachImage = "/beach.png";
const festivalImage = "/destination.jpg";
const palaceImage = "/place.png";
const heroImage = "/hero.jpg";

const DestinationCard = ({
  image,
  title,
  className,
  style,
}: {
  image: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer group ${className}`}
    style={style}
  >
    <div className="relative">
      <img
        src={image}
        alt={title}
        className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <h3 className="text-white font-semibold text-base sm:text-lg">
          {title}
        </h3>
      </div>
    </div>
  </div>
);

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side - Main content */}
            <div className="text-white space-y-6 pt-16">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Ceylon Stories
                  <br />
                  <span className="text-primary-glow">
                    2025 ArcGIS StoryMaps
                  </span>
                  <br />
                  <span className="text-primary-glow">Competition</span>
                </h1>
                <h2 className="text-white/90 text-base md:text-lg max-w-lg">
                  Showcasing the beauty of <strong>Tourism in Sri Lanka</strong>{" "}
                  through interactive StoryMaps.
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="glass-button px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                  Explore Stories
                </button>
                <button className="glass-button px-8 py-3 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-lg border border-white/15 text-white/90 hover:text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg">
                  View Competition Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
