import Navbar from "./components/Navbar";
import HeroSceneLoader from "./components/HeroSceneLoader";
import DomainSearch from "./components/DomainSearch";
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

      {/* Hero — The Character and Their Desire */}
      <section className="relative flex min-h-screen items-center justify-center px-4 pt-20 md:pt-0">
        <HeroSceneLoader />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-4 py-1.5 text-sm text-accent-purple">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-purple" />
            Now featuring client dashboards
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Your Business Deserves a
            <br />
            <span className="gradient-text">Website That Works</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 md:text-xl">
            We build custom websites and host them on enterprise-grade
            infrastructure — so your business looks professional, loads fast,
            and stays online.{" "}
            <span className="font-semibold text-white">Always.</span>
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-8 py-4 font-semibold text-white transition-all hover:opacity-90"
            >
              Get Your Website Built
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

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-white">Custom</div>
              <div className="text-sm text-gray-500">No Templates Ever</div>
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

      {/* The Problem */}
      <div className="h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      <ProblemSection />

      {/* Domain Search */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
      <DomainSearch />

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
