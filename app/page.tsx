"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Sparkles, ArrowRight, Check, ChevronLeft, ChevronRight, Zap, Globe, Download, FileCode, Star, Play, HelpCircle } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";

// ─── Deterministic star field (no Math.random) ────────────────────────────────
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  y: (i * 97.3) % 100,
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
  opacity: 0.15 + (i % 5) * 0.06,
}));

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "10K+", label: "Websites Generated" },
  { value: "< 60s", label: "Average Build Time" },
  { value: "100%", label: "Production Ready" },
  { value: "Free", label: "To Get Started" },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: "ai",
    Icon: Sparkles,
    iconColor: "#7c3aed",
    iconBg: "#ede9fe",
    title: "AI-Powered",
    desc: "Describe what you want and our AI builds it instantly",
    badge: "GPT-4o",
    badgeColor: "#7c3aed",
    badgeBg: "#ede9fe",
  },
  {
    id: "code",
    Icon: FileCode,
    iconColor: "#2563eb",
    iconBg: "#dbeafe",
    title: "Production Code",
    desc: "Clean, typed, production-ready code output",
    badge: "TypeScript",
    badgeColor: "#2563eb",
    badgeBg: "#dbeafe",
  },
  {
    id: "preview",
    Icon: Globe,
    iconColor: "#16a34a",
    iconBg: "#dcfce7",
    title: "Live Preview",
    desc: "See your website come to life in real time",
    badge: "Instant",
    badgeColor: "#16a34a",
    badgeBg: "#dcfce7",
  },
  {
    id: "fullstack",
    Icon: Star,
    iconColor: "#ea580c",
    iconBg: "#ffedd5",
    title: "Full Stack",
    desc: "Complete frontend with components and styling",
    badge: "Next.JS",
    badgeColor: "#ea580c",
    badgeBg: "#ffedd5",
  },
  {
    id: "export",
    Icon: Download,
    iconColor: "#dc2626",
    iconBg: "#fee2e2",
    title: "Export Ready",
    desc: "Download and deploy anywhere you want",
    badge: "One click",
    badgeColor: "#dc2626",
    badgeBg: "#fee2e2",
  },
  {
    id: "fast",
    Icon: Zap,
    iconColor: "#d97706",
    iconBg: "#fef3c7",
    title: "Lightning Fast",
    desc: "Generate full websites in under a minute",
    badge: "< 60s",
    badgeColor: "#d97706",
    badgeBg: "#fef3c7",
  },
];

// ─── Steps ────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: "s1",
    num: "01",
    numColor: "#7c3aed",
    numBg: "#ede9fe",
    title: "Describe your vision",
    desc: "Type what you want in plain English — brand, style, content, anything.",
  },
  {
    id: "s2",
    num: "02",
    numColor: "#2563eb",
    numBg: "#dbeafe",
    title: "AI generates your site",
    desc: "Our AI writes the code, applies styling, and renders a live preview in seconds.",
  },
  {
    id: "s3",
    num: "03",
    numColor: "#16a34a",
    numBg: "#dcfce7",
    title: "Export and deploy",
    desc: "Download production-ready code or deploy directly to Vercel with one click.",
  },
];

// ─── Examples carousel ────────────────────────────────────────────────────────
const EXAMPLES = [
  {
    id: "e1",
    title: "Alex Chen Portfolio",
    category: "Portfolio",
    gradient: "from-slate-700 via-blue-800 to-slate-900",
  },
  {
    id: "e2",
    title: "Tesla Landing Page",
    category: "Landing Page",
    gradient: "from-gray-800 via-gray-700 to-black",
  },
  {
    id: "e3",
    title: "Bloom Boutique",
    category: "E-commerce",
    gradient: "from-rose-400 via-pink-300 to-rose-500",
  },
  {
    id: "e4",
    title: "NexaFlow SaaS",
    category: "Business",
    gradient: "from-violet-800 via-purple-700 to-indigo-900",
  },
  {
    id: "e5",
    title: "Green Harvest Co.",
    category: "Business",
    gradient: "from-green-700 via-emerald-600 to-teal-800",
  },
  {
    id: "e6",
    title: "Maria Santos Creative",
    category: "Portfolio",
    gradient: "from-amber-400 via-orange-300 to-yellow-400",
  },
];

