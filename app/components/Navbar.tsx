"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">WebConcoction</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#domains"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Domains
          </a>
          <a
            href="#pricing"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Pricing
          </a>
          <a
            href="#features"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Features
          </a>
          <a
            href="/login"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Login
          </a>
          <a
            href="#domains"
            className="btn-glow rounded-lg bg-accent-purple px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-500"
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/5 bg-background/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            <a
              href="#domains"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Domains
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Pricing
            </a>
            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Features
            </a>
            <a
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Login
            </a>
            <a
              href="#domains"
              onClick={() => setMobileOpen(false)}
              className="btn-glow inline-block rounded-lg bg-accent-purple px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
