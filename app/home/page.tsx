"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Sparkles, ArrowRight, Check, ChevronLeft, ChevronRight, Zap, Globe, Download, FileCode, Star } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const STATS = [
  { value: "10K+", label: "Websites Generated" },
  { value: "< 60s", label: "Average Build Time" },
  { value: "100%", label: "Production Ready" },
  { value: "Free", label: "To Get Started" },
];

const FEATURES = [
  {
    id: "ai-powered",
    icon: Sparkles,
    iconBg: "bg-[var(--feature-purple)]",
    title: "AI-Powered",
    description: "Describe what you want and our AI builds it instantly",
    badge: "GPT-4o",
    badgeColor: "text-[var(--badge-green)] bg-[var(--badge-green-bg)] border-[var(--badge-green-border)]",
    watermark: "sparkles",
  },
  {
    id: "production-code",
    icon: FileCode,
    iconBg: "bg-[var(--feature-blue)]",
    title: "Production Code",
    description: "Clean, typed, production-ready code output",
    badge: "TypeScript",
    badgeColor: "text-[var(--badge-blue)] bg-[var(--badge-blue-bg)] border-[var(--badge-blue-border)]",
    watermark: "code",
  },
  {
    id: "live-preview",
    icon: Globe,
    iconBg: "bg-[var(--feature-green)]",
    title: "Live Preview",
    description: "See your website come to life in real time",
    badge: "Instant",
    badgeColor: "text-[var(--badge-teal)] bg-[var(--badge-teal-bg)] border-[var(--badge-teal-border)]",
    watermark: "globe",
  },
  {
    id: "full-stack",
    icon: Star,
    iconBg: "bg-[var(--feature-orange)]",
    title: "Full Stack",
    description: "Complete frontend with components and styling",
    badge: "Next.JS",
    badgeColor: "text-[var(--badge-orange)] bg-[var(--badge-orange-bg)] border-[var(--badge-orange-border)]",
    watermark: "stack",
  },
  {
    id: "export-ready",
    icon: Download,
    iconBg: "bg-[var(--feature-red)]",
    title: "Export Ready",
    description: "Download and deploy anywhere you want",
    badge: "One click",
    badgeColor: "text-[var(--badge-red)] bg-[var(--badge-red-bg)] border-[var(--badge-red-border)]",
    watermark: "download",
  },
  {
    id: "lightning-fast",
    icon: Zap,
    iconBg: "bg-[var(--feature-yellow)]",
    title: "Lightning Fast",
    description: "Generate full websites in under a minute",
    badge: "< 60s",
    badgeColor: "text-[var(--badge-yellow)] bg-[var(--badge-yellow-bg)] border-[var(--badge-yellow-border)]",
    watermark: "zap",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    color: "bg-[var(--step-purple)]",
    title: "Describe your vision",
    description: "Type what you want in plain English — brand, style, content, anything.",
  },
  {
    step: "02",
    color: "bg-[var(--step-blue)]",
    title: "AI generates your site",
    description: "Our AI builds a complete, responsive website with real code in under a minute.",
  },
  {
    step: "03",
    color: "bg-[var(--step-green)]",
    title: "Export & deploy",
    description: "Preview, edit, download the full source code, and deploy it anywhere.",
  },
];

const EXAMPLES = [
  {
    id: 0,
    title: "Modern Portfolio Website",
    subtitle: "AI-generated portfolio website",
    image: "/images/portfolio-alex-chen-website.jpg",
  },
  {
    id: 1,
    title: "Tesla Website",
    subtitle: "AI-generated Tesla website",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/84638427af0540f2a1d93f47ac936d57.jpg",
  },
  {
    id: 2,
    title: "SaaS Landing Page",
    subtitle: "AI-generated SaaS landing page",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/52fc33d16aa7450e9bfb7f2a025743ff.jpg",
  },
];