// ─── Pricing packs ────────────────────────────────────────────────────────────
const PACKS = [
  {
    id: "free",
    name: "Starter",
    price: "$0",
    credits: "50 credits/month",
    popular: false,
    features: ["50 credits/month", "Live preview", "Export code", "Community support"],
  },
  {
    id: "builder",
    name: "Builder",
    price: "$10",
    credits: "100 credits",
    popular: true,
    features: ["100 credits", "No watermark", "Priority queue", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$23",
    credits: "250 credits",
    popular: false,
    features: ["250 credits", "Custom domain", "Analytics", "Priority support"],
  },
  {
    id: "scale",
    name: "Scale",
    price: "$42",
    credits: "500 credits",
    popular: false,
    features: ["500 credits", "Unlimited projects", "API access", "Dedicated support"],
  },
];

// ─── FAQ items ────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    id: "f1",
    q: "What is Builder by HotCode AI?",
    a: "Builder by HotCode AI is an AI-powered website generator that turns plain English descriptions into fully functional, production-ready websites in under 60 seconds.",
  },
  {
    id: "f2",
    q: "How does the credit system work?",
    a: "Each website generation costs 1 credit. Free accounts receive 50 credits per month at no cost. Purchased credit packs never expire.",
  },
  {
    id: "f3",
    q: "Is there a free plan?",
    a: "Yes. The Starter plan is completely free and includes 50 credits every month. No credit card required to sign up.",
  },
  {
    id: "f4",
    q: "Can I export the code?",
    a: "Absolutely. You can download the full production-ready source code at any time and deploy it anywhere — Vercel, Netlify, or your own server.",
  },
];

// ─── CTA sparkle dots (deterministic) ────────────────────────────────────────
const CTA_DOTS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: (i * 173.1) % 100,
  y: (i * 83.7) % 100,
  size: i % 2 === 0 ? 3 : 2,
  opacity: 0.12 + (i % 4) * 0.06,
}));

