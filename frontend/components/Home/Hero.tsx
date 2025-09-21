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
        className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-3 left-3">
        <h3 className="text-white font-semibold text-sm sm:text-base">
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Main content */}
            <div className="text-white space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Tourism
                  <br />
                  <span className="text-primary-glow">Of The Kutch</span>
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-md">
                  If Kutch is not seen, nothing is seen.
                </p>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="bg-primary hover:bg-primary-glow text-primary-foreground font-semibold px-8 py-3 rounded-full animate-glow"
              >
                Explore
              </Button>
            </div>

            {/* Right side - Destination cards */}
            <div className="hidden lg:grid grid-cols-2 gap-6 relative">
              {/* Beach card - top right */}
              <DestinationCard
                image={beachImage}
                title="Mandvi Beach"
                className="animate-float"
                style={{ animationDelay: "0s" }}
              />

              {/* Palace card - top right, smaller */}
              <DestinationCard
                image={palaceImage}
                title="Palace"
                className="w-32 h-32 ml-auto animate-float"
                style={{ animationDelay: "2s" }}
              />

              {/* Festival card - bottom spanning both columns */}
              <DestinationCard
                image={festivalImage}
                title="White desert festival"
                className="col-span-2 animate-float"
                style={{ animationDelay: "4s" }}
              />
            </div>
          </div>

          {/* Mobile destination cards */}
          <div className="lg:hidden mt-12 grid grid-cols-2 gap-4">
            <DestinationCard image={beachImage} title="Mandvi Beach" />
            <DestinationCard image={palaceImage} title="Palace" />
            <DestinationCard
              image={festivalImage}
              title="White desert festival"
              className="col-span-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
