"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const TIERS = [
  {
    key: "starter",
    label: "STARTER",
    credits: "50",
    unit: "credits / month",
    price: "Free",
    priceLabel: "forever",
    monthly: null,
    noDaily: "No daily limit",
    highlighted: false,
    mostPopular: false,
    ctaLabel: "Get started free",
    ctaHref: "/signin",
    accentColor: "text-emerald-400",
    iconBg: "bg-emerald-500/20",
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
    unit: "credits / month",
    price: "$9",
    priceLabel: "/month",
    monthly: "$9",
    noDaily: "No daily limit",
    highlighted: false,
    mostPopular: false,
    ctaLabel: "Upgrade to Builder",
    ctaHref: "/signin",
    accentColor: "text-blue-400",
    iconBg: "bg-blue-500/20",
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
    unit: "credits / month",
    price: "$29",
    priceLabel: "/month",
    monthly: "$29",
    noDaily: "No daily limit",
    highlighted: true,
    mostPopular: true,
    ctaLabel: "Upgrade to Pro",
    ctaHref: "/signin",
    accentColor: "text-violet-400",
    iconBg: "bg-violet-500/20",
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
    unit: "credits",
    price: "Custom",
    priceLabel: "",
    monthly: null,
    noDaily: "No daily limit",
    highlighted: false,
    mostPopular: false,
    ctaLabel: "Contact us",
    ctaHref: "/contact",
    accentColor: "text-orange-400",
    iconBg: "bg-orange-500/20",
    features: [
      "Custom credit volume",
      "Dedicated support",
      "SLA guarantee",
      "API access",
      "Custom integrations",
    ],
  },
];

const FAQS = [
  {
    q: "What is a credit?",
    a: "One credit equals 10,000 tokens of AI processing. A typical website generation uses 1 to 3 credits depending on complexity.",
  },
  {
    q: "Do credits expire?",
    a: "Credits renew monthly on paid plans. Unused credits roll over to the next month so you never lose what you paid for.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes. You can switch plans at any time. Changes take effect immediately and are prorated for the current billing period.",
  },
  {
    q: "Is there a free trial?",
    a: "The Starter plan is free forever with 50 credits per month. No credit card required to get started.",
  },
];

export default function PricingPage() {
  const t = useTranslations();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#f0f0f8]">
      {/* Hero */}
      <Reveal>
        <section className="pt-20 pb-12 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-balance">
            {t("pricingPage.hero.title")}
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-md mx-auto text-pretty">
            {t("pricingPage.hero.subtitle")}
          </p>
        </section>
      </Reveal>

      {/* Pricing Cards */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {TIERS.map((tier) => (
              <motion.div
                key={tier.key}
                variants={fadeInUp}
                className={cn(
                  "relative rounded-2xl p-6 flex flex-col",
                  "bg-[#1a1a2e] text-white",
                  tier.highlighted
                    ? "ring-2 ring-violet-500 shadow-[0_0_40px_rgba(139,92,246,0.25)]"
                    : "ring-1 ring-white/10"
                )}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {tier.mostPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {t("pricingPage.badge.mostPopular")}
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">
                    {tier.label}
                  </span>
                </div>

                <div className="mb-1">
                  <span className="text-5xl font-extrabold tracking-tight leading-none">
                    {tier.credits}
                  </span>
                </div>
                <div className="text-sm text-white/50 mb-4">{tier.unit}</div>

                <div className="mb-1 flex items-baseline gap-1">
                  <span
                    className={cn(
                      "text-3xl font-extrabold",
                      tier.key === "starter" ? "text-white" : "text-white"
                    )}
                  >
                    {tier.price}
                  </span>
                  {tier.priceLabel && (
                    <span className="text-sm text-white/50">
                      {tier.priceLabel}
                    </span>
                  )}
                </div>
                <div className="text-xs text-white/40 mb-6">{tier.noDaily}</div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.ctaHref}
                  className={cn(
                    "block text-center rounded-xl py-3 text-sm font-semibold transition-all duration-200",
                    tier.highlighted
                      ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                      : "bg-white text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {tier.ctaLabel}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <p className="text-center text-sm text-gray-400 mt-6">
            {t("pricingPage.footnote")}
          </p>
        </section>
      </Reveal>

      {/* FAQ teaser */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-4 pb-20">
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_32px_-8px_rgba(0,0,0,0.1)] p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-full px-3 py-1 mb-4">
                  <HelpCircle className="h-3.5 w-3.5" />
                  {t("pricingPage.faqTeaser.badge")}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("pricingPage.faqTeaser.title")}
                </h2>
                <p className="text-gray-500 text-sm">
                  {t("pricingPage.faqTeaser.subtitle")}
                </p>

                <div className="mt-6 space-y-3">
                  {FAQS.map((faq, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                      <button
                        className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                      >
                        {faq.q}
                        <span
                          className={cn(
                            "ml-2 text-gray-400 transition-transform duration-200",
                            openFaq === i ? "rotate-180" : ""
                          )}
                        >
                          ▾
                        </span>
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-4 text-sm text-gray-500 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:shrink-0">
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-md shadow-violet-500/20 whitespace-nowrap"
                >
                  {t("pricingPage.faqTeaser.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA Banner */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-4 pb-24">
          <div
            className="relative rounded-3xl overflow-hidden px-8 py-16 text-center"
            style={{
              background:
                "linear-gradient(135deg, #6d28d9 0%, #7c3aed 40%, #8b5cf6 100%)",
            }}
          >
            {/* Starfield dots */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    width: i % 3 === 0 ? 3 : 2,
                    height: i % 3 === 0 ? 3 : 2,
                    top: `${(i * 37 + 11) % 100}%`,
                    left: `${(i * 53 + 7) % 100}%`,
                    opacity: 0.4 + (i % 4) * 0.1,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 border border-white/20 rounded-full px-3 py-1 mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                {t("pricingPage.cta.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                {t("pricingPage.cta.title")}
              </h2>
              <p className="text-white/70 text-base mb-8 max-w-sm mx-auto">
                {t("pricingPage.cta.subtitle")}
              </p>
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-violet-50 transition-all duration-200 shadow-lg"
              >
                {t("pricingPage.cta.button")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}