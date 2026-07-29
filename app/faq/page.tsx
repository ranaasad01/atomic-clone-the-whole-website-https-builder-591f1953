"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown, Search, Sparkles, ArrowRight } from 'lucide-react';
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const answerVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  category: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    category: "General",
    items: [
      {
        q: "What is Builder by HotCode AI?",
        a: "Builder by HotCode AI is an AI-powered website generator that turns plain English descriptions into fully functional, production-ready websites. You describe what you want, and our AI builds it instantly with clean code, modern design, and full responsiveness.",
      },
      {
        q: "Do I need coding experience to use Builder?",
        a: "Not at all. Builder is designed for everyone — from complete beginners to experienced developers. Simply describe your vision in plain English and the AI handles all the code. Developers can also export the full source code and customize it further.",
      },
      {
        q: "What kinds of websites can I build?",
        a: "You can build virtually any type of website: portfolios, landing pages, SaaS products, e-commerce stores, blogs, dashboards, agency sites, and more. If you can describe it, Builder can generate it.",
      },
      {
        q: "How long does it take to generate a website?",
        a: "Most websites are generated in under 60 seconds. The AI processes your prompt, writes the code, applies styling, and renders a live preview — all in real time.",
      },
    ],
  },
  {
    category: "Pricing",
    items: [
      {
        q: "How does the credit system work?",
        a: "Each website generation costs 1 credit. Free accounts receive 50 credits per month at no cost. You can purchase additional credit packs at any time — credits never expire, so you can use them whenever you need.",
      },
      {
        q: "Is there a free plan?",
        a: "Yes. The Starter plan is completely free and includes 50 credits every month. No credit card is required to sign up. You can generate up to 50 websites per month on the free plan.",
      },
      {
        q: "Do unused credits roll over?",
        a: "Purchased credit packs never expire and roll over indefinitely. Monthly free credits (on the Starter plan) reset each month and do not roll over.",
      },
      {
        q: "Can I get a refund?",
        a: "If you experience a technical issue that prevents a generation from completing, we will refund the credit used. For other refund requests, please contact our support team within 7 days of purchase and we will review your case.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "What technology stack does Builder use?",
        a: "Builder generates websites using Next.js 14 with the App Router, TypeScript, and Tailwind CSS. The output is clean, typed, production-ready code that follows modern best practices — the same stack used by top engineering teams.",
      },
      {
        q: "Can I edit the generated code?",
        a: "Absolutely. You can preview and iterate on your site directly in Builder, then export the full source code at any time. The exported project is a standard Next.js application you can open in any editor and deploy anywhere.",
      },
      {
        q: "Where can I deploy my generated website?",
        a: "You can deploy your exported site to any platform that supports Node.js or static exports — including Vercel, Netlify, AWS, Railway, and more. Builder also supports one-click Vercel deployment directly from the dashboard.",
      },
      {
        q: "Does Builder support custom domains?",
        a: "Custom domain support is available on the Pro plan and above. You can connect your own domain through your hosting provider after deploying your exported site.",
      },
    ],
  },
  {
    category: "Export",
    items: [
      {
        q: "What does the exported code include?",
        a: "The export includes the complete Next.js project: all pages, components, styles, configuration files, and a package.json with all dependencies. It is a fully self-contained project ready to install and run with a single command.",
        
      },
      {
        q: "Is the exported code production-ready?",
        a: "Yes. Builder generates TypeScript-typed, ESLint-compliant, fully responsive code. It includes proper semantic HTML, accessibility attributes, optimized images, and SEO metadata — everything you need to ship with confidence.",
      },
    ],
  },
];

function FAQItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="border-b border-gray-100 last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--accent)]"
        aria-expanded={open}
      >
        <span className="text-base font-medium text-gray-900 leading-snug">
          {item.q}
        </span>
        <ChevronDown
          className={cn(
            "mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-300",
            open && "rotate-180 text-[var(--accent)]"
          )}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            variants={answerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-gray-500">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...FAQ_DATA.map((c) => c.category)];

  const filteredData = FAQ_DATA.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(
    (cat) =>
      (activeCategory === "All" || cat.category === activeCategory) &&
      cat.items.length > 0
  );

  const totalResults = filteredData.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );

  return (
    <main className="min-h-screen bg-[#f5f5fa]">
      {/* Hero Section */}
      <Reveal>
        <section className="relative overflow-hidden bg-[#f5f5fa] px-4 pb-16 pt-20 text-center">
          <div className="mx-auto max-w-2xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-1.5 text-sm text-purple-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t("faq.badge")}</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t("faq.hero.title")}
            </h1>
            <p className="mb-10 text-base leading-relaxed text-gray-500">
              {t("faq.hero.subtitle")}
            </p>

            {/* Search Bar */}
            <div className="relative mx-auto max-w-lg">
              <Search
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("faq.search.placeholder")}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                aria-label={t("faq.search.placeholder")}
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Category Filter */}
      <Reveal delay={0.05}>
        <section className="px-4 pb-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                    activeCategory === cat
                      ? "bg-[var(--accent)] text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ Accordion */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-3xl">
          {searchQuery && (
            <p className="mb-6 text-center text-sm text-gray-400">
              {totalResults === 0
                ? t("faq.search.noResults")
                : `${totalResults} ${t("faq.search.resultsFound")}`}
            </p>
          )}

          {filteredData.length === 0 ? (
            <Reveal>
              <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
                <p className="text-gray-400">{t("faq.search.noResults")}</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="mt-4 text-sm text-[var(--accent)] underline underline-offset-2 hover:opacity-80"
                >
                  {t("faq.search.clearFilters")}
                </button>
              </div>
            </Reveal>
          ) : (
            <div className="space-y-8">
              {filteredData.map((cat, catIndex) => (
                <Reveal key={cat.category} delay={catIndex * 0.05}>
                  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
                    {/* Category Header */}
                    <div className="border-b border-gray-100 px-6 py-4">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                        {cat.category}
                      </span>
                    </div>

                    {/* Items */}
                    <motion.div
                      className="divide-y divide-gray-100 px-6"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-60px" }}
                    >
                      {cat.items.map((item, i) => (
                        <FAQItem key={item.q} item={item} index={i} />
                      ))}
                    </motion.div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <Reveal>
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[var(--accent)] px-8 py-16 text-center shadow-[0_8px_40px_-8px_rgba(109,40,217,0.4)]"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
            }}
          >
            {/* Stars decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              {[
                { top: "15%", left: "8%", size: 3 },
                { top: "25%", left: "20%", size: 2 },
                { top: "60%", left: "5%", size: 2 },
                { top: "75%", left: "15%", size: 3 },
                { top: "10%", right: "10%", size: 2 },
                { top: "40%", right: "8%", size: 3 },
                { top: "70%", right: "20%", size: 2 },
                { top: "85%", right: "5%", size: 2 },
              ].map((star, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    top: star.top,
                    left: (star as { left?: string }).left,
                    right: (star as { right?: string }).right,
                    width: star.size,
                    height: star.size,
                  }}
                />
              ))}
            </div>

            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t("faq.cta.badge")}</span>
              </div>

              <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
                {t("faq.cta.title")}
              </h2>
              <p className="mb-8 text-base text-white/80">
                {t("faq.cta.subtitle")}
              </p>

              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[var(--accent)] transition-all duration-200 hover:bg-white/90 hover:shadow-lg"
              >
                {t("faq.cta.button")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Still have questions */}
      <Reveal>
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              {t("faq.contact.title")}
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              {t("faq.contact.subtitle")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-md"
            >
              {t("faq.contact.button")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}