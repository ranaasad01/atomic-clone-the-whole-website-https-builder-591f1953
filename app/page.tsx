"use client";

import { useState, useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Sparkles, ArrowRight, Check, ChevronLeft, ChevronRight, Zap, Globe, Download, FileCode, Eye, Star } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

// ─── Hero star field ────────────────────────────────────────────────────────
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  y: (i * 97.3) % 100,
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
  opacity: 0.15 + (i % 5) * 0.08,
}));

// ─── Stats ───────────────────────────────────────────────────────────────────
const STATS = [
  { value: "10K+", label: "Websites Generated" },
  { value: "< 60s", label: "Average Build Time" },
  { value: "100%", label: "Production Ready" },
  { value: "Free", label: "To Get Started" },
];

// ─── Features ────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Sparkles,
    color: "#7c3aed",
    bg: "#ede9fe",
    title: "AI-Powered",
    desc: "Describe what you want and our AI builds it instantly",
    badge: "GPT-4o",
    badgeColor: "#7c3aed",
    badgeBg: "#ede9fe",
    label: "Powered by",
  },
  {
    icon: FileCode,
    color: "#2563eb",
    bg: "#dbeafe",
    title: "Production Code",
    desc: "Clean, typed, production-ready code output",
    badge: "TypeScript",
    badgeColor: "#2563eb",
    badgeBg: "#dbeafe",
    label: "Always typed",
  },
  {
    icon: Globe,
    color: "#16a34a",
    bg: "#dcfce7",
    title: "Live Preview",
    desc: "See your website come to life in real time",
    badge: "Instant",
    badgeColor: "#16a34a",
    badgeBg: "#dcfce7",
    label: "Rendering",
  },
  {
    icon: Star,
    color: "#ea580c",
    bg: "#ffedd5",
    title: "Full Stack",
    desc: "Complete frontend with components and styling",
    badge: "Next.JS",
    badgeColor: "#ea580c",
    badgeBg: "#ffedd5",
    label: "Built with",
  },
  {
    icon: Download,
    color: "#dc2626",
    bg: "#fee2e2",
    title: "Export Ready",
    desc: "Download and deploy anywhere you want",
    badge: "One click",
    badgeColor: "#dc2626",
    badgeBg: "#fee2e2",
    label: "Export",
  },
  {
    icon: Zap,
    color: "#d97706",
    bg: "#fef3c7",
    title: "Lightning Fast",
    desc: "Generate full websites in under a minute",
    badge: "< 60s",
    badgeColor: "#d97706",
    badgeBg: "#fef3c7",
    label: "Build time",
  },
];

// ─── How it works steps ───────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    color: "#7c3aed",
    title: "Describe your vision",
    desc: "Type what you want in plain English — brand, style, content, anything.",
  },
  {
    num: "02",
    color: "#2563eb",
    title: "AI generates your site",
    desc: "Our AI builds a complete, responsive website with real code in under a minute.",
  },
  {
    num: "03",
    color: "#16a34a",
    title: "Export & deploy",
    desc: "Preview, edit, download the full source code, and deploy it anywhere.",
  },
];

// ─── Example projects carousel ───────────────────────────────────────────────
const EXAMPLES = [
  {
    title: "Modern Portfolio Website",
    desc: "AI-generated portfolio website",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/84638427af0540f2a1d93f47ac936d57.jpg",
  },
  {
    title: "Tesla Website",
    desc: "AI-generated Tesla website",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/84638427af0540f2a1d93f47ac936d57.jpg",
  },
  {
    title: "SaaS Landing Page",
    desc: "AI-generated SaaS landing page",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/52fc33d16aa7450e9bfb7f2a025743ff.jpg",
  },
];

