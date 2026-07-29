"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";

const EXAMPLES = [
  {
    id: "1",
    title: "Alex Chen Portfolio",
    category: "Portfolio",
    description: "A sleek developer portfolio with dark theme and animated sections.",
    gradient: "from-slate-800 via-blue-900 to-slate-900",
    accentColor: "bg-blue-500",
    tags: ["Next.js", "TypeScript"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/1a393a4f64bb4233846b7f752357959b.jpg",
  },
  {
    id: "2",
    title: "Tesla Landing Page",
    category: "Landing Page",
    description: "Bold automotive landing page with full-bleed imagery and minimal UI.",
    gradient: "from-gray-900 via-gray-800 to-black",
    accentColor: "bg-red-500",
    tags: ["React", "Tailwind"],
    image: "https://s3-alpha.figma.com/hub/file/2219958310232930685/cacc76a6-e76b-4946-9b14-d5425e559779-cover.png",
  },
  {
    id: "3",
    title: "Bloom Boutique",
    category: "E-commerce",
    description: "Elegant fashion e-commerce store with product grid and cart flow.",
    gradient: "from-rose-100 via-pink-50 to-rose-200",
    accentColor: "bg-rose-400",
    tags: ["Next.js", "Stripe"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/3e95524a87f142a9b5662740a98fb3fe.png",
  },
  {
    id: "4",
    title: "NexaFlow SaaS",
    category: "Business",
    description: "Professional SaaS landing page with pricing, features, and testimonials.",
    gradient: "from-violet-900 via-purple-800 to-indigo-900",
    accentColor: "bg-violet-500",
    tags: ["React", "Framer Motion"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0a7486ed4adb48109c3fc432b5a03f97.png",
  },
  {
    id: "5",
    title: "Green Harvest Co.",
    category: "Business",
    description: "Organic food brand website with warm tones and product showcase.",
    gradient: "from-green-800 via-emerald-700 to-teal-800",
    accentColor: "bg-emerald-400",
    tags: ["Next.js", "TypeScript"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/580fdabd19c4463a83691a884d96b345.webp",
  },
  {
    id: "6",
    title: "Maria Santos Creative",
    category: "Portfolio",
    description: "Minimalist designer portfolio with case studies and contact form.",
    gradient: "from-amber-50 via-orange-50 to-yellow-100",
    accentColor: "bg-orange-400",
    tags: ["React", "CSS Modules"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ab817f00c9c943c895de5d49280e6dcc.png",
  },
  {
    id: "7",
    title: "TechLaunch Pro",
    category: "Landing Page",
    description: "High-converting product launch page with countdown and waitlist.",
    gradient: "from-cyan-900 via-sky-800 to-blue-900",
    accentColor: "bg-cyan-400",
    tags: ["Next.js", "Tailwind"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d8fa9d4b53ee42e69e4acd4412268426.jpg",
  },
  {
    id: "8",
    title: "Urban Threads Store",
    category: "E-commerce",
    description: "Streetwear e-commerce with bold typography and lookbook gallery.",
    gradient: "from-zinc-900 via-neutral-800 to-stone-900",
    accentColor: "bg-yellow-400",
    tags: ["Next.js", "Stripe"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d7421d85b9b2434db4158b35df9fe4e4.png",
  },
  {
    id: "9",
    title: "Luminary Agency",
    category: "Business",
    description: "Creative agency website with animated hero and portfolio grid.",
    gradient: "from-fuchsia-900 via-purple-900 to-violet-900",
    accentColor: "bg-fuchsia-400",
    tags: ["React", "Framer Motion"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/765fa067a33248b1aefe0c2d30c862e0.png",
  },
];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(EXAMPLES.map((e) => e.category)))] as const;

const CATEGORY_COLORS: Record<string, string> = {
  Portfolio: "bg-blue-100 text-blue-700",
  "Landing Page": "bg-violet-100 text-violet-700",
  "E-commerce": "bg-rose-100 text-rose-700",
  Business: "bg-emerald-100 text-emerald-700",
};

export default function ExamplesPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? EXAMPLES
        : EXAMPLES.filter((e) => e.category === activeCategory),
    [activeCategory]
  );

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* Hero Section */}
      <Reveal>
        <section className="relative overflow-hidden pt-24 pb-16 text-center">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-3xl px-4">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t("examples.badge")}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              {t("examples.hero.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.16 }}
              className="mx-auto max-w-xl text-lg leading-relaxed text-gray-500"
            >
              {t("examples.hero.subtitle")}
            </motion.p>
          </div>
        </section>
      </Reveal>

      {/* Filter Tab Bar */}
      <Reveal delay={0.05}>
        <section className="pb-8">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200",
                    activeCategory === cat
                      ? "border-violet-600 bg-violet-600 text-white shadow-sm"
                      : "border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:text-violet-700"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Examples Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((example, i) => (
              <motion.div
                key={example.id}
                variants={scaleIn}
                custom={i}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_16px_40px_-12px_rgba(0,0,0,0.16)]"
              >
                {/* Screenshot Placeholder */}
                <div
                  className={cn(
                    "relative h-48 w-full bg-gradient-to-br",
                    example.gradient
                  )}
                >
                  <img
                    src={example.image}
                    alt={example.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Decorative dots */}
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Mock browser bar */}
                  <div className="absolute left-3 right-3 top-3 flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-red-400/80" />
                    <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                    <span className="h-2 w-2 rounded-full bg-green-400/80" />
                    <div className="ml-2 h-1.5 flex-1 rounded-full bg-white/20" />
                  </div>
                  {/* Category badge overlay */}
                  <div className="absolute bottom-3 left-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-semibold",
                        CATEGORY_COLORS[example.category] ?? "bg-gray-100 text-gray-700"
                      )}
                    >
                      {example.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1.5 text-base font-bold text-gray-900">
                    {example.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500">
                    {example.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {example.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center gap-1 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 transition-colors duration-200 hover:bg-violet-100"
                    >
                      {t("examples.card.viewButton")}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-gray-400">
              <p className="text-lg">{t("examples.empty")}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <Reveal>
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-8 py-16 text-center shadow-[0_8px_40px_-8px_rgba(124,58,237,0.5)]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 80% at 50% 120%, rgba(255,255,255,0.08) 0%, transparent 60%), linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4338ca 100%)",
            }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t("examples.cta.badge")}
            </div>
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              {t("examples.cta.title")}
            </h2>
            <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-white/75">
              {t("examples.cta.subtitle")}
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-violet-700 shadow-lg transition-all duration-200 hover:bg-violet-50 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t("examples.cta.button")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}