"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    key: "starter",
    label: "STARTER",
    credits: "50",
    creditsUnit: "credits / month",
    price: "Free",
    priceNote: "forever",
    priceMonthly: null,
    noDaily: "No daily limit",
    highlighted: false,
    mostPopular: false,
    ctaLabel: "Get started free",
    ctaHref: "/signin",
    ctaVariant: "outline" as const,
    accentColor: "text-white",
    features: [
      "50 credits per month",
      "No daily limit",
      "AI-powered code generation",
      "Live preview",
      "Vercel deployment",
    ],
  },
  {
    key: "builder",
    label: "BUILDER",
    credits: "100",
    creditsUnit: "credits / month",
    price: "$9",
    priceNote: "/month",
    priceMonthly: "$9",
    noDaily: "No daily limit",
    highlighted: false,
    mostPopular: false,
    ctaLabel: "Upgrade to Builder",
    ctaHref: "/signin",
    ctaVariant: "outline" as const,
    accentColor: "text-white",
    features: [
      "100 credits per month",
      "No daily limit",
      "No watermark",
      "All Starter features",
    ],
  },
  {
    key: "pro",
    label: "PRO",
    credits: "350",
    creditsUnit: "credits / month",
    price: "$29",
    priceNote: "/month",
    priceMonthly: "$29",
    noDaily: "No daily limit",
    highlighted: true,
    mostPopular: true,
    ctaLabel: "Upgrade to Pro",
    ctaHref: "/signin",
    ctaVariant: "purple" as const,
    accentColor: "text-white",
    features: [
      "350 credits per month",
      "No daily limit",
      "Custom domain support",
      "Priority support",
      "All Builder features",
    ],
  },
  {
    key: "scale",
    label: "SCALE",
    credits: "Unlimited",
    creditsUnit: "credits",
    price: "Custom",
    priceNote: "",
    priceMonthly: null,
    noDaily: "No daily limit",
    highlighted: false,
    mostPopular: false,
    ctaLabel: "Contact us",
    ctaHref: "/contact",
    ctaVariant: "outline" as const,
    accentColor: "text-white",
    features: [
      "Custom credit volume",
      "Dedicated support",
      "SLA guarantee",
      "API access",
      "Custom integrations",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "What is a credit?",
    a: "One credit equals 10,000 tokens of AI processing. Credits are used each time you generate or regenerate a website.",
  },
  {
    q: "Do unused credits roll over?",
    a: "Yes. Any unused credits from your monthly allocation roll over to the next month and never expire.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Absolutely. You can change your plan at any time from your account settings. Changes take effect immediately.",
  },
  {
    q: "Is there a free trial?",
    a: "The Starter plan is free forever with 50 credits per month. No credit card required to get started.",
  },
];

export default function PricingPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[#f0f0f8]">
      {/* Hero */}
      <Reveal>
        <section className="pt-20 pb-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight text-balance">
            {t("pricing.hero.title")}
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto text-pretty">
            {t("pricing.hero.subtitle")}
          </p>
        </section>
      </Reveal>

      {/* Pricing Cards */}
      <Reveal delay={0.1}>
        <section className="px-4 pb-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.07 }}
                className={cn(
                  "relative rounded-2xl p-6 flex flex-col",
                  tier.highlighted
                    ? "bg-[#1a1040] border-2 border-[#7c3aed] shadow-[0_0_40px_rgba(124,58,237,0.25)]"
                    : "bg-[#1a1a2e] border border-white/10",
                )}
              >
                {tier.mostPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#7c3aed] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Tier label */}
                <p className="text-[11px] font-semibold tracking-widest text-white/50 uppercase mb-3">
                  {tier.label}
                </p>

                {/* Credits */}
                <div className="mb-1">
                  <span
                    className={cn(
                      "font-bold leading-none",
                      tier.key === "scale"
                        ? "text-3xl md:text-4xl text-white"
                        : "text-5xl md:text-6xl text-white",
                    )}
                  >
                    {tier.credits}
                  </span>
                </div>
                <p className="text-sm text-white/50 mb-4">{tier.creditsUnit}</p>

                {/* Price */}
                <div className="mb-1 flex items-baseline gap-1">
                  {tier.key === "starter" ? (
                    <>
                      <span className="text-3xl font-bold text-white">Free</span>
                      <span className="text-sm text-white/50">forever</span>
                    </>
                  ) : tier.key === "scale" ? (
                    <span className="text-3xl font-bold text-white">Custom</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-white">{tier.price}</span>
                      <span className="text-sm text-white/50">{tier.priceNote}</span>
                    </>
                  )}
                </div>

                {/* No daily limit */}
                <p className="text-xs text-white/40 mb-5">{tier.noDaily}</p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={tier.ctaHref}
                  className={cn(
                    "block w-full text-center rounded-xl py-2.5 text-sm font-semibold transition-all duration-200",
                    tier.ctaVariant === "purple"
                      ? "bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-[0_4px_20px_rgba(124,58,237,0.4)]"
                      : "bg-white text-gray-900 hover:bg-gray-100 border border-white/10",
                  )}
                >
                  {tier.ctaLabel}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footnote */}
          <Reveal delay={0.2}>
            <p className="text-center text-sm text-gray-400 mt-6">
              {t("pricing.footnote")}
            </p>
          </Reveal>
        </section>
      </Reveal>

      {/* FAQ teaser */}
      <Reveal delay={0.05}>
        <section className="px-4 py-12 max-w-6xl mx-auto">
          <div className="rounded-2xl bg-white border border-gray-200 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1 mb-3">
                <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                {t("pricing.faq.badge")}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t("pricing.faq.title")}</h2>
              <p className="text-gray-500 mt-1 text-sm">{t("pricing.faq.subtitle")}</p>
            </div>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 whitespace-nowrap"
            >
              {t("pricing.faq.cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* FAQ accordion preview */}
          <div className="mt-6 space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <details className="group rounded-xl bg-white border border-gray-200 px-5 py-4 cursor-pointer">
                  <summary className="flex items-center justify-between font-semibold text-gray-800 text-sm list-none">
                    {item.q}
                    <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform duration-200">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* CTA Banner */}
      <Reveal delay={0.05}>
        <section className="px-4 pb-20 max-w-6xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden px-8 py-16 text-center"
            style={{
              background: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #6d28d9 100%)",
            }}
          >
            {/* Subtle star dots overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 text-xs text-white/80 border border-white/20 rounded-full px-3 py-1 mb-5">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {t("pricing.cta.badge")}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-balance">
                {t("pricing.cta.title")}
              </h2>
              <p className="text-white/70 text-base mb-8 max-w-md mx-auto text-pretty">
                {t("pricing.cta.subtitle")}
              </p>
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 bg-white text-[#7c3aed] font-semibold text-sm px-7 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                {t("pricing.cta.button")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}