// ─── Pricing tiers (homepage snapshot) ───────────────────────────────────────
const PRICING = [
  {
    credits: "50 credits",
    price: "Free",
    priceNote: "forever",
    creditLine: "50 credits / month",
    creditColor: "#16a34a",
    features: ["No credit card required", "Live preview", "Renews every month"],
    cta: "Get started free",
    highlighted: false,
    iconColor: "#16a34a",
    iconBg: "#dcfce7",
    icon: Sparkles,
  },
  {
    credits: "100 credits",
    price: "$10",
    priceNote: "one-time",
    creditLine: "100 credits · $0.100 / credit",
    creditColor: "#2563eb",
    features: ["Full code export", "Live preview", "Credits never expire"],
    cta: "Get 100 credits",
    highlighted: true,
    badge: "MOST POPULAR",
    iconColor: "#2563eb",
    iconBg: "#dbeafe",
    icon: Eye,
  },
  {
    credits: "250 credits",
    price: "$23",
    priceNote: "one-time",
    creditLine: "250 credits · $0.092 / credit",
    creditColor: "#7c3aed",
    features: ["Full code export", "Live preview", "Credits never expire"],
    cta: "Get 250 credits",
    highlighted: false,
    iconColor: "#7c3aed",
    iconBg: "#ede9fe",
    icon: Star,
  },
  {
    credits: "500 credits",
    price: "$42",
    priceNote: "one-time",
    creditLine: "500 credits · $0.084 / credit",
    creditColor: "#ea580c",
    features: ["Full code export", "Live preview", "Credits never expire"],
    cta: "Get 500 credits",
    highlighted: false,
    iconColor: "#ea580c",
    iconBg: "#ffedd5",
    icon: Zap,
  },
];

