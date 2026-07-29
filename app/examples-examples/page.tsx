"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Search, Star, Eye, Code, Sparkles, Globe, ShoppingCart, User, FileText, Layout, Activity } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

const EXAMPLES = [
  {
    id: 1,
    title: "Modern Portfolio Website",
    description: "AI-generated portfolio website",
    category: "Portfolio",
    prompt: "Create a modern developer portfolio with dark theme, project showcase, and contact form",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/84638427af0540f2a1d93f47ac936d57.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    views: 2840,
    stars: 142,
    color: "from-slate-700 to-slate-900",
    icon: User,
  },
  {
    id: 2,
    title: "Tesla Website Clone",
    description: "AI-generated Tesla website",
    category: "Landing Page",
    prompt: "Build a Tesla-style landing page with full-screen hero, model showcase, and sleek dark design",
    image: "/images/tesla-website-clone-dark.jpg",
    tags: ["React", "Framer Motion", "CSS"],
    views: 5120,
    stars: 287,
    color: "from-gray-800 to-black",
    icon: Activity,
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    description: "AI-generated analytics dashboard",
    category: "Dashboard",
    prompt: "Generate a SaaS analytics dashboard with charts, stats, and user management",
    image: "/images/saas-analytics-dashboard-purple.jpg",
    tags: ["Next.js", "Recharts", "TypeScript"],
    views: 3670,
    stars: 198,
    color: "from-violet-600 to-purple-900",
    icon: Layout,
  },
  {
    id: 4,
    title: "E-Commerce Store",
    description: "AI-generated online shop",
    category: "E-Commerce",
    prompt: "Create a modern e-commerce store with product grid, cart, and checkout flow",
    image: "/images/ecommerce-store-minimal-white.jpg",
    tags: ["Next.js", "Stripe", "Tailwind"],
    views: 4210,
    stars: 231,
    color: "from-emerald-500 to-teal-700",
    icon: ShoppingCart,
  },
  {
    id: 5,
    title: "Tech Blog Platform",
    description: "AI-generated blog with MDX support",
    category: "Blog",
    prompt: "Build a developer blog with MDX, syntax highlighting, and newsletter signup",
    image: "/images/tech-blog-platform-clean.jpg",
    tags: ["Next.js", "MDX", "Vercel"],
    views: 1980,
    stars: 115,
    color: "from-blue-500 to-indigo-700",
    icon: FileText,
  },
  {
    id: 6,
    title: "Agency Landing Page",
    description: "AI-generated creative agency site",
    category: "Landing Page",
    prompt: "Design a bold creative agency website with animated hero, services, and case studies",
    image: "/images/creative-agency-landing-bold.jpg",
    tags: ["React", "GSAP", "Tailwind"],
    views: 3340,
    stars: 176,
    color: "from-orange-500 to-red-700",
    icon: Sparkles,
  },
  {
    id: 7,
    title: "Restaurant Website",
    description: "AI-generated restaurant site with menu",
    category: "Business",
    prompt: "Create a restaurant website with menu, reservations, and location map",
    image: "/images/restaurant-website-warm.jpg",
    tags: ["Next.js", "TypeScript", "Maps"],
    views: 2150,
    stars: 98,
    color: "from-amber-500 to-orange-700",
    icon: Globe,
  },
  {
    id: 8,
    title: "Developer Portfolio v2",
    description: "AI-generated minimal portfolio",
    category: "Portfolio",
    prompt: "Minimal portfolio with light theme, case studies, and smooth scroll animations",
    image: "/images/developer-portfolio-minimal-light.jpg",
    tags: ["Next.js", "Framer Motion", "TypeScript"],
    views: 2760,
    stars: 163,
    color: "from-slate-200 to-slate-400",
    icon: Code,
  },
  {
    id: 9,
    title: "SaaS Marketing Site",
    description: "AI-generated product landing page",
    category: "Landing Page",
    prompt: "Build a SaaS marketing site with pricing, features, testimonials, and CTA sections",
    image: "/images/saas-marketing-site-purple.jpg",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    views: 4890,
    stars: 254,
    color: "from-purple-500 to-violet-800",
    icon: Sparkles,
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(EXAMPLES.map((e) => e.category)))] as const;

