const features = [
  {
    title: "Global CDN",
    description:
      "Your site loads in under 50ms from anywhere in the world. Fast sites rank higher on Google and convert visitors into customers.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Free SSL — Always",
    description:
      "HTTPS is non-negotiable. Every domain we host gets a free SSL certificate — issued automatically, renewed forever, no action needed on your part.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    title: "Full cPanel Access",
    description:
      "You own your environment. Log into cPanel anytime to manage files, databases, email accounts, and more — full control, no gatekeeping.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
        />
      </svg>
    ),
  },
  {
    title: "DDoS Protection",
    description:
      "Enterprise-grade security with automatic DDoS mitigation keeps your site online even under attack. Your reputation stays intact.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "99.99% Uptime",
    description:
      "Redundant infrastructure with automatic failover. If a server hiccups, your site doesn't notice. Downtime means lost customers — we make sure that never happens.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: "Client Dashboard",
    description:
      "A dedicated portal to track your site status, hosting resources, domains, and support — all in one place. You stay informed without lifting a finger.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
];

const stats = [
  { value: "99.99%", label: "Uptime" },
  { value: "50ms", label: "Avg Response" },
  { value: "Free", label: "SSL Always" },
  { value: "24/7", label: "Support" },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Guide intro */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-4 py-1.5 text-sm text-accent-purple">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-purple" />
            Your web partner
          </div>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            We&apos;ve Done This Before.{" "}
            <span className="gradient-text">We&apos;ll Do It for You.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            WebConcoction is more than a hosting company. We build your site,
            manage your infrastructure, and stay available when you need us —
            so you never have to figure any of this out alone.
          </p>
        </div>

        {/* Authority stats bar */}
        <div className="mb-16 grid grid-cols-2 gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card group rounded-2xl p-6"
            >
              <div className="mb-4 inline-flex rounded-xl bg-accent-purple/10 p-3 text-accent-purple transition-colors group-hover:bg-accent-purple/20">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