const PRICING_PLANS = [
  {
    id: "free",
    credits: "50 credits",
    price: "Free",
    priceSub: "forever",
    creditLine: "50 credits / month",
    creditLineColor: "text-[var(--plan-green)]",
    features: ["No credit card required", "Live preview", "Renews every month"],
    cta: "Get started free",
    ctaStyle: "border border-gray-300 text-gray-900 hover:bg-gray-50",
    popular: false,
    iconBg: "bg-[var(--plan-green-bg)]",
    iconColor: "text-white",
    cardBg: "bg-[var(--plan-green-card)]",
    border: "border border-gray-200",
  },
  {
    id: "starter",
    credits: "100 credits",
    price: "$10",
    priceSub: "one-time",
    creditLine: "100 credits · $0.100 / credit",
    creditLineColor: "text-[var(--brand-purple)]",
    features: ["Full code export", "Live preview", "Credits never expire"],
    cta: "Get 100 credits",
    ctaStyle: "bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)]",
    popular: true,
    iconBg: "bg-[var(--brand-purple)]",
    iconColor: "text-white",
    cardBg: "bg-white",
    border: "border-2 border-[var(--brand-purple)]",
  },
  {
    id: "pro",
    credits: "250 credits",
    price: "$23",
    priceSub: "one-time",
    creditLine: "250 credits · $0.092 / credit",
    creditLineColor: "text-[var(--plan-purple-light)]",
    features: ["Full code export", "Live preview", "Credits never expire"],
    cta: "Get 250 credits",
    ctaStyle: "border border-gray-300 text-gray-900 hover:bg-gray-50",
    popular: false,
    iconBg: "bg-[var(--plan-purple-light-bg)]",
    iconColor: "text-white",
    cardBg: "bg-white",
    border: "border border-gray-200",
  },
  {
    id: "scale",
    credits: "500 credits",
    price: "$42",
    priceSub: "one-time",
    creditLine: "500 credits · $0.084 / credit",
    creditLineColor: "text-[var(--plan-orange)]",
    features: ["Full code export", "Live preview", "Credits never expire"],
    cta: "Get 500 credits",
    ctaStyle: "border border-gray-300 text-gray-900 hover:bg-gray-50",
    popular: false,
    iconBg: "bg-[var(--plan-orange-bg)]",
    iconColor: "text-white",
    cardBg: "bg-[var(--plan-orange-card)]",
    border: "border border-gray-200",
  },
];

const starVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: [0, 1, 0.6],
    scale: [0, 1, 0.8],
    transition: { delay: i * 0.15, duration: 1.2, ease: "easeOut" },
  }),
};

const STAR_POSITIONS = [
  { top: "8%", left: "5%", size: 6 },
  { top: "15%", left: "18%", size: 4 },
  { top: "5%", left: "35%", size: 5 },
  { top: "12%", left: "55%", size: 4 },
  { top: "7%", left: "72%", size: 6 },
  { top: "18%", left: "88%", size: 4 },
  { top: "30%", left: "92%", size: 5 },
  { top: "45%", left: "96%", size: 4 },
  { top: "60%", left: "90%", size: 6 },
  { top: "70%", left: "78%", size: 4 },
  { top: "80%", left: "60%", size: 5 },
  { top: "85%", left: "40%", size: 4 },
  { top: "78%", left: "22%", size: 6 },
  { top: "65%", left: "8%", size: 4 },
  { top: "50%", left: "2%", size: 5 },
  { top: "35%", left: "10%", size: 4 },
  { top: "25%", left: "45%", size: 3 },
  { top: "55%", left: "50%", size: 3 },
  { top: "40%", left: "75%", size: 3 },
  { top: "20%", left: "80%", size: 3 },
];

