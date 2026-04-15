import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import ProcessSection from "./components/ProcessSection";
import PricingSection from "./components/PricingSection";
import FeaturesSection from "./components/FeaturesSection";
import SuccessSection from "./components/SuccessSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero + Domain Search */}
      <HeroSection />

      {/* The Problem */}
      <div className="h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      <ProblemSection />

      {/* The Plan — 3 Steps */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />
      <ProcessSection />

      {/* Pricing */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
      <PricingSection />

      {/* The Guide — Why WebConcoction */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
      <FeaturesSection />

      {/* Success Vision + Final CTA */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
      <SuccessSection />

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <Footer />
    </main>
  );
}
