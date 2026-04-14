import Navbar from "./components/Navbar";
import HeroSceneLoader from "./components/HeroSceneLoader";
import DomainSearch from "./components/DomainSearch";
import PricingSection from "./components/PricingSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-4">
        <HeroSceneLoader />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-4 py-1.5 text-sm text-accent-purple">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-purple" />
            Now with AI-powered site builder
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Craft Your Digital
            <br />
            <span className="gradient-text">Masterpiece</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 md:text-xl">
            Stunning websites, premium domains, and lightning-fast hosting --
            all from one platform. Build, launch, and scale with{" "}
            <span className="text-white font-semibold">WebConcoction</span>.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#domains"
              className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-8 py-4 font-semibold text-white transition-all hover:opacity-90"
            >
              Get Started
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <a
              href="#domains"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition-all hover:border-accent-purple hover:bg-white/10"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search Domains
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-white">500K+</div>
              <div className="text-sm text-gray-500">Domains Registered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">99.99%</div>
              <div className="text-sm text-gray-500">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50ms</div>
              <div className="text-sm text-gray-500">Avg Response Time</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="h-6 w-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Divider gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />

      <DomainSearch />

      <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />

      <PricingSection />

      <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />

      <FeaturesSection />

      <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />

      <Footer />
    </main>
  );
}
