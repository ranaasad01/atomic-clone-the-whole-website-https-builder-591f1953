"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, Globe, Code, Layers, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { useTranslations } from "next-intl";

const CHANGELOG_ENTRIES = [
  {
    version: "v2.4.0",
    date: "January 28, 2025",
    tag: "Major Release",
    tagColor: "bg-purple-100 text-purple-700",
    highlights: [
      {
        icon: Sparkles,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        title: "GPT-4o Integration",
        description:
          "Upgraded our AI engine to GPT-4o for dramatically improved code quality, better design decisions, and faster generation times. Sites now come out cleaner and more production-ready than ever.",
      },
      {
        icon: Zap,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
        title: "Sub-30s Build Times",
        description:
          "Parallelized our code generation pipeline so most sites now build in under 30 seconds. Complex multi-page sites with custom components still finish in under 60 seconds.",
      },
      {
        icon: Globe,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        title: "Vercel One-Click Deploy",
        description:
          "Connect your Vercel account and deploy directly from the Builder dashboard. No CLI, no config files — just click Deploy and your site is live on a custom domain in seconds.",
      },
    ],
    improvements: [
      "Improved responsive layout generation for mobile-first designs",
      "Better handling of dark mode color palettes",
      "Smarter component reuse across pages",
      "Reduced hallucination rate for image paths and external links",
    ],
    fixes: [
      "Fixed hydration mismatch errors in generated Next.js pages",
      "Resolved occasional blank preview on first load",
      "Fixed TypeScript strict mode errors in exported code",
    ],
  },
  {
    version: "v2.3.0",
    date: "January 10, 2025",
    tag: "Feature Update",
    tagColor: "bg-blue-100 text-blue-700",
    highlights: [
      {
        icon: Code,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        title: "Full Code Export",
        description:
          "Download the complete Next.js project as a zip file — including all components, pages, styles, and configuration. The code is clean, typed, and ready to run with npm install.",
      },
      {
        icon: Layers,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        title: "Multi-Page Generation",
        description:
          "Builder now generates complete multi-page sites in a single prompt. Describe your site and get a homepage, about page, pricing page, and contact page — all linked and consistent.",
      },
    ],
    improvements: [
      "Added support for custom font pairings in prompts",
      "Improved navigation generation with active state handling",
      "Better SEO metadata generation per page",
      "Enhanced Tailwind class consistency across components",
    ],
    fixes: [
      "Fixed missing alt text on generated images",
      "Resolved duplicate key warnings in list components",
      "Fixed footer not appearing on inner pages",
    ],
  },
  {
    version: "v2.2.0",
    date: "December 18, 2024",
    tag: "Feature Update",
    tagColor: "bg-blue-100 text-blue-700",
    highlights: [
      {
        icon: Shield,
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-600",
        title: "Credits System Launch",
        description:
          "Replaced the old subscription model with a flexible credits system. Buy credits once, use them whenever you need. Credits never expire and roll over month to month.",
      },
    ],
    improvements: [
      "New dashboard with project history and credit balance",
      "Added project duplication for iterating on existing sites",
      "Improved prompt suggestions and autocomplete",
      "Faster preview rendering with incremental updates",
    ],
    fixes: [
      "Fixed credit deduction on failed builds",
      "Resolved project list pagination bug",
      "Fixed preview iframe not updating after edits",
    ],
  },
  {
    version: "v2.1.0",
    date: "December 2, 2024",
    tag: "Improvement",
    tagColor: "bg-green-100 text-green-700",
    highlights: [],
    improvements: [
      "Framer Motion animations now included in all generated sites",
      "Added scroll-reveal effects to feature sections and hero areas",
      "Improved color palette generation from brand descriptions",
      "Better handling of e-commerce and SaaS site templates",
      "Added support for Lucide React icons in generated components",
    ],
    fixes: [
      "Fixed animation flicker on initial page load",
      "Resolved Tailwind purge removing used dynamic classes",
      "Fixed mobile menu not closing after navigation",
      "Corrected z-index stacking in modal components",
    ],
  },
  {
    version: "v2.0.0",
    date: "November 15, 2024",
    tag: "Major Release",
    tagColor: "bg-purple-100 text-purple-700",
    highlights: [
      {
        icon: Sparkles,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        title: "Builder 2.0 — Complete Rewrite",
        description:
          "Builder 2.0 is a ground-up rewrite of our generation engine. New architecture supports richer prompts, better design fidelity, and a dramatically improved developer experience from prompt to production.",
      },
    ],
    improvements: [
      "New visual editor for tweaking generated sites without re-prompting",
      "Introduced design system tokens for consistent theming",
      "Added internationalization support via next-intl",
      "New example gallery with 50+ AI-generated site templates",
    ],
    fixes: [
      "Resolved all known issues from v1.x",
      "Fixed memory leak in preview renderer",
      "Corrected broken exports for sites with custom fonts",
    ],
  },
];

function ChangelogEntry({ entry, index }: { entry: typeof CHANGELOG_ENTRIES[0]; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <Reveal delay={index * 0.08}>
      <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors duration-200 text-left"
          aria-expanded={expanded}
        >
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-lg font-bold text-gray-900 tracking-tight">{entry.version}</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${entry.tagColor}`}>
              {entry.tag}
            </span>
            <span className="text-sm text-gray-500">{entry.date}</span>
          </div>
          <div className="text-gray-400 flex-shrink-0 ml-4">
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
        </button>

        {expanded && (
          <div className="px-6 pb-6 border-t border-gray-100">
            {entry.highlights.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {entry.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" }}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                  >
                    <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${h.iconBg} mb-3`}>
                      <h.icon className={`h-5 w-5 ${h.iconColor}`} aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{h.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{h.description}</p>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {entry.improvements.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Improvements
                  </h4>
                  <ul className="space-y-2">
                    {entry.improvements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {entry.fixes.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Bug Fixes
                  </h4>
                  <ul className="space-y-2">
                    {entry.fixes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function ChangelogPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[#f5f5fa]">
      {/* Hero */}
      <Reveal>
        <section className="pt-20 pb-12 text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-600 mb-6 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
            {t("changelog.badge")}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-balance mb-4">
            {t("changelog.heading")}
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto text-pretty leading-relaxed">
            {t("changelog.subheading")}
          </p>
        </section>
      </Reveal>

      {/* Entries */}
      <section className="max-w-4xl mx-auto px-4 pb-24 space-y-4">
        {CHANGELOG_ENTRIES.map((entry, i) => (
          <ChangelogEntry key={entry.version} entry={entry} index={i} />
        ))}
      </section>

      {/* CTA */}
      <Reveal>
        <section className="mx-4 mb-20 max-w-4xl md:mx-auto rounded-3xl bg-[var(--brand-primary)] px-8 py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
          />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-sm text-white mb-6">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              {t("changelog.cta.badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              {t("changelog.cta.heading")}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
              {t("changelog.cta.subheading")}
            </p>
            <motion.a
              href="/pricing"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] font-semibold px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t("changelog.cta.button")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.a>
          </div>
        </section>
      </Reveal>
    </main>
  );
}