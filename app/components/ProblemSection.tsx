const problems = [
  {
    title: "You're Invisible Online",
    description:
      "Without a professional website, potential clients can't find you — and when they do, a bad first impression sends them straight to a competitor who looks more credible.",
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
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        />
      </svg>
    ),
  },
  {
    title: "Templates Make You Look Generic",
    description:
      "Drag-and-drop builders make every small business site look identical. A cookie-cutter design silently tells customers you don't take your brand seriously.",
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
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
  },
  {
    title: "Hosting Is a Full-Time Job",
    description:
      "Security patches, SSL renewals, uptime monitoring, backups — running a site is exhausting. That's not your job. You should be running your business, not fighting a control panel.",
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
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-24 px-4">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-red-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm text-red-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
            Sound familiar?
          </div>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Your Website Might Be{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ef4444, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Costing You Customers
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            A slow, outdated, or non-existent web presence isn&apos;t just
            embarrassing — it&apos;s real revenue walking out the door every
            day.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group rounded-2xl border border-red-500/10 bg-red-500/5 p-8 transition-all duration-300 hover:border-red-500/25 hover:bg-red-500/10"
            >
              <div className="mb-5 inline-flex rounded-xl bg-red-500/10 p-3 text-red-400 transition-colors group-hover:bg-red-500/20">
                {problem.icon}
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">
                {problem.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
