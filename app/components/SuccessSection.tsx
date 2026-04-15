const outcomes = [
  "Customers find you when they search for what you offer",
  "Your website reflects the quality and professionalism of your business",
  "Hosting, SSL, and updates are fully handled — you never think about it",
  "A client dashboard puts everything you need in one place",
  "You focus on growing your business, not managing your tech stack",
];

export default function SuccessSection() {
  return (
    <section className="relative overflow-hidden py-28 px-4">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple/8 blur-[150px]" />
        <div className="absolute left-1/4 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Eyebrow */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-4 py-1.5 text-sm text-accent-purple">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-purple" />
            The outcome
          </div>
        </div>

        <h2 className="mb-5 text-center text-4xl font-bold leading-tight md:text-5xl">
          Imagine Running Your Business While Your{" "}
          <span className="gradient-text">Website Works for You</span>
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-400">
          That&apos;s what WebConcoction clients experience every day. A
          professional web presence, taken care of — so you never have to think
          about it.
        </p>

        {/* Outcome list */}
        <ul className="mx-auto mb-12 max-w-xl space-y-4">
          {outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-purple/20">
                <svg
                  className="h-3 w-3 text-accent-purple"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-300">{outcome}</span>
            </li>
          ))}
        </ul>

        {/* Final CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#pricing"
            className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-8 py-4 font-semibold text-white transition-all hover:opacity-90"
          >
            Build My Website
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
            Register a Domain
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          No commitment until checkout. Your website build starts after payment.
        </p>
      </div>
    </section>
  );
}
