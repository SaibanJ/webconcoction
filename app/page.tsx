import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import ProcessSection from "./components/ProcessSection";
import PricingSection from "./components/PricingSection";
import FeaturesSection from "./components/FeaturesSection";
import SuccessSection from "./components/SuccessSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://webconcoction.com/#organization",
      name: "WebConcoction LLC",
      url: "https://webconcoction.com",
      logo: {
        "@type": "ImageObject",
        url: "https://webconcoction.com/icon",
      },
      founder: {
        "@type": "Person",
        name: "James Saiban",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@webconcoction.com",
        contactType: "customer support",
        availableLanguage: "English",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://webconcoction.com/#website",
      url: "https://webconcoction.com",
      name: "WebConcoction",
      publisher: { "@id": "https://webconcoction.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://webconcoction.com/?domain={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://webconcoction.com/#service",
      name: "WebConcoction",
      url: "https://webconcoction.com",
      description:
        "WebConcoction builds and hosts custom websites for businesses. We offer managed cPanel hosting, domain registration, and professional website design and development.",
      email: "support@webconcoction.com",
      priceRange: "$$",
      currenciesAccepted: "USD",
      paymentAccepted: "Credit Card",
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "WebConcoction Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Basic Hosting Plan",
              description: "Managed cPanel hosting with 10GB storage, 5 email accounts, free SSL, and standard support.",
            },
            price: "19.99",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "19.99",
              priceCurrency: "USD",
              unitText: "month",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pro Hosting Plan",
              description: "Managed cPanel hosting with 25GB storage, unlimited email accounts, free SSL, and priority support.",
            },
            price: "39.99",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "39.99",
              priceCurrency: "USD",
              unitText: "month",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Business Hosting Plan",
              description: "Managed cPanel hosting with 100GB storage, unlimited everything, free SSL, and dedicated support.",
            },
            price: "79.99",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "79.99",
              priceCurrency: "USD",
              unitText: "month",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Website Design & Development",
              description: "Professional custom-built websites for businesses. One-time setup fee includes full design and development.",
            },
            price: "699.99",
            priceCurrency: "USD",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does web hosting cost at WebConcoction?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WebConcoction hosting plans start at $19.99/month for the Basic plan, $39.99/month for Pro, and $79.99/month for Business. All plans include a one-time setup fee that covers custom website design and development.",
          },
        },
        {
          "@type": "Question",
          name: "Does WebConcoction include a custom website with hosting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Every hosting plan includes a custom-built website as part of the one-time setup fee. We design and develop your site from scratch — no templates.",
          },
        },
        {
          "@type": "Question",
          name: "Can I register a domain through WebConcoction?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. WebConcoction offers domain registration for .com, .net, .org, .io, .dev, and many other extensions. You can search for and register domains directly on our website.",
          },
        },
        {
          "@type": "Question",
          name: "What is the uptime guarantee?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WebConcoction guarantees 99.9% monthly uptime for all hosted websites. If we fall short, service credits are applied to your account.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        <ScrollToTop />
      </main>
    </>
  );
}
