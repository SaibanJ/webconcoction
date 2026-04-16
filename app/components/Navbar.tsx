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
            <svg fill="white" className="h-5 w-5" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M26,19.72a10,10,0,0,0-6-8.88V8h1a1,1,0,0,0,0-2H11a1,1,0,0,0,0,2h1v2.84a10,10,0,0,0-5.84,7.44A9,9,0,0,0,6,20a2.62,2.62,0,0,0,0,.28,10,10,0,0,0,19.84,1.44A9.74,9.74,0,0,0,26,20,2.62,2.62,0,0,0,26,19.72Zm-2.16,1.93A8,8,0,0,1,8,20.36c0-.12,0-.24,0-.36a7.43,7.43,0,0,1,.18-1.64,8,8,0,0,1,5.15-5.89,1,1,0,0,0,.67-1V8h4v3.52a1,1,0,0,0,.67,1A8,8,0,0,1,24,19.64,2.17,2.17,0,0,1,24,20,8.17,8.17,0,0,1,23.83,21.65Z"/>
              <path d="M22,20a6,6,0,0,1-12,0,5.29,5.29,0,0,1,.1-1.06l.33.16a5.12,5.12,0,0,0,2.57.62,5.12,5.12,0,0,0,2.57-.62A6.84,6.84,0,0,1,19,18.28a6.75,6.75,0,0,1,2.89.57A6.23,6.23,0,0,1,22,20Z"/>
              <path d="M8,8a.76.76,0,0,1-.75.75,1.51,1.51,0,0,0-1.5,1.5.75.75,0,0,1-1.5,0,1.5,1.5,0,0,0-1.5-1.5.75.75,0,0,1,0-1.5,1.5,1.5,0,0,0,1.5-1.5.75.75,0,0,1,1.5,0,1.51,1.51,0,0,0,1.5,1.5A.76.76,0,0,1,8,8Z"/>
              <path d="M30,5a.76.76,0,0,1-.75.75,1.51,1.51,0,0,0-1.5,1.5.75.75,0,0,1-1.5,0,1.5,1.5,0,0,0-1.5-1.5.75.75,0,0,1,0-1.5,1.5,1.5,0,0,0,1.5-1.5.75.75,0,0,1,1.5,0,1.51,1.51,0,0,0,1.5,1.5A.76.76,0,0,1,30,5Z"/>
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
        <div className="border-t border-white/10 bg-background px-6 py-5 shadow-2xl md:hidden">
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