export default function HomePage() {
  const t = useTranslations();

  // ── Carousel state ──────────────────────────────────────────────────────────
  const [carouselIndex, setCarouselIndex] = useState(0);
  const visibleCount = 3; // desktop shows 3
  const maxIndex = EXAMPLES.length - visibleCount;

  const prevSlide = () => setCarouselIndex((p) => Math.max(0, p - 1));
  const nextSlide = () => setCarouselIndex((p) => Math.min(maxIndex, p + 1));

  // ── FAQ accordion state ─────────────────────────────────────────────────────
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <main className="overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#DDD6FE] overflow-hidden pt-20 pb-16 px-4">
        {/* Star field */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {STARS.map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full bg-[#7C3AED]"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                opacity: s.opacity,
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
              "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(167,139,250,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C4B5FD] bg-white/70 backdrop-blur-sm text-[#7C3AED] text-sm font-medium mb-8 shadow-[0_1px_8px_rgba(124,58,237,0.12)]"
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            AI-Powered Website Generator
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111827] leading-[1.08] text-balance mb-6"
          >
            Build Your Website
            <br />
            in Seconds with{" "}
            <span className="text-[#7C3AED]">AI</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-10 text-pretty"
          >
            Describe what you need and our AI generates a complete, production-ready
            website in under 60 seconds. No code required.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-[#7C3AED] text-white rounded-xl px-8 py-4 font-semibold text-base shadow-[0_4px_16px_rgba(124,58,237,0.35)] hover:bg-[#6D28D9] hover:shadow-[0_6px_24px_rgba(124,58,237,0.45)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2"
            >
              Start Building Free
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/examples"
              className="inline-flex items-center gap-2 border-2 border-[#7C3AED] text-[#7C3AED] rounded-xl px-8 py-4 font-semibold text-base bg-white/60 backdrop-blur-sm hover:bg-[#EDE9FE] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2"
            >
              View Examples
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-[#7C3AED] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-[#6B7280] mt-0.5 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. FEATURES
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="features" className="bg-white py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111827] text-balance">
                Everything you need
              </h2>
              <p className="mt-3 text-lg text-[#6B7280] text-pretty">
                to build stunning websites
              </p>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.id}
                variants={fadeInUp}
                className="bg-white rounded-2xl border border-[#EDE9FE] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(124,58,237,0.08)] p-6 hover:shadow-[0_4px_24px_-4px_rgba(124,58,237,0.16)] hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: f.iconBg }}
                >
                  <f.Icon
                    className="w-5 h-5"
                    style={{ color: f.iconColor }}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-base font-semibold text-[#111827] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                  {f.desc}
                </p>
                {/* Badge */}
                <span
                  className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ color: f.badgeColor, backgroundColor: f.badgeBg }}
                >
                  {f.badge}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          3. HOW IT WORKS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="how-it-works"
        className="bg-[#F5F3FF] py-24 md:py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111827] text-balance">
                How it works
              </h2>
              <p className="mt-3 text-lg text-[#6B7280]">
                From idea to live website in three simple steps
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {STEPS.map((step, idx) => (
              <Reveal key={step.id} delay={idx * 0.12}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Connecting arrow — visible between cards on desktop */}
                  {idx < STEPS.length - 1 && (
                    <div
                      className="hidden md:flex absolute top-8 left-[calc(50%+2.5rem)] right-0 items-center"
                      aria-hidden="true"
                      style={{ width: "calc(100% - 5rem)" }}
                    >
                      <div className="flex-1 h-px bg-[#C4B5FD]" />
                      <ArrowRight className="w-4 h-4 text-[#A78BFA] -ml-1 flex-shrink-0" />
                    </div>
                  )}

                  {/* Number circle */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
                    style={{
                      backgroundColor: step.numBg,
                      color: step.numColor,
                    }}
                  >
                    {step.num}
                  </div>

                  <h3 className="text-xl font-bold text-[#111827] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed text-sm max-w-xs">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          4. EXAMPLES CAROUSEL
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="examples" className="bg-white py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111827] text-balance">
                See what&apos;s possible
              </h2>
              <p className="mt-3 text-lg text-[#6B7280]">
                AI-generated websites across every industry
              </p>
            </div>
          </Reveal>

          {/* Carousel wrapper */}
          <div className="relative">
            {/* Prev button */}
            <button
              onClick={prevSlide}
              disabled={carouselIndex === 0}
              aria-label="Previous examples"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-[#EDE9FE] shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#7C3AED] hover:bg-[#EDE9FE] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Cards */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: `calc(-${carouselIndex} * (100% / 3 + 8px))` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {EXAMPLES.map((ex) => (
                  <div
                    key={ex.id}
                    className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] rounded-2xl overflow-hidden relative h-48 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-shadow duration-300"
                  >
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br",
                        ex.gradient
                      )}
                    />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                        {ex.category}
                      </span>
                    </div>
                    {/* Title */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-semibold text-sm drop-shadow-sm">
                        {ex.title}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Next button */}
            <button
              onClick={nextSlide}
              disabled={carouselIndex >= maxIndex}
              aria-label="Next examples"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-[#EDE9FE] shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#7C3AED] hover:bg-[#EDE9FE] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  carouselIndex === i
                    ? "bg-[#7C3AED] w-5"
                    : "bg-[#C4B5FD] hover:bg-[#A78BFA]"
                )}
              />
            ))}
          </div>

          {/* Link to full examples page */}
          <div className="text-center mt-10">
            <Link
              href="/examples"
              className="inline-flex items-center gap-2 text-[#7C3AED] font-semibold hover:underline transition-colors"
            >
              View all examples
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          5. TUTORIAL VIDEO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="tutorial" className="bg-[#F5F3FF] py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111827] text-balance">
                Learn how to use the builder
              </h2>
              <p className="mt-3 text-lg text-[#6B7280]">
                Watch our quick tutorial to get started in minutes
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden border border-[#C4B5FD] shadow-[0_8px_40px_-8px_rgba(124,58,237,0.2)] bg-[#1E1B4B] aspect-video flex items-center justify-center">
              {/* Subtle gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              {/* Play button */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <button
                  aria-label="Play tutorial video"
                  className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E1B4B]"
                >
                  <Play
                    className="w-8 h-8 text-[#7C3AED] ml-1"
                    aria-hidden="true"
                  />
                </button>
                <span className="text-white/70 text-sm font-medium">
                  Watch Tutorial (2 min)
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          6. PRICING TEASER
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="bg-white py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111827] text-balance">
                Simple, transparent pricing
              </h2>
              <p className="mt-3 text-lg text-[#6B7280]">
                Start free, scale as you grow
              </p>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PACKS.map((pack) => (
              <motion.div
                key={pack.id}
                variants={scaleIn}
                className={cn(
                  "relative rounded-2xl p-6 flex flex-col transition-all duration-300",
                  pack.popular
                    ? "border-2 border-[#7C3AED] shadow-[0_4px_24px_rgba(124,58,237,0.2)] bg-white"
                    : "border border-[#EDE9FE] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.06)] bg-white hover:shadow-[0_4px_16px_rgba(124,58,237,0.1)]"
                )}
              >
                {pack.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#7C3AED] text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(124,58,237,0.35)]">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#6B7280] mb-1">
                    {pack.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#111827] tracking-tight">
                      {pack.price}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B7280] mt-1">{pack.credits}</p>
                </div>

                <ul className="flex-1 space-y-2.5 mb-6">
                  {pack.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-[#374151]">
                      <Check
                        className="w-4 h-4 text-[#7C3AED] flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/pricing"
                  className={cn(
                    "block text-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2",
                    pack.popular
                      ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-[0_2px_8px_rgba(124,58,237,0.3)]"
                      : "border border-[#7C3AED] text-[#7C3AED] hover:bg-[#EDE9FE]"
                  )}
                >
                  Get started
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-[#7C3AED] font-semibold hover:underline transition-colors"
            >
              View all plans
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          7. FAQ TEASER
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F3FF] py-24 md:py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111827] text-balance">
                Frequently asked questions
              </h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <Reveal key={item.id}>
                <div className="bg-white rounded-2xl border border-[#EDE9FE] shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
                  <button
                    onClick={() =>
                      setOpenFaq((prev) => (prev === item.id ? null : item.id))
                    }
                    aria-expanded={openFaq === item.id}
                    className="w-full flex items-center justify-between px-6 py-4 text-left text-[#111827] font-semibold text-sm hover:bg-[#F5F3FF] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7C3AED]"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle
                        className="w-4 h-4 text-[#A78BFA] flex-shrink-0"
                        aria-hidden="true"
                      />
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === item.id ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 flex-shrink-0 text-[#7C3AED] text-xl leading-none"
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === item.id && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-[#6B7280] leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 border border-[#7C3AED] text-[#7C3AED] rounded-xl px-6 py-3 font-semibold text-sm hover:bg-[#EDE9FE] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2"
            >
              View all FAQs
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          8. CTA BANNER
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#7C3AED] py-24 md:py-32 px-4 overflow-hidden">
        {/* Sparkle dots */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {CTA_DOTS.map((d) => (
            <div
              key={d.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${d.x}%`,
                top: `${d.y}%`,
                width: d.size,
                height: d.size,
                opacity: d.opacity,
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
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(167,139,250,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Decorative corner sparkles */}
        <Sparkles
          className="absolute top-8 left-8 w-8 h-8 text-white/20"
          aria-hidden="true"
        />
        <Sparkles
          className="absolute bottom-8 right-8 w-8 h-8 text-white/20"
          aria-hidden="true"
        />

        <Reveal>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-balance mb-5">
              Ready to build your website?
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-10 text-pretty">
              Join 10,000+ creators building with AI. Start free — no credit card
              required.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-white text-[#7C3AED] rounded-xl px-8 py-4 font-bold text-base shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:bg-[#EDE9FE] hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#7C3AED]"
            >
              Start Building Free
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
