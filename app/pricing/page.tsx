"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, HelpCircle, ChevronDown } from 'lucide-react';
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

// ─── Sparkle dots for hero background ────────────────────────────────────────
const SPARKLE_DOTS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  y: (i * 97.3) % 100,
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
  opacity: 0.12 + (i % 5) * 0.06,
}));

// ─── Plan tiers ───────────────────────────────────────────────────────────────
const TIERS = [
  {
    key: "starter",
    label: "STARTER",
    credits: "50",
    creditsUnit: "credits / month",
    price: "Free",
    priceNote: "forever",
    highlighted: false,
    mostPopular: false,
    ctaLabel: "Get started free",
    ctaHref: "/signin",
    ctaVariant: "outline" as const,
    features: [
      "50 credits/month",
      "No daily limit",
      "AI-powered generation",
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
    highlighted: false,
    mostPopular: false,
    ctaLabel: "Upgrade to Builder",
    ctaHref: "/signin",
    ctaVariant: "outline" as const,
    features: [
      "100 credits/month",
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
    highlighted: true,
    mostPopular: true,
    ctaLabel: "Upgrade to Pro",
    ctaHref: "/signin",
    ctaVariant: "purple" as const,
    features: [
      "350 credits/month",
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
    highlighted: false,
    mostPopular: false,
    ctaLabel: "Contact us",
    ctaHref: "/contact",
    ctaVariant: "outline" as const,
    features: [
      "Custom credit volume",
      "Dedicated support",
      "SLA guarantee",
      "API access",
      "Custom integrations",
    ],
  },
];

// ─── Credit packs ─────────────────────────────────────────────────────────────
const CREDIT_PACKS = [
  {
    key: "free-pack",
    label: "Free",
    credits: "50",
    price: "$0",
    priceNote: "forever",
    mostPopular: false,
    ctaLabel: "Get started",
    ctaHref: "/signin",
  },
  {
    key: "starter-pack",
    label: "Starter",
    credits: "100",
    price: "$10",
    priceNote: "one-time",
    mostPopular: true,
    ctaLabel: "Buy Now",
    ctaHref: "/signin",
  },
  {
    key: "pro-pack",
    label: "Pro",
    credits: "250",
    price: "$23",
    priceNote: "one-time",
    mostPopular: false,
    ctaLabel: "Buy Now",
    ctaHref: "/signin",
  },
  {
    key: "scale-pack",
    label: "Scale",
    credits: "500",
    price: "$42",
    priceNote: "one-time",
    mostPopular: false,
    ctaLabel: "Buy Now",
    ctaHref: "/signin",
  },
];

// ─── FAQ items ────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What is a credit?",
    a: "One credit equals one website generation. Credits are consumed each time you generate or regenerate a website.",
  },
  {
    q: "Do unused credits roll over?",
    a: "Yes. Purchased credit packs never expire. Monthly plan credits reset each billing cycle.",
  },
  {
    q: "Can I upgrade or downgrade?",
    a: "Yes, change your plan anytime from account settings. Changes take effect immediately.",
  },
  {
    q: "Is there a free trial?",
    a: "The Starter plan is free forever with 50 credits/month. No credit card required.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfers for Scale plans.",
  },
  {
    q: "Can I get a refund?",
    a: "We offer a 7-day money-back guarantee on all paid plans. Contact support for assistance.",
  },
];

export default function PricingPage() {
  const t = useTranslations();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen">
      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#1E1B4B] overflow-hidden pt-32 pb-20 px-4">
        {/* Sparkle dots */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {SPARKLE_DOTS.map((dot) => (
            <div
              key={dot.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: dot.size,
                height: dot.size,
                opacity: dot.opacity,
              }}
            />
          ))}
        </div>

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.35) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/80 text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Pricing</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight text-balance leading-tight mb-5">
              Simple, transparent pricing
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-10">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </Reveal>

          {/* Billing toggle */}
          <Reveal delay={0.2}>
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                  billing === "monthly"
                    ? "bg-white text-[#1E1B4B] shadow-sm"
                    : "text-white/70 hover:text-white"
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling("annual")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                  billing === "annual"
                    ? "bg-white text-[#1E1B4B] shadow-sm"
                    : "text-white/70 hover:text-white"
                )}
              >
                Annual
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#7C3AED] text-white">
                  20% off
                </span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. PLAN CARDS ───────────────────────────────────────────────────── */}
      <section className="bg-[#111827] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TIERS.map((tier, i) => (
              <Reveal key={tier.key} delay={i * 0.08}>
                <div
                  className={cn(
                    "relative flex flex-col h-full rounded-2xl p-8 border transition-all duration-300",
                    tier.highlighted
                      ? "bg-[#1E1B4B] border-[#7C3AED] shadow-[0_0_40px_rgba(124,58,237,0.25)]"
                      : "bg-[#1E1B4B] border-white/10 hover:border-white/20"
                  )}
                >
                  {/* Most Popular badge */}
                  {tier.mostPopular && (
                    <div className="absolute -top-3 right-6">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#7C3AED] text-white text-xs font-bold shadow-lg">
                        <Sparkles className="w-3 h-3" aria-hidden="true" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan label */}
                  <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-4">
                    {tier.label}
                  </p>

                  {/* Credits */}
                  <div className="mb-1">
                    <span className="text-4xl font-extrabold text-white tracking-tight">
                      {tier.credits}
                    </span>
                  </div>
                  <p className="text-sm text-white/40 mb-5">{tier.creditsUnit}</p>

                  {/* Price */}
                  <div className="mb-1">
                    <span className="text-3xl font-bold text-white">{tier.price}</span>
                  </div>
                  {tier.priceNote && (
                    <p className="text-sm text-white/40 mb-5">{tier.priceNote}</p>
                  )}
                  {!tier.priceNote && <div className="mb-5" />}

                  {/* No daily limit badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/8 border border-white/10 text-white/60 text-xs font-medium mb-6 w-fit">
                    <Check className="w-3 h-3 text-[#A78BFA]" aria-hidden="true" />
                    No daily limit
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check
                          className="w-4 h-4 text-[#7C3AED] mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-white/70 leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={tier.ctaHref}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                      tier.ctaVariant === "purple"
                        ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-[0_4px_16px_rgba(124,58,237,0.4)]"
                        : "border border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                    )}
                  >
                    {tier.ctaLabel}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CREDIT PACKS ─────────────────────────────────────────────────── */}
      <section className="bg-[#F5F3FF] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#111827] tracking-tight mb-3">
                Need more credits? Buy a pack
              </h2>
              <p className="text-[#6B7280] text-lg">
                One-time purchases, never expire
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CREDIT_PACKS.map((pack, i) => (
              <Reveal key={pack.key} delay={i * 0.07}>
                <div
                  className={cn(
                    "relative flex flex-col items-center text-center rounded-2xl p-7 border transition-all duration-300",
                    pack.mostPopular
                      ? "bg-white border-[#7C3AED] shadow-[0_4px_24px_rgba(124,58,237,0.15)]"
                      : "bg-white border-[#EDE9FE] hover:border-[#A78BFA] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                  )}
                >
                  {pack.mostPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#7C3AED] text-white text-xs font-bold shadow">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <p className="text-xs font-bold tracking-widest text-[#6B7280] uppercase mb-3">
                    {pack.label}
                  </p>

                  <div className="mb-1">
                    <span className="text-5xl font-extrabold text-[#111827] tracking-tight">
                      {pack.credits}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-4">credits</p>

                  <div className="mb-1">
                    <span className="text-2xl font-bold text-[#7C3AED]">{pack.price}</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mb-6">{pack.priceNote}</p>

                  <Link
                    href={pack.ctaHref}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                      pack.mostPopular
                        ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-[0_4px_12px_rgba(124,58,237,0.3)]"
                        : "border border-[#EDE9FE] text-[#7C3AED] hover:bg-[#EDE9FE]"
                    )}
                  >
                    {pack.ctaLabel}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EDE9FE] bg-[#F5F3FF] text-[#7C3AED] text-sm font-medium mb-5">
                <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>FAQ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111827] tracking-tight">
                Pricing FAQ
              </h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <div
                  className={cn(
                    "rounded-xl border transition-all duration-200",
                    openFaq === i
                      ? "border-[#7C3AED]/30 bg-[#F5F3FF]"
                      : "border-[#EDE9FE] bg-white hover:border-[#A78BFA]/40"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-semibold text-[#111827] text-sm leading-snug">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-[#7C3AED] shrink-0 transition-transform duration-200",
                        openFaq === i ? "rotate-180" : ""
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-[#6B7280] leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="relative bg-[#7C3AED] overflow-hidden py-20 px-4">
        {/* Sparkle dots */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {SPARKLE_DOTS.slice(0, 25).map((dot) => (
            <div
              key={dot.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: dot.size,
                height: dot.size,
                opacity: dot.opacity * 0.6,
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
          }}
        />

        <Reveal>
          <div className="relative max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Get started today</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance mb-6">
              Start building for free today
            </h2>

            <p className="text-white/80 text-lg mb-10 leading-relaxed">
              Join thousands of builders shipping faster with AI. No credit card required.
            </p>

            <Link
              href="/signin"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#7C3AED] font-bold text-base hover:bg-white/90 transition-all duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Start Building Free
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