export default function HomePage() {
  const t = useTranslations();
  const [activeExample, setActiveExample] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const prevExample = () => {
    setActiveExample((prev) => (prev - 1 + EXAMPLES.length) % EXAMPLES.length);
  };
  const nextExample = () => {
    setActiveExample((prev) => (prev + 1) % EXAMPLES.length);
  };

  return (
    <main className="min-h-screen bg-[var(--page-bg)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-[var(--hero-top)] via-[var(--hero-mid)] to-[var(--hero-bottom)]">
        {/* Animated stars */}
        {mounted && STAR_POSITIONS.map((pos, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={starVariants}
            initial="hidden"
            animate="visible"
            className="absolute pointer-events-none"
            style={{ top: pos.top, left: pos.left }}
          >
            <svg
              width={pos.size * 3}
              height={pos.size * 3}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"
                fill="var(--star-color)"
                opacity="0.7"
              />
            </svg>
          </motion.div>
        ))}

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto pt-16 pb-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--badge-border)] bg-white/80 text-sm text-gray-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[var(--brand-purple)]" />
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.08] mb-4"
          >
            {t("hero.headline1")}{" "}
            <span className="text-[var(--brand-purple)]">{t("hero.headline2")}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-500 max-w-xl leading-relaxed mb-10"
          >
            {t("hero.subheadline")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-16"
          >
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--brand-purple)] text-white font-semibold text-base hover:bg-[var(--brand-purple-dark)] transition-all duration-200 shadow-lg shadow-purple-200"
            >
              {t("hero.cta1")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/examples"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-800 font-semibold text-base hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              {t("hero.cta2")}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full max-w-2xl"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="flex flex-col items-center"
              >
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-xs text-gray-500 mt-0.5 text-center">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Everything you need */}
      <Reveal>
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-4">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{t("features.heading")}</h2>
              <p className="text-gray-500 mt-3 text-base">{t("features.subheading")}</p>
            </div>
            <div className="mt-12 border-t border-gray-100" />
            <div className="mt-0 grid grid-cols-1 md:grid-cols-2 gap-0">
              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <Reveal key={feature.id} delay={i * 0.07}>
                    <div className="relative flex flex-col p-8 border-b border-r border-gray-100 min-h-[180px] overflow-hidden group hover:bg-gray-50/60 transition-colors duration-200">
                      {/* Watermark icon */}
                      <div className="absolute right-6 bottom-4 opacity-[0.06] pointer-events-none">
                        <Icon className="h-24 w-24 text-gray-400" />
                      </div>
                      <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${feature.iconBg} mb-4 shadow-sm`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-base mb-1">{feature.title}</h3>
                      <p className="text-gray-500 text-sm mb-4 leading-relaxed">{feature.description}</p>
                      <div className="mt-auto flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {i === 0 ? "Powered by" : i === 1 ? "Always typed" : i === 2 ? "Rendering" : i === 3 ? "Built with" : i === 4 ? "Export" : "Build time"}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${feature.badgeColor}`}>
                          {feature.badge}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* How it works */}
      <Reveal>
        <section className="py-24 bg-[var(--section-bg)]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">{t("howItWorks.heading")}</h2>
            <p className="text-gray-500 text-base mb-16">{t("howItWorks.subheading")}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {HOW_IT_WORKS.map((step, i) => (
                <Reveal key={step.step} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center text-white font-bold text-lg mb-5 shadow-md`}>
                      {step.step}
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* See what's possible — carousel */}
      <Reveal>
        <section className="py-24 bg-[var(--section-bg)]">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">{t("examples.heading")}</h2>
            <p className="text-gray-500 text-base mb-14">{t("examples.subheading")}</p>

            {/* Carousel */}
            <div className="relative flex items-center justify-center gap-4">
              <button
                onClick={prevExample}
                aria-label="Previous example"
                className="absolute left-0 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>

              <div className="flex items-center justify-center gap-4 w-full overflow-hidden px-12">
                {EXAMPLES.map((ex, i) => {
                  const offset = i - activeExample;
                  const isActive = offset === 0;
                  const isAdjacent = Math.abs(offset) === 1;
                  if (Math.abs(offset) > 1) return null;
                  return (
                    <motion.div
                      key={ex.id}
                      animate={{
                        scale: isActive ? 1 : 0.82,
                        opacity: isActive ? 1 : 0.55,
                        zIndex: isActive ? 10 : 1,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className={`relative flex-shrink-0 rounded-2xl overflow-hidden shadow-xl cursor-pointer ${isActive ? "w-[380px] md:w-[460px]" : "w-[240px] md:w-[280px]"}`}
                      onClick={() => setActiveExample(i)}
                    >
                      <img
                        src={ex.image}
                        alt={ex.title}
                        className="w-full object-cover"
                        style={{ height: isActive ? 320 : 220 }}
                      />
                      {isActive && (
                        <div className="bg-white px-5 py-4 text-left">
                          <p className="font-semibold text-gray-900 text-sm">{ex.title}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{ex.subtitle}</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <button
                onClick={nextExample}
                aria-label="Next example"
                className="absolute right-0 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {EXAMPLES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveExample(i)}
                  aria-label={`Go to example ${i + 1}`}
                  className={`rounded-full transition-all duration-200 ${i === activeExample ? "w-6 h-2.5 bg-[var(--brand-purple)]" : "w-2.5 h-2.5 bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Tutorial video */}
      <Reveal>
        <section className="py-24 bg-[var(--section-bg)]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">{t("tutorial.heading")}</h2>
            <p className="text-gray-500 text-base mb-12">{t("tutorial.subheading")}</p>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <video
                controls
                className="w-full"
                poster="/images/tutorial-video-poster.jpg"
              >
                <source src="/videos/builder-tutorial.mp4" type="video/mp4" />
                {t("tutorial.videoFallback")}
              </video>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Pricing */}
      <Reveal>
        <section className="py-24 bg-[var(--section-bg)]">
          <div className="max-w-5xl mx-auto px-4 text-center">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--badge-border)] bg-white/80 text-sm text-gray-600 shadow-sm">
                <span className="text-base">🔗</span>
                {t("pricing.badge")}
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">{t("pricing.heading")}</h2>
            <p className="text-gray-500 text-base mb-14 max-w-md mx-auto">{t("pricing.subheading")}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PRICING_PLANS.map((plan, i) => (
                <Reveal key={plan.id} delay={i * 0.08}>
                  <div className={`relative rounded-2xl p-6 text-left flex flex-col ${plan.cardBg} ${plan.border} shadow-sm hover:shadow-md transition-shadow duration-200`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-[var(--brand-purple)] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className={`w-10 h-10 rounded-xl ${plan.iconBg} flex items-center justify-center mb-4`}>
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">{plan.credits}</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                      <span className="text-gray-400 text-sm">{plan.priceSub}</span>
                    </div>
                    <p className={`text-xs font-medium mb-5 ${plan.creditLineColor}`}>{plan.creditLine}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-3.5 w-3.5 text-[var(--brand-purple)] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/pricing"
                      className={`w-full text-center py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${plan.ctaStyle}`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/pricing" className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors">
                {t("pricing.viewAll")}
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ teaser */}
      <Reveal>
        <section className="py-16 bg-[var(--section-bg)]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--badge-border)] bg-gray-50 text-xs text-gray-500">
                    <span>✓</span>
                    {t("faqTeaser.badge")}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{t("faqTeaser.heading")}</h2>
                <p className="text-gray-500 text-sm">{t("faqTeaser.subheading")}</p>
              </div>
              <Link
                href="/faq"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-purple)] text-white font-semibold text-sm hover:bg-[var(--brand-purple-dark)] transition-colors shadow-md"
              >
                {t("faqTeaser.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Final CTA */}
      <Reveal>
        <section className="py-8 px-4 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden bg-[var(--cta-bg)] px-8 py-20 text-center">
              {/* Stars in CTA */}
              {mounted && STAR_POSITIONS.slice(0, 12).map((pos, i) => (
                <div
                  key={i}
                  className="absolute pointer-events-none"
                  style={{ top: pos.top, left: pos.left, opacity: 0.25 }}
                >
                  <svg width={pos.size * 2.5} height={pos.size * 2.5} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"
                      fill="white"
                    />
                  </svg>
                </div>
              ))}
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-sm text-white/80">
                    <Sparkles className="h-3.5 w-3.5" />
                    {t("cta.badge")}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">{t("cta.heading")}</h2>
                <p className="text-white/70 text-base mb-10 max-w-sm mx-auto leading-relaxed">{t("cta.subheading")}</p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[var(--brand-purple)] font-bold text-base hover:bg-gray-100 transition-colors shadow-lg"
                >
                  {t("cta.button")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}