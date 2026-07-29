"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, ExternalLink, Sparkles, Search } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";

const CATEGORIES = ["All", "Portfolio", "Landing Page", "E-commerce", "Business", "Blog", "Dashboard"];

interface Example {
  id: string;
  title: string;
  category: string;
  description: string;
  gradient: string;
  tags: string[];
}

const EXAMPLES: Example[] = [
  {
    id: "1",
    title: "Alex Chen Portfolio",
    category: "Portfolio",
    description: "A sleek developer portfolio with dark theme and animated sections.",
    gradient: "from-slate-700 via-blue-900 to-slate-900",
    tags: ["Next.js", "TypeScript"],
  },
  {
    id: "2",
    title: "Tesla Landing Page",
    category: "Landing Page",
    description: "Bold automotive landing page with full-bleed imagery and minimal UI.",
    gradient: "from-gray-900 via-gray-800 to-black",
    tags: ["React", "Tailwind"],
  },
  {
    id: "3",
    title: "Bloom Boutique",
    category: "E-commerce",
    description: "Elegant fashion e-commerce store with product grid and cart flow.",
    gradient: "from-rose-300 via-pink-200 to-rose-400",
    tags: ["Next.js", "Stripe"],
  },
  {
    id: "4",
    title: "NexaFlow SaaS",
    category: "Business",
    description: "Professional SaaS landing page with pricing, features, and testimonials.",
    gradient: "from-violet-900 via-purple-800 to-indigo-900",
    tags: ["React", "Framer Motion"],
  },
  {
    id: "5",
    title: "Green Harvest Co.",
    category: "Business",
    description: "Organic food brand website with warm tones and product showcase.",
    gradient: "from-green-800 via-emerald-700 to-teal-800",
    tags: ["Next.js", "TypeScript"],
  },
  {
    id: "6",
    title: "Maria Santos Creative",
    category: "Portfolio",
    description: "Minimalist designer portfolio with case studies and contact form.",
    gradient: "from-amber-200 via-orange-100 to-yellow-200",
    tags: ["React", "CSS Modules"],
  },
  {
    id: "7",
    title: "TechLaunch Pro",
    category: "Landing Page",
    description: "High-converting product launch page with countdown and waitlist.",
    gradient: "from-indigo-900 via-sky-800 to-blue-900",
    tags: ["Next.js", "Tailwind"],
  },
  {
    id: "8",
    title: "Artisan Coffee Co.",
    category: "E-commerce",
    description: "Warm coffee brand store with product cards and subscription flow.",
    gradient: "from-amber-900 via-yellow-800 to-orange-900",
    tags: ["Next.js", "Stripe"],
  },
  {
    id: "9",
    title: "MindfulSpace Blog",
    category: "Blog",
    description: "Clean wellness blog with article grid, tags, and newsletter signup.",
    gradient: "from-teal-700 via-cyan-600 to-teal-800",
    tags: ["Next.js", "MDX"],
  },
  {
    id: "10",
    title: "DataViz Dashboard",
    category: "Dashboard",
    description: "Analytics dashboard with charts, KPI cards, and data tables.",
    gradient: "from-slate-800 via-indigo-900 to-slate-900",
    tags: ["React", "Recharts"],
  },
  {
    id: "11",
    title: "FitLife Coaching",
    category: "Landing Page",
    description: "Fitness coaching landing page with program tiers and testimonials.",
    gradient: "from-green-600 via-lime-500 to-emerald-600",
    tags: ["Next.js", "Tailwind"],
  },
  {
    id: "12",
    title: "Nova Restaurant",
    category: "Business",
    description: "Upscale restaurant site with menu, reservations, and gallery.",
    gradient: "from-red-700 via-orange-600 to-red-800",
    tags: ["React", "Framer Motion"],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Portfolio: "bg-blue-100 text-blue-700",
  "Landing Page": "bg-indigo-100 text-indigo-700",
  "E-commerce": "bg-rose-100 text-rose-700",
  Business: "bg-violet-100 text-violet-700",
  Blog: "bg-teal-100 text-teal-700",
  Dashboard: "bg-slate-100 text-slate-700",
};

export default function ExamplesPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = EXAMPLES;
    if (activeCategory !== "All") {
      result = result.filter(
        (ex) => ex.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (ex) =>
          ex.title.toLowerCase().includes(q) ||
          ex.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <main className="min-h-screen bg-[#F5F3FF]">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#F5F3FF] to-[#EDE9FE] pt-28 pb-14 px-4 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#DDD6FE] bg-white text-[#7C3AED] text-sm font-medium mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>AI-Generated Examples</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight text-balance mb-4">
            See what&apos;s possible
          </h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed text-pretty mb-8">
            Browse websites built with Builder by HotCode AI across every industry and style.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="relative max-w-md mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(12);
              }}
              placeholder="Search examples..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#EDE9FE] rounded-xl text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] transition-all duration-200"
            />
          </div>
        </Reveal>
      </section>

      {/* ── Filter Tabs ──────────────────────────────────────── */}
      <section className="sticky top-16 z-30 bg-[#F5F3FF]/95 backdrop-blur-sm border-b border-[#EDE9FE] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(12);
              }}
              className={cn(
                "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                activeCategory === cat
                  ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-sm"
                  : "bg-white border-[#EDE9FE] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Examples Grid ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Result count */}
        <Reveal>
          <p className="text-sm text-gray-500 mb-6">
            Showing{" "}
            <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "example" : "examples"}
            {activeCategory !== "All" && (
              <span>
                {" "}in{" "}
                <span className="font-semibold text-[#7C3AED]">{activeCategory}</span>
              </span>
            )}
            {searchQuery.trim() && (
              <span>
                {" "}for{" "}
                <span className="font-semibold text-[#7C3AED]">&ldquo;{searchQuery}&rdquo;</span>
              </span>
            )}
          </p>
        </Reveal>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">No examples found. Try a different search or category.</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visible.map((example) => (
              <motion.article
                key={example.id}
                variants={scaleIn}
                className="group bg-white rounded-2xl border border-[#EDE9FE] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(124,58,237,0.08)] overflow-hidden hover:shadow-[0_4px_24px_-4px_rgba(124,58,237,0.18)] transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredId(example.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image / Gradient placeholder */}
                <div className={cn("relative h-48 bg-gradient-to-br", example.gradient)}>
                  {/* Category badge */}
                  <span
                    className={cn(
                      "absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold",
                      CATEGORY_COLORS[example.category] ?? "bg-gray-100 text-gray-700"
                    )}
                  >
                    {example.category}
                  </span>

                  {/* Hover overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300",
                      hoveredId === example.id ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#7C3AED] text-sm font-semibold rounded-xl shadow-lg">
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      View Example
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-base mb-1 group-hover:text-[#7C3AED] transition-colors duration-200">
                    {example.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {example.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {example.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#7C3AED] text-[#7C3AED] text-sm font-semibold bg-white hover:bg-[#F5F3FF] transition-all duration-200 shadow-sm"
            >
              Load more examples
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#7C3AED] py-20 px-4 mt-8">
        {/* Sparkle background dots */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: (i * 137.508) % 100,
            y: (i * 97.3) % 100,
            size: i % 3 === 0 ? 3 : 2,
            opacity: 0.12 + (i % 4) * 0.06,
          })).map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Start for free</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-balance mb-4">
              Ready to build your own?
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Join thousands of creators who ship faster with Builder. No credit card required.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#7C3AED] text-sm font-bold rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.22)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Building Free
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
