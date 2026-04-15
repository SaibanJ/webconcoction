const steps = [
  {
    num: "01",
    title: "Pick Your Plan",
    description:
      "Choose from Basic, Pro, or Business hosting. Every plan includes a professionally built website as part of the one-time setup — no hidden fees, no surprises.",
  },
  {
    num: "02",
    title: "We Build Your Site",
    description:
      "Tell us about your business and your vision. We design and build your site from scratch — custom coded, zero templates, built to represent you.",
  },
  {
    num: "03",
    title: "Go Live & Grow",
    description:
      "Your site launches on enterprise hosting with free SSL, cPanel access, and a client dashboard to monitor everything from one place.",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative py-24 px-4">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent-cyan/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-blue/30 bg-accent-blue/10 px-4 py-1.5 text-sm text-accent-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
            Simple process
          </div>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Getting Online Is{" "}
            <span className="gradient-text">Simpler Than You Think</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Three steps. We handle the hard parts. You focus on running your
            business.
          </p>
        </div>

        <div className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Connecting line between steps */}
          <div className="absolute left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] top-8 hidden h-px bg-gradient-to-r from-accent-purple/40 via-accent-blue/60 to-accent-cyan/40 md:block" />

          {steps.map((step) => (
            <div
              key={step.num}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number bubble */}
              <div className="relative z-10 mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-accent-purple/30 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 backdrop-blur-sm">
                <span className="gradient-text text-xl font-bold">
                  {step.num}
                </span>
              </div>

              <h3 className="mb-3 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA under steps */}
        <div className="mt-14 text-center">
          <a
            href="#pricing"
            className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-8 py-4 font-semibold text-white transition-all hover:opacity-90"
          >
            Start With Step One
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
        </div>
      </div>
    </section>
  );
}
