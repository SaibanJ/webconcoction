"use client";

import { useState } from "react";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    description: "Perfect for personal sites and small projects",
    features: [
      "1 Website",
      "10 GB SSD Storage",
      "100 GB Bandwidth",
      "Free SSL Certificate",
      "1 Email Account",
      "24/7 Support",
    ],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    description: "Ideal for growing businesses and agencies",
    features: [
      "10 Websites",
      "50 GB NVMe Storage",
      "Unlimited Bandwidth",
      "Free SSL Certificates",
      "25 Email Accounts",
      "Priority Support",
      "Daily Backups",
      "Staging Environment",
    ],
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    price: 99,
    description: "Enterprise-grade for high-traffic applications",
    features: [
      "Unlimited Websites",
      "200 GB NVMe Storage",
      "Unlimited Bandwidth",
      "Free SSL + Wildcard",
      "Unlimited Email",
      "Dedicated Support",
      "Hourly Backups",
      "Staging + Dev Environments",
      "CDN Included",
      "DDoS Protection",
    ],
    highlighted: false,
  },
];

interface SignupForm {
  email: string;
  whmDomain: string;
  whmUsername: string;
}

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<SignupForm>({
    email: "",
    whmDomain: "",
    whmUsername: "",
  });

  function deriveUsername(domain: string): string {
    return domain
      .split(".")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 8);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPlan) return;
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "hosting",
          plan: selectedPlan,
          email: form.email,
          whmDomain: form.whmDomain,
          whmUsername: form.whmUsername || deriveUsername(form.whmDomain),
        }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  }

  const plan = plans.find((p) => p.id === selectedPlan);

  return (
    <section id="pricing" className="relative py-28 px-4">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Hosting <span className="gradient-text">Plans</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Lightning-fast hosting with a global CDN. Choose the plan that fits
            your needs and scale seamlessly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`glass-card relative flex flex-col rounded-2xl p-8 ${
                p.highlighted
                  ? "border-accent-purple/40 shadow-[0_0_40px_rgba(139,92,246,0.15)]"
                  : ""
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-1 text-xl font-semibold text-white">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-400">{p.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-bold text-white">${p.price}</span>
                <span className="text-gray-400">/mo</span>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {p.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-accent-purple"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(p.id)}
                className={`btn-glow w-full rounded-xl py-3 font-semibold text-white transition-all ${
                  p.highlighted
                    ? "bg-gradient-to-r from-accent-purple to-accent-blue hover:opacity-90"
                    : "border border-white/10 bg-white/5 hover:border-accent-purple hover:bg-white/10"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Signup modal */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPlan(null);
          }}
        >
          <div className="glass-card w-full max-w-md rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white">
                Set up your{" "}
                <span className="gradient-text">{plan?.name}</span> account
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                ${plan?.price}/mo — fill in your account details to continue to
                payment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-gray-300">
                  Primary domain
                </label>
                <input
                  type="text"
                  required
                  value={form.whmDomain}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, whmDomain: e.target.value }))
                  }
                  placeholder="yourdomain.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-gray-300">
                  cPanel username{" "}
                  <span className="text-gray-500">(optional — max 8 chars)</span>
                </label>
                <input
                  type="text"
                  maxLength={8}
                  value={form.whmUsername}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      whmUsername: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, ""),
                    }))
                  }
                  placeholder={
                    form.whmDomain
                      ? deriveUsername(form.whmDomain)
                      : "auto-generated"
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-glow flex-1 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue py-3 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Redirecting..." : "Continue to payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