export default function ExamplesPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = EXAMPLES.filter((ex) => {
    const matchesCategory = activeCategory === "All" || ex.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* Hero Section */}
      <Reveal>
        <section className="pt-20 pb-12 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-sm font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t("examples.badge")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4 text-balance">
              {t("examples.hero.title")}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto text-pretty">
              {t("examples.hero.subtitle")}
            </p>
          </div>
        </section>
      </Reveal>

      {/* Search + Filter Bar */}
      <Reveal delay={0.08}>
        <section className="px-4 pb-10">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("examples.search.placeholder")}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/40 focus:border-[var(--brand-primary)] transition-all"
              />
            </div>
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[var(--brand-primary)] text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--brand-primary)]/50 hover:text-[var(--brand-primary)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Examples Grid */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 text-gray-400"
              >
                <Search className="h-10 w-10 mx-auto mb-4 opacity-40" aria-hidden="true" />
                <p className="text-lg font-medium">{t("examples.empty.title")}</p>
                <p className="text-sm mt-1">{t("examples.empty.subtitle")}</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + searchQuery}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((example, i) => {
                  const Icon = example.icon;
                  return (
                    <motion.div
                      key={example.id}
                      variants={fadeInUp}
                      custom={i}
                      onMouseEnter={() => setHoveredId(example.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="group relative bg-white rounded-2xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] overflow-hidden hover:shadow-[0_4px_32px_-8px_rgba(109,40,217,0.18)] hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Image / Preview */}
                      <div className={`relative h-48 bg-gradient-to-br ${example.color} overflow-hidden`}>
                        <img
                          src={example.image}
                          alt={example.title}
                          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                        {/* Overlay on hover */}
                        <div
                          className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                            hoveredId === example.id ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <Link
                            href="/pricing"
                            className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                          >
                            <Eye className="h-4 w-4" aria-hidden="true" />
                            {t("examples.card.preview")}
                          </Link>
                          <Link
                            href="/pricing"
                            className="flex items-center gap-1.5 px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--brand-primary)]/90 transition-colors"
                          >
                            <Code className="h-4 w-4" aria-hidden="true" />
                            {t("examples.card.code")}
                          </Link>
                        </div>
                        {/* Category badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                            {example.category}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h2 className="font-semibold text-gray-900 text-base leading-snug">
                              {example.title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-0.5">{example.description}</p>
                          </div>
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                            <Icon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                          </div>
                        </div>

                        {/* Prompt preview */}
                        <p className="text-xs text-gray-400 italic line-clamp-2 mb-3 leading-relaxed">
                          &ldquo;{example.prompt}&rdquo;
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {example.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-500 text-xs rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                            {example.views.toLocaleString("en-US")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5" aria-hidden="true" />
                            {example.stars}
                          </span>
                          <Link
                            href="/pricing"
                            className="flex items-center gap-1 text-[var(--brand-primary)] font-medium hover:underline"
                          >
                            {t("examples.card.build_similar")}
                            <ArrowRight className="h-3 w-3" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <Reveal>
        <section className="px-4 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-[var(--brand-primary)] px-8 py-16 text-center">
              {/* Background sparkle dots */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {[
                  { top: "15%", left: "8%", size: 4 },
                  { top: "70%", left: "5%", size: 3 },
                  { top: "30%", left: "92%", size: 5 },
                  { top: "80%", left: "88%", size: 3 },
                  { top: "50%", left: "50%", size: 6 },
                  { top: "10%", left: "60%", size: 3 },
                  { top: "85%", left: "40%", size: 4 },
                ].map((dot, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white/20"
                    style={{
                      top: dot.top,
                      left: dot.left,
                      width: dot.size,
                      height: dot.size,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-sm font-medium mb-6">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t("examples.cta.badge")}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  {t("examples.cta.title")}
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  {t("examples.cta.subtitle")}
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[var(--brand-primary)] font-semibold rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  {t("examples.cta.button")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}