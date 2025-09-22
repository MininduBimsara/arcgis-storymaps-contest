import HeroSection from "@/components/Home/Hero";
import OverviewSection from "@/components/Home/Overview";
import ResourcesSection from "@/components/Home/ResourcesSection";

export default function Competitions() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <OverviewSection />
      <ResourcesSection />
    </div>
  );
}