// ─── Hero entrance variants ───────────────────────────────────────────────────
const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const t = useTranslations();
  const [carouselIdx, setCarouselIdx] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const prevExample = () =>
    setCarouselIdx((i) => (i - 1 + EXAMPLES.length) % EXAMPLES.length);
  const nextExample = () =>
    setCarouselIdx((i) => (i + 1) % EXAMPLES.length);

  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--page-fg)] overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center text-center pt-28 pb-20 px-4 overflow-hidden"
        style={{ minHeight: "680px" }}
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #ddd6fe 0%, #e0e7ff 30%, #f0f4ff 60%, #f5f6fa 100%)",
          }}
        />
        {/* Star field */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {STARS.map((s) => (
              <div
                key={s.id}
                className="absolute rounded-full"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  background: "#7c3aed",
                  opacity: s.opacity,
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          className="relative z-10 flex flex-col items-center"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={heroItem}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c4b5fd] bg-white/70 px-4 py-1.5 text-xs font-medium text-[#7c3aed] mb-6 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={heroItem}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#0f0f1a] leading-[1.08] max-w-3xl"
          >
            {t("hero.headline1")}
            <br />
            <span className="text-[#7c3aed]">{t("hero.headline2")}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={heroItem}
            className="mt-6 max-w-xl text-base sm:text-lg text-[#4b5563] leading-relaxed"
          >
            {t("hero.subheadline")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={heroItem}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-[#7c3aed] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7c3aed]/30 transition-all duration-200 hover:bg-[#6d28d9] hover:shadow-[#7c3aed]/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
            >
              {t("hero.cta1")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/examples"
              className="inline-flex items-center gap-2 rounded-xl border border-[#d1d5db] bg-white/80 px-6 py-3 text-sm font-semibold text-[#111827] backdrop-blur-sm transition-all duration-200 hover:bg-white hover:border-[#9ca3af] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
            >
              {t("hero.cta2")}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={heroItem}
            className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-bold text-[#111827]">
                  {s.value}
                </span>
                <span className="mt-0.5 text-xs text-[#6b7280]">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-4 bg-[#f5f6fa]">
        <Reveal className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f0f1a]">
            {t("features.heading")}
          </h2>
          <p className="mt-3 text-[#6b7280] text-base max-w-md mx-auto">
            {t("features.subheading")}
          </p>
        </Reveal>

        {/* Bento-style 2-col grid with large left + right cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="relative rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_24px_-6px_rgba(0,0,0,0.12)] transition-shadow duration-300 overflow-hidden">
                  {/* Faint icon watermark */}
                  <div className="absolute right-4 bottom-4 opacity-[0.06] pointer-events-none">
                    <Icon className="h-20 w-20" style={{ color: f.color }} />
                  </div>
                  <div
                    className="inline-flex items-center justify-center rounded-xl p-2.5 mb-4"
                    style={{ background: f.bg }}
                  >
                    <Icon className="h-5 w-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="text-base font-bold text-[#111827]">{f.title}</h3>
                  <p className="mt-1 text-sm text-[#6b7280]">{f.desc}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-[#9ca3af]">{f.label}</span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ color: f.badgeColor, background: f.badgeBg }}
                    >
                      {f.badge}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-4 bg-[#f5f6fa]">
        <Reveal className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f0f1a]">
            {t("howItWorks.heading")}
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="text-center mb-14">
          <p className="text-[#6b7280] text-base">{t("howItWorks.subheading")}</p>
        </Reveal>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full text-white text-sm font-bold mb-4 shadow-lg"
                  style={{ background: step.color }}
                >
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-[#111827] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── EXAMPLES CAROUSEL ────────────────────────────────────────────── */}
      <section id="examples" className="py-24 px-4 bg-[#f5f6fa]">
        <Reveal className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f0f1a]">
            {t("examples.heading")}
          </h2>
          <p className="mt-3 text-[#6b7280] text-base">{t("examples.subheading")}</p>
        </Reveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Carousel track */}
          <div className="relative flex items-center justify-center" style={{ height: "420px" }}>
            {EXAMPLES.map((ex, i) => {
              const offset = i - carouselIdx;
              const isCenter = offset === 0;
              const isLeft = offset === -1 || (carouselIdx === 0 && i === EXAMPLES.length - 1);
              const isRight = offset === 1 || (carouselIdx === EXAMPLES.length - 1 && i === 0);

              let translateX = "0%";
              let scale = 1;
              let zIndex = 10;
              let opacity = 1;

              if (isCenter) {
                translateX = "0%";
                scale = 1;
                zIndex = 20;
                opacity = 1;
              } else if (isLeft) {
                translateX = "-65%";
                scale = 0.82;
                zIndex = 10;
                opacity = 0.7;
              } else if (isRight) {
                translateX = "65%";
                scale = 0.82;
                zIndex = 10;
                opacity = 0.7;
              } else {
                opacity = 0;
                scale = 0.7;
                zIndex = 0;
              }

              return (
                <motion.div
                  key={ex.title}
                  animate={{ x: translateX, scale, opacity, zIndex }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute w-full max-w-lg"
                  style={{ zIndex }}
                >
                  <div className="rounded-2xl overflow-hidden bg-white shadow-[0_4px_32px_-8px_rgba(0,0,0,0.18)] border border-[#e5e7eb]">
                    <img
                      src={ex.image}
                      alt={ex.title}
                      className="w-full object-cover"
                      style={{ height: "280px" }}
                    />
                    {isCenter && (
                      <div className="p-4">
                        <div className="font-semibold text-[#111827] text-sm">{ex.title}</div>
                        <div className="text-xs text-[#6b7280] mt-0.5">{ex.desc}</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Prev / Next */}
          <button
            onClick={prevExample}
            aria-label={t("examples.prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#e5e7eb] shadow-md hover:bg-[#f9fafb] transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-[#374151]" />
          </button>
          <button
            onClick={nextExample}
            aria-label={t("examples.next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#e5e7eb] shadow-md hover:bg-[#f9fafb] transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-[#374151]" />
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {EXAMPLES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIdx(i)}
                aria-label={`${t("examples.goTo")} ${i + 1}`}
                className={cn(
                  "rounded-full transition-all duration-200",
                  i === carouselIdx
                    ? "w-5 h-2 bg-[#7c3aed]"
                    : "w-2 h-2 bg-[#d1d5db] hover:bg-[#9ca3af]"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO TUTORIAL ───────────────────────────────────────────────── */}
      <section id="tutorial" className="py-24 px-4 bg-[#f5f6fa]">
        <Reveal className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f0f1a]">
            {t("tutorial.heading")}
          </h2>
          <p className="mt-3 text-[#6b7280] text-base max-w-md mx-auto">
            {t("tutorial.subheading")}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#e5e7eb] bg-white shadow-[0_4px_32px_-8px_rgba(0,0,0,0.14)]">
            <div className="bg-white px-4 py-3 border-b border-[#f3f4f6]" />
            <div className="relative bg-[#0f172a]" style={{ paddingBottom: "56.25%" }}>
              <img
                src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0991bc4c62ee43a4b2a40e647682637e.png"
                alt={t("tutorial.videoAlt")}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                  <div
                    className="w-0 h-0 ml-1"
                    style={{
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      borderLeft: "18px solid white",
                    }}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-[#1e293b] px-4 py-2 flex items-center gap-3">
                <span className="text-white/70 text-xs">0:00 / 0:32</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── PRICING SNAPSHOT ─────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 bg-[#f5f6fa]">
        <Reveal className="text-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c4b5fd] bg-white/70 px-4 py-1.5 text-xs font-medium text-[#7c3aed] mb-4 backdrop-blur-sm">
            <span>🔗</span>
            {t("pricing.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f0f1a]">
            {t("pricing.heading")}
          </h2>
          <p className="mt-3 text-[#6b7280] text-base max-w-md mx-auto">
            {t("pricing.subheading")}
          </p>
        </Reveal>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {PRICING.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <Reveal key={tier.credits} delay={i * 0.08}>
                <div
                  className={cn(
                    "relative rounded-2xl border p-5 flex flex-col h-full transition-shadow duration-300",
                    tier.highlighted
                      ? "border-[#7c3aed] bg-white shadow-[0_0_0_2px_#7c3aed,0_8px_32px_-8px_rgba(124,58,237,0.25)]"
                      : "border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
                  )}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-[#7c3aed] px-3 py-0.5 text-[10px] font-bold text-white tracking-wider">
                        {tier.badge}
                      </span>
                    </div>
                  )}
                  <div
                    className="inline-flex items-center justify-center rounded-xl p-2 mb-3 w-10 h-10"
                    style={{ background: tier.iconBg }}
                  >
                    <Icon className="h-5 w-5" style={{ color: tier.iconColor }} />
                  </div>
                  <div className="text-sm font-semibold text-[#374151] mb-1">
                    {tier.credits}
                  </div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-3xl font-extrabold text-[#111827]">
                      {tier.price}
                    </span>
                    <span className="text-xs text-[#9ca3af]">{tier.priceNote}</span>
                  </div>
                  <div
                    className="text-xs font-medium mb-4"
                    style={{ color: tier.creditColor }}
                  >
                    {tier.creditLine}
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-[#4b5563]">
                        <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: tier.creditColor }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/pricing"
                    className={cn(
                      "block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]",
                      tier.highlighted
                        ? "bg-[#7c3aed] text-white hover:bg-[#6d28d9] shadow-md shadow-[#7c3aed]/30"
                        : "border border-[#d1d5db] text-[#111827] hover:bg-[#f9fafb]"
                    )}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="text-center mt-6">
          <Link
            href="/pricing"
            className="text-sm text-[#7c3aed] underline underline-offset-2 hover:text-[#6d28d9] transition-colors"
          >
            {t("pricing.viewAll")}
          </Link>
        </Reveal>
      </section>

      {/* ── FAQ TEASER ───────────────────────────────────────────────────── */}
      <section id="faq" className="py-16 px-4 bg-[#f5f6fa]">
        <Reveal>
          <div className="max-w-5xl mx-auto rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c4b5fd] bg-[#f5f3ff] px-3 py-1 text-xs font-medium text-[#7c3aed] mb-3">
                <span>✦</span>
                {t("faqTeaser.badge")}
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#0f0f1a]">
                {t("faqTeaser.heading")}
              </h2>
              <p className="mt-1 text-sm text-[#6b7280]">{t("faqTeaser.subheading")}</p>
            </div>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-xl bg-[#7c3aed] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#7c3aed]/25 hover:bg-[#6d28d9] transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
            >
              {t("faqTeaser.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section id="cta" className="py-6 px-4 bg-[#f5f6fa]">
        <Reveal>
          <div
            className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative flex flex-col items-center justify-center text-center py-20 px-6"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 40%, #5b21b6 70%, #7c3aed 100%)",
            }}
          >
            {/* Star field on CTA */}
            {mounted &&
              STARS.slice(0, 30).map((s) => (
                <div
                  key={s.id}
                  className="absolute rounded-full bg-white pointer-events-none"
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: `${s.size}px`,
                    height: `${s.size}px`,
                    opacity: s.opacity * 0.6,
                  }}
                />
              ))}
            <span className="relative inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 mb-6 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {t("finalCta.badge")}
            </span>
            <h2 className="relative text-4xl sm:text-5xl font-extrabold text-white tracking-tight max-w-lg">
              {t("finalCta.heading")}
            </h2>
            <p className="relative mt-4 text-white/75 text-base max-w-sm">
              {t("finalCta.subheading")}
            </p>
            <Link
              href="/pricing"
              className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-[#7c3aed] shadow-lg hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t("finalCta.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <div className="h-16 bg-[#f5f6fa]" />
    </main>
  );
